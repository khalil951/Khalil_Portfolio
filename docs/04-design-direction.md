# 04 — Design Direction: "The Book"

## Concept
The portfolio is a **modern academic book with a knowledge graph underneath**. It reads front to back like a book (chapters, epigraphs, margin notes, footnotes, figures), and every page is also a node in a graph (backlinks, an index, a map). This matches Khalil's profile: an AI engineer who works on retrieval and grounding, and who cares about knowledge and philosophy.

Chapter plan and content mapping: `07-book-structure.md`.

### Options considered
| Option | Verdict |
|---|---|
| Literal book with page-turn spreads | Rejected: poor on mobile, hurts accessibility, SEO and skimming |
| Editorial book with scrolling only | Good, but it loses the "knowledge" dimension |
| Wiki / digital garden | Good for exploring, but it has no reading path for recruiters |
| **Book + knowledge graph** ✅ | Linear path for readers, non-linear links for explorers, and it shows how he thinks |

### The recruiter problem, solved explicitly
Recruiters skim, so the book must never force linear reading:
- **Cover** has three exits: *Begin reading* · *Contents* · *Download CV*.
- **Contents** lists every chapter with a one-line abstract. It is the fastest overview of the whole site.
- **Skim mode** (a switch on the cover, persistent in the header): each chapter collapses to its abstract plus key-facts cards. Margin notes and long prose are hidden. You can read the whole book in about 2 minutes.
- The CV and Correspondence are always one click away in the header.

## Visual language: modern academic
References for the quality bar (study them, don't copy): distill.pub (figures, footnotes, citations), Edward Tufte's books and tufte-css (sidenotes, margins), Stripe Press books (modern book typography on the web), gwern.net (sidenotes, popover links, index-like density), and the Obsidian graph view (map).

### Page layout
- **Three-column reading layout on desktop (≥ 1200px):**
  - Left (sticky): **running TOC** for the current chapter plus a progress "ribbon" showing the current §
  - Centre: text column, 62–70ch
  - Right: **margin column** for margin notes, sidenotes and figure captions (Tufte style)
- **Tablet (768–1199):** the margin notes move inline as indented asides; the TOC becomes a drawer.
- **Mobile (< 768):** a single column. Sidenotes become tap-to-expand ⊕ markers, and the TOC sits behind a "Contents" button in the bottom bar.
- A **running header** as in printed books: book title on the left, chapter title on the right, a thin rule underneath.

### Color tokens
One accent, used sparingly, like red ink (rubrication) in manuscripts: chapter numerals, links, focus rings, the current TOC item.
| Token | Paper (light, default) | Night reading (dark) | Use |
|---|---|---|---|
| `--paper` | `#FBF8F1` | `#15130F` | page background |
| `--paper-2` | `#F3EEE3` | `#1D1A15` | cards, margin column tint, code |
| `--ink` | `#1C1B19` | `#E9E4D8` | body text |
| `--ink-muted` | `#5E5A52` | `#A39D90` | captions, metadata, margin notes |
| `--rule` | `#DDD5C5` | `#3A352C` | hairlines, running header rule |
| `--rubric` | `#9E2B25` | `#E0735F` | accent (single) |
| `--grounded` | `#2F6B4F` | `#6FC19A` | status: Shipped / MVP |
| `--pending` | `#8A6200` | `#E2B85A` | status: In progress / Pending |
| `--concept` | `#3E4C9B` | `#95A1F0` | status: Design phase / Concept |
Status is always **icon + label + color**. Validate every pair to WCAG AA (4.5:1 for text). Light is the default because books are read on paper; dark stays fully supported.

### Typography
| Role | Typeface | Notes |
|---|---|---|
| Text + headings | **Newsreader** (variable, optical sizes) | Designed for on-screen reading; its display optical size gives chapter titles an editorial feel |
| UI, labels, nav, tables | **Inter** | Clear at small sizes |
| Code, stack, metadata, trace lines | **JetBrains Mono** | e.g. `langgraph → 5 guardrails → pydantic → 102 tests` |
- Body 18–19px, line-height 1.6, measure 62–70ch; fluid scale with `clamp()`.
- Old-style figures in prose, tabular lining figures in tables and metrics.
- Chapter numerals in small-caps Roman (I, II, III…); sections as § 3.1.
- Drop cap on the first paragraph of each chapter (CSS `initial-letter`, with a fallback).
- Load fonts self-hosted through `next/font` with `size-adjust` to prevent layout shift.

### Book components (the design-system inventory)
| Component | Purpose |
|---|---|
| `ChapterOpener` | Numeral, title, subtitle, epigraph, reading time, abstract |
| `Epigraph` | Quote plus a cited attribution; the attribution links to the Bibliography |
| `MarginNote` | Khalil's reflection, set in italics in the margin column, and marked with a small ✎ |
| `Sidenote` / `Footnote` | Numbered references: repo links, reports, papers |
| `Figure` | Numbered "Figure 3.2", caption in the margin; SVG diagrams restyled to the tokens |
| `KeyFacts` | Compact card: role, period, stack, status. Visible in Skim mode |
| `ResultsBlock` | Three labelled parts: **Measured** · **Observed** · **Pending** |
| `StatusBadge` | Icon + label + color |
| `Connections` | Backlinks at the end of a chapter or section |
| `IndexEntry` | Term → § references |
| `ChapterNav` | Previous / next chapter, plus Contents |
| `Timeline` | Chapter II: dated entries on a vertical rule, like a chronology |

### Knowledge graph (the Map)
- Node types: **Chapter**, **Project**, **Skill/Tool**, **Concept** (e.g. grounding, guardrails, attention), **Organization**. Shape encodes the type, not just color.
- Edges come only from real links in the content (frontmatter relations plus internal links). Nothing is hand-drawn to look impressive.
- Interactions: hover or focus highlights the neighbourhood, clicking opens the section, and filters work by node type. A search box focuses a node.
- **Mini map** in the margin of each project section shows its 1-hop neighbourhood.
- Accessibility: every graph view has an equivalent structured list ("Connections"). The graph enhances the page; it never replaces content.
- Style: thin ink lines on paper, rubric-red for the active node, like a diagram in a scholarly book rather than a neon network.

### Motion
Quiet and bookish:
- Chapter change: a short fade and 8px slide via the View Transitions API. No page-curl effects.
- The TOC ribbon moves as you scroll through sections.
- Map: the layout settles once and stays; no permanent jiggling.
- All motion is off under `prefers-reduced-motion`.

### Keyboard (power-reader affordances)
`←` / `→` previous/next chapter · `t` table of contents · `/` search the Index · `s` toggle Skim mode · `m` open the Map. Listed in the Colophon and on a `?` help overlay.

## UX rules
- The CV and contact are ≤ 1 click from every page.
- Key facts (role, location, availability, top 3 systems) are visible on Cover + Contents without scrolling at 1280×720.
- Every chapter's URL is shareable and deep-linkable to a § (e.g. `/chapters/3#3.1`).
- "Continue reading" remembers the last chapter (localStorage, wrapped in try/catch). It is a convenience only.
- Skip link, landmarks, alt text and figure descriptions; AA contrast in both themes; visible focus.

## Anti-patterns (do not do)
- Page-flip / page-curl animations, fake leather or skeuomorphic book covers, heavy paper textures
- Faux-antique fonts (blackletter, script), which make the site look dated rather than academic
- Invented or unverified quotes; margin notes that Khalil didn't write or approve
- Skill bars, carousels, typewriter heroes, particle backgrounds
- A graph that isn't built from real links
- Metrics that weren't measured
