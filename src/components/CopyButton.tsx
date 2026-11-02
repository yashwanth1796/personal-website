"use client";

import { useEffect, useRef, useState } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers and non-secure contexts: fall back to a hidden textarea.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

export default function CopyButton({ value, label, className = "copy-btn" }: { value: string; label: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const onClick = async () => {
    const ok = await copyText(value);
    setState(ok ? "copied" : "failed");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1800);
  };

  return (
    <button type="button" className={className} data-state={state} onClick={onClick} aria-label={`${label}: ${value}`}>
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        {state === "copied"
          ? <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M5.5 5.5V3.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M3.5 5.5h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />}
      </svg>
      <span aria-hidden="true">{state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label}</span>
      <span className="sr-only" aria-live="polite">{state === "copied" ? `${label.replace(/^Copy /, "")} copied` : ""}</span>
    </button>
  );
}
