import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/config/site-url"
import { caseStudies } from "@/content/case-studies"

// Static export: metadata routes must be explicitly static.
export const dynamic = "force-static"

/**
 * Only real, canonical, indexable pages. No `lastModified`: there is no
 * genuine per-page modification date yet, and stamping every build with
 * today's date would claim freshness the content does not have.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about/",
    ...Object.keys(caseStudies).map((slug) => `/work/${slug}/`),
  ]

  return paths.map((path) => ({ url: absoluteUrl(path) }))
}
