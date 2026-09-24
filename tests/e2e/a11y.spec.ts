import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  { name: "cover", path: "/" },
  { name: "chapter", path: "/chapters/3" },
  { name: "project", path: "/chapters/3/xpress-ppm-agent" },
  { name: "map", path: "/map" },
];

const THEMES = ["light", "dark"] as const;

const BREAKPOINTS = [
  { name: "360", width: 360, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

for (const pageDef of PAGES) {
  for (const theme of THEMES) {
    for (const bp of BREAKPOINTS) {
      test(`axe: ${pageDef.name} — ${theme} — ${bp.name}px — zero violations`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: bp.width, height: bp.height });
        if (theme === "dark") {
          await page.addInitScript(() => {
            localStorage.setItem("book-theme", "dark");
          });
        }
        await page.goto(pageDef.path);
        await page.waitForLoadState("networkidle");

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
          .analyze();

        expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
      });
    }
  }
}
