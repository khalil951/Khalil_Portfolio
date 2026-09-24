import { Link } from "@/components/Link";
import { chapters } from "#site/content";

/** Chapter footer: previous / next chapter, and "Return to Contents" (docs/07 anatomy, item 5). */
export function ChapterNav({ number }: { number: number }) {
  const sorted = [...chapters].sort((a, b) => a.number - b.number);
  const index = sorted.findIndex((c) => c.number === number);
  const prev = index > 0 ? sorted[index - 1] : undefined;
  const next = index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : undefined;

  return (
    <nav aria-label="Chapter navigation" className="not-prose mt-16 pt-6 border-t border-rule">
      <div className="flex items-center justify-between gap-4 font-ui text-sm">
        <div>
          {prev ? (
            <Link href={`/chapters/${prev.number}`} className="tap-target hover:underline">
              ← {prev.roman}. {prev.title}
            </Link>
          ) : null}
        </div>
        <Link href="/contents" className="tap-target text-ink-muted hover:underline">
          Return to Contents
        </Link>
        <div className="text-right">
          {next ? (
            <Link href={`/chapters/${next.number}`} className="tap-target hover:underline">
              {next.roman}. {next.title} →
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
