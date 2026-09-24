import type { Chapter } from "#site/content";
import { Epigraph } from "./Epigraph";

/** Numeral, title, subtitle, epigraph, reading time, abstract (docs/07 chapter anatomy, items 1–2). */
export function ChapterOpener({ chapter }: { chapter: Chapter }) {
  const minutes = Math.max(1, Math.round(chapter.metadata.readingTime));

  return (
    <header className="not-prose mb-10">
      <p className="font-text text-6xl text-rubric" aria-hidden="true">
        {chapter.roman}
      </p>
      <h1 className="font-text text-4xl mt-2">{chapter.title}</h1>
      <p className="font-text text-xl text-ink-muted mt-1">{chapter.subtitle}</p>
      <p className="font-ui text-sm text-ink-muted mt-2">{minutes} min read</p>

      <Epigraph id={chapter.epigraph} />

      <p className="font-text text-lg mt-6 measure">{chapter.abstract}</p>
    </header>
  );
}
