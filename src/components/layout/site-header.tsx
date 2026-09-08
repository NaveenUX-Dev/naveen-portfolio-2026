import Link from "next/link"
import { ContentContainer } from "@/components/common/content-container"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { mainNavigation } from "@/config/navigation"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="bg-background">
      <ContentContainer className="flex h-8 items-center justify-between gap-3 sm:h-10">
        <Link href="/" className="text-sm font-medium tracking-tight focus-ring">
          <span className="xs:hidden">{siteConfig.shortName}</span>
          <span className="hidden xs:inline">{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav aria-label="Main">
            <ul className="flex items-center gap-2 sm:gap-4">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary transition-standard hover:text-text-primary focus-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </ContentContainer>
    </header>
  )
}
