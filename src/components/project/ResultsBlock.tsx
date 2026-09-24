/**
 * Three labelled parts, kept visibly separate (CLAUDE.md rule 2 / docs/04):
 * Measured (actually benchmarked), Observed (described behaviour, no
 * number), Pending (evaluation exists but isn't published). A section with
 * none of the three simply renders nothing.
 */
export function ResultsBlock({
  measured,
  observed,
  pending,
}: {
  measured?: string[];
  observed?: string[];
  pending?: string[];
}) {
  if (!measured?.length && !observed?.length && !pending?.length) return null;

  return (
    <div className="not-prose mt-10 grid gap-6 sm:grid-cols-3">
      <ResultsColumn label="Measured" color="var(--grounded)" items={measured} />
      <ResultsColumn label="Observed" color="var(--ink-muted)" items={observed} />
      <ResultsColumn label="Pending" color="var(--pending)" items={pending} />
    </div>
  );
}

function ResultsColumn({ label, color, items }: { label: string; color: string; items?: string[] }) {
  if (!items?.length) return null;

  return (
    <div>
      <h4 className="font-ui text-sm font-medium mb-2" style={{ color }}>
        {label}
      </h4>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <li key={item} className="border-l-2 pl-3" style={{ borderColor: color }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
