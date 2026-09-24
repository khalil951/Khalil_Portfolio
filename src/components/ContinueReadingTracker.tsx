"use client";

import { useEffect } from "react";
import { CONTINUE_READING_KEY, type ContinueReadingState } from "@/lib/continueReading";

/**
 * "Continue reading" remembers the last chapter (docs/04 UX rule) — a
 * convenience only, wrapped in try/catch. Mounted once per chapter/section
 * page; writes on mount, nothing to render.
 */
export function ContinueReadingTracker(props: ContinueReadingState) {
  useEffect(() => {
    try {
      localStorage.setItem(CONTINUE_READING_KEY, JSON.stringify(props));
    } catch {
      // localStorage unavailable — "continue reading" just won't persist.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- write-once on mount per page visit
  }, [props.chapterNumber]);

  return null;
}
