import { Link } from "@/components/Link";
import { bibliography } from "#site/content";

/**
 * Inline citation (docs/05 authoring API). Numbered footnote rendering is a
 * Phase 3 concern (build-time numbering); for now this links straight to
 * the work's entry on /bibliography. `id` is validated at build time.
 */
export function Cite({ id }: { id: string }) {
  const work = bibliography.find((w) => w.id === id);
  if (!work) return null;

  const authorYear = `${work.authors}, ${work.year}`;

  return (
    <Link href={`/bibliography#${id}`} className="tap-target font-ui text-sm text-rubric no-underline hover:underline">
      ({authorYear})
    </Link>
  );
}
