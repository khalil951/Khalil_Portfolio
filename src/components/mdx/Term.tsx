import type { ReactNode } from "react";
import { concepts, skills } from "#site/content";

/**
 * Inline glossary term (docs/05 authoring API). Adds an Index entry in
 * Phase 3 — for now, a dotted underline with the definition as a native
 * tooltip (`title`), sourced from concepts.yaml or skills.yaml. `id` is
 * validated at build time (scripts/velite-prepare.ts).
 */
export function Term({ id, children }: { id: string; children: ReactNode }) {
  const definition =
    concepts.find((c) => c.id === id)?.definition ?? skills.find((s) => s.id === id)?.label;

  return (
    <span className="underline decoration-dotted decoration-ink-muted underline-offset-2" title={definition}>
      {children}
    </span>
  );
}
