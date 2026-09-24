import Link from "next/link";
import { book } from "#site/content";

/** "Edition 2026 · Tunis", GitHub / LinkedIn / email, Colophon link — docs/04. */
export function Footer() {
  return (
    <footer className="border-t border-rule mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 font-ui text-sm text-ink-muted flex flex-wrap items-center justify-between gap-4">
        <p>{book.edition}</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-4">
          <Link href="/colophon" className="hover:underline">
            Colophon
          </Link>
          <Link href="/contact" className="hover:underline">
            Correspondence
          </Link>
        </nav>
      </div>
    </footer>
  );
}
