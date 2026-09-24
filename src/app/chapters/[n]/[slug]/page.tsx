import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { chapters, sections } from "#site/content";
import { renderMdx } from "@/lib/mdx";
import { ChapterLayout } from "@/components/chapter/ChapterLayout";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ResultsBlock } from "@/components/project/ResultsBlock";
import { Connections } from "@/components/chapter/Connections";
import { ChapterNav } from "@/components/chapter/ChapterNav";
import { MiniMap } from "@/components/graph/MiniMap";

export function generateStaticParams() {
  return sections.map((s) => ({ n: String(s.chapter), slug: s.slug }));
}

function getSection(n: string, slug: string) {
  return sections.find((s) => s.chapter === Number(n) && s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string; slug: string }>;
}): Promise<Metadata> {
  const { n, slug } = await params;
  const section = getSection(n, slug);
  if (!section) return {};
  return { title: section.title, description: section.abstract };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ n: string; slug: string }>;
}) {
  const { n, slug } = await params;
  const section = getSection(n, slug);
  if (!section) notFound();

  const chapter = chapters.find((c) => c.number === section.chapter);
  if (!chapter) notFound();

  const body = await renderMdx(section.content);

  return (
    <ChapterLayout chapter={chapter}>
      <ProjectHero section={section} />
      <MiniMap sectionRoute={`/chapters/${section.chapter}/${section.slug}`} />
      {body}
      <ResultsBlock
        measured={section.results?.measured}
        observed={section.results?.observed}
        pending={section.results?.pending}
      />
      <Connections route={`/chapters/${section.chapter}/${section.slug}`} related={section.related} />
      <ChapterNav number={chapter.number} />
    </ChapterLayout>
  );
}
