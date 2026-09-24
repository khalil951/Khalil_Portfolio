/**
 * Design tokens — single source of truth, mirrored in src/app/globals.css.
 * docs/04-design-direction.md § Color tokens.
 */
export const lightTokens = {
  paper: "#FBF8F1",
  "paper-2": "#F3EEE3",
  ink: "#1C1B19",
  "ink-muted": "#5E5A52",
  rule: "#DDD5C5",
  rubric: "#9E2B25",
  grounded: "#2F6B4F",
  pending: "#8A6200",
  concept: "#3E4C9B",
} as const;

export const darkTokens = {
  paper: "#15130F",
  "paper-2": "#1D1A15",
  ink: "#E9E4D8",
  "ink-muted": "#A39D90",
  rule: "#3A352C",
  rubric: "#E0735F",
  grounded: "#6FC19A",
  pending: "#E2B85A",
  concept: "#95A1F0",
} as const;

export type TokenName = keyof typeof lightTokens;

/** Backgrounds text can legitimately sit on. */
export const backgroundTokens: TokenName[] = ["paper", "paper-2"];

/** Tokens used to render text (status labels, links, body copy). */
export const textTokens: TokenName[] = [
  "ink",
  "ink-muted",
  "rubric",
  "grounded",
  "pending",
  "concept",
];
