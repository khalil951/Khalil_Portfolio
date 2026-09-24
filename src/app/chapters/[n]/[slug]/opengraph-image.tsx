import { ImageResponse } from "next/og";
import { sections } from "#site/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// opengraph-image routes don't inherit the sibling page's generateStaticParams.
export function generateStaticParams() {
  return sections.map((s) => ({ n: String(s.chapter), slug: s.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ n: string; slug: string }>;
}) {
  const { n, slug } = await params;
  const section = sections.find((s) => s.chapter === Number(n) && s.slug === slug);

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
        <div style={{ fontSize: 28, color: "#5E5A52", display: "flex" }}>
          § {section?.section ?? ""}
        </div>
        <div style={{ fontSize: 58, marginTop: 16, display: "flex" }}>{section?.title ?? ""}</div>
        {section?.status ? (
          <div style={{ fontSize: 28, color: "#2F6B4F", marginTop: 20, display: "flex" }}>
            {section.status}
          </div>
        ) : null}
      </div>
    ),
    size,
  );
}
