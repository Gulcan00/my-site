import { buildSystemPrompt } from "@/lib/twin";

const OPENROUTER = process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";
const MODEL_NAME = /nemotron[\s-]*3[\s-]*ultra/i;
const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;
const RATE_LIMIT = { windowMs: 60_000, max: 15 };

type ChatMessage = { role: "user" | "assistant"; content: string };

const hits = new Map<string, number[]>();
let resolvedModel: string | null = process.env.OPENROUTER_MODEL ?? null;

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const raw = (body as { messages: unknown[] }).messages;
  if (raw.length === 0 || raw.length > MAX_MESSAGES) return null;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_CHARS) return null;
    out.push({ role, content: text });
  }
  return out[out.length - 1].role === "user" ? out : null;
}

// Resolves the OpenRouter slug for "Nemotron 3 Ultra" once, unless OPENROUTER_MODEL pins it.
async function getModel(apiKey: string) {
  if (resolvedModel) return resolvedModel;
  const res = await fetch(`${OPENROUTER}/models`, { headers: { Authorization: `Bearer ${apiKey}` } });
  if (!res.ok) throw new Error(`Model lookup failed (${res.status})`);
  const { data } = (await res.json()) as { data: { id: string; name: string }[] };
  const matches = data.filter((m) => MODEL_NAME.test(m.name) || MODEL_NAME.test(m.id));
  const pick = matches.find((m) => !m.id.endsWith(":free")) ?? matches[0];
  if (!pick) throw new Error("Nemotron 3 Ultra is not available on OpenRouter");
  resolvedModel = pick.id;
  return resolvedModel;
}

const fail = (status: number, error: string) => Response.json({ error }, { status });

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return fail(500, "The digital twin isn't configured yet.");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) return fail(429, "You're asking faster than I can think — give it a minute.");

  let messages: ChatMessage[] | null;
  try {
    messages = parseMessages(await request.json());
  } catch {
    messages = null;
  }
  if (!messages) return fail(400, "Invalid message.");

  let upstream: Response;
  try {
    const model = await getModel(apiKey);
    upstream = await fetch(`${OPENROUTER}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": request.headers.get("origin") ?? "http://localhost:3000",
        "X-Title": "Gulcan Damdelen - Digital Twin",
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.4,
        max_tokens: 600,
        reasoning: { exclude: true },
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      }),
      signal: request.signal,
    });
  } catch (err) {
    console.error("[chat] OpenRouter request failed:", err);
    return fail(502, "I can't reach my brain right now. Please try again shortly.");
  }

  if (!upstream.ok || !upstream.body) {
    console.error("[chat] OpenRouter error:", upstream.status, await upstream.text().catch(() => ""));
    return fail(502, "Something went wrong on my side. Please try again.");
  }

  // Convert OpenRouter's SSE stream into a plain text stream of content deltas.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const text = json.choices?.[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // ignore keep-alive comments and partial frames
          }
        }
      },
    })
  );

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
