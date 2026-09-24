"use client";

import { useSyncExternalStore } from "react";
import { SKIM_STORAGE_KEY } from "@/lib/skim";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-skim"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-skim") === "true";
}

function getServerSnapshot() {
  return false;
}

/** "A small Skim mode switch", persistent in the header (docs/07). */
export function SkimToggle() {
  const isSkim = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !isSkim;
    if (next) {
      document.documentElement.setAttribute("data-skim", "true");
    } else {
      document.documentElement.removeAttribute("data-skim");
    }
    try {
      localStorage.setItem(SKIM_STORAGE_KEY, String(next));
    } catch {
      // localStorage unavailable — skim mode still applies for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isSkim}
      className="font-ui text-sm px-3 py-1.5 border border-rule rounded-sm hover:border-ink-muted transition-colors"
    >
      Skim mode
    </button>
  );
}
