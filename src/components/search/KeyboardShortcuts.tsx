"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { chapters } from "#site/content";
import { SKIM_STORAGE_KEY } from "@/lib/skim";
import { SearchModal } from "./SearchModal";
import { HelpOverlay } from "./HelpOverlay";

const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

/** docs/04 "Keyboard (power-reader affordances)": ← → t / s m ?. */
export function KeyboardShortcuts() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInstance, setSearchInstance] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSkim = useCallback(() => {
    const isSkim = document.documentElement.getAttribute("data-skim") === "true";
    if (isSkim) {
      document.documentElement.removeAttribute("data-skim");
    } else {
      document.documentElement.setAttribute("data-skim", "true");
    }
    try {
      localStorage.setItem(SKIM_STORAGE_KEY, String(!isSkim));
    } catch {
      // localStorage unavailable — skim mode still applies for this page view.
    }
  }, []);

  const goToAdjacentChapter = useCallback(
    (direction: -1 | 1) => {
      const match = pathname?.match(/^\/chapters\/(\d+)/);
      if (!match) return;
      const current = Number(match[1]);
      const index = sortedChapters.findIndex((c) => c.number === current);
      if (index === -1) return;
      const target = sortedChapters[index + direction];
      if (target) router.push(`/chapters/${target.number}`);
    },
    [pathname, router],
  );

  const openMobileToc = useCallback(() => {
    const details = document.querySelector<HTMLDetailsElement>(".chapter-toc-mobile");
    if (details) {
      details.open = true;
      details.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push("/contents");
  }, [router]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;

      if (e.key === "Escape") {
        setSearchOpen(false);
        setHelpOpen(false);
        return;
      }
      if (searchOpen || helpOpen) return; // don't fire other shortcuts while a modal is open

      switch (e.key) {
        case "ArrowLeft":
          goToAdjacentChapter(-1);
          break;
        case "ArrowRight":
          goToAdjacentChapter(1);
          break;
        case "t":
          openMobileToc();
          break;
        case "/":
          e.preventDefault(); // don't trigger the browser's own find-in-page
          setSearchInstance((n) => n + 1); // force a fresh SearchModal instance
          setSearchOpen(true);
          break;
        case "s":
          toggleSkim();
          break;
        case "m":
          router.push("/map");
          break;
        case "?":
          setHelpOpen(true);
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, helpOpen, goToAdjacentChapter, openMobileToc, toggleSkim, router]);

  return (
    <>
      <SearchModal key={searchInstance} open={searchOpen} onClose={() => setSearchOpen(false)} />
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
