"use client";

import { useMemo, useRef, useState } from "react";
import type { Graph, GraphNode, NodeType } from "@/lib/graph";
import { NodeShape, NODE_TYPE_LABELS } from "./shapes";

const TYPE_COLOR: Record<NodeType, string> = {
  chapter: "var(--ink)",
  section: "var(--rubric)",
  skill: "var(--grounded)",
  concept: "var(--concept)",
  organization: "var(--ink-muted)",
};

const ALL_TYPES: NodeType[] = ["chapter", "section", "skill", "concept", "organization"];

export function MapExplorer({ graph, width, height }: { graph: Graph; width: number; height: number }) {
  const [activeTypes, setActiveTypes] = useState<Set<NodeType>>(new Set(ALL_TYPES));
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  const nodeById = useMemo(() => new Map(graph.nodes.map((n) => [n.id, n])), [graph.nodes]);

  const neighbors = useMemo(() => {
    if (!hovered) return null;
    const set = new Set<string>([hovered]);
    for (const e of graph.edges) {
      if (e.source === hovered) set.add(e.target);
      if (e.target === hovered) set.add(e.source);
    }
    return set;
  }, [hovered, graph.edges]);

  const matched = useMemo(() => {
    if (query.trim().length < 2) return null;
    const q = query.trim().toLowerCase();
    return new Set(graph.nodes.filter((n) => n.label.toLowerCase().includes(q)).map((n) => n.id));
  }, [query, graph.nodes]);

  function toggleType(type: NodeType) {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  function isVisible(node: GraphNode) {
    return activeTypes.has(node.type);
  }

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    setIsDragging(true);
  }
  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  }
  function onPointerUp() {
    dragRef.current = null;
    setIsDragging(false);
  }

  return (
    <div className="not-prose">
      <div className="flex flex-wrap items-center gap-4 mb-4 font-ui text-sm">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a node…"
          className="border border-rule rounded-sm px-3 py-1.5 bg-transparent"
        />
        <div className="flex flex-wrap gap-3">
          {ALL_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={activeTypes.has(type)}
                onChange={() => toggleType(type)}
              />
              <svg width="14" height="14" viewBox="-8 -8 16 16" aria-hidden="true">
                <g fill={TYPE_COLOR[type]} stroke={TYPE_COLOR[type]}>
                  <NodeShape type={type} r={6} />
                </g>
              </svg>
              {NODE_TYPE_LABELS[type]}
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))}
            className="border border-rule rounded-sm w-7 h-7"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
            className="border border-rule rounded-sm w-7 h-7"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="border border-rule rounded-sm px-2 h-7"
          >
            Reset
          </button>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        className="border border-rule rounded-sm bg-paper-2/30 touch-none select-none"
        style={{ height: "min(70vh, 640px)", cursor: isDragging ? "grabbing" : "grab" }}
        role="img"
        aria-label="Knowledge graph — see the list below for an accessible equivalent"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <g
          transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}
          style={{ transformOrigin: `${width / 2}px ${height / 2}px` }}
        >
          <g stroke="var(--rule)" strokeWidth={1}>
            {graph.edges.map((e, i) => {
              const source = nodeById.get(e.source);
              const target = nodeById.get(e.target);
              if (!source || !target || !isVisible(source) || !isVisible(target)) return null;
              const dimmed = neighbors && !(neighbors.has(e.source) && neighbors.has(e.target));
              return (
                <line
                  key={i}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  opacity={dimmed ? 0.15 : 0.6}
                />
              );
            })}
          </g>
          <g>
            {graph.nodes.filter(isVisible).map((node) => {
              const dimmed = neighbors ? !neighbors.has(node.id) : false;
              const isMatch = matched ? matched.has(node.id) : false;
              const content = (
                <g
                  transform={`translate(${node.x} ${node.y})`}
                  fill={TYPE_COLOR[node.type]}
                  stroke={TYPE_COLOR[node.type]}
                  opacity={matched ? (isMatch ? 1 : 0.2) : dimmed ? 0.25 : 1}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  tabIndex={0}
                  onFocus={() => setHovered(node.id)}
                  onBlur={() => setHovered(null)}
                  role="button"
                  aria-label={node.label}
                >
                  <NodeShape type={node.type} r={isMatch ? 9 : 6} />
                  {(hovered === node.id || isMatch) && (
                    <text
                      x={10}
                      y={4}
                      fontFamily="var(--font-ui)"
                      fontSize={11}
                      fill="var(--ink)"
                      stroke="none"
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
              return node.href ? (
                // Plain SVG <a> (not next/link) — Link's client-side prefetch/
                // transition logic assumes an HTMLAnchorElement; inside an
                // <svg> subtree the anchor renders in the SVG namespace instead.
                <a key={node.id} href={node.href} aria-label={node.label}>
                  {content}
                </a>
              ) : (
                <g key={node.id}>{content}</g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
