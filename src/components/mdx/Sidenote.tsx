import type { ReactNode } from "react";

/**
 * Numbered reference (repo links, reports, papers — docs/04). Uses a native
 * `<details>` disclosure so it works with zero JS and is keyboard-operable
 * by default; Phase 5 can restyle it as a Radix popover on wide viewports
 * without changing the underlying accessible mechanism.
 */
export function Sidenote({ children }: { children: ReactNode }) {
  return (
    <details className="sidenote inline-block align-top">
      <summary className="font-ui text-xs text-rubric cursor-pointer select-none">note</summary>
      <span className="block font-ui text-sm text-ink-muted border-l-2 border-rule pl-3 mt-1">
        {children}
      </span>
    </details>
  );
}
