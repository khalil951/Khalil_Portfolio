/**
 * Velite `prepare` hook — cross-collection validation (docs/05 "Validation").
 *
 * Numbering/backlinks/Index/graph.json derivation are Phase 3/4 concerns
 * (docs/05 build phases) and are added there. Phase 1's job is to make sure
 * the content graph is internally consistent before anything renders:
 * every `stack`/`concepts`/`<Cite>`/`<Term>` id resolves, and no draft
 * margin note reaches production.
 */
interface PrepareData {
  skills: Array<{ id: string }>;
  concepts: Array<{ id: string }>;
  bibliography: Array<{ id: string }>;
  sections: Array<{
    slug: string;
    section: string;
    stack?: string[];
    concepts?: string[];
    related?: string[];
    raw?: string;
  }>;
  chapters: Array<{ slug: string; roman: string; epigraph?: string; raw?: string }>;
  epigraphs: Array<{ id: string }>;
  [key: string]: unknown;
}

const CITE_RE = /<Cite\s+id="([^"]+)"/g;
const TERM_RE = /<Term\s+id="([^"]+)"/g;
const DRAFT_MARGIN_NOTE_RE = /<MarginNote[^>]*\bdraft\b/;

export async function runPrepare(data: unknown): Promise<void | false> {
  const d = data as PrepareData;
  const errors: string[] = [];

  const skillIds = new Set(d.skills.map((s) => s.id));
  const conceptIds = new Set(d.concepts.map((c) => c.id));
  const bibIds = new Set(d.bibliography.map((w) => w.id));
  const sectionSlugs = new Set(d.sections.map((s) => s.slug));
  const epigraphIds = new Set(d.epigraphs.map((e) => e.id));
  const referenceableIds = new Set([...skillIds, ...conceptIds]);

  for (const section of d.sections) {
    const where = `content/chapters/**/${section.slug}.mdx`;

    for (const id of section.stack ?? []) {
      if (!skillIds.has(id)) {
        errors.push(`${where} → stack "${id}" does not exist in content/skills.yaml`);
      }
    }
    for (const id of section.concepts ?? []) {
      if (!conceptIds.has(id)) {
        errors.push(`${where} → concepts "${id}" does not exist in content/concepts.yaml`);
      }
    }
    for (const slug of section.related ?? []) {
      if (!sectionSlugs.has(slug)) {
        errors.push(`${where} → related "${slug}" does not match any section slug`);
      }
    }

    for (const raw of [section.raw ?? ""]) {
      for (const m of raw.matchAll(CITE_RE)) {
        if (!bibIds.has(m[1])) {
          errors.push(`${where} → <Cite id="${m[1]}"> does not exist in content/bibliography.yaml`);
        }
      }
      for (const m of raw.matchAll(TERM_RE)) {
        if (!referenceableIds.has(m[1])) {
          errors.push(`${where} → <Term id="${m[1]}"> does not exist in skills.yaml or concepts.yaml`);
        }
      }
      if (DRAFT_MARGIN_NOTE_RE.test(raw)) {
        errors.push(`${where} → <MarginNote draft> is present — draft margin notes must never ship`);
      }
    }
  }

  for (const chapter of d.chapters) {
    const where = `content/chapters/**/index.mdx (${chapter.roman})`;
    const raw = chapter.raw ?? "";
    if (chapter.epigraph && !epigraphIds.has(chapter.epigraph)) {
      errors.push(`${where} → epigraph "${chapter.epigraph}" does not exist in content/epigraphs.yaml`);
    }
    for (const m of raw.matchAll(CITE_RE)) {
      if (!bibIds.has(m[1])) {
        errors.push(`${where} → <Cite id="${m[1]}"> does not exist in content/bibliography.yaml`);
      }
    }
    for (const m of raw.matchAll(TERM_RE)) {
      if (!referenceableIds.has(m[1])) {
        errors.push(`${where} → <Term id="${m[1]}"> does not exist in skills.yaml or concepts.yaml`);
      }
    }
    if (DRAFT_MARGIN_NOTE_RE.test(raw)) {
      errors.push(`${where} → <MarginNote draft> is present — draft margin notes must never ship`);
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Content validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"}):\n` +
        errors.map((e) => `  - ${e}`).join("\n"),
    );
  }
}
