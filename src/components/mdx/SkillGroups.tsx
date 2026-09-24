import Link from "next/link";
import { sections, skills } from "#site/content";

/**
 * Chapter V "Toolkit": skills grouped, evidence-linked rather than shown as
 * bar charts (docs/02 rule). Each skill links to the first project section
 * whose `stack` names it. The full alphabetical skill → [§...] Index page
 * is a Phase 3 concern.
 */
export function SkillGroups() {
  const groups = new Map<string, typeof skills>();
  for (const skill of skills) {
    const list = groups.get(skill.group) ?? [];
    list.push(skill);
    groups.set(skill.group, list);
  }

  return (
    <div className="not-prose flex flex-col gap-6">
      {[...groups.entries()].map(([group, groupSkills]) => (
        <div key={group}>
          <h3 className="font-ui text-sm uppercase tracking-wide text-ink-muted mb-2">{group}</h3>
          <ul className="flex flex-wrap gap-2">
            {groupSkills.map((skill) => {
              const evidence = sections.find((s) => s.stack?.includes(skill.id));
              return (
                <li key={skill.id}>
                  {evidence ? (
                    <Link
                      href={`/chapters/${evidence.chapter}/${evidence.slug}`}
                      className="font-mono text-sm border border-rule rounded-sm px-2 py-1 hover:border-ink-muted transition-colors inline-block"
                    >
                      {skill.label}
                    </Link>
                  ) : (
                    <span className="font-mono text-sm border border-rule rounded-sm px-2 py-1 inline-block text-ink-muted">
                      {skill.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
