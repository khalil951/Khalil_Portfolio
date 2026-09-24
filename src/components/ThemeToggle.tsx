"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

// The inline pre-paint script (lib/theme.ts) has already set data-theme by
// the time React hydrates on the client, but the server render has no DOM to
// read — useSyncExternalStore handles that server/client divergence safely.
function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — theme
      // still applies for this page view, it just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="font-ui text-sm px-3 py-1.5 border border-rule rounded-sm hover:border-ink-muted transition-colors"
    >
      {isDark ? "Night reading" : "Paper"}
    </button>
  );
}
