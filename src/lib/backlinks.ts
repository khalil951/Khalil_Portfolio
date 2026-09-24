import { chapters, sections, type Chapter, type Section } from "#site/content";

export interface Backlink {
  href: string;
  label: string;
}

const LINK_RE = /\]\(([^)\s]+)\)/g;

function findLinkTargets(raw: string): string[] {
  return [...raw.matchAll(LINK_RE)].map((m) => m[1]);
}

/**
 * Reverse backlinks (docs/07 "Connections": "Referenced in 6.3 Toolkit...").
 * A referrer counts if it either names this section in its `related`
 * frontmatter, or links to this route directly from its MDX body — the
 * "internal links plus `related`" rule in docs/05's numbering/backlinks
 * derivation, run in the reverse direction from the target's point of view.
 */
export function getBacklinks(targetRoute: string, selfRoute: string): Backlink[] {
  const results: Backlink[] = [];
  const seen = new Set<string>();

  function add(href: string, label: string) {
    if (href === selfRoute || seen.has(href)) return;
    seen.add(href);
    results.push({ href, label });
  }

  for (const section of sections as Section[]) {
    const route = `/chapters/${section.chapter}/${section.slug}`;
    if (route === selfRoute) continue;
    const label = `§ ${section.section} ${section.title}`;

    if (section.related?.some((slug) => `/chapters/${section.chapter}/${slug}` === targetRoute)) {
      add(route, label);
      continue;
    }
    if (findLinkTargets(section.raw ?? "").some((href) => href === targetRoute)) {
      add(route, label);
    }
  }

  for (const chapter of chapters as Chapter[]) {
    const route = `/chapters/${chapter.number}`;
    if (route === selfRoute) continue;
    const label = `${chapter.roman}. ${chapter.title}`;

    if (findLinkTargets(chapter.raw ?? "").some((href) => href === targetRoute)) {
      add(route, label);
    }
  }

  return results;
}
