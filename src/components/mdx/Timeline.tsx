import { Link } from "@/components/Link";
import { experience } from "#site/content";

/**
 * Chapter II: dated entries on a vertical rule, like a chronology (docs/04).
 * experience.yaml is already ordered newest-first (docs/07) — rendered as
 * authored, nothing re-sorted here.
 */
export function Timeline() {
  return (
    <ol className="not-prose relative border-l border-rule ml-2 flex flex-col gap-8">
      {experience.map((entry) => (
        <li key={`${entry.org}-${entry.period}`} className="pl-6 relative">
          <span
            aria-hidden="true"
            className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-rubric"
          />
          <p className="font-ui text-sm text-ink-muted">{entry.period}</p>
          <h3 className="font-text text-lg mt-0.5">
            {entry.role} — {entry.org}
            {entry.location ? <span className="text-ink-muted"> · {entry.location}</span> : null}
          </h3>
          <ul className="mt-2 flex flex-col gap-1">
            {entry.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {entry.relatedSection ? (
            <p className="mt-2 text-sm">
              <Link href={`/chapters/3/${entry.relatedSection}`} className="tap-target hover:underline">
                Related project →
              </Link>
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
