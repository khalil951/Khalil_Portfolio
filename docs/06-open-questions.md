# 06 — Open Questions

Answer inline; Claude then ports the answers into `content/`.
Last pass: 2026-09-24, checked against `Khalil.CV 3.pdf` and github.com/khalil951. The source of each fill is noted in 02/03.

## Decided (2026-09-24)
- ✅ Concept: **The Book**. "The Trace" is retired.
- ✅ Display name: **Mohamed Khalil Oueslati**
- ✅ RFC: July 1 – August 31, 2026, on-site in Tunis. Xpress PPM evaluation was run, but results aren't exported yet → site shows "results pending publication".
- ✅ Talan title: **Research Software Engineer Intern**, Jul–Sep 2024. FelCloud: Jun–Jul 2023.
- ✅ Omit the non-measured CV claims (Talan 95% energy target, FelCloud +20% projected sales).
- ✅ Toolkit adds PostgreSQL/pgvector, ChromaDB and SQLite, each linked to project evidence.
- ✅ Chapter II timeline: RFC · Happy City Hub · Talan · FelCloud · Attijari
- ✅ Chapter IV: Image Captioning · Breast Cancer · Mars · Productivity. Wifaq dropped.
- ✅ "On Teaching" chapter dropped for v1, so the book is now **7 chapters** (07 and 05 renumbered).
- ✅ Chapter VII questions kept (PagedAttention, GRPO, VJPs) → `02 → Currently exploring`
- ✅ EstateMind: the `EstateMind` repo is the only source (README + `CLAUDE.md` + results CSV); no demo link. Measured test R² 0.37–0.53, shown with the overfitting flag.
- ✅ Teaching pillar removed from the positioning (01). GOMYCODE stays as one line in the bio.
- ✅ **No visible TODOs on the site.** Unknown facts are omitted and listed below under "Omitted from the site".
- ✅ Image captioning dataset: Flickr8k
- ✅ Statuses: AI Research Assistant → MVP; AgriSense In progress (README progress)
- ✅ Email, LinkedIn, Talan 2024 award, hackathon 2026, AIESEC 2023–24, ESPRIT 2021, UGRAD Spring 2025 (GPA 3.92), repo URLs

## Update outside the docs
- [ ] **CV**:
  - RFC → "Jul–Aug 2026, Tunis"
  - Databases → add PostgreSQL/pgvector, ChromaDB, SQLite
  - EstateMind bullets still mention a RAG legal assistant, a web-scraping agent and geospatial/climate risk; those are not on the site now, so align the two
- [ ] **claude.ai Project instructions**: replace "The Trace" with "The Book"
- [ ] **GitHub**:
  - The AgriSense repo homepage points to the AI Research Assistant deployment
  - The AI Research Assistant repo still lists "Claude API" in the portfolio docs, but its stack is now Ollama + OpenRouter
- [ ] **CLAUDE.md** (outside `docs/`, unread): make sure it names The Book, the current phase and the honesty rules

## Still open (can stay as visible TODOs in Phase 1)
- [ ] Photo, or no photo
- [ ] Availability detail: remote, relocation, target countries
- [ ] Domain name
- [ ] ESPRIT expected graduation date
- [ ] Issuer of the "Neural Networks and Deep Learning" certification
- [ ] Headline role: "AI Engineer" (current draft), "ML Engineer" or "LLM Engineer"
- [ ] Approve the positioning statement in 01 (now two pillars)
- [ ] Approve the book title
- [ ] Show the German exchange semester?
- [ ] Hackathon: any placement, or "participant"?

## Projects
- [ ] EstateMind:
  - Your personal role vs the team's
  - Team size
  - Status
  - Approve the new one-liner
  - RMSE/MAE units: TND? MAE 239k vs median error 251 suggests heavy outliers or mixed units; until confirmed, only R² is shown
- [ ] AgriSense: current sprint number for the roadmap graphic
- [ ] AI Research Assistant:
  - Is the live deployment public-ready?
  - Is the "16 Figma findings" note still current?
  - Is shadcn/ui still used?
  - Any exported eval numbers?
- [ ] Image captioning: status. Also, METEOR/CIDEr: add numbers or drop them from the copy (only BLEU is published)
- [ ] Breast cancer, Mars, Productivity: statuses, and any metrics exported from the notebooks
- [ ] Xpress PPM: RFC's permission for diagrams and screenshots (synthetic data); export of eval results
- [ ] Other GitHub candidates (`ANN_From_Scratch` with a live demo; FelCloud repos): archive tier, or leave them out?

## Design resources needed
- [ ] Architecture diagrams for the 4 featured projects (Mermaid source is enough)
- [ ] Screenshots / GIFs: AI Research Assistant, AgriSense dashboard, Xpress Streamlit demo (synthetic data)
- [ ] Monogram / favicon (suggestion: rubric-red "MKO" in Newsreader small caps)
- [ ] Epigraphs for V (Ibn al-Haytham, needs verification), II (Ibn Khaldun, needs sourcing) and VI (open)
- [ ] Margin notes in your own words (prompts in 07)

## Omitted from the site (Claude Code fills this during the build)
<!-- One line per omitted fact: `content/<file>` → field → question. Answer here, then ask Claude to port it. -->
- `content/profile.yaml` → photo → Provide a photo, or confirm no photo?
- `content/profile.yaml` → availability (detail) → Remote / relocation / target countries?
- `content/profile.yaml` → education[ESPRIT] → expected graduation date → What is it?
- `content/profile.yaml` → certifications[Neural Networks and Deep Learning] → issuer → Who issued it?
- `content/book.yaml` → title → docs/07's working title is marked `TODO: approve`; the running header uses "Khalil" instead until a title is approved.
- `content/epigraphs.yaml` → chapter II epigraph → No quote text exists yet (only a research prompt: something on journeys/learning, Ibn Khaldun candidate) — needs sourcing from the *Muqaddimah* before it can even go in as an unverified candidate.
- `content/epigraphs.yaml` → chapter V epigraph → No quote text exists yet (only a research prompt: a line attributed to Ibn al-Haytham on critically examining what one reads) — needs sourcing.
- `content/epigraphs.yaml` → chapter VI epigraph → No candidate at all yet.
- `content/bibliography.yaml` → Liu & Brailsford (ICCEE 2023) → docs/03 names this reference but gives no paper title — omitted from the bibliography and from the Image Captioning chapter's citations until a title is available.
- `content/chapters/03-systems/estatemind.mdx` → status → No status badge shown (docs/03 marks it `TODO`) — Shipped / MVP / In progress / Design phase / Concept?
- `content/chapters/03-systems/estatemind.mdx` → context (team size) → "team DataNova" is shown; the team's size is not.
- `content/chapters/03-systems/estatemind.mdx` → role (module breakdown) → "Team lead" is shown (confirmed); which specific modules you personally built is not.
- `content/chapters/03-systems/agrisense-ai.mdx` → roadmap current sprint → the page shows the Sprints 1–5 progress text as given in docs/03, but no graphic highlighting a "current" sprint, since which sprint is current is unconfirmed.
- `content/chapters/03-systems/ai-research-assistant.mdx` → stack (shadcn/ui) → omitted as a stack chip; docs/03 flags this as unconfirmed.
- `content/chapters/04-experiments/image-captioning-benchmark.mdx` → status → no status badge shown (docs/03: "Completed?").
- `content/chapters/04-experiments/image-captioning-benchmark.mdx` → METEOR / CIDEr numbers → dropped from the copy entirely (docs/03's own instruction); only the published BLEU table is shown.
- `content/chapters/04-experiments/breast-cancer-diagnostic-platform.mdx` → status → no status badge shown.
- `content/chapters/04-experiments/breast-cancer-diagnostic-platform.mdx` → results/metrics → none published in the source repo; omitted, not estimated.
- `content/chapters/04-experiments/mars-surface-image-classifier.mdx` → status → no status badge shown.
- `content/chapters/04-experiments/mars-surface-image-classifier.mdx` → results/metrics → none published; omitted.
- `content/chapters/04-experiments/productivity-predictor-pipeline.mdx` → status → no status badge shown.
- `content/chapters/04-experiments/productivity-predictor-pipeline.mdx` → results/metrics → none published; omitted.
- `content/chapters/03-systems/xpress-ppm-agent.mdx` → architecture diagram / demo assets → none shown; RFC's permission to publish (even with synthetic data) is still pending.
