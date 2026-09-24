import type { ComponentPropsWithoutRef } from "react";
import { Cite } from "./Cite";
import { Figure } from "./Figure";
import { KeyFacts } from "./KeyFacts";
import { MarginNote } from "./MarginNote";
import { Sidenote } from "./Sidenote";
import { SkillGroups } from "./SkillGroups";
import { Term } from "./Term";
import { Timeline } from "./Timeline";

/**
 * Component map passed to the rendered MDX (lib/mdx.tsx). A factory, not a
 * static object, because chapter H2s get a build-time "N.M" §-number
 * (docs/05 "Build-time derivations") — never hand-typed in content — via a
 * closure-scoped counter reset for each render call. Project/study section
 * bodies (`chapterNumber` omitted) get plain, un-numbered H2s: their prose
 * headers ("TL;DR", "Problem & constraints", ...) aren't sub-numbered per
 * docs/07 — the section itself is already "§3.1" etc.
 */
export function createMdxComponents({ chapterNumber }: { chapterNumber?: number } = {}) {
  let subsectionIndex = 0;

  return {
    Cite,
    Figure,
    KeyFacts,
    MarginNote,
    Sidenote,
    SkillGroups,
    Term,
    Timeline,
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => {
      subsectionIndex += 1;
      return (
        <h2 className="font-text text-2xl mt-10 mb-3" {...props}>
          {chapterNumber !== undefined ? (
            <span className="section-number">{`${chapterNumber}.${subsectionIndex}`}</span>
          ) : null}
          {children}
        </h2>
      );
    },
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
      <h3 className="font-text text-xl mt-8 mb-2" {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="skim-hide mt-4 leading-relaxed" {...props} />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
      <ul className="skim-hide mt-4 ml-5 list-disc flex flex-col gap-1" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
      <ol className="skim-hide mt-4 ml-5 list-decimal flex flex-col gap-1" {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<"a">) => (
      <a
        className="text-rubric underline decoration-1 underline-offset-2 hover:decoration-2"
        {...props}
      />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
      <strong className="font-semibold" {...props} />
    ),
    table: (props: ComponentPropsWithoutRef<"table">) => (
      <div className="skim-hide mt-6 overflow-x-auto">
        <table className="font-ui text-sm w-full border-collapse" {...props} />
      </div>
    ),
    th: (props: ComponentPropsWithoutRef<"th">) => (
      <th className="text-left border-b border-rule py-2 pr-4 font-medium" {...props} />
    ),
    td: (props: ComponentPropsWithoutRef<"td">) => (
      <td className="border-b border-rule py-2 pr-4" {...props} />
    ),
    code: (props: ComponentPropsWithoutRef<"code">) => (
      <code className="font-mono text-[0.9em] bg-paper-2 px-1 py-0.5 rounded-sm" {...props} />
    ),
  };
}
