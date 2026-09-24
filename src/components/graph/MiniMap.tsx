import { Link } from "@/components/Link";
import { buildGraphData, layoutGraph, neighborhoodOf } from "@/lib/graph";
import { NodeShape } from "./shapes";

const SIZE = 220;

const TYPE_COLOR: Record<string, string> = {
  chapter: "var(--ink)",
  section: "var(--rubric)",
  skill: "var(--grounded)",
  concept: "var(--concept)",
  organization: "var(--ink-muted)",
};

/** Mini map in the project margin: this section's 1-hop neighbourhood (docs/04). */
export function MiniMap({ sectionRoute }: { sectionRoute: string }) {
  const full = buildGraphData();
  const nodeId = full.nodes.find((n) => n.href === sectionRoute)?.id;
  if (!nodeId) return null;

  const sub = neighborhoodOf(full, nodeId);
  if (sub.nodes.length <= 1) return null; // nothing to show beyond the section itself

  const laidOut = layoutGraph(sub, SIZE, SIZE);
  const nodeById = new Map(laidOut.nodes.map((n) => [n.id, n]));

  return (
    <aside className="margin-aside not-prose">
      <p className="font-ui text-xs text-ink-muted uppercase tracking-wide mb-2">Map neighbourhood</p>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" className="border border-rule rounded-sm">
        <g stroke="var(--rule)" strokeWidth={1}>
          {laidOut.edges.map((e, i) => {
            const source = nodeById.get(e.source);
            const target = nodeById.get(e.target);
            if (!source || !target) return null;
            return <line key={i} x1={source.x} y1={source.y} x2={target.x} y2={target.y} />;
          })}
        </g>
        {laidOut.nodes.map((node) => {
          const isSelf = node.id === nodeId;
          const shape = (
            <g
              transform={`translate(${node.x} ${node.y})`}
              fill={isSelf ? "var(--rubric)" : TYPE_COLOR[node.type]}
              stroke={isSelf ? "var(--rubric)" : TYPE_COLOR[node.type]}
            >
              <NodeShape type={node.type} r={isSelf ? 8 : 5} />
            </g>
          );
          return node.href && !isSelf ? (
            <a key={node.id} href={node.href} aria-label={node.label}>
              {shape}
            </a>
          ) : (
            // aria-label needs an explicit role on a <g> (axe "aria-prohibited-attr") —
            // "img" is correct here: unlike MapExplorer's nodes, these aren't interactive.
            <g key={node.id} role="img" aria-label={node.label}>
              {shape}
            </g>
          );
        })}
      </svg>
      <p className="font-ui text-xs mt-2">
        <Link href="/map" className="text-rubric hover:underline">
          Open the full map →
        </Link>
      </p>
    </aside>
  );
}
