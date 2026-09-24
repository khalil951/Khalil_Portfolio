import Link from "next/link";
import { sections } from "#site/content";

/**
 * Backlinks box (docs/07 anatomy, item 4). Phase 2 shows the section's own
 * `related` links; full reverse backlink discovery ("Referenced in 6.3
 * Toolkit, Index: RAG") from internal links + the Index is a Phase 3
 * concern (docs/05 build phases).
 */
export function Connections({ related }: { related?: string[] }) {
  if (!related?.length) return null;

  const targets = related
    .map((slug) => sections.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (targets.length === 0) return null;

  return (
    <aside className="not-prose mt-10 border border-rule rounded-sm p-4">
      <h2 className="font-ui text-sm text-ink-muted uppercase tracking-wide mb-2">Connections</h2>
      <ul className="flex flex-col gap-1 font-ui text-sm">
        {targets.map((t) => (
          <li key={t.slug}>
            <Link href={`/chapters/${t.chapter}/${t.slug}`} className="hover:underline">
              § {t.section} {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
