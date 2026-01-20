import { ThemeProvider } from "@/components/provider/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    "Cursor opportunity"
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
    // images: [
    //   {
    //     url: "https://polaris.example.com/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Polaris AI-powered code editor open graph image",
    //   },
    // ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@polaris",
  //   creator: "@polaris",
  //   title: "Polaris – AI-Powered Code Editor & IDE",
  //   description:
  //     "Polaris is a professional AI-first IDE featuring CodeMirror 6, Claude-powered code suggestions, in-browser execution, SaaS business layer, and GitHub integration.",
  //   images: ["https://polaris.vercel.app/og-image.png"],
  // },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/**
 * Root layout component that wraps the application with Clerk and theme providers, renders authentication controls in a header, and hosts page content.
 *
 * @param children - The page content to render inside the layout
 * @returns The root HTML structure containing ClerkProvider, ThemeProvider, a header with authentication controls (Sign In / Sign Up or UserButton), and the provided `children`
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
      }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={
            cn(
              fontSans.variable,
              fontMono.variable,
              'min-h-screen antialiased',
            )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <Button variant={"secondary"}>
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}