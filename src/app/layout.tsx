import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import ScrollToTop from "@/components/ScrollToTop";
import MattieTechAI from "@/components/MattieTechAI";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL("https://mattietech.dev"),
  title: `${profile.name} — ${profile.brand}`,
  description:
    "Matthew Aliu (MattieTech) — Software Engineering student building full-stack and AI-powered products. Portfolio, projects, certificates and contact.",
  keywords: [
    "Matthew Aliu",
    "MattieTech",
    "Software Engineer",
    "Software Engineering Student",
    "CUSTECH",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Nigeria Software Engineer",
  ],
  authors: [{ name: "Matthew Aliu" }],
  creator: "Matthew Aliu",
  openGraph: {
    title: `${profile.name} — ${profile.brand}`,
    description: profile.status,
    url: "https://mattietech.dev",
    siteName: "MattieTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.brand}`,
    description: profile.status,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0F" },
    { media: "(prefers-color-scheme: light)", color: "#F6F4EF" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollProgress />
        <CursorGlow />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-signal focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SmoothScroll>
            {children}
            <ScrollToTop />
            <MattieTechAI />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
