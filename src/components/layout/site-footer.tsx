import Link from "next/link"
import { ContentContainer } from "@/components/common/content-container"
import { mainNavigation } from "@/config/navigation"
import { siteConfig, socialLinks } from "@/config/site"

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-10 border-t border-border-subtle bg-background"
    >
      <ContentContainer className="flex flex-col gap-8 py-10 sm:py-14">
        <div className="flex flex-col gap-2">
          <p className="text-text-secondary">{siteConfig.contactPrompt}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="w-fit max-w-full break-all font-serif text-lg transition-standard hover:text-accent-olive-strong focus-ring xs:text-xl sm:text-2xl lg:text-3xl"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-border-subtle pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-text-primary">{siteConfig.name}</p>
            <p className="text-sm text-text-secondary">{siteConfig.role}</p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {/* Contact is this footer, so it isn't linked from here. */}
                {mainNavigation
                  .filter((item) => item.href !== "/#contact")
                  .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-text-secondary transition-standard hover:text-text-primary focus-ring"
                    >
                      {item.label}
                      {item.external ? (
                        <span className="sr-only"> (opens in a new tab)</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="block text-text-secondary transition-standard hover:text-text-primary focus-ring"
                  >
                    <Icon className="size-2" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ContentContainer>
    </footer>
  )
}
