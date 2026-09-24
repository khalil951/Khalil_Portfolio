/**
 * The production domain is an open question (docs/06 "Still open: Domain
 * name") — never guessed. Set NEXT_PUBLIC_SITE_URL at deploy time; this
 * placeholder only affects sitemap.xml/robots.txt absolute URLs locally.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
