import { Link } from "@/components/Link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-text text-6xl text-rubric mb-4">—</p>
      <h1 className="font-text text-3xl mb-4">This page was left blank</h1>
      <p className="text-ink-muted mb-8">
        There&apos;s nothing at this address. Perhaps start from the{" "}
        <Link href="/" className="tap-target text-rubric hover:underline">
          Cover
        </Link>{" "}
        or the{" "}
        <Link href="/contents" className="tap-target text-rubric hover:underline">
          Contents
        </Link>
        .
      </p>
    </div>
  );
}
