import { Link as TransitionLink } from "next-view-transitions";
import type { ComponentProps } from "react";

/**
 * `next/link`'s default prefetch fetches RSC payload files
 * (`__next.<route>.__PAGE__.txt`) that simply don't exist under
 * `output: 'export'` — there is no server to generate them, ever, on this
 * deployment target. Left on, every visible link logs a 404 to console
 * (caught by Lighthouse's "errors in console" best-practices audit).
 * Defaulting prefetch off is a correct fix here, not a lost optimization —
 * the underlying capability doesn't exist for a fully static export.
 */
export function Link({ prefetch = false, ...props }: ComponentProps<typeof TransitionLink>) {
  return <TransitionLink prefetch={prefetch} {...props} />;
}
