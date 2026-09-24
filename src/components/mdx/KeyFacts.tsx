import Link from "next/link";
import { profile, sections } from "#site/content";

/**
 * Compact key-facts card (docs/04), visible in Skim mode. Used bare in
 * Chapter I's MDX ("1.1 In brief") — self-sources from profile.yaml, since
 * that's the one place this card shows identity rather than a project.
 * docs/04 UX rule: role, location, availability, top 3 systems visible
 * without scrolling at 1280×720 on Cover + Contents.
 */
export function KeyFacts() {
  const topSystems = profile.topSystems
    .map((slug) => sections.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <dl className="not-prose font-ui text-sm border border-rule rounded-sm p-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
      <dt className="text-ink-muted">Role</dt>
      <dd>{profile.headline}</dd>

      <dt className="text-ink-muted">Location</dt>
      <dd>{profile.location}</dd>

      <dt className="text-ink-muted">Availability</dt>
      <dd>{profile.availability}</dd>

      <dt className="text-ink-muted">Top systems</dt>
      <dd>
        <ul className="flex flex-col gap-0.5">
          {topSystems.map((s) => (
            <li key={s.slug}>
              <Link href={`/chapters/${s.chapter}/${s.slug}`} className="hover:underline">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </dd>

      <dt className="text-ink-muted">Links</dt>
      <dd className="flex flex-wrap gap-x-3">
        {profile.links.github ? (
          <a href={profile.links.github} className="hover:underline">
            GitHub
          </a>
        ) : null}
        {profile.links.linkedin ? (
          <a href={profile.links.linkedin} className="hover:underline">
            LinkedIn
          </a>
        ) : null}
        {profile.links.huggingface ? (
          <a href={profile.links.huggingface} className="hover:underline">
            Hugging Face
          </a>
        ) : null}
        {profile.links.email ? (
          <a href={`mailto:${profile.links.email}`} className="hover:underline">
            Email
          </a>
        ) : null}
      </dd>
    </dl>
  );
}
