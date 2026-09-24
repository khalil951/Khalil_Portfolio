import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // A single `serve out` instance plus many parallel Chromium instances
  // overloaded this machine — even at 2 workers, the very first batch of
  // tests (whichever pages happened to start cold) would occasionally hit
  // 30s navigation timeouts, while every one of those same tests passed in
  // under 2s when rerun individually. Sequential is the only setting that
  // was reliably clean here; if this ever runs on a more capable CI
  // runner, raise it back up.
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
