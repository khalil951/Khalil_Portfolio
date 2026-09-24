# 05 — Technical Architecture & Build Plan ("The Book")

## Stack (and why)
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript**, fully static (`output: 'export'` compatible) | Khalil's stack; a book is static content, so SSG gives the best performance |
| Styling | **Tailwind CSS** + CSS variables for tokens | Tokens map 1:1 to `04-design-direction.md` |
| Content | **MDX + Zod-validated frontmatter** via **Velite** | Typed content in git; custom MDX components for book elements |
| MDX plugins | remark-gfm, rehype-slug, rehype-autolink-headings, a custom remark plugin that collects internal links and `<Cite>` references | Numbered §, backlinks and footnotes come from the content |
| Search | **Pagefind** (static index generated after build) | Built for static sites, tiny, no backend; powers the Index search and `/` |
| Graph | Data built at compile time (`graph.json`); rendered with **d3-force** positions computed at build + SVG, or react-force-graph-2d on `/map` only | A static layout on most pages; interactivity is loaded only on the Map |
| Diagrams | Mermaid → SVG at build time (`@mermaid-js/mermaid-cli`), or hand-tuned SVG | No runtime cost; themeable |
| UI primitives | Radix via shadcn/ui (Dialog, Tooltip, Popover) only | Accessible sidenote popovers and drawers |
| Hosting / analytics | Vercel + Vercel Analytics (or Plausible) | Zero config |

Rejected: a page-turn library (turn.js / react-pageflip), because of accessibility and mobile; a CMS, since there is one author; a runtime database, since nothing is dynamic in v1.

## Content model
```
content/
  book.yaml             # title, subtitle, edition, chapter order, abstracts
  profile.yaml          # identity, links, availability, key facts
  epigraphs.yaml        # chapter -> {quote, author, source, verified: bool}
  bibliography.yaml     # works cited: id, authors, title, venue, year, url
  concepts.yaml         # concept nodes for the graph: id, label, short definition
  skills.yaml           # skill/tool nodes: id, label, group
  experience.yaml       # timeline entries
  chapters/
    01-companion.mdx
    02-path.mdx
    03-systems/index.mdx
    03-systems/xpress-ppm-agent.mdx
    03-systems/agrisense-ai.mdx
    ...
    07-open-questions.mdx
public/cv.pdf
public/figures/<slug>/*
```

### Schemas (Zod)
```ts
Chapter = {
  number: number; roman: string; slug: string;
  title: string; subtitle: string; abstract: string;   // abstract = Skim mode text
  epigraph: string;            // id in epigraphs.yaml
  readingTime?: number;        // computed
}

Section = {                    // project / timeline / study sections
  chapter: number; section: string;  // "3.1"
  slug: string; title: string; abstract: string;
  kind: "project" | "experience" | "study" | "note";
  status?: "Shipped" | "MVP" | "In progress" | "Design phase" | "Concept";
  role?: string; period?: string; context?: string;
  stack?: string[];            // ids in skills.yaml  -> graph edges + Index
  concepts?: string[];         // ids in concepts.yaml -> graph edges + Index
  related?: string[];          // other section slugs  -> graph edges
  trace?: string;
  links?: { repo?: string; demo?: string; report?: string; slides?: string };
  results?: { measured?: string[]; observed?: string[]; pending?: string[] };
}

Epigraph = { id: string; quote: string; author: string; source: string; verified: boolean }
```

### MDX components (authoring API)
`<MarginNote draft?>` · `<Sidenote>` · `<Cite id="xu2015" />` · `<Figure n src caption />` · `<KeyFacts />` · `<Results />` · `<Term id="rag">RAG</Term>` (adds an Index entry and a graph edge).

### Build-time derivations (single source of truth, nothing hand-maintained)
1. **Numbering**: § numbers, figure numbers and footnote numbers are assigned per chapter.
2. **Backlinks**: internal links plus `related` → `Connections` boxes.
3. **Index**: `stack`, `concepts` and `<Term>` → alphabetical term → [§] map.
4. **Graph**: nodes (chapters, sections, skills, concepts, orgs) and edges (from 2 and 3) → `graph.json`.
5. **Bibliography**: `<Cite>` usage → the list of works cited, in order.
6. **Search**: Pagefind indexes the built HTML.

### Validation (the build fails when…)
- a `stack` / `concepts` / `<Cite>` id doesn't exist
- (changed 2026-09-24) epigraphs with `verified: false` are never rendered, and the chapter shows no epigraph; not a build failure
- a `<MarginNote draft>` is present in production
- any `TODO` string appears anywhere in `content/` or the rendered site (in any environment). Unknown facts are **omitted** from the site and logged as questions in `docs/06-open-questions.md` → "Omitted from the site"
- a project section lacks `abstract` (`status` is optional; a missing status means no badge, and the gap is logged in 06)

## Routes
`/` Cover · `/contents` · `/preface` · `/chapters/[n]` · `/chapters/[n]/[slug]` (project sections get their own page, and also appear summarized in the chapter) · `/index` · `/map` · `/bibliography` · `/colophon` · `/contact` · `/cv.pdf`

## Build phases (one sprint each; verify before moving on)
1. **Foundation**: Next.js scaffold, tokens, fonts, light/dark themes, Velite + Zod schemas, port all data from `docs/02`, `03`, `07` into `content/` (unknowns omitted and logged in 06, never shown), base layout with running header.
2. **The readable book**: Cover, Contents, Preface, ChapterOpener, all 7 chapters with the three-column layout, MarginNote/Sidenote/Figure/Results, previous/next navigation, responsive behaviour down to 360px. Deploy.
3. **The scholarly apparatus**: numbering, footnotes, bibliography, backlinks, Index page, Pagefind search, Skim mode, keyboard shortcuts, "continue reading".
4. **The knowledge graph**: `graph.json` derivation, the `/map` page with filters and an accessible list, mini-maps in project margins.
5. **Polish**: view transitions, per-chapter OG images (styled like book pages), structured data (Person, Book / CreativeWork), 404 ("This page was left blank"), Colophon, full audit.
6. **Optional: "Ask the book"**: a RAG endpoint over the book's content that answers with § citations and returns "Not covered in this book" below a retrieval threshold. Build it only after 1–5 are polished; rate-limit it and cap costs.

## Quality gates
- Lighthouse ≥ 95 in all categories on Cover, a chapter and `/map`
- axe: zero violations; a keyboard walkthrough including sidenotes, the TOC drawer and the Map
- Visual check at 360 / 768 / 1280 / 1920 in both themes
- Skim mode: the whole book can be scanned in about 2 minutes (timed with someone who doesn't know the content)
- Zero CLS from fonts; JS on chapter pages stays small (the graph library loads only on `/map`)
