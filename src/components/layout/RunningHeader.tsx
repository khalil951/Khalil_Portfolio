import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * "Running header as in printed books: book title on the left, chapter title
 * on the right, a thin rule underneath." — docs/04. The book's working title
 * (docs/07) is unapproved (TODO) and omitted; "Khalil" (the confirmed short
 * name, docs/02) stands in for it until Khalil approves a title.
 */
export function RunningHeader({ chapterTitle }: { chapterTitle?: string }) {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 font-ui text-sm">
        <Link href="/" className="font-semibold tracking-wide">
          Khalil
        </Link>
        {chapterTitle ? (
          <span className="text-ink-muted hidden sm:inline">{chapterTitle}</span>
        ) : null}
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/contents" className="hover:underline">
            Contents
          </Link>
          <a href="/cv.pdf" download className="hover:underline">
            CV
          </a>
          <Link href="/contact" className="hover:underline">
            Correspondence
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
