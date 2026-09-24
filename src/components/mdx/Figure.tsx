/**
 * Numbered figure with a margin-column caption (docs/04). Built and ready;
 * zero figures exist in content yet — no architecture diagram or screenshot
 * has been produced for any project (docs/06 "Design resources needed").
 */
export function Figure({
  n,
  src,
  caption,
}: {
  n: string;
  src: string;
  caption: string;
}) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, figures are pre-sized content assets */}
      <img src={src} alt={caption} className="w-full border border-rule" />
      <figcaption className="font-ui text-sm text-ink-muted mt-2">
        Figure {n} — {caption}
      </figcaption>
    </figure>
  );
}
