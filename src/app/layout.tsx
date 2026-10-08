import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ThemeProvider } from "@/features/theme/components/theme-provider"
import { siteConfig } from "@/config/site"
import { isIndexable, siteUrl } from "@/config/site-url"
import "./globals.css"

const editorial = Fraunces({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
})

const neutral = Inter({
  subsets: ["latin"],
  variable: "--font-neutral",
  display: "swap",
})

const fontVariables = [editorial.variable, neutral.variable].join(" ")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.summary,
  // Each page sets its own canonical, Open Graph and Twitter metadata. Only
  // Vercel preview builds are noindexed; production never is (site-url.ts).
  robots: isIndexable ? undefined : { index: false, follow: false },
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={fontVariables}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-surface-elevated focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>

          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
