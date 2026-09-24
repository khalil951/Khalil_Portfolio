# Khalil Portfolio — Project Context Pack

## Two ways to use this pack

### A. As a Claude Project (planning, copywriting, design decisions)
1. Create a new Project on claude.ai named **"Portfolio"**.
2. Upload every file in `docs/` to **Project knowledge**.
3. Paste the block below into **Project instructions**.

```
You are my senior AI engineer + product designer collaborator on my personal portfolio website.
Project knowledge holds the full context: brief (01), profile data (02), project case studies (03),
design direction (04), architecture & build phases (05), open questions (06), book structure (07). Read the relevant file before answering.

Rules:
- Never invent facts, metrics, dates, links or awards. Missing info → ask me or mark TODO and add it to 06-open-questions.
- Every project keeps an honest status (Shipped / MVP / In progress / Design phase / Concept). Separate measured results from observed behaviour; label pending work as pending.
- Recommend one option when several exist, with tradeoffs. Challenge weak ideas.
- Copy: concise, specific, technical, no clichés ("passionate", "guru"), no hype.
- Design: follow 04-design-direction and 07-book-structure ("The Book": modern academic book + knowledge graph). Never invent quotes or write margin notes in my voice. Accessibility (WCAG 2.2 AA) and performance are requirements.
- When I ask for code or prompts for Claude Code, target the stack in 05-architecture and the current build phase.
```

### B. As a Claude Code repo (building the site)
1. Create an empty folder/repo, copy `CLAUDE.md` and `docs/` into it.
2. Open Claude Code there and start with the Sprint 1 prompt below.

```
Read CLAUDE.md and every file in docs/. Then execute Phase 1 (Foundation) from docs/05-architecture.md only:
- Scaffold Next.js (App Router, TypeScript, Tailwind), add Newsreader, Inter, JetBrains Mono via next/font, plus Velite.
- Implement the color tokens from docs/04-design-direction.md as CSS variables: paper (light, default) and night-reading (dark) themes + toggle.
- Build the Velite content loader with the Zod schemas from docs/05-architecture.md.
- Port all data from docs/02, docs/03 and docs/07 into content/ (book.yaml, epigraphs.yaml, chapters/*.mdx). Keep TODOs visible.
- Base layout: skip link, running header (book title / chapter title), header links (Contents, CV, Correspondence), footer.
Do not build chapters, the Index, search, the Map or any API route yet. Before coding, show me the file tree and schema you plan; after coding, run lint, typecheck and build, and report what's done and what's left.
```

## Files
| File | Contents |
|---|---|
| `CLAUDE.md` | Rules for Claude Code in the repo |
| `docs/01-brief.md` | Goal, audiences, positioning, success criteria |
| `docs/02-profile.md` | Bio, experience, education, awards, skills → evidence |
| `docs/03-projects.md` | 8 projects with case-study data + template |
| `docs/04-design-direction.md` | "The Book" concept, visual system, book components, UX rules |
| `docs/05-architecture.md` | Stack, content schema, build-time derivations (Index, graph, backlinks), 
| `docs/06-open-questions.md` | Facts to supply before launch |
| `docs/07-book-structure.md` | Chapters I–VIII, front/back matter, epigraphs, margin-note prompts |
