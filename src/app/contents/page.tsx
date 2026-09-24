import type { Metadata } from "next";
import { Link } from "@/components/Link";
import { chapters, sections } from "#site/content";

export const metadata: Metadata = { title: "Contents" };

/** Numbered chapters with section list, reading time, one-line abstract each (docs/07). */
export default function ContentsPage() {
  const sorted = [...chapters].sort((a, b) => a.number - b.number);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 measure">
      <h1 className="font-text text-4xl mb-2">Contents</h1>
      <p className="text-ink-muted mb-10">The fastest overview of the whole book.</p>

      <ol className="flex flex-col gap-8">
        {sorted.map((chapter) => {
          const childSections = sections
            .filter((s) => s.chapter === chapter.number)
            .sort((a, b) => a.order - b.order);
          const minutes = Math.max(1, Math.round(chapter.metadata.readingTime));

          return (
            <li key={chapter.number}>
              <Link href={`/chapters/${chapter.number}`} className="group">
                <h2 className="font-text text-2xl group-hover:underline">
                  {chapter.roman}. {chapter.title}
                </h2>
              </Link>
              <p className="font-ui text-sm text-ink-muted mt-1">
                {chapter.subtitle} · {minutes} min read
              </p>
              <p className="mt-2">{chapter.abstract}</p>

              {childSections.length > 0 ? (
                <ul className="mt-3 flex flex-col gap-1 font-ui text-sm">
                  {childSections.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/chapters/${chapter.number}/${s.slug}`} className="tap-target hover:underline">
                        § {s.section} {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
