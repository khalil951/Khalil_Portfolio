import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { chapters, sections } from "#site/content";
import { renderMdx } from "@/lib/mdx";
import { ChapterLayout } from "@/components/chapter/ChapterLayout";
import { ChapterOpener } from "@/components/chapter/ChapterOpener";
import { ChapterNav } from "@/components/chapter/ChapterNav";

export function generateStaticParams() {
  return chapters.map((c) => ({ n: String(c.number) }));
}

function getChapter(n: string) {
  return chapters.find((c) => c.number === Number(n));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const chapter = getChapter((await params).n);
  if (!chapter) return {};
  return { title: `${chapter.roman}. ${chapter.title}` };
}

export default async function ChapterPage({ params }: { params: Promise<{ n: string }> }) {
  const chapter = getChapter((await params).n);
  if (!chapter) notFound();

  const body = await renderMdx(chapter.content);
  const childSections = sections
    .filter((s) => s.chapter === chapter.number)
    .sort((a, b) => a.order - b.order);

  return (
    <ChapterLayout chapter={chapter}>
      <ChapterOpener chapter={chapter} />
      {body}

      {childSections.length > 0 ? (
        <nav aria-label="Sections" className="not-prose mt-10 border-t border-rule pt-6">
          <h2 className="font-ui text-sm text-ink-muted uppercase tracking-wide mb-3">
            In this chapter
          </h2>
          <ul className="flex flex-col gap-2">
            {childSections.map((s) => (
              <li key={s.slug}>
                <a href={`/chapters/${chapter.number}/${s.slug}`} className="font-text hover:underline">
                  § {s.section} {s.title}
                </a>
                <p className="text-sm text-ink-muted">{s.abstract}</p>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <ChapterNav number={chapter.number} />
    </ChapterLayout>
  );
}
