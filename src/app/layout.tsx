import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { book, profile } from "#site/content";
import { SITE_URL } from "@/lib/site";
import { RunningHeader } from "@/components/layout/RunningHeader";
import { Footer } from "@/components/layout/Footer";
import { KeyboardShortcuts } from "@/components/search/KeyboardShortcuts";
import { themeInitScript } from "@/lib/theme";
import { skimInitScript } from "@/lib/skim";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// The working book title (docs/07) is marked "TODO: approve" and is
// therefore omitted (BUILD-LOG.md "Conflict resolutions"); metadata uses
// the confirmed name + headline draft instead.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Khalil — AI Engineer, LLMs, Agents & RAG",
    template: "%s — Khalil",
  },
  description:
    "AI engineer building agentic and retrieval-augmented systems that are honest about what they know.",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    url: profile.links.github,
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.huggingface].filter(
      Boolean,
    ),
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: book.title,
    description: book.subtitle,
    author: { "@type": "Person", name: profile.name },
  },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
        suppressHydrationWarning
      >
        <head>
          {/* Pre-paint theme + skim-mode scripts — avoid a flash of the wrong state. */}
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
          <script dangerouslySetInnerHTML={{ __html: skimInitScript }} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <a href="#main" className="skip-link font-ui">
            Skip to content
          </a>
          <RunningHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <KeyboardShortcuts />
        </body>
      </html>
    </ViewTransitions>
  );
}
