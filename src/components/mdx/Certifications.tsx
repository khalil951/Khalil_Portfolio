import { profile } from "#site/content";

/**
 * Chapter V "Certifications": names come from `profile.yaml` (docs/02, per
 * the CV) — never hardcoded here (CLAUDE.md rule 3). No issuer is shown for
 * any entry until one is confirmed (docs/06 "Omitted from the site").
 */
export function Certifications() {
  if (profile.certifications.length === 0) return null;

  return (
    <ul className="not-prose flex flex-wrap gap-2">
      {profile.certifications.map((cert) => (
        <li
          key={cert.name}
          className="font-mono text-sm border border-rule rounded-sm px-2 py-1 inline-block"
        >
          {cert.name}
        </li>
      ))}
    </ul>
  );
}
