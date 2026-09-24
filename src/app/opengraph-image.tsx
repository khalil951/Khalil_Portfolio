import { ImageResponse } from "next/og";
import { book, profile } from "#site/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** OG image styled like a book page (docs/05) — generated once, at build time. */
export default function Image() {
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
        <div style={{ fontSize: 28, color: "#5E5A52", display: "flex" }}>{book.edition}</div>
        <div style={{ fontSize: 64, marginTop: 20, display: "flex" }}>{profile.name}</div>
        <div style={{ fontSize: 34, color: "#5E5A52", marginTop: 16, display: "flex" }}>
          {book.subtitle}
        </div>
        <div style={{ width: 120, height: 4, backgroundColor: "#9E2B25", marginTop: 40, display: "flex" }} />
      </div>
    ),
    size,
  );
}
