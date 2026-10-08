import Link from "next/link"
import { ContentContainer } from "@/components/common/content-container"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { SiteNav } from "@/components/layout/site-nav"
import { mainNavigation } from "@/config/navigation"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="border-b border-border-subtle bg-background">
      <ContentContainer className="relative flex h-8 items-center justify-between gap-1.5 sm:h-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-sm text-sm font-medium tracking-tight focus-ring"
        >
          <Monogram />
          {/* Visible from sm; screen readers always get the name. */}
          <span className="sr-only sm:not-sr-only">{siteConfig.name}</span>
        </Link>

        <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
          <SiteNav items={mainNavigation} />
        </div>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </ContentContainer>
    </header>
  )
}

/** "NK" as one ligature: the N's right stem is the K's spine. */
function Monogram() {
  return (
    <svg
      viewBox="0 0 42 28"
      aria-hidden
      className="h-3 w-auto shrink-0 text-text-primary"
      fill="currentColor"
    >
      <polygon points="0,0 5.5,0 16,19 16,0 21,0 21,28 15.5,28 5,9 5,28 0,28" />
      <polygon points="21,12.5 33.5,0 40.5,0 21,19.5" />
      <polygon points="25.6,15.6 29.4,11.8 42,28 35.2,28" />
    </svg>
  )
}
