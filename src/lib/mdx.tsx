import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { ComponentType, ReactNode } from "react";
import { mdxComponents } from "@/components/mdx/mdx-components";

/**
 * Renders a Velite-compiled MDX function-body string (Chapter.content /
 * Section.content) at request/build time. Velite's `s.mdx()` already ran the
 * remark/rehype pipeline — this just executes the compiled function with our
 * component map, per @mdx-js/mdx's `run()` API.
 */
export async function renderMdx(compiledSource: string): Promise<ReactNode> {
  const { default: MDXContent } = (await run(compiledSource, {
    ...runtime,
    baseUrl: import.meta.url,
  } as Parameters<typeof run>[1])) as { default: ComponentType<{ components: typeof mdxComponents }> };

  return <MDXContent components={mdxComponents} />;
}
