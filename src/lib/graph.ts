import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceCollide,
  forceX,
  forceY,
} from "d3-force";
import {
  chapters,
  concepts,
  experience,
  sections,
  skills,
  type Chapter,
  type Section,
} from "#site/content";

export type NodeType = "chapter" | "section" | "skill" | "concept" | "organization";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  href?: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const LINK_RE = /\]\(([^)\s]+)\)/g;
const TERM_RE = /<Term\s+id="([^"]+)"/g;

function orgId(org: string) {
  return `org:${org.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

/**
 * The whole book's knowledge graph (docs/04): Chapter, Project (Section),
 * Skill/Tool, Concept and Organization nodes; edges come only from real
 * content relations — chapter→section containment, `stack`/`concepts`
 * frontmatter, `<Term>` usage, `related` plus internal Markdown links (both
 * directions, reusing the same rule as lib/backlinks.ts), and Chapter II's
 * experience→organization/project relations. Nothing is hand-drawn.
 */
export function buildGraphData(): Graph {
  const nodes = new Map<string, GraphNode>();
  const edgeKeys = new Set<string>();
  const edges: GraphEdge[] = [];

  function addNode(id: string, label: string, type: NodeType, href?: string) {
    if (!nodes.has(id)) nodes.set(id, { id, label, type, href, x: 0, y: 0 });
  }

  function addEdge(source: string, target: string) {
    if (source === target) return;
    const key = [source, target].sort().join("::");
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push({ source, target });
  }

  const chapterId = (n: number) => `chapter:${n}`;
  const sectionId = (chapter: number, slug: string) => `section:${chapter}/${slug}`;

  for (const chapter of chapters as Chapter[]) {
    addNode(chapterId(chapter.number), `${chapter.roman}. ${chapter.title}`, "chapter", `/chapters/${chapter.number}`);
  }
  for (const section of sections as Section[]) {
    addNode(
      sectionId(section.chapter, section.slug),
      `§${section.section} ${section.title}`,
      "section",
      `/chapters/${section.chapter}/${section.slug}`,
    );
    addEdge(chapterId(section.chapter), sectionId(section.chapter, section.slug));
  }
  for (const skill of skills) {
    addNode(`skill:${skill.id}`, skill.label, "skill");
  }
  for (const concept of concepts) {
    addNode(`concept:${concept.id}`, concept.label, "concept");
  }
  for (const entry of experience) {
    addNode(orgId(entry.org), entry.org, "organization");
    addEdge(orgId(entry.org), chapterId(2)); // every experience entry belongs to Chapter II
    if (entry.relatedSection) {
      const target = sections.find((s) => s.slug === entry.relatedSection);
      if (target) addEdge(orgId(entry.org), sectionId(target.chapter, target.slug));
    }
  }

  // stack / concepts frontmatter + <Term> usage
  for (const section of sections as Section[]) {
    const id = sectionId(section.chapter, section.slug);
    for (const skillId of section.stack ?? []) {
      if (nodes.has(`skill:${skillId}`)) addEdge(id, `skill:${skillId}`);
    }
    for (const conceptId of section.concepts ?? []) {
      if (nodes.has(`concept:${conceptId}`)) addEdge(id, `concept:${conceptId}`);
    }
    for (const m of (section.raw ?? "").matchAll(TERM_RE)) {
      const target = nodes.has(`skill:${m[1]}`) ? `skill:${m[1]}` : nodes.has(`concept:${m[1]}`) ? `concept:${m[1]}` : null;
      if (target) addEdge(id, target);
    }
    for (const slug of section.related ?? []) {
      const target = sections.find((s) => s.slug === slug);
      if (target) addEdge(id, sectionId(target.chapter, target.slug));
    }
  }
  for (const chapter of chapters as Chapter[]) {
    for (const m of (chapter.raw ?? "").matchAll(TERM_RE)) {
      const target = nodes.has(`skill:${m[1]}`) ? `skill:${m[1]}` : nodes.has(`concept:${m[1]}`) ? `concept:${m[1]}` : null;
      if (target) addEdge(chapterId(chapter.number), target);
    }
  }

  // internal Markdown links between chapters/sections (both directions naturally covered by addEdge's undirected dedupe)
  function linkTargetId(href: string): string | null {
    const chapterMatch = href.match(/^\/chapters\/(\d+)$/);
    if (chapterMatch) return chapterId(Number(chapterMatch[1]));
    const sectionMatch = href.match(/^\/chapters\/(\d+)\/([\w-]+)$/);
    if (sectionMatch) return sectionId(Number(sectionMatch[1]), sectionMatch[2]);
    return null;
  }
  for (const section of sections as Section[]) {
    const id = sectionId(section.chapter, section.slug);
    for (const m of (section.raw ?? "").matchAll(LINK_RE)) {
      const target = linkTargetId(m[1]);
      if (target && nodes.has(target)) addEdge(id, target);
    }
  }
  for (const chapter of chapters as Chapter[]) {
    const id = chapterId(chapter.number);
    for (const m of (chapter.raw ?? "").matchAll(LINK_RE)) {
      const target = linkTargetId(m[1]);
      if (target && nodes.has(target)) addEdge(id, target);
    }
  }

  // Drop skill/concept nodes with no evidence at all (unused entries in skills.yaml/concepts.yaml).
  const connected = new Set<string>();
  for (const e of edges) {
    connected.add(e.source);
    connected.add(e.target);
  }
  for (const [id, node] of nodes) {
    if ((node.type === "skill" || node.type === "concept") && !connected.has(id)) {
      nodes.delete(id);
    }
  }

  return { nodes: [...nodes.values()], edges };
}

/**
 * Synchronous, build-time force layout (docs/05 "d3-force positions
 * computed at build") — the simulation's internal timer is stopped and
 * ticked manually so this runs once during SSG, not as a client animation.
 */
export function layoutGraph(graph: Graph, width: number, height: number): Graph {
  const simulation = forceSimulation(graph.nodes as never)
    .force(
      "link",
      forceLink(graph.edges as never)
        .id((d) => (d as GraphNode).id)
        .distance(60),
    )
    .force("charge", forceManyBody().strength(-120))
    .force("center", forceCenter(width / 2, height / 2))
    .force("collide", forceCollide(18))
    // forceCenter only re-centers the *average* position each tick — it
    // does not pull individual nodes back, so a node with few or no edges
    // (e.g. Chapter V, which links to no other page) drifts indefinitely
    // under pure charge repulsion. A weak forceX/forceY keeps every node
    // inside the viewBox regardless of how connected it is.
    .force("x", forceX(width / 2).strength(0.12))
    .force("y", forceY(height / 2).strength(0.12))
    .stop();

  for (let i = 0; i < 300; i++) simulation.tick();

  // forceLink() mutates edge.source/edge.target from plain string ids into
  // the actual node objects as a side effect of running the simulation —
  // normalize back to the documented `GraphEdge` shape (string ids) so
  // every consumer (MapExplorer, MiniMap, GraphList) can rely on it without
  // knowing about d3-force's internals. Without this, every downstream
  // `nodeById.get(edge.source)` silently returns undefined and no edge
  // ever renders.
  const edges = graph.edges.map((e) => ({
    source: typeof e.source === "string" ? e.source : (e.source as unknown as GraphNode).id,
    target: typeof e.target === "string" ? e.target : (e.target as unknown as GraphNode).id,
  }));

  return { nodes: graph.nodes, edges };
}

/** The 1-hop neighbourhood of a node (docs/04 mini-map, "its 1-hop neighbourhood"). */
export function neighborhoodOf(graph: Graph, nodeId: string): Graph {
  const keep = new Set<string>([nodeId]);
  const edges = graph.edges.filter((e) => {
    if (e.source === nodeId) {
      keep.add(e.target);
      return true;
    }
    if (e.target === nodeId) {
      keep.add(e.source);
      return true;
    }
    return false;
  });
  const nodes = graph.nodes.filter((n) => keep.has(n.id));
  return { nodes, edges };
}
