import { describe, expect, it } from "vitest";
import { contrastRatio, WCAG_AA_TEXT } from "@/lib/contrast";
import { backgroundTokens, darkTokens, lightTokens, textTokens } from "@/lib/tokens";

describe("token contrast — WCAG AA (4.5:1) for every text/background pair, both themes", () => {
  const themes = { light: lightTokens, dark: darkTokens };

  for (const [themeName, tokens] of Object.entries(themes)) {
    for (const bg of backgroundTokens) {
      for (const text of textTokens) {
        it(`${themeName}: ${text} on ${bg} is >= ${WCAG_AA_TEXT}:1`, () => {
          const ratio = contrastRatio(tokens[text], tokens[bg]);
          expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_TEXT);
        });
      }
    }
  }
});
