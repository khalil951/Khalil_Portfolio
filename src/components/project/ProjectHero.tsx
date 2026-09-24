import { skills, type Section } from "#site/content";
import { StatusBadge } from "./StatusBadge";

/**
 * Case-study hero (docs/03 template, item 1): title, one-liner, status
 * badge, role, timeframe, stack chips, links.
 */
export function ProjectHero({ section }: { section: Section }) {
  const stackLabels = (section.stack ?? []).map((id) => skills.find((s) => s.id === id)?.label ?? id);

  return (
    <header className="not-prose">
      <p className="font-ui text-sm text-ink-muted">
        § {section.section} · {section.kind === "project" ? "Featured project" : "Study"}
      </p>
      <h1 className="font-text text-4xl mt-1">{section.title}</h1>
      <p className="font-text text-lg text-ink-muted mt-2 measure">{section.abstract}</p>
      {section.trace ? <p className="font-mono text-xs text-ink-muted mt-2">{section.trace}</p> : null}

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-ui text-sm">
        {section.status ? (
          <div className="flex items-center gap-2">
            <dt className="sr-only">Status</dt>
            <dd>
              <StatusBadge status={section.status} />
            </dd>
          </div>
        ) : null}
        {section.role ? (
          <div>
            <dt className="inline text-ink-muted">Role: </dt>
            <dd className="inline">{section.role}</dd>
          </div>
        ) : null}
        {section.period ? (
          <div>
            <dt className="inline text-ink-muted">Timeframe: </dt>
            <dd className="inline">{section.period}</dd>
          </div>
        ) : null}
        {section.context ? (
          <div>
            <dt className="inline text-ink-muted">Context: </dt>
            <dd className="inline">{section.context}</dd>
          </div>
        ) : null}
      </dl>

      {stackLabels.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {stackLabels.map((label) => (
            <li key={label} className="font-mono text-xs border border-rule rounded-sm px-2 py-1">
              {label}
            </li>
          ))}
        </ul>
      ) : null}

      {section.links ? (
        <p className="mt-4 flex flex-wrap gap-x-4 font-ui text-sm">
          {section.links.repo ? (
            <a href={section.links.repo} className="text-rubric hover:underline">
              Repository
            </a>
          ) : null}
          {section.links.demo ? (
            <a href={section.links.demo} className="text-rubric hover:underline">
              Live deployment
            </a>
          ) : null}
          {section.links.report ? (
            <a href={section.links.report} className="text-rubric hover:underline">
              Report
            </a>
          ) : null}
          {section.links.slides ? (
            <a href={section.links.slides} className="text-rubric hover:underline">
              Slides
            </a>
          ) : null}
        </p>
      ) : null}

      {section.safety ? (
        <p className="mt-4 border border-rubric rounded-sm px-4 py-3 text-sm">
          <strong>Safety: </strong>
          {section.safety}
        </p>
      ) : null}
    </header>
  );
}
