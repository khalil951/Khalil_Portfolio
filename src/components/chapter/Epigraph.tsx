import { epigraphs } from "#site/content";

/**
 * Quote + cited attribution (docs/04). Renders nothing when the chapter has
 * no epigraph id, or when the epigraph exists but isn't verified — every
 * epigraph in content/epigraphs.yaml ships `verified: false` today (Khalil
 * verifies sources himself, CLAUDE.md rule 6). Not a build failure; an
 * expected empty state (docs/05 validation).
 */
export function Epigraph({ id }: { id?: string }) {
  if (!id) return null;

  const epigraph = epigraphs.find((e) => e.id === id);
  if (!epigraph || !epigraph.verified) return null;

  return (
    <blockquote className="font-text italic text-lg text-ink-muted border-l-2 border-rubric pl-4 my-6">
      <p>&ldquo;{epigraph.quote}&rdquo;</p>
      <footer className="font-ui not-italic text-sm mt-2">
        — {epigraph.author}
        {epigraph.source ? <span>, {epigraph.source}</span> : null}
      </footer>
    </blockquote>
  );
}
