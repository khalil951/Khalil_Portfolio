# Khalil — Portfolio Project

You are helping Khalil (Data Science Engineering student at ESPRIT, Tunis; AI engineer focused on LLMs, agents and RAG) design and build his personal portfolio website.

The design concept is **"The Book"** — a modern academic book with a knowledge graph underneath (see `docs/04-design-direction.md`, `docs/07-book-structure.md`). `docs/` is the single source of truth for this project: goals, content, design, architecture and open questions all live there.

## Read first
All context lives in `docs/`. Read the relevant file before acting:

| File | Use it for |
|---|---|
| `docs/01-brief.md` | Goals, audience, positioning, success criteria |
| `docs/02-profile.md` | Bio, experience, education, teaching, leadership, awards, skills |
| `docs/03-projects.md` | Project case studies — the core content |
| `docs/04-design-direction.md` | "The Book" concept, visual system, components, UX rules, anti-patterns |
| `docs/05-architecture.md` | Stack, content model, build-time derivations, routes, build phases |
| `docs/06-open-questions.md` | Missing facts. Never invent answers to these |
| `docs/07-book-structure.md` | Chapters, sections, epigraphs, margin-note placements |


## Non-negotiable rules
1. **Never fabricate facts.** No invented metrics, dates, employers, users, awards or links. If a fact is missing, render a visible `TODO:` placeholder and list it in `docs/06-open-questions.md`.
2. **Honest status labels.** Every project shows its real status: `Shipped`, `MVP`, `In progress`, `Design phase`, `Concept`. Measured results and observed behaviour are kept separate. Pending work is labelled pending, never implied as done.
3. **Content lives in data, not components.** All copy comes from `content/` (MDX + typed frontmatter). Components never hardcode biography or project text.
4. **Accessibility is a requirement:** WCAG 2.2 AA, full keyboard navigation, visible focus states, `prefers-reduced-motion` respected, meaning never carried by color alone.
5. **Performance budget:** Lighthouse ≥ 95 on all four categories, LCP < 2.0s on 4G, no layout shift from fonts or images.
6. **Quotes and voice are sacred.** Only use epigraphs marked `verified: true`. Never write margin notes in Khalil's voice; drafts are marked `draft` and blocked from production.
7. **No overengineering.** Static-first. Add runtime features only when a phase in `docs/05-architecture.md` calls for them.

## Working style Khalil expects
- Concise, structured answers; explain reasoning and tradeoffs; separate facts from opinions.
- When there are several valid approaches: compare, recommend one, say why.
- Challenge weak design or content decisions instead of agreeing.
- Work in scoped sprints (see phases in `05-architecture.md`); finish and verify one before starting the next.
- Preferred stack: TypeScript, Next.js, Tailwind. Python/FastAPI only if a phase genuinely needs a separate backend.

## Definition of done for any page
- Content pulled from `content/`, typed and validated
- Responsive at 360px, 768px, 1280px, 1920px
- Light (paper) and dark (night reading) themes both checked
- Skim mode shows the abstract + key facts only
- Keyboard-only walkthrough passes
- No console errors; Lighthouse budget met
