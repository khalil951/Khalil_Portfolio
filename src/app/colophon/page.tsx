import type { Metadata } from "next";

export const metadata: Metadata = { title: "Colophon" };

export default function ColophonPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 measure">
      <h1 className="font-text text-4xl mb-6">Colophon</h1>
      <p className="text-ink-muted mb-10">How this book was made.</p>

      <h2 className="font-text text-2xl mt-10 mb-3">Stack</h2>
      <p>
        Next.js (App Router), fully static — no server, no database. Content is MDX and YAML,
        typed and validated at build time by Velite and Zod. Tailwind CSS renders the design
        tokens as CSS variables. Search is Pagefind, indexing the exported site after the build.
        The knowledge graph is laid out once, at build time, with d3-force — nothing animates
        indefinitely, and no graph library ships to any page except the Map.
      </p>

      <h2 className="font-text text-2xl mt-10 mb-3">Typefaces</h2>
      <p>Newsreader for text and headings, Inter for interface labels, JetBrains Mono for code, stack chips and trace lines.</p>

      <h2 className="font-text text-2xl mt-10 mb-3">Honesty rules</h2>
      <ul className="mt-4 ml-5 list-disc flex flex-col gap-2">
        <li>No invented facts — metrics, dates, employers, awards and links come from the source documents or they don&apos;t appear at all.</li>
        <li>Every project shows its real status. Measured results and observed behaviour are always kept visibly separate; nothing is implied as done that isn&apos;t.</li>
        <li>Epigraphs and margin notes are never invented or drafted by the author&apos;s tools — only verified, personally-written words are published.</li>
        <li>The knowledge graph is built only from real links in the content. No edge is hand-drawn to look impressive.</li>
      </ul>

      <h2 className="font-text text-2xl mt-10 mb-3">Keyboard shortcuts</h2>
      <dl className="mt-4 flex flex-col gap-2 font-ui text-sm">
        {[
          ["← / →", "Previous / next chapter"],
          ["t", "Open the table of contents"],
          ["/", "Search the Index"],
          ["s", "Toggle Skim mode"],
          ["m", "Open the Map of Knowledge"],
          ["?", "Help overlay"],
        ].map(([key, label]) => (
          <div key={key} className="flex items-center gap-3">
            <dt className="font-mono bg-paper-2 border border-rule rounded-sm px-2 py-0.5">
              {key}
            </dt>
            <dd className="text-ink-muted">{label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
