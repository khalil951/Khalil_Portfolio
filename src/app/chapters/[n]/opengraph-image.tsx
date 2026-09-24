import { ImageResponse } from "next/og";
import { chapters } from "#site/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// opengraph-image routes don't inherit the sibling page's generateStaticParams.
export function generateStaticParams() {
  return chapters.map((c) => ({ n: String(c.number) }));
}

export default async function Image({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const chapter = chapters.find((c) => c.number === Number(n));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FBF8F1",
          color: "#1C1B19",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 120, color: "#9E2B25", display: "flex" }}>
          {chapter?.roman ?? ""}
        </div>
        <div style={{ fontSize: 56, marginTop: 12, display: "flex" }}>{chapter?.title ?? ""}</div>
        <div style={{ fontSize: 30, color: "#5E5A52", marginTop: 12, display: "flex" }}>
          {chapter?.subtitle ?? ""}
        </div>
      </div>
    ),
    size,
  );
}
