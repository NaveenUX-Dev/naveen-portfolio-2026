import type { MetadataRoute } from "next"
import { absoluteUrl, isIndexable } from "@/config/site-url"

// Static export: metadata routes must be explicitly static.
export const dynamic = "force-static"

/**
 * Production: everything public is crawlable, OpenAI's search crawler is
 * named explicitly, and nothing that renders pages is blocked. No GPTBot
 * (model-training) rule is set: that is a separate owner decision.
 * Vercel preview builds disallow everything (see isIndexable).
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] }
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
