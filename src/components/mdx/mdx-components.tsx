import type { ComponentPropsWithoutRef } from "react";
import { Cite } from "./Cite";
import { Figure } from "./Figure";
import { KeyFacts } from "./KeyFacts";
import { MarginNote } from "./MarginNote";
import { Sidenote } from "./Sidenote";
import { SkillGroups } from "./SkillGroups";
import { Term } from "./Term";
import { Timeline } from "./Timeline";

export const mdxComponents = {
  Cite,
  Figure,
  KeyFacts,
  MarginNote,
  Sidenote,
  SkillGroups,
  Term,
  Timeline,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="font-text text-2xl mt-10 mb-3" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="font-text text-xl mt-8 mb-2" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="mt-4 leading-relaxed" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 ml-5 list-disc flex flex-col gap-1" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 ml-5 list-decimal flex flex-col gap-1" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-rubric underline decoration-1 underline-offset-2 hover:decoration-2" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold" {...props} />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
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
