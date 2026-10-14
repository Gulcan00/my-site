"use client";

import { useEffect, useState } from "react";

const lines = [
  { cmd: "whoami", out: [{ t: "gulcan.damdelen", c: "hl" }, { t: " — full stack developer" }] },
  {
    cmd: "cat stack.json",
    out: [
      { t: "{ " },
      { t: '"ui"', c: "key" },
      { t: ": " },
      { t: '"Angular · TS"', c: "str" },
      { t: ", " },
      { t: '"api"', c: "key" },
      { t: ": " },
      { t: '"Spring Boot"', c: "str" },
      { t: ", " },
      { t: '"db"', c: "key" },
      { t: ": " },
      { t: '"PostgreSQL"', c: "str" },
      { t: " }" },
    ],
  },
  { cmd: "uptime", out: [{ t: "2+ years in production · Nicosia, CY" }] },
  { cmd: "git status", out: [{ t: "● ", c: "ok" }, { t: "shipping — working tree clean" }] },
];

export function Terminal() {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLine(lines.length);
      return;
    }
    if (line >= lines.length) return;
    const cmd = lines[line].cmd;
    let delay: number;
    if (line === 0 && chars === 0) delay = 900;
    else if (chars < cmd.length) delay = 40 + Math.random() * 60;
    else delay = 520;

    const t = window.setTimeout(() => {
      if (chars < cmd.length) setChars((c) => c + 1);
      else {
        setLine((l) => l + 1);
        setChars(0);
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [line, chars]);

  return (
    <div className="terminal" role="img" aria-label="Terminal introducing Gulcan Damdelen, full stack developer working with Angular, Spring Boot and PostgreSQL">
      <div className="terminal__bar" aria-hidden>
        <span className="terminal__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="terminal__title">~/gulcan — zsh</span>
        <span className="terminal__badge">LIVE</span>
      </div>
      <div className="terminal__body" aria-hidden>
        {lines.map((l, i) => {
          if (i > line) return null;
          const typing = i === line;
          return (
            <div key={l.cmd} className="terminal__block">
              <div className="terminal__line">
                <span className="terminal__prompt">❯</span>
                <span>{typing ? l.cmd.slice(0, chars) : l.cmd}</span>
                {typing && <span className="caret" />}
              </div>
              {!typing && (
                <div className="terminal__out">
                  {l.out.map((seg, j) => (
                    <span key={j} className={seg.c ? `tok-${seg.c}` : undefined}>
                      {seg.t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {line >= lines.length && (
          <div className="terminal__line">
            <span className="terminal__prompt">❯</span>
            <span className="caret" />
          </div>
        )}
      </div>
    </div>
  );
}
