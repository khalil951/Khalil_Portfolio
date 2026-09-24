import type { Metadata } from "next";
import { profile } from "#site/content";

export const metadata: Metadata = { title: "Correspondence" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 measure">
      <h1 className="font-text text-4xl mb-6">Correspondence</h1>
      <p className="text-ink-muted">{profile.location}</p>

      <ul className="mt-6 flex flex-col gap-2 font-ui">
        {profile.links.email ? (
          <li>
            <a href={`mailto:${profile.links.email}`} className="text-rubric hover:underline">
              {profile.links.email}
            </a>
          </li>
        ) : null}
        {profile.links.linkedin ? (
          <li>
            <a href={profile.links.linkedin} className="text-rubric hover:underline">
              LinkedIn
            </a>
          </li>
        ) : null}
        {profile.links.github ? (
          <li>
            <a href={profile.links.github} className="text-rubric hover:underline">
              GitHub
            </a>
          </li>
        ) : null}
        {profile.links.huggingface ? (
          <li>
            <a href={profile.links.huggingface} className="text-rubric hover:underline">
              Hugging Face
            </a>
          </li>
        ) : null}
      </ul>

      <p className="mt-8">
        <a href="/cv.pdf" download className="border border-rule px-4 py-2 rounded-sm hover:border-ink-muted">
          Download CV
        </a>
      </p>
    </div>
  );
}
