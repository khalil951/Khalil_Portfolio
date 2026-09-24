"use client";

const SHORTCUT_ROWS: Array<[string, string]> = [
  ["← / →", "Previous / next chapter"],
  ["t", "Open the table of contents"],
  ["/", "Search the Index"],
  ["s", "Toggle Skim mode"],
  ["m", "Open the Map of Knowledge"],
  ["?", "This help overlay"],
  ["Esc", "Close"],
];

export function HelpOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-paper border border-rule rounded-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-text text-xl mb-4">Keyboard shortcuts</h2>
        <dl className="flex flex-col gap-2 font-ui text-sm">
          {SHORTCUT_ROWS.map(([key, label]) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <dt className="font-mono bg-paper-2 border border-rule rounded-sm px-2 py-0.5">
                {key}
              </dt>
              <dd className="text-ink-muted text-right">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
