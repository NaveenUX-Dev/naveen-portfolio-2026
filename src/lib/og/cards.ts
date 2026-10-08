import { siteConfig } from "@/config/site"
import { caseStudies } from "@/content/case-studies"
import { profile } from "@/content/profile"

/**
 * One social card per indexable page, served as a real .png file at
 * /og/<file>. A file extension keeps the image a plain static asset on any
 * host: the right Content-Type, and no trailing-slash redirect.
 */
export interface OgCardSpec {
  kicker: string
  title: string
  subtitle?: string
  footer: string
  /** Describes the card for people who cannot see it. */
  alt: string
}

export function ogCards(): Record<string, OgCardSpec> {
  const cards: Record<string, OgCardSpec> = {
    "home.png": {
      kicker: siteConfig.role,
      title: siteConfig.headline,
      footer: "Portfolio · Enterprise SaaS · AI products · Design systems",
      alt: `Naveen Kumar, ${siteConfig.role}: ${siteConfig.headline}`,
    },
    "about.png": {
      kicker: "About",
      title: `${profile.name}, ${profile.role}`,
      subtitle: `Based in ${profile.location.city}, ${profile.location.country}. Enterprise SaaS, AI-powered products and design systems.`,
      footer: "Experience · Specialisms · Contact",
      alt: `About ${profile.name}, ${profile.role} based in ${profile.location.city}, ${profile.location.country}`,
    },
  }

  for (const study of Object.values(caseStudies)) {
    const product = study.eyebrow.split(" · ")[0]
    cards[`work-${study.slug}.png`] = {
      kicker: product,
      title: study.title,
      subtitle: study.subtitle,
      footer: "Case study · Naveen Kumar, Product Designer",
      alt: `${product} case study by Naveen Kumar: ${study.title}`,
    }
  }

  return cards
}

/** Path of a page's card, e.g. ogImagePath("work-hrms.png") → "/og/work-hrms.png". */
export function ogImagePath(file: string) {
  return `/og/${file}`
}
