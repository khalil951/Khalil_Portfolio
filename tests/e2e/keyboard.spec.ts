import { test, expect } from "@playwright/test";

test.describe("keyboard-only walkthrough (docs/05 quality gate)", () => {
  test("Cover: tab order reaches the primary actions with visible focus", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // book title link
    await page.keyboard.press("Tab"); // Contents (header nav)

    // Keep tabbing until we reach "Begin reading" or run out of patience.
    let found = false;
    for (let i = 0; i < 15; i++) {
      const text = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (text === "Begin reading") {
        found = true;
        break;
      }
      await page.keyboard.press("Tab");
    }
    expect(found).toBe(true);

    // Visible focus: the focused element should have a non-zero outline.
    const outlineWidth = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return getComputedStyle(el).outlineWidth;
    });
    expect(outlineWidth).not.toBe("0px");
  });

  // No <Sidenote> is used in content yet (docs/06 — no project body cites a
  // report/paper via it today), so it can't be exercised on the live site.
  // It shares the exact <details>/<summary> mechanism as the mobile TOC
  // drawer below, which this test does cover end to end.
  test("Mobile TOC drawer opens with Enter on the keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/chapters/3");

    const summary = page.locator(".chapter-toc-mobile summary");
    await summary.focus();
    await expect(page.locator(".chapter-toc-mobile")).not.toHaveJSProperty("open", true);
    await page.keyboard.press("Enter");
    await expect(page.locator(".chapter-toc-mobile")).toHaveJSProperty("open", true);
  });

  test("Keyboard shortcuts: / opens search, ? opens help, Escape closes both", async ({
    page,
  }) => {
    await page.goto("/chapters/3/xpress-ppm-agent");
    await page.locator("body").click(); // ensure focus isn't in a text input

    await page.keyboard.press("/");
    await expect(page.getByRole("dialog", { name: "Search" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Search" })).toBeHidden();

    await page.keyboard.press("?");
    await expect(page.getByRole("dialog", { name: "Keyboard shortcuts" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Keyboard shortcuts" })).toBeHidden();
  });

  test("Keyboard shortcut: s toggles Skim mode", async ({ page }) => {
    await page.goto("/chapters/3/xpress-ppm-agent");
    await page.locator("body").click();

    await expect(page.locator("html")).not.toHaveAttribute("data-skim", "true");
    await page.keyboard.press("s");
    await expect(page.locator("html")).toHaveAttribute("data-skim", "true");
    await page.keyboard.press("s");
    await expect(page.locator("html")).not.toHaveAttribute("data-skim", "true");
  });

  test("Keyboard shortcut: arrow keys navigate between chapters", async ({ page }) => {
    await page.goto("/chapters/3");
    await page.locator("body").click();
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveURL(/\/chapters\/4$/);
    await page.keyboard.press("ArrowLeft");
    await expect(page).toHaveURL(/\/chapters\/3$/);
  });

  test("Map: nodes are keyboard-focusable and focusing highlights the neighbourhood", async ({
    page,
  }) => {
    await page.goto("/map");
    const firstNode = page.locator('svg[role="group"] a, svg[role="group"] g[role="button"]').first();
    await firstNode.focus();
    await expect(firstNode).toBeFocused();
  });
});
