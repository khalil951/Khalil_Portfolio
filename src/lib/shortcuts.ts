export const CONTINUE_READING_KEY = "book-continue-reading";
export const SKIM_MODE_KEY = "book-skim-mode";

/**
 * Keyboard shortcuts (docs/04): wired up in Phase 3 alongside the Index,
 * Skim mode toggle and Map. Keys reserved here so ThemeToggle / layout
 * code in Phase 1 doesn't collide with them later.
 */
export const SHORTCUTS = {
  prevChapter: "ArrowLeft",
  nextChapter: "ArrowRight",
  toc: "t",
  search: "/",
  skim: "s",
  map: "m",
  help: "?",
} as const;
