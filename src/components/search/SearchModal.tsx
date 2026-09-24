"use client";

import { useEffect, useRef, useState } from "react";
import { loadPagefind, type PagefindResult } from "@/lib/pagefind";

interface ResultView {
  url: string;
  title: string;
  excerpt: string;
}

/**
 * "/" search the Index (docs/04 keyboard shortcuts) — Pagefind over the
 * static export. The parent (KeyboardShortcuts) remounts this with a fresh
 * `key` each time it opens, so state starts clean without an effect-driven
 * reset.
 */
export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultView[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "unavailable">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmed = query.trim();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || trimmed.length < 2) return;
    let cancelled = false;

    (async () => {
      setStatus("loading");
      const pagefind = await loadPagefind();
      if (!pagefind) {
        if (!cancelled) setStatus("unavailable");
        return;
      }
      const { results: raw } = await pagefind.search(trimmed);
      const top = await Promise.all(
        raw.slice(0, 8).map(async (r: PagefindResult) => {
          const data = await r.data();
          return { url: data.url, title: data.meta.title ?? data.url, excerpt: data.excerpt };
        }),
      );
      if (!cancelled) {
        setResults(top);
        setStatus("idle");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [trimmed, open]);

  if (!open) return null;

  const showResults = trimmed.length >= 2;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-paper border border-rule rounded-sm p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
          placeholder="Search the book…"
          className="w-full font-ui text-lg bg-transparent outline-none border-b border-rule pb-2"
        />

        <div className="mt-4 flex flex-col gap-3 max-h-80 overflow-y-auto">
          {showResults && status === "unavailable" ? (
            <p className="text-sm text-ink-muted">
              Search isn&apos;t available in this environment (Pagefind indexes the static build —
              try the deployed site).
            </p>
          ) : null}
          {showResults && status === "loading" ? (
            <p className="text-sm text-ink-muted">Searching…</p>
          ) : null}
          {showResults
            ? results.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  className="block font-ui text-sm hover:bg-paper-2 rounded-sm p-2 -mx-2"
                  onClick={onClose}
                >
                  <span className="font-medium">{r.title}</span>
                  <span
                    className="block text-ink-muted mt-0.5"
                    dangerouslySetInnerHTML={{ __html: r.excerpt }}
                  />
                </a>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
