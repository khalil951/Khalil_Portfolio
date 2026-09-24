import Link from "next/link";
import { sections } from "#site/content";
import { getBacklinks } from "@/lib/backlinks";

/**
 * Backlinks box (docs/07 anatomy, item 4): this section's own `related`
 * links, plus every other page that links back to it (docs/05 "Backlinks":
 * internal links + `related`, run in reverse).
 */
export function Connections({ route, related }: { route: string; related?: string[] }) {
  const forward = (related ?? [])
    .map((slug) => sections.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ href: `/chapters/${s.chapter}/${s.slug}`, label: `§ ${s.section} ${s.title}` }));

  const reverse = getBacklinks(route, route).filter((b) => !forward.some((f) => f.href === b.href));

  const all = [...forward, ...reverse];
  if (all.length === 0) return null;

  return (
    <aside className="not-prose mt-10 border border-rule rounded-sm p-4">
      <h2 className="font-ui text-sm text-ink-muted uppercase tracking-wide mb-2">Connections</h2>
      <ul className="flex flex-col gap-1 font-ui text-sm">
        {all.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
