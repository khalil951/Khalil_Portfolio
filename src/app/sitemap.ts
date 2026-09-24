import type { MetadataRoute } from "next";
import { chapters, sections } from "#site/content";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "/",
  "/contents",
  "/preface",
  "/book-index",
  "/map",
  "/bibliography",
  "/colophon",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...chapters.map((c) => `/chapters/${c.number}`),
    ...sections.map((s) => `/chapters/${s.chapter}/${s.slug}`),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
