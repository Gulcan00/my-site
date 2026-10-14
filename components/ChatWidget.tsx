"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What do you work on at CCC?",
  "What's your tech stack?",
  "How did your career start?",
  "How can I contact you?",
];

const greeting: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Gulcan's digital twin. Ask me anything about my career, skills or experience — I'll answer from my professional profile.",
};

export const OPEN_TWIN_EVENT = "open-twin";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener(OPEN_TWIN_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_TWIN_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (text: string) => {
    const content = text.trim().slice(0, 1500);
    if (!content || busy) return;
    setError(null);
    setInput("");
    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Skip the canned greeting and keep the request small.
        body: JSON.stringify({ messages: history.slice(1).slice(-12) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: reply }]);
      }
      if (!reply.trim()) throw new Error("I didn't catch that — could you rephrase?");
    } catch (err) {
      if (controller.signal.aborted) return;
      setMessages(messages);
      setInput(content);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const showSuggestions = messages.length === 1 && !busy;

  return (
    <>
      <button
        type="button"
        className={`twin-launcher ${open ? "is-hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Chat with Gulcan's digital twin"
      >
        <span className="twin-launcher__avatar" aria-hidden>
          GD
          <i />
        </span>
        <span className="twin-launcher__text">
          <strong>Ask my digital twin</strong>
          <small>AI · answers about my career</small>
        </span>
      </button>

      <section
        className={`twin ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label="Digital twin chat"
        aria-hidden={!open}
        inert={!open}
      >
        <header className="twin__head">
          <span className="twin-launcher__avatar" aria-hidden>
            GD
            <i />
          </span>
          <div className="twin__id">
            <strong>Gulcan · Digital Twin</strong>
            <small>
              <span className="pulse" aria-hidden /> Online · powered by Nemotron 3 Ultra
            </small>
          </div>
          <button type="button" className="twin__close" onClick={() => setOpen(false)} aria-label="Close chat">
            ×
          </button>
        </header>

        <div className="twin__body" ref={listRef} aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`twin__msg twin__msg--${m.role}`}>
              {m.content || (
                <span className="twin__typing" aria-label="Thinking">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </div>
          ))}
          {showSuggestions && (
            <div className="twin__suggest">
              {suggestions.map((s) => (
                <button key={s} type="button" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
          {error && (
            <p className="twin__error" role="alert">
              {error}
            </p>
          )}
        </div>

        <form className="twin__form" onSubmit={onSubmit}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about my experience…"
            rows={1}
            maxLength={1500}
            aria-label="Your question"
          />
          <button type="submit" className="twin__send" disabled={busy || !input.trim()} aria-label="Send">
            ↑
          </button>
        </form>
        <p className="twin__note">AI-generated from my profile — may be imperfect. For anything important, email me.</p>
      </section>
    </>
  );
}
