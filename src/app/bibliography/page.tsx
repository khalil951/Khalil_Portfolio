import type { Metadata } from "next";
import { bibliography, chapters, sections, type Work } from "#site/content";

export const metadata: Metadata = { title: "Bibliography" };

const CITE_RE = /<Cite\s+id="([^"]+)"/g;

/** Works cited, in the order they first appear reading front to back (docs/05 "Bibliography"). */
function citationOrder(): Work[] {
  const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);
  const seen = new Set<string>();
  const order: string[] = [];

  for (const chapter of sortedChapters) {
    for (const raw of [chapter.raw ?? ""]) {
      for (const m of raw.matchAll(CITE_RE)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          order.push(m[1]);
        }
      }
    }
    const childSections = sections
      .filter((s) => s.chapter === chapter.number)
      .sort((a, b) => a.order - b.order);
    for (const section of childSections) {
      for (const m of (section.raw ?? "").matchAll(CITE_RE)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          order.push(m[1]);
        }
      }
    }
  }

  return order
    .map((id) => bibliography.find((w) => w.id === id))
    .filter((w): w is Work => Boolean(w));
}

export default function BibliographyPage() {
  const works = citationOrder();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 measure">
      <h1 className="font-text text-4xl mb-2">Bibliography</h1>
      <p className="text-ink-muted mb-10">Works cited in the book, in the order they appear.</p>

      {works.length === 0 ? (
        <p className="text-ink-muted">No works cited yet.</p>
      ) : (
        <ol className="flex flex-col gap-4">
          {works.map((work) => (
            <li key={work.id} id={work.id} className="scroll-mt-24">
              <p className="font-ui">
                {work.authors} ({work.year}). <em>{work.title}</em>. {work.venue}.
                {work.url ? (
                  <>
                    {" "}
                    <a href={work.url} className="text-rubric hover:underline">
                      Link
                    </a>
                  </>
                ) : null}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
