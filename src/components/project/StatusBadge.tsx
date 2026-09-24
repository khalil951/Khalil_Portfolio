const STATUS_TOKENS = {
  Shipped: { color: "var(--grounded)", icon: "●" },
  MVP: { color: "var(--grounded)", icon: "●" },
  "In progress": { color: "var(--pending)", icon: "◐" },
  "Design phase": { color: "var(--concept)", icon: "○" },
  Concept: { color: "var(--concept)", icon: "○" },
} as const;

type Status = keyof typeof STATUS_TOKENS;

/**
 * Icon + label + color, never color alone (docs/04, CLAUDE.md rule 4).
 * The label text is what actually carries meaning for screen readers and
 * colorblind readers; icon and color reinforce it visually.
 */
export function StatusBadge({ status }: { status: Status }) {
  const { color, icon } = STATUS_TOKENS[status];

  return (
    <span className="font-ui text-sm inline-flex items-center gap-1.5" style={{ color }}>
      <span aria-hidden="true">{icon}</span>
      {status}
    </span>
  );
}
