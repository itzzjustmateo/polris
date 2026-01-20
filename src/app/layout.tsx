import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polaris – AI-Powered Code Editor & IDE",
  description:
    "Polaris is a complete AI-powered professional IDE and code editor featuring CodeMirror 6 with syntax highlighting, code folding, minimap, instant AI code suggestions (Claude), quick editing, background job execution, multi-agent tools, SaaS business layer (auth, GitHub OAuth), error and LLM monitoring, in-browser code execution & live preview, and full GitHub integration.",
  keywords: [
    "Polaris",
    "AI code editor",
    "IDE",
    "CodeMirror 6",
    "syntax highlighting",
    "minimap",
    "AI code suggestions",
    "Claude AI",
    "code folding",
    "quick edit",
    "background jobs",
    "AI agents",
    "SaaS",
    "authentication",
    "GitHub OAuth",
    "GitHub integration",
    "error tracking",
    "LLM monitoring",
    "WebContainer",
    "live preview",
    "in-browser execution",
    "code import",
    "code export",
    "repository management",
    "Cursor",
    "Cursor Opertunity"
  ],
  authors: [{ name: "DevFlare Team", url: "https://dc.gg/developer" }],
  creator: "DevFlare Team",
  publisher: "ItzzJustMateo",
  openGraph: {
    title: "Polaris – AI-Powered Code Editor & IDE",
    description:
      "AI-powered professional code editor and IDE with real-time AI code suggestions, live preview, SaaS business layer, in-browser execution, and GitHub integration.",
    url: "https://polaris.vercel.app",
    type: "website",
    siteName: "Polaris",
    images: [
      {
        url: "https://polaris.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Polaris AI-powered code editor open graph image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@polaris",
    creator: "@polaris",
    title: "Polaris – AI-Powered Code Editor & IDE",
    description:
      "Polaris is a professional AI-first IDE featuring CodeMirror 6, Claude-powered code suggestions, in-browser execution, SaaS business layer, and GitHub integration.",
    images: ["https://polaris.example.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
