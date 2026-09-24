export const SKIM_STORAGE_KEY = "book-skim";

/**
 * Pre-paint script (docs/07): Skim mode is "persistent in the header" —
 * read before first paint, same reasoning as the theme script (avoids a
 * flash of full prose that then collapses).
 */
export const skimInitScript = `
(function () {
  try {
    if (localStorage.getItem('${SKIM_STORAGE_KEY}') === 'true') {
      document.documentElement.setAttribute('data-skim', 'true');
    }
  } catch (e) {}
})();
`;
