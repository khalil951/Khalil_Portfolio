import type { Metadata } from "next";
import Link from "next/link";
import { chapters, concepts, sections, skills, type Chapter, type Section } from "#site/content";

export const metadata: Metadata = { title: "Index" };

const TERM_RE = /<Term\s+id="([^"]+)"/g;

interface Evidence {
  href: string;
  label: string;
}

interface IndexEntry {
  id: string;
  label: string;
  group: string;
  evidence: Evidence[];
}

/**
 * A real book index (docs/07): every skill and concept, alphabetical, →
 * the sections that give evidence — `stack`/`concepts` frontmatter plus
 * every `<Term>` usage across chapters and sections (docs/05 "Index").
 *
 * Routed at /book-index, not docs/05's literal /index: on static export,
 * a bare "/index" path collides with the root page's own generated
 * index.html on common static hosts (confirmed with `serve` in this repo;
 * the same ambiguity is expected on Vercel's static hosting, docs/05's
 * deploy target) — requesting /index served the Cover page instead.
 */
function buildIndex(): IndexEntry[] {
  const entries = new Map<string, IndexEntry>();

  for (const skill of skills) {
    entries.set(skill.id, { id: skill.id, label: skill.label, group: skill.group, evidence: [] });
  }
  for (const concept of concepts) {
    entries.set(concept.id, { id: concept.id, label: concept.label, group: "Concepts", evidence: [] });
  }

  function addEvidence(id: string, href: string, label: string) {
    const entry = entries.get(id);
    if (!entry) return;
    if (entry.evidence.some((e) => e.href === href)) return;
    entry.evidence.push({ href, label });
  }

  for (const section of sections as Section[]) {
    const href = `/chapters/${section.chapter}/${section.slug}`;
    const label = `§ ${section.section} ${section.title}`;
    for (const id of section.stack ?? []) addEvidence(id, href, label);
    for (const id of section.concepts ?? []) addEvidence(id, href, label);
    for (const m of (section.raw ?? "").matchAll(TERM_RE)) addEvidence(m[1], href, label);
  }

  for (const chapter of chapters as Chapter[]) {
    const href = `/chapters/${chapter.number}`;
    const label = `${chapter.roman}. ${chapter.title}`;
    for (const m of (chapter.raw ?? "").matchAll(TERM_RE)) addEvidence(m[1], href, label);
  }

  return [...entries.values()]
    .filter((e) => e.evidence.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label));
}

export default function IndexPage() {
  const entries = buildIndex();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 measure">
      <h1 className="font-text text-4xl mb-2">Index</h1>
      <p className="text-ink-muted mb-10">
        Every skill, tool and concept, alphabetical, linked to the sections that give evidence.
      </p>

      <dl className="flex flex-col gap-4">
        {entries.map((entry) => (
          <div key={entry.id} className="font-ui text-sm">
            <dt className="font-text text-lg">{entry.label}</dt>
            <dd className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-ink-muted">
              {entry.evidence.map((e, i) => (
                <span key={e.href}>
                  <Link href={e.href} className="hover:underline hover:text-ink">
                    {e.label}
                  </Link>
                  {i < entry.evidence.length - 1 ? "," : ""}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
