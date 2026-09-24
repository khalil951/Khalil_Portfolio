# 03 — Projects (case-study data)

Each project becomes `content/projects/<slug>.mdx`. Frontmatter schema is in `05-architecture.md`.
**Tier** controls placement: `featured` (home, full case study) · `selected` (grid card + short page) · `archive` (list only).
**Status** vocabulary: `Shipped` · `MVP` · `In progress` · `Design phase` · `Concept`.

Recommended home order: Xpress PPM Agent → AgriSense AI → AI Research Assistant → EstateMind.
Reason: lead with the most *built and tested* work; design-phase work comes after shipped work.

---

## 1. Xpress PPM Agent — guardrailed intake-triage agent
- **slug:** `xpress-ppm-agent` · **tier:** featured · **status:** MVP · **context:** Internship, RFC, Summer 2026
- **Repo:** https://github.com/khalil951/Xpress_PPM_Agent
- **One-liner:** An AI gate-approval agent for an enterprise project-portfolio tool, where deterministic rules — not the LLM — have the final say.
- **Problem:** RFC's Xpress PPM (Dynamics 365 / Power Platform) needed AI-assisted project-request intake and triage, made urgent by Microsoft Project Online's retirement on Sept 30, 2026.
- **Approach / architecture:**
  - Hybrid two-tier design: **Tier 1** Microsoft Copilot Studio (conversational) · **Tier 2** custom LangGraph + FastAPI orchestration (autonomous, deterministic).
  - Flagship: **Gate Approval Agent (C1)** — 5-node LangGraph pipeline.
  - **5 deterministic guardrail rules** whose blocking violations override the LLM verdict.
  - **4-model OpenRouter fallback chain**; Pydantic-validated output schema.
  - PostgreSQL synthetic dataset (50 records) modelled on the real `msdyn_project` / `msdyn_projectrequest` schema.
  - Streamlit demo with three interfaces.
- **Quality:** 102-test offline suite.
- **Key decisions (great case-study material):**
  - Replaced an all-Copilot-Studio design with the hybrid tier split → determinism and testability where it matters.
  - Swapped two fallback models after discovering they had no live endpoints → lesson: verify endpoints before finalizing a chain.
  - Designed a 17-agent tiered portfolio with gap analysis vs Planner Premium; only C1 is built.
- **Results:** Observed behaviour only. Evaluation (LLM-as-judge, semantic similarity, weight sweep, BLEU/ROUGE, cross-model agreement, latency) **has been run but results are not exported** — show as "Evaluation run — results pending publication", never as numbers *(confirmed 2026-09-24)*.
- **Stack:** Python, LangGraph, FastAPI, OpenRouter, Pydantic, PostgreSQL, Streamlit, pytest, Copilot Studio, Dataverse
- **Assets:** `TODO` architecture diagram, demo GIF/video (synthetic data only), confirm RFC permission to publish

## 2. AgriSense AI — multi-agent irrigation management for desert agriculture
- **slug:** `agrisense-ai` · **tier:** featured · **status:** In progress · **context:** Hackathon origin → portfolio build
- **Progress (from repo README, Sept 2026):** Sprints 1–5 built — Postgres + pgvector schema, FastMCP weather/soil/ET₀ tools on live Open-Meteo & SoilGrids, LangGraph weather/soil → scheduling nodes (FAO-56 ET₀ × Kc water balance), `decision_agent` with RAG, farm/crop CRUD, `/recommend`, `/runs`, `/schedules`, `POST /chat`, dashboard/chat/history UI. Runs locally via Docker Compose; no public deployment; Langfuse still commented out. `TODO: confirm the current sprint name/number for the roadmap graphic`
- **Demo farm correction (README):** 26.40°N, 44.10°E in Qassim, ~14 km from Buraydah centre (SoilGrids has no data for the city-centre point).
- **Recognition:** Presented at the Intelligent Planet Hackathon, Saudi Arabia
- **One-liner:** A LangGraph supervisor of specialist agents that decides when and how much to irrigate date palms, grounded in real weather and soil data plus FAO-56 agronomy.
- **Problem:** Water scarcity in desert agriculture; irrigation decisions need ET₀, crop coefficients (Kc) and soil water balance — domain knowledge farmers' tools rarely encode.
- **Approach / architecture:**
  - LangGraph **supervisor pattern** over specialist agents.
  - Real public data: **Open-Meteo** (weather, soil moisture), **SoilGrids** (static soil properties).
  - RAG over agronomy knowledge with **pgvector** in PostgreSQL; embeddings via **nomic-embed-text on Ollama** (local).
  - Custom **MCP servers** with FastMCP v2; **Langfuse** self-hosted for observability.
  - Docker Compose; FastAPI backend; Next.js frontend.
  - Demo farm: Buraydah, Qassim (Saudi Arabia's top date-producing region), validated against a published Penman-Monteith date-palm Kc field study.
- **Key decisions:** date palm first (near-constant Kc, Vision 2030 framing) → alfalfa in phase 2 (multi-cut dynamic Kc); pgvector over a dedicated vector DB at demo scale; real APIs over synthetic data for credibility.
- **Artifacts produced:** Brain.md, architecture.md, design.md (schema, API contracts, LangGraph state), implementation-plan.md (staged roadmap with benchmark gates), agriculture-primer.md.
- **Results:** `TODO` — none yet; show roadmap with current stage highlighted.
- **Stack:** Python, LangGraph, FastAPI, FastMCP, PostgreSQL + pgvector, Ollama, Langfuse, Next.js, TypeScript, Docker
- **Repo:** https://github.com/khalil951/Agrisense

## 3. AI Research Assistant — agentic RAG that fails closed toward honesty
- **slug:** `ai-research-assistant` · **tier:** featured · **status:** MVP *(updated 2026-09-24 from repo README "Current status": MVP complete plus graded relevance, failure-path tests, eval harness, dual-provider LLM, web-search fallback, chat history)*
- **One-liner:** An agentic RAG app that answers AI-engineering questions with citations — and says "not covered" instead of guessing.
- **Problem:** Learners get confident, uncited, sometimes wrong answers from general chatbots.
- **Approach / architecture:**
  - Core constraint **"fail closed toward honesty"**: structural three-way split between *grounded answer*, *not covered*, and *technical error*.
  - FastAPI + LangGraph agentic routing, ChromaDB, Claude API; Next.js + TypeScript + Tailwind + shadcn/ui.
  - Curated knowledge base: 16 files across RAG fundamentals, agentic systems, vector DBs, evaluation, etc., each on a 7-section template; 13-item research backlog.
  - Product work: PRD, 3 personas, user stories, MVP scope, 5-screen spec, ADR log.
  - Design system borrows from academic publishing; answer states encoded by icon + border + label + color (never color alone).
- **Honest note to display:** Figma review surfaced 16 findings (e.g. icon collision between Uncertain/Error states, missing focus states, no responsive variants) — being fixed before the frontend build. Showing this is a strength.
- **Stack (as built, repo README):** FastAPI, LangGraph, ChromaDB, Ollama (`llama3.2:3b`, primary), OpenRouter (backup, ADR-007 — replaced the Claude API), `all-MiniLM-L6-v2` embeddings, Next.js, TypeScript, Tailwind, Figma. `TODO: confirm shadcn/ui is still used`
- **Known limitations to show (README):** local model sometimes under-judges relevance (fails closed); "Key Concepts ranking gap" affects ~half of grounded eval questions; web-search path has no relevance gate.
- **Eval:** harness exists (precision@k/recall@k, BLEU/ROUGE, LLM-judge) but no numbers are published in the README → `Pending` callout until a report is exported.
- **Repo:** https://github.com/khalil951/AI_Research_Assistant
- **Live deployment (from GitHub repo homepage):** https://ai-research-assistant-nu-opal.vercel.app — `TODO: confirm it's public-ready`
- **Screens:** `TODO` (capture from the live deployment)

## 4. EstateMind — AI real-estate intelligence for Tunisia
> **Source of truth (decided 2026-09-24): the `khalil951/EstateMind` repo only** (README, `CLAUDE.md`, `backend/requirements.txt`, `backend/valuation/artifacts/models/training_estateprocessor_results.csv`). No demo link.
- **slug:** `estatemind` · **tier:** featured · **status:** `TODO` · **context:** ESPRIT capstone, team lead (team DataNova, team size `TODO`)
- **One-liner (draft from repo — approve):** A Tunisian real-estate intelligence platform: explainable ML valuation, a legal RAG assistant over Tunisian law, scraped market data from five listing sites, and price forecasting, behind a Django REST API and React app.
- **Modules (as built, per repo `CLAUDE.md`):**
  - **Valuation pipeline:** CLIP (`openai/clip-vit-base-patch32`) zero-shot image verification → TF-IDF description sentiment → per-property-type CatBoost / ExtraTrees models with a global fallback → market comparables → confidence scoring → SHAP price drivers → what-if scenarios. Training is leakage-free: no price-derived input features; neighbourhood price priors fit on the training fold only, with leave-one-out self-exclusion.
  - **Legal RAG assistant** over Tunisian corporate/securities/tax law (23 articles): `paraphrase-multilingual-mpnet-base-v2` embeddings (French/Arabic corpus) → ChromaDB with a cosine relevance threshold → generation fallback chain (hosted OpenAI-compatible provider → OpenRouter cross-provider → **extractive fallback** built from the retrieved passages when every LLM is unreachable). Evaluation command: retrieval recall@k / precision@k + LLM-as-judge groundedness.
  - **Data acquisition:** scrapers for Mubawab, Tayara, Tecnocasa, Tunisie Annonce and Bigdatis on a shared retry/backoff client → dedup → wrangle → load pipeline.
  - **Market analytics:** interactive map (price/demand heatmaps, delegation analytics), delegation/governorate price forecasting, a local rule-based chatbot, and a Mesa multi-agent market simulation.
  - **Platform:** JWT auth with OTP email verification, free/pro/investor plan gating, Stripe PaymentIntent billing with server-side metadata (fixed an earlier plan-upgrade bypass).
- **Results — Measured** (repo `training_estateprocessor_results.csv`; test R² of the model the registry serves per type):

  | Scope | Served model | Train rows | Test rows | Test R² | Train R² |
  |---|---|---:|---:|---:|---:|
  | Appartement | CatBoost | 5,312 | 1,353 | 0.53 | 0.99 |
  | Maison | ExtraTrees | 1,915 | 496 | 0.49 | 1.00 |
  | Terrain | ExtraTrees | 817 | 162 | 0.37 | 1.00 |
  | Global fallback | CatBoost | 8,044 | 2,011 | 0.47 | 1.00 |

  The training script itself flags every model `fit_status: overfitting` (train R² ≈ 0.99 vs test 0.37–0.53). Ridge baselines were negative R². **Show this honestly as a limitation**, and put error metrics (RMSE/MAE) aside until their units are confirmed.
- **Results — Pending:** legal RAG eval numbers (the command exists; no published output).
- **Limitations (repo):** overfitting above; sentiment is still TF-IDF (the planned BERT upgrade isn't built); legal corpus is 23 articles and not real-estate law; the public legal endpoint has no rate limiting.
- **Process:** technical architecture audit; 18-task implementation checklist; pitch deck; 101-page capstone report.
- **Stack (repo):** Python, Django 4.2 + DRF, SimpleJWT, PostgreSQL / SQLite, CatBoost, scikit-learn (ExtraTrees), XGBoost, SHAP, PyTorch + torchvision, CLIP, sentence-transformers, ChromaDB, OpenRouter, Mesa, Stripe, React 18 (Create React App), Tailwind CSS, Recharts
- **Your role:** `TODO: which modules you personally built`
- **Repo:** https://github.com/khalil951/EstateMind

## 5. Image Captioning Benchmark — Show, Attend and Tell revisited
- **slug:** `image-captioning-benchmark` · **tier:** selected · **status:** `TODO: Completed?` · **context:** Academic deep-learning project
- **One-liner:** Comparing Baseline, soft-attention, hard-attention (REINFORCE) and Transformer encoder-decoders on Flickr8k.
- **Technical depth:** attention mechanisms, REINFORCE for hard attention, doubly stochastic regularization; evaluated with BLEU, METEOR, CIDEr.
- **References:** Xu et al., *Show, Attend and Tell* (ICML 2015); Liu & Brailsford (ICCEE 2023).
- **Results (measured, from repo README; corpus BLEU, 90/10 train/val split):**

  | Model | Final loss | Final BLEU | Best BLEU |
  |---|---:|---:|---:|
  | Transformer (ResNet-50 encoder) | 1.6427 | 0.0792 | 0.0814 |
  | SAT-Soft | 1.7797 | 0.0721 | 0.0721 |
  | SAT-Hard | 2.0151 | 0.0667 | 0.0667 |
  | Baseline (no attention) | 1.8917 | 0.0616 | 0.0616 |

  The README reports BLEU only — METEOR and CIDEr (listed above) have no published numbers: `TODO: add them or drop them from the copy`.
- **Grew into an app (repo README):** Transformer captioner served via FastAPI, fused with YOLOv8 detection and EasyOCR, Streamlit UI, pytest suite.
- **Stack:** PyTorch (`.pt` checkpoints, ResNet-50 encoder), FastAPI, Streamlit, YOLOv8 (Ultralytics), EasyOCR, pytest, Jupyter *(source: repo README)* · **Dataset:** Flickr8k *(confirmed 2026-09-24)*
- **Repo:** https://github.com/khalil951/Image_Captioning_Multimodel_System

## 6. Breast Cancer Diagnostic Platform — multimodal screening decision support
- **slug:** `breast-cancer-diagnostic-platform` · **tier:** selected · **status:** `TODO: confirm` · **context:** Academic research project
- **One-liner:** A FastAPI and Streamlit platform combining mammogram image classification, structured-feature machine learning, Grad-CAM explanations, and BI-RADS-aware risk fusion.
- **Problem:** Breast screening combines mammogram evidence, structured biopsy/FNA measurements, and a radiologist's BI-RADS assessment; this project models that workflow as one decision-support platform.
- **Approach / architecture:**
  - CNN image pathway for benign/malignant mammogram classification with Grad-CAM heatmaps.
  - Separate tabular pathway using 30 structured features from the Wisconsin Diagnostic Breast Cancer dataset schema.
  - Weighted risk fusion combining CNN probability, ML probability, and BI-RADS category into `LOW_RISK`, `MODERATE_RISK`, or `HIGH_RISK`.
  - FastAPI endpoints for inference, risk scoring, and PDF report generation; Streamlit dashboard with Home, Analysis, and Dashboard views.
- **Models & data:** VGG16, ResNet50, EfficientNet-B3/B4, a custom lightweight CNN, and a multi-class BI-RADS classifier; WDBC tabular data and CBIS-DDSM mammogram data.
- **Results / metrics:** `TODO` — README documents the implemented workflow but does not provide model metrics or clinical validation results.
- **Stack:** Python, FastAPI, Streamlit, TensorFlow/Keras, scikit-learn, ReportLab, Grad-CAM, Jupyter
- **Repo:** https://github.com/khalil951/Breast_Cancer_Detector
- **Safety:** Research and educational use only; not a certified medical device or validated diagnostic tool. Outputs require review by a qualified healthcare professional.

## 7. Mars Surface Image Classifier and Downloader — rover imagery workflow
- **slug:** `mars-surface-image-classifier` · **tier:** selected · **status:** `TODO: confirm` · **context:** Deep-learning and dataset-preparation project
- **One-liner:** A Mars image-classification project paired with a lightweight utility for downloading Curiosity rover photos from NASA's Mars Photos API.
- **Approach / architecture:**
  - Downloads rover image URLs by Martian sol and saves them to a chosen output directory.
  - Uses a curated Mars image dataset split into training, validation, and test sets.
  - Includes a trained Keras model artifact and notebook-based experimentation and evaluation.
  - Provides unit tests for the downloader utilities and requires a NASA API key for retrieval.
- **Dataset:** Curiosity rover imagery derived from the Mars Science Laboratory mission, with images from Mastcam Right, Mastcam Left, and MAHLI instruments; dataset reference DOI `10.5281/zenodo.1049137`.
- **Results / metrics:** `TODO` — README does not provide classifier metrics.
- **Stack:** Python, Keras, NASA Mars Photos API, pytest, Jupyter
- **Repo:** https://github.com/khalil951/Mars_Surface_Image_Classifier *(older related repo: `Mars_Surface_Prediction`)*

## 8. Productivity Predictor Pipeline — garment-worker productivity prediction
- **slug:** `productivity-predictor-pipeline` · **tier:** selected · **status:** `TODO: confirm` · **context:** End-to-end machine-learning project
- **One-liner:** An end-to-end machine-learning pipeline that prepares data, trains a productivity model, exposes predictions through FastAPI, and presents them in a Streamlit dashboard.
- **Problem:** Predict garment-worker productivity from operational features such as department, team size, targeted productivity, SMV, work in progress, overtime, incentives, idle time, and worker counts.
- **Approach / architecture:**
  - `main.py` handles data preparation, model training, and evaluation of a saved model.
  - FastAPI exposes `/health` and `/predict` endpoints and loads the persisted `productivity_model.joblib` artifact.
  - Streamlit dashboard calls the prediction API and supports configurable backend URLs.
  - Optional MLflow workflows and Docker deployment are documented alongside the test suite.
- **Results / metrics:** `TODO` — README documents the pipeline and API but does not provide evaluation metrics.
- **Stack:** Python, FastAPI, Streamlit, scikit-learn, joblib, pytest, MLflow (optional), Docker
- **Repo:** https://github.com/khalil951/MLOPS_Pipeline *(README title "Productivity Predictor Pipeline"; older notebook repo: `Garment_ML_Project`)*



---

## Case-study page template (every featured project)
1. Hero: title, one-liner, status badge, role, timeframe, stack chips, links
2. **TL;DR** — 3 bullets (problem, what I built, outcome)
3. Problem & constraints
4. Architecture — diagram (SVG/Mermaid) + 3–5 annotated decisions
5. Key decisions & tradeoffs — "I chose X over Y because…"
6. Results — split into **Measured** and **Observed**; pending items in a "Pending" callout
7. What I'd do next / limitations
8. Links: repo, demo, report, slides
