import { test, expect } from "@playwright/test";

const PAGES = ["/", "/contents", "/chapters/3", "/chapters/3/xpress-ppm-agent", "/map"];

const BREAKPOINTS = [
  { name: "360", width: 360, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

for (const path of PAGES) {
  for (const bp of BREAKPOINTS) {
    test(`no horizontal overflow: ${path} at ${bp.name}px`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
}

test("Cover: key facts visible without scrolling at 1280x720 (docs/04 UX rule)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  const keyFacts = page.locator("dl", { hasText: "Role" });
  await expect(keyFacts).toBeInViewport();
});

test("Contents: chapter list visible without scrolling at 1280x720 (docs/04 UX rule)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/contents");
  const firstChapter = page.locator("h2").first();
  await expect(firstChapter).toBeInViewport();
});

test("Both themes render without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/chapters/3/xpress-ppm-agent");
  await page.waitForLoadState("networkidle");

  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });
  await page.waitForTimeout(200);

  expect(errors).toEqual([]);
});
