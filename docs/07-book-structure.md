# 07 — Book Structure (chapters, sections, epigraphs, margin notes)

The portfolio is a book: **"Khalil — Notes on Building Machines That Know What They Know"** (working title, `TODO: approve`).
Every chapter is one portfolio section. Chapters can be read in order *or* entered directly from the Contents, the Index, or the Map.

## Front matter
| Page | Route | Content | Source |
|---|---|---|---|
| **Cover** | `/` | Name, title (AI Engineer — LLMs, Agents & RAG), one-line subtitle, "Edition 2026 · Tunis". Three actions: **Begin reading** · **Contents** · **Download CV**. Also a small "Skim mode" switch | `profile.yaml` |
| **Contents** | `/contents` | Numbered chapters with section list, reading time, and a one-line abstract each. Doubles as the recruiter's fast path | `book.yaml` |
| **Preface** | `/preface` | ~120-word abstract: who I am, what I build, what I care about (honest AI). Ends with "How to read this book" (linear / skim / explore the map) | `profile.yaml` |

## Chapters
| # | Title (draft) | Portfolio section | Sections | Data |
|---|---|---|---|---|
| I | **The Reader's Companion** — *Who I am* | General profile | 1.1 In brief (key facts card: role, location, availability, links) · 1.2 What I work on · 1.3 How I think (principles, e.g. fail closed toward honesty; separate measured from observed) | `02-profile.md` |
| II | **The Path** — *Experience & career timeline* | Experience | Vertical timeline read like a chronology (newest first): 2.1 RFC — AI Engineer Intern · 2.2 Happy City Hub — Researcher · 2.3 SMU — Youth Trainer · 2.4 Talan Tunisie — Research Software Engineer Intern · 2.5 FelCloud — Data Analyst Intern · 2.6 Attijari Bank — Data Entry Intern *(SMU entry added 2026-09-25; UGRAD lives in Ch. V, EstateMind in Ch. III)* | `02-profile.md` |
| III | **Systems I Have Built** — *Featured work* | Featured projects | One section per case study: 3.1 Xpress PPM Agent · 3.2 AgriSense AI · 3.3 AI Research Assistant · 3.4 EstateMind *(as of 2026-09-25 these pages no longer carry a Measured/Observed/Pending results block — see `06-open-questions.md`)* | `03-projects.md` (tier: featured) |
| IV | **Experiments & Studies** | Selected / research projects | 4.1 Image Captioning Benchmark · 4.2 Breast Cancer Diagnostic Platform · 4.3 Mars Surface Image Classifier · 4.4 Productivity Predictor Pipeline *(Wifaq dropped, 2026-09-24)* | `03-projects.md` (tier: selected) |
| V | **Foundations** | Education & skills | 5.1 ESPRIT (Data Science engineering) · 5.2 International Exchange Program, UNC Greensboro · 5.3 Certifications · 5.4 Toolkit (skills grouped; each links to the Index) *(5.2 reframed and 5.3 Certifications added 2026-09-25 — the "Global UGRAD" scholarship framing moved to Ch. VI)* | `02-profile.md` |
| VI | **Recognition & Community** | Awards & leadership | 6.1 Talan Innovation Summer Camp — 1st place · 6.2 Intelligent Planet Hackathon · 6.3 AIESEC oGT Team Leader · 6.4 Global UGRAD Scholarship · 6.5 Volunteering (Enactus, Tunisian Red Crescent, ISWIT) *(6.4/6.5 added 2026-09-25, each section illustrated with a real photo)* | `02-profile.md` |
| VII | **Open Questions** — *What I'm studying now* | "Now" / curiosity | Short entries, each framed as a question: How does PagedAttention change serving economics? Why does GRPO favour long answers? What is autograd actually computing (VJPs)? Closes with a short personal section on why this book is a book, and outside interests *(added 2026-09-25)* | `02-profile.md` → Currently exploring / Interests |

> **v1 has 7 chapters.** "On Teaching" (GOMYCODE curricula) was dropped for now on 2026-09-24; teaching stays in the bio. Re-add it as a chapter once its facts are in `02`/`03`.

Chapter VII ends the book on curiosity rather than achievement, and replaces a generic "Now" page.

## Back matter
| Page | Route | Content |
|---|---|---|
| **Index** | `/index` | A real book index: alphabetical skills, tools and concepts → the sections that give evidence (e.g. *LangGraph — 3.1, 3.2, 3.3*; *Guardrails — 1.3, 3.1*). This implements the "every skill links to evidence" rule. Searchable |
| **Map of Knowledge** | `/map` | Interactive knowledge graph: chapters, projects, skills and concepts as nodes, with edges built from real cross-references. Includes a text list for accessibility |
| **Bibliography** | `/bibliography` | Papers and works cited in the book (Xu et al. 2015, FAO-56, Agentic RAG survey, …) plus epigraph sources |
| **Colophon** | `/colophon` | How the book was made: stack, typefaces, the honesty rules. Quietly impressive to engineers |
| **Correspondence** | `/contact` | Contact, links, CV |

## Chapter anatomy (every chapter)
1. Chapter opener: large numeral, title, subtitle, **epigraph** with attribution, reading time
2. **Abstract** (2–3 sentences): the only thing shown in Skim mode, together with the key-facts cards
3. Body sections (numbered §) with **margin notes**, footnotes and captioned figures
4. **"Connections"** box: backlinks (e.g. "Referenced in 6.3 Toolkit, Index: RAG")
5. Chapter footer: ← previous chapter · next chapter →, and "Return to Contents"

## Project section anatomy (Ch. III–IV)
Abstract (TL;DR) → Problem & constraints → Architecture (Figure n) → Decisions & tradeoffs → Results (**Measured / Observed / Pending**) → Limitations & next steps → References (repo, report, slides) as footnotes.

## Epigraphs (candidates, **verify every source before publishing**)
Only well-attested quotes. Confirm the wording and source, or replace them. Never invent a quote.
| Chapter | Quote | Attribution | Confidence |
|---|---|---|---|
| Preface | "The unexamined life is not worth living." | Socrates, in Plato's *Apology* 38a | High |
| I | "The limits of my language mean the limits of my world." | Wittgenstein, *Tractatus* 5.6 | High |
| II | `TODO`: something about journeys or learning; Ibn Khaldun (Tunis-born) would be a meaningful choice, but find a verified passage from the *Muqaddimah* | Ibn Khaldun | Needs sourcing |
| III | "What I cannot create, I do not understand." | Richard Feynman (on his blackboard at his death, 1988) | High |
| IV | "All models are wrong, but some are useful." | George E. P. Box | High |
| V | `TODO`: a line attributed to Ibn al-Haytham on critically examining what one reads (widely quoted, so verify the translation and source) | Ibn al-Haytham | Needs verification |
| VI | `TODO` | — | — |
| VII | "Our knowledge can only be finite, while our ignorance must necessarily be infinite." | Karl Popper, *Conjectures and Refutations* | High (verify wording) |

## Margin notes (written by Khalil, not by Claude)
Margin notes are Khalil's own reflections: 1–3 sentences, first person. Claude may suggest *where* a note fits and *what question* it answers, but must not invent opinions. Every drafted note stays marked `DRAFT` until Khalil approves it.

Suggested placements and prompts:
- 1.3: *Why does "I don't know" matter more to you than a fluent answer?*
- 3.1: *Why let deterministic rules overrule the LLM?*
- 3.2: *What did learning agronomy teach you about building for a domain you don't know?*
- 3.3: *What's the difference between an answer and a grounded answer?*
- 4.1: *What did hard attention and REINFORCE teach you about gradients you can't compute?*
- VII: one per open question: *why this question, and why now?*
