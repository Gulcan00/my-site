"use client";

import { OPEN_TWIN_EVENT } from "./ChatWidget";

export function AskTwinButton({ className = "btn" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_TWIN_EVENT))}>
      <span className="pulse" aria-hidden /> Ask my AI twin
    </button>
  );
}
