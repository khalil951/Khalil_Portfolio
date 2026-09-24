import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { ComponentType, ReactNode } from "react";
import { createMdxComponents } from "@/components/mdx/mdx-components";

/**
 * Renders a Velite-compiled MDX function-body string (Chapter.content /
 * Section.content) at request/build time. Velite's `s.mdx()` already ran the
 * remark/rehype pipeline — this just executes the compiled function with our
 * component map, per @mdx-js/mdx's `run()` API. Pass `chapterNumber` for
 * Chapter bodies to get build-time "N.M" §-numbering on H2s.
 */
export async function renderMdx(
  compiledSource: string,
  options: { chapterNumber?: number } = {},
): Promise<ReactNode> {
  const components = createMdxComponents(options);
  const { default: MDXContent } = (await run(compiledSource, {
    ...runtime,
    baseUrl: import.meta.url,
  } as Parameters<typeof run>[1])) as { default: ComponentType<{ components: typeof components }> };

  return <MDXContent components={components} />;
}
