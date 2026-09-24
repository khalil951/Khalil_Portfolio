import Link from "next/link";
import { book, profile } from "#site/content";
import { KeyFacts } from "@/components/mdx/KeyFacts";
import { ContinueReading } from "@/components/ContinueReading";

/**
 * Cover (docs/07 front matter): name, headline, subtitle, edition, three
 * actions (Begin reading · Contents · Download CV), key facts visible
 * without scrolling at 1280x720. The Skim mode switch lives in the
 * persistent header (RunningHeader) rather than duplicated here.
 */
export default function CoverPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 measure">
      <p className="font-ui text-sm text-ink-muted">{book.edition}</p>
      <h1 className="font-text text-5xl mt-2">{profile.name}</h1>
      <p className="font-text text-2xl text-ink-muted mt-2">{book.subtitle}</p>

      <nav aria-label="Primary actions" className="mt-8 flex flex-wrap gap-4 font-ui text-sm">
        <Link
          href="/chapters/1"
          className="bg-ink text-paper px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
        >
          Begin reading
        </Link>
        <Link href="/contents" className="border border-rule px-4 py-2 rounded-sm hover:border-ink-muted">
          Contents
        </Link>
        <a
          href="/cv.pdf"
          download
          className="border border-rule px-4 py-2 rounded-sm hover:border-ink-muted"
        >
          Download CV
        </a>
      </nav>
      <ContinueReading />

      <div className="mt-10">
        <KeyFacts />
      </div>
    </div>
  );
}
