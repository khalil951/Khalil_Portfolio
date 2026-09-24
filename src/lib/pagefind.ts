export interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: { title?: string };
  }>;
}

interface PagefindApi {
  init: () => Promise<void>;
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

declare global {
  interface Window {
    __pagefind?: PagefindApi;
  }
}

/**
 * Loads Pagefind's runtime bundle, generated postbuild over the static
 * `out/` export (package.json `postbuild`) — it does not exist during
 * `next dev` or before the first production build. The import is built as a
 * runtime string, not a static `import()`, so the bundler never tries to
 * resolve a file that doesn't exist at build time.
 */
export async function loadPagefind(): Promise<PagefindApi | null> {
  if (typeof window === "undefined") return null;
  if (window.__pagefind) return window.__pagefind;

  try {
    const dynamicImport = new Function("path", "return import(/* @vite-ignore */ path)") as (
      path: string,
    ) => Promise<PagefindApi>;
    const pagefind = await dynamicImport("/pagefind/pagefind.js");
    await pagefind.init();
    window.__pagefind = pagefind;
    return pagefind;
  } catch {
    return null;
  }
}
