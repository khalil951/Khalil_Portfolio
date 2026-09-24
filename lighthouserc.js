/** docs/05 quality gate: Lighthouse >= 95 in all categories on Cover, a chapter and /map. */
module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:4173/",
        "http://localhost:4173/chapters/3",
        "http://localhost:4173/map",
      ],
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci",
    },
  },
};
