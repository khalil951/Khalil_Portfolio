# Claude Code prompt: one-shot build of "The Book" (Phases 1–5)

**Before you run it (Khalil):**
1. Put your CV at `docs/assets/cv.pdf`.
2. Make sure the repo-root `CLAUDE.md` says: concept = The Book, the source of truth is `docs/`, and the honesty rules.
3. Commit `docs/`.
4. Start Claude Code in `khalil-portfolio/` and paste everything below the line.

---

Build my portfolio website, **"The Book"**, end to end: Phases 1–5 of `docs/05-architecture.md`, in one run. Work like a senior engineer who treats `docs/` as the spec, verifies each phase before starting the next, and never invents anything.

## 0. Sources of truth
Read all of these before writing code. When two sources disagree, the higher one wins:
1. `CLAUDE.md`
2. `docs/05-architecture.md`: stack, content model, schemas, validation, phases, quality gates
3. `docs/04-design-direction.md`: tokens, typography, components, graph, motion, keyboard, UX rules, anti-patterns
4. `docs/07-book-structure.md`: **7 chapters**, sections, epigraph candidates, margin-note rules
5. `docs/02-profile.md`, `docs/03-projects.md`: the **only** source of facts
6. `docs/01-brief.md`: audiences, success criteria, what must NOT appear
7. `docs/06-open-questions.md`: known gaps, and where you log new ones

Ignore `docs/prompts/`. Record every conflict you resolve in `docs/BUILD-LOG.md`, stating which rule decided it.

## 1. Non-negotiable rules
- **No invented facts.** Names, dates, titles, numbers, metrics, links, awards, statuses and quotes come from docs 02/03/07 verbatim. The docs carry `*(source: …)*` / `*(confirmed …)*` notes; drop those on the site.
- **No visible TODOs, ever.** A fact marked `TODO` in the docs is **omitted** from `content/` and from the site: no placeholder, no "coming soon", no empty badge. For each omission, append one line to `docs/06-open-questions.md` under "Omitted from the site", in the form: `content/<file> → <field> → <question>`. The build fails if the string `TODO` appears anywhere in `content/` or in the exported HTML.
- **Status** comes from 03's exact enum. If a status is unknown, show no badge and log it.
- **Results** are always split into **Measured** / **Observed** / **Pending**:
  - Measured numbers only where 03 gives them (image captioning BLEU table, EstateMind R² table).
  - Xpress PPM: "Evaluation run — results pending publication".
  - AI Research Assistant and the EstateMind legal RAG: Pending.
  - EstateMind's overfitting flag is shown as a limitation, next to its R² values.
- **Epigraphs**: put all candidates in `epigraphs.yaml` with `verified: false`, and render only `verified: true` (none will be, yet). I verify sources myself.
- **Margin notes**: create none. They're mine to write. Leave the `<MarginNote>` component ready.
- **Generated copy is allowed only as summary**: chapter abstracts, the Preface, case-study prose, figure captions and UI microcopy may restate facts from the docs, but no sentence may add a claim. Tone: concise, specific, technical; no "passionate", no hype. List every generated passage (file + text) in `BUILD-LOG.md` → "Copy to review".
- **Diagrams**: you may draw architecture figures (Mermaid → SVG at build time) **only** from 03's architecture bullets, captioned "Figure n.m — reconstructed from project documentation". List them under "Copy to review". Xpress PPM uses synthetic-data-level detail only (RFC permission pending).
- **Must not appear**: see 01 (applications, colleague details, confidential client data).
- **Breast cancer project**: its safety disclaimer is a required, visible field.

## 2. How to run autonomously
- Don't stop to ask for approval. First write `docs/BUILD-LOG.md` containing:
  - the file tree
  - the full Velite/Zod schemas
  - dependencies with versions and a one-line reason each
  - the porting map (doc section → content file)
  - a phase checklist
  
  Keep it updated as you go. After each phase, tick its box and add a short summary there, so a restarted session can resume from the log.
- Stop and ask only if a step would delete or overwrite something outside this repo, or if the docs contradict each other in a way the priority order can't settle.
- **Phase gate** (after every phase): `npm run lint` · `npm run typecheck` · `npm run test` · `npm run build` must all pass. Then commit with the message `phase N: <summary>` (run `git init` first if needed). Never start the next phase on a red gate.
- Keep the dependency list minimal and justify each addition. Every script works on Windows (no bash-only syntax in `package.json`).

## 3. Phases

### Phase 1: Foundation
- Latest stable Next.js (App Router), TypeScript `strict`, Tailwind CSS, ESLint, Vitest. **Static export** (`output: 'export'`): no API routes, no middleware, no server actions, images `unoptimized`. `create-next-app` refuses this non-empty directory, so scaffold in a temp folder and move the files in. Don't touch `docs/`.
- Fonts via `next/font/google`, self-hosted, exposed as CSS variables:
  - Newsreader (variable, `opsz` axis, normal + italic): body text and headings
  - Inter: UI
  - JetBrains Mono: code, stack chips, trace lines
  - `adjustFontFallback` for zero CLS
  - Body 18–19px, line-height 1.6, measure 62–70ch, fluid `clamp()` scale; old-style figures in prose, tabular figures in tables
- Tokens from 04 as CSS variables, exact hex values. **Light "Paper" is the default**; dark "Night reading" goes under `[data-theme="dark"]`. Map the tokens into Tailwind; no raw hex outside the token file.
- Theme toggle: an inline `<head>` script sets `data-theme` before paint. The choice persists in `localStorage`, with every access in `try/catch`. The control is a `<button>` with `aria-pressed`.
- Vitest **contrast test**: every text token on `paper` and `paper-2`, in both themes, must be ≥ 4.5:1 (all pass today; the lowest is 4.74). `--rule` is decorative only.
- Focus ring: 2px `--rubric` outline with offset. Everything respects `prefers-reduced-motion`.
- Velite collections + Zod schemas per 05. Unknown ids referenced in `stack`, `concepts`, `related` or `epigraph` fail the build. Port 02, 03 and 07 per §1. Velite runs as a separate step (`velite build && next build`), not as a Next plugin.
- Copy `docs/assets/cv.pdf` → `public/cv.pdf`. If it's missing, fail the build with a clear message.
- Base layout:
  - skip link → `<main id="main">`, landmarks
  - running header: book title on the left, current chapter on the right, `--rule` hairline under it
  - nav: Contents · CV (PDF, `download`) · Correspondence · theme toggle; a disclosure menu below 768px; CV and Correspondence ≤ 1 click from every page
  - footer: "Edition 2026 · Tunis", name, GitHub / LinkedIn / email, Colophon link

### Phase 2: The readable book
- Routes from 05, apart from `/index` and `/map`, which arrive in Phases 3–4.
- **Cover**:
  - name, headline, subtitle, "Edition 2026 · Tunis"
  - three actions: Begin reading · Contents · Download CV
  - the key facts (role, location, availability, top 3 systems) visible without scrolling at 1280×720
- **Contents**: each chapter with its sections, reading time and a one-line abstract.
- **Preface**: built from the 02 bio, ending with "How to read this book".
- **Chapters I–VII** with the 07 anatomy. Build these components:
  - `ChapterOpener`
  - `Epigraph` (renders nothing while unverified)
  - `KeyFacts`
  - `StatusBadge` (icon + label + color)
  - `ResultsBlock` (Measured / Observed / Pending)
  - `Figure`
  - `Sidenote` / `Footnote`
  - `MarginNote`
  - `Timeline` (Chapter II)
  - `ChapterNav`
- **Project pages** `/chapters/[n]/[slug]` follow 03's case-study template.
- **Layout**:
  - three columns at ≥ 1200px (sticky running TOC, text, margin)
  - tablet: margin notes inline, TOC in a drawer
  - mobile (< 768px): one column, sidenotes as tap-to-expand ⊕, "Contents" in a bottom bar
  - works down to 360px
- Drop cap on each chapter's first paragraph, via `initial-letter` with a fallback.

### Phase 3: The scholarly apparatus
- Build-time numbering (§, figures, footnotes).
- `<Cite>` → `/bibliography`: only works named in the docs, e.g. Xu et al. 2015 and Liu & Brailsford 2023. Omit any citation the docs don't identify fully, and log it.
- Backlinks → `Connections` boxes.
- `/index`: an alphabetical term → § map built from `stack`, `concepts` and `<Term>`.
- **Pagefind** (postbuild on `out/`) powers the Index search and `/`.
- **Skim mode**: a switch on the Cover, persisted in the header. It shows abstracts + KeyFacts only.
- Keyboard shortcuts (`←` `→` `t` `/` `s` `m` `?`), with a help overlay.
- "Continue reading" (in `localStorage`, `try/catch`).

### Phase 4: The knowledge graph
- `graph.json` derived at build time from real links only. Node types: chapter, section/project, skill, concept, organization.
- `/map`:
  - d3-force positions computed at build time + SVG; interactive JS loads on `/map` only
  - shape encodes node type
  - filters by type; search focuses a node
  - hover/focus highlights the neighbourhood
  - an equivalent structured list for accessibility
- Mini-map of the 1-hop neighbourhood in each project page's margin.

### Phase 5: Polish
- View Transitions: fade + 8px slide, off under reduced motion.
- Per-chapter OG images styled like book pages, generated at build time.
- JSON-LD (`Person`, `Book` / `CreativeWork`).
- 404 page: "This page was left blank".
- `/colophon`: stack, typefaces, honesty rules.
- Sitemap + robots.
- **Audit**: Playwright + `@axe-core/playwright` on Cover, one chapter, one project page and `/map`, in both themes, at 360/768/1280/1920 → zero violations. Lighthouse ≥ 95 in all categories on Cover, a chapter and `/map`: fix what you can and report the rest.
- **Out of scope**: Phase 6 "Ask the book", analytics, deployment. The static `out/` must deploy to Vercel as-is.

## 4. Final report (in chat and in `docs/BUILD-LOG.md`)
1. Phase checklist with the gate results (paste the command summaries).
2. **Omitted from the site**: count, with a pointer to 06.
3. **Copy to review**: every generated passage and diagram.
4. Deviations from the docs, with reasons.
5. Lighthouse / axe results, and anything still failing.
6. The five highest-value next steps.
