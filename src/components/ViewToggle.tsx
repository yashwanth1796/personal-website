"use client";

import { useSyncExternalStore } from "react";

export type ViewMode = "map" | "list";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-view"] });
  return () => observer.disconnect();
}

const read = (): ViewMode => (document.documentElement.dataset.view === "list" ? "list" : "map");

export function setView(mode: ViewMode) {
  document.documentElement.dataset.view = mode;
  try { localStorage.setItem("view", mode); } catch {}
  const url = new URL(window.location.href);
  if (mode === "list") url.searchParams.set("view", "list"); else url.searchParams.delete("view");
  history.replaceState(null, "", url);
  window.scrollTo(0, 0);
}

export default function ViewToggle() {
  const mode = useSyncExternalStore(subscribe, read, () => "map");
  return (
    <div className="view-toggle" role="group" aria-label="View">
      {(["map", "list"] as const).map(option => (
        <button key={option} type="button" aria-pressed={mode === option} onClick={() => setView(option)}>
          {option === "map" ? "Map" : "List"}
        </button>
      ))}
    </div>
  );
}

/** Runs before paint so the saved view never flashes the other one. */
export const viewBootScript = `(function(){try{var q=new URLSearchParams(location.search).get("view");var v=q||localStorage.getItem("view");if(v==="list")document.documentElement.dataset.view="list";}catch(e){}})();`;
