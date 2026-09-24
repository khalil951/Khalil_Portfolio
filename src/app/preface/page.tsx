import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "#site/content";

export const metadata: Metadata = { title: "Preface" };

export default function PrefacePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 measure">
      <h1 className="font-text text-4xl mb-6">Preface</h1>
      <p className="font-text text-lg leading-relaxed drop-cap">{profile.bio}</p>

      <h2 className="font-text text-2xl mt-10 mb-3">How to read this book</h2>
      <p className="mt-2">
        Front to back, like a book — start at the{" "}
        <Link href="/" className="text-rubric hover:underline">
          Cover
        </Link>{" "}
        and read each chapter in order.
      </p>
      <p className="mt-2">
        Or skim it — the{" "}
        <Link href="/" className="text-rubric hover:underline">
          Skim mode
        </Link>{" "}
        switch collapses every chapter to its abstract and key facts, readable in about two minutes.
      </p>
      <p className="mt-2">
        Or explore it as a graph — the{" "}
        <Link href="/map" className="text-rubric hover:underline">
          Map of Knowledge
        </Link>{" "}
        links chapters, projects, skills and concepts by their real cross-references.
      </p>
    </div>
  );
}
