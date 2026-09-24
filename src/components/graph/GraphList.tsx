import Link from "next/link";
import type { Graph } from "@/lib/graph";
import { NODE_TYPE_LABELS } from "./shapes";

/**
 * Accessible structured-list equivalent of the graph (docs/04): "every
 * graph view has an equivalent structured list... the graph enhances the
 * page; it never replaces content." Grouped by type, each node with its
 * direct connections.
 */
export function GraphList({ graph }: { graph: Graph }) {
  const nodeById = new Map(graph.nodes.map((n) => [n.id, n]));
  const neighborsOf = new Map<string, Set<string>>();
  for (const e of graph.edges) {
    if (!neighborsOf.has(e.source)) neighborsOf.set(e.source, new Set());
    if (!neighborsOf.has(e.target)) neighborsOf.set(e.target, new Set());
    neighborsOf.get(e.source)!.add(e.target);
    neighborsOf.get(e.target)!.add(e.source);
  }

  const grouped = new Map<string, typeof graph.nodes>();
  for (const node of graph.nodes) {
    const list = grouped.get(node.type) ?? [];
    list.push(node);
    grouped.set(node.type, list);
  }

  return (
    <div className="flex flex-col gap-8">
      {(["chapter", "section", "skill", "concept", "organization"] as const).map((type) => {
        const nodes = [...(grouped.get(type) ?? [])].sort((a, b) => a.label.localeCompare(b.label));
        if (nodes.length === 0) return null;

        return (
          <div key={type}>
            <h2 className="font-ui text-sm uppercase tracking-wide text-ink-muted mb-3">
              {NODE_TYPE_LABELS[type]}
            </h2>
            <dl className="flex flex-col gap-3 font-ui text-sm">
              {nodes.map((node) => {
                const neighborIds = [...(neighborsOf.get(node.id) ?? [])];
                return (
                  <div key={node.id}>
                    <dt>
                      {node.href ? (
                        <Link href={node.href} className="font-text text-base hover:underline">
                          {node.label}
                        </Link>
                      ) : (
                        <span className="font-text text-base">{node.label}</span>
                      )}
                    </dt>
                    {neighborIds.length > 0 ? (
                      <dd className="text-ink-muted mt-0.5 flex flex-wrap gap-x-2">
                        {neighborIds.map((id, i) => {
                          const n = nodeById.get(id);
                          if (!n) return null;
                          return (
                            <span key={id}>
                              {n.href ? (
                                <Link href={n.href} className="hover:underline hover:text-ink">
                                  {n.label}
                                </Link>
                              ) : (
                                n.label
                              )}
                              {i < neighborIds.length - 1 ? "," : ""}
                            </span>
                          );
                        })}
                      </dd>
                    ) : null}
                  </div>
                );
              })}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
