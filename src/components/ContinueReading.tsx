"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CONTINUE_READING_KEY, type ContinueReadingState } from "@/lib/continueReading";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(CONTINUE_READING_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

/** Reads the last-visited chapter (docs/04 UX rule) — a convenience only. */
export function ContinueReading() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!raw) return null;

  let state: ContinueReadingState;
  try {
    state = JSON.parse(raw) as ContinueReadingState;
  } catch {
    return null;
  }

  return (
    <p className="mt-4 font-ui text-sm">
      <Link href={`/chapters/${state.chapterNumber}`} className="text-rubric hover:underline">
        Continue reading: {state.chapterRoman}. {state.chapterTitle} →
      </Link>
    </p>
  );
}
