import type { ReactNode } from "react";

/**
 * Khalil's own reflection, set in italics in the margin column (docs/04).
 * Claude must never write these — zero instances exist in content today.
 * scripts/velite-prepare.ts already fails the build if a `draft` note
 * reaches content/; this check is a second, defensive layer at render time.
 */
export function MarginNote({ draft, children }: { draft?: boolean; children: ReactNode }) {
  if (draft) {
    throw new Error("MarginNote draft reached render — this must never ship (see CLAUDE.md rule 6).");
  }

  return (
    <aside className="margin-note font-text italic text-sm text-ink-muted">
      <span aria-hidden="true">✎ </span>
      {children}
    </aside>
  );
}
