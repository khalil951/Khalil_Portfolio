import type { ReactNode } from "react";
import { Link } from "@/components/Link";
import { chapters, sections, type Chapter } from "#site/content";
import { ContinueReadingTracker } from "@/components/ContinueReadingTracker";

function ChapterToc({ chapter }: { chapter: Chapter }) {
  const childSections = sections
    .filter((s) => s.chapter === chapter.number)
    .sort((a, b) => a.order - b.order);

  return (
    <nav aria-label="Chapter contents" className="font-ui text-sm flex flex-col gap-2">
      <Link href="/contents" className="tap-target text-ink-muted hover:underline">
        ← Contents
      </Link>
      <p className="mt-2 font-medium">
        {chapter.roman}. {chapter.title}
      </p>
      {childSections.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {childSections.map((s) => (
            <li key={s.slug}>
              <Link href={`/chapters/${chapter.number}/${s.slug}`} className="tap-target hover:underline">
                § {s.section} {s.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}

/** The 3-column → drawer → bottom-bar reading layout (docs/04). */
export function ChapterLayout({
  chapter,
  children,
  dropCap = false,
  marginContent,
}: {
  chapter: Chapter;
  children: ReactNode;
  /** Only true chapter bodies get the automatic opening-paragraph drop cap (docs/04) — not project/study section pages. */
  dropCap?: boolean;
  /**
   * Rendered as a real third grid column (docs/04 margin column), e.g.
   * MiniMap — must be a direct child of the grid, not nested inside
   * `.chapter-article`, for `grid-column: 3` (globals.css) to place it.
   */
  marginContent?: ReactNode;
}) {
  const all = [...chapters].sort((a, b) => a.number - b.number);

  return (
    <div className="chapter-grid mx-auto px-4 py-10">
      <ContinueReadingTracker
        chapterNumber={chapter.number}
        chapterTitle={chapter.title}
        chapterRoman={chapter.roman}
      />
      <aside className="chapter-toc chapter-toc-desktop">
        <ChapterToc chapter={chapter} />
      </aside>

      <details className="chapter-toc-mobile mb-6 border border-rule rounded-sm p-3">
        <summary className="font-ui text-sm cursor-pointer">Contents</summary>
        <div className="mt-3">
          <ChapterToc chapter={chapter} />
          <ul className="mt-4 flex flex-col gap-1 font-ui text-sm">
            {all.map((c) => (
              <li key={c.number}>
                <Link href={`/chapters/${c.number}`} className="tap-target hover:underline">
                  {c.roman}. {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <article className={`chapter-article${dropCap ? " chapter-article--drop-cap" : ""}`}>
        {children}
      </article>

      {marginContent}
    </div>
  );
}
