import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { RunningHeader } from "@/components/layout/RunningHeader";
import { Footer } from "@/components/layout/Footer";
import { themeInitScript } from "@/lib/theme";
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
  title: {
    default: "Khalil — AI Engineer, LLMs, Agents & RAG",
    template: "%s — Khalil",
  },
  description:
    "AI engineer building agentic and retrieval-augmented systems that are honest about what they know.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        {/* Pre-paint theme script — avoids a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link font-ui">
          Skip to content
        </a>
        <RunningHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
