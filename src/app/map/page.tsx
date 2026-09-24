import type { Metadata } from "next";
import { buildGraphData, layoutGraph } from "@/lib/graph";
import { MapExplorer } from "@/components/graph/MapExplorer";
import { GraphList } from "@/components/graph/GraphList";

export const metadata: Metadata = { title: "Map of Knowledge" };

const WIDTH = 900;
const HEIGHT = 600;

export default function MapPage() {
  const graph = layoutGraph(buildGraphData(), WIDTH, HEIGHT);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="font-text text-4xl mb-2">Map of Knowledge</h1>
      <p className="text-ink-muted mb-8 measure">
        Chapters, projects, skills, concepts and organizations, linked only by real
        cross-references in the book — nothing hand-drawn to look impressive. Drag to pan,
        use the +/− buttons to zoom, filter by type, or search for a node.
      </p>

      <MapExplorer graph={graph} width={WIDTH} height={HEIGHT} />

      <h2 className="font-text text-2xl mt-16 mb-6">Full list</h2>
      <p className="text-ink-muted mb-6 measure text-sm">
        The same graph as a structured list — an accessible equivalent, not an afterthought.
      </p>
      <GraphList graph={graph} />
    </div>
  );
}
