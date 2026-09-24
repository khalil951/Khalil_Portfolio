export const THEME_STORAGE_KEY = "book-theme";

/**
 * Inline, pre-paint script (docs/04): sets data-theme before first paint to
 * avoid FOUC. Light "Paper" is the default regardless of OS color-scheme
 * preference — "light is the default because books are read on paper"
 * (docs/04) — dark only applies once the reader has explicitly chosen it
 * via the toggle.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;
