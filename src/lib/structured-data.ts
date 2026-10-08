import { absoluteUrl, siteUrl } from "@/config/site-url"
import { siteConfig } from "@/config/site"
import { profile } from "@/content/profile"
import type { StoryCaseStudy } from "@/types/story-case-study"

/*
 * schema.org JSON-LD. Every value mirrors visible page content: nothing here
 * appears only to search engines. No ratings, reviews, awards or invented
 * dates. Stable @ids let pages reference the same Person and WebSite.
 */

type JsonLd = Record<string, unknown>

export const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
}

/** The full Person entity; published once, on the About page. */
export function personEntity(): JsonLd {
  const current = profile.employer.roles[0]

  return {
    "@type": "Person",
    "@id": ids.person,
    name: profile.name,
    jobTitle: profile.role,
    url: absoluteUrl("/about/"),
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.countryCode,
    },
    worksFor: {
      "@type": "Organization",
      name: profile.employer.name,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: current.title,
    },
    alumniOf: profile.education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution,
    })),
    knowsAbout: [...profile.skills],
    sameAs: profile.profiles.map((item) => item.url),
  }
}

/** A light reference to the Person, for pages that are not the profile. */
function personRef(): JsonLd {
  return { "@type": "Person", "@id": ids.person, name: profile.name, url: absoluteUrl("/about/") }
}

export function homeGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: absoluteUrl("/"),
        name: `${siteConfig.name} — ${siteConfig.role}`,
        inLanguage: "en",
        author: personRef(),
        publisher: personRef(),
      },
    ],
  }
}

export function aboutGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl("/about/")}#profilepage`,
        url: absoluteUrl("/about/"),
        name: `About ${profile.name}`,
        inLanguage: "en",
        isPartOf: { "@id": ids.website },
        mainEntity: personEntity(),
      },
    ],
  }
}

export function caseStudyGraph(study: StoryCaseStudy, image?: string): JsonLd {
  const url = absoluteUrl(`/work/${study.slug}/`)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: study.title,
        alternativeHeadline: study.subtitle,
        description: study.metadata.description,
        inLanguage: "en",
        genre: "Product design case study",
        about: { "@type": "Thing", name: study.eyebrow.split(" · ")[0] },
        author: personRef(),
        isPartOf: { "@id": ids.website },
        ...(image ? { image: absoluteUrl(image) } : {}),
      },
    ],
  }
}

/** Serialise for a <script> tag without allowing "</script>" injection. */
const LINE_SEPARATOR = new RegExp(String.fromCharCode(0x2028), "g")
const PARAGRAPH_SEPARATOR = new RegExp(String.fromCharCode(0x2029), "g")

export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(LINE_SEPARATOR, "\\u2028")
    .replace(PARAGRAPH_SEPARATOR, "\\u2029")
}
