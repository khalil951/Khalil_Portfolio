import type { NodeType } from "@/lib/graph";

/** Shape encodes node type, not just color (docs/04) — meaning never carried by color alone. */
export function NodeShape({ type, r = 7 }: { type: NodeType; r?: number }) {
  switch (type) {
    case "chapter":
      return <rect x={-r} y={-r} width={r * 2} height={r * 2} />;
    case "section":
      return <circle r={r} />;
    case "skill":
      return (
        <rect x={-r} y={-r} width={r * 2} height={r * 2} transform={`rotate(45)`} />
      );
    case "concept":
      return <polygon points={`0,${-r * 1.15} ${r * 1.05},${r * 0.85} ${-r * 1.05},${r * 0.85}`} />;
    case "organization":
      return <circle r={r * 0.8} strokeDasharray="2,2" fill="none" strokeWidth={2} />;
  }
}

export const NODE_TYPE_LABELS: Record<NodeType, string> = {
  chapter: "Chapter",
  section: "Project",
  skill: "Skill / Tool",
  concept: "Concept",
  organization: "Organization",
};
