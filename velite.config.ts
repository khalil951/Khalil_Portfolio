import { defineConfig, s } from "velite";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { runPrepare } from "./scripts/velite-prepare";

const linksSchema = s
  .object({
    repo: s.string().optional(),
    demo: s.string().optional(),
    report: s.string().optional(),
    slides: s.string().optional(),
  })
  .optional();

const resultsSchema = s
  .object({
    measured: s.array(s.string()).optional(),
    observed: s.array(s.string()).optional(),
    pending: s.array(s.string()).optional(),
  })
  .optional();

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    book: {
      name: "Book",
      pattern: "book.yaml",
      single: true,
      schema: s.object({
        title: s.string(),
        subtitle: s.string(),
        edition: s.string(),
      }),
    },
    profile: {
      name: "Profile",
      pattern: "profile.yaml",
      single: true,
      schema: s.object({
        name: s.string(),
        shortName: s.string(),
        headline: s.string(),
        location: s.string(),
        status: s.string(),
        availability: s.string(),
        links: s.object({
          github: s.string().optional(),
          huggingface: s.string().optional(),
          linkedin: s.string().optional(),
          email: s.string().optional(),
        }),
        bio: s.string(),
        topSystems: s.array(s.string()),
        principles: s.array(s.string()),
        currentlyExploring: s.array(s.string()),
        education: s.array(
          s.object({
            institution: s.string(),
            location: s.string().optional(),
            program: s.string(),
            period: s.string(),
            note: s.string().optional(),
            coursework: s.array(s.string()).optional(),
          }),
        ),
        certifications: s.array(s.object({ name: s.string() })),
        awards: s.array(s.object({ title: s.string(), detail: s.string() })),
        leadership: s.array(
          s.object({ role: s.string(), period: s.string(), detail: s.string() }),
        ),
        softSkills: s.array(s.object({ title: s.string(), detail: s.string() })),
        workingStyle: s.array(s.object({ title: s.string(), detail: s.string() })),
        languages: s.array(s.object({ name: s.string(), level: s.string() })),
      }),
    },
    experience: {
      name: "ExperienceEntry",
      pattern: "experience.yaml",
      schema: s.object({
        role: s.string(),
        org: s.string(),
        location: s.string().optional(),
        period: s.string(),
        bullets: s.array(s.string()),
        relatedSection: s.string().optional(),
      }),
    },
    epigraphs: {
      name: "Epigraph",
      pattern: "epigraphs.yaml",
      schema: s.object({
        id: s.string(),
        quote: s.string(),
        author: s.string(),
        source: s.string(),
        verified: s.boolean(),
      }),
    },
    bibliography: {
      name: "Work",
      pattern: "bibliography.yaml",
      schema: s.object({
        id: s.string(),
        authors: s.string(),
        title: s.string(),
        venue: s.string(),
        year: s.number(),
        url: s.string().optional(),
      }),
    },
    concepts: {
      name: "Concept",
      pattern: "concepts.yaml",
      schema: s.object({
        id: s.string(),
        label: s.string(),
        definition: s.string(),
      }),
    },
    skills: {
      name: "Skill",
      pattern: "skills.yaml",
      schema: s.object({
        id: s.string(),
        label: s.string(),
        group: s.string(),
      }),
    },
    chapters: {
      name: "Chapter",
      pattern: "chapters/*/index.mdx",
      schema: s.object({
        number: s.number(),
        roman: s.string(),
        slug: s.string(),
        title: s.string(),
        subtitle: s.string(),
        abstract: s.string().min(1),
        epigraph: s.string().optional(),
        content: s.mdx(),
        raw: s.raw(),
        metadata: s.metadata(),
      }),
    },
    sections: {
      name: "Section",
      pattern: "chapters/{03-systems,04-experiments}/!(index).mdx",
      schema: s
        .object({
          chapter: s.number(),
          order: s.number(),
          slug: s.slug("sections"),
          title: s.string(),
          abstract: s.string().min(1),
          kind: s.enum(["project", "experience", "study", "note"]),
          status: s
            .enum(["Shipped", "MVP", "In progress", "Design phase", "Concept"])
            .optional(),
          role: s.string().optional(),
          period: s.string().optional(),
          context: s.string().optional(),
          stack: s.array(s.string()).optional(),
          concepts: s.array(s.string()).optional(),
          related: s.array(s.string()).optional(),
          trace: s.string().optional(),
          links: linksSchema,
          results: resultsSchema,
          // CLAUDE.md rule 7 (outranks docs/05's generic schema per BUILD-LOG.md
          // priority order): the Breast Cancer project's safety disclaimer is a
          // required, visible field — not folded into free-form body prose.
          safety: s.string().optional(),
          content: s.mdx(),
          raw: s.raw(),
        })
        .transform((d) => ({ ...d, section: `${d.chapter}.${d.order}` })),
    },
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
  prepare: runPrepare,
});
