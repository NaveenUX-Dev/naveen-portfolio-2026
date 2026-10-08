/**
 * The one source of the public site origin. Canonicals, the sitemap,
 * structured-data IDs and social-image URLs all derive from `siteUrl`.
 *
 * - Set `SITE_URL` (e.g. https://example.com) to the final production origin.
 * - On Vercel the build fails without it, so no deployment can silently ship
 *   another host's canonicals. It is never derived from request headers or
 *   from a deployment's own *.vercel.app URL.
 * - Elsewhere (local builds, the current Firebase Hosting deploys) it falls
 *   back to the pre-migration production host below.
 */
const PRE_MIGRATION_ORIGIN = "https://naveen2026-portfolio.web.app"

function resolveSiteUrl(): string {
  const raw = process.env.SITE_URL?.trim()

  if (!raw) {
    if (process.env.VERCEL === "1") {
      throw new Error(
        "SITE_URL is not set. Add it in Vercel → Project → Settings → Environment Variables (e.g. https://your-domain.com) before deploying.",
      )
    }
    return PRE_MIGRATION_ORIGIN
  }

  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw new Error(`SITE_URL is not a valid URL: "${raw}"`)
  }

  const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1"
  if (url.protocol !== "https:" && !isLocal) {
    throw new Error(`SITE_URL must use https: "${raw}"`)
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(`SITE_URL must be an origin only, with no path: "${raw}"`)
  }

  return url.origin
}

/** Origin with no trailing slash, e.g. "https://example.com". */
export const siteUrl = resolveSiteUrl()

/**
 * Whether this build may be indexed. Only Vercel *preview* builds are
 * excluded; production on Vercel (VERCEL_ENV=production) and every
 * non-Vercel build stay indexable, so this cannot switch production off.
 */
export const isIndexable =
  process.env.VERCEL !== "1" || process.env.VERCEL_ENV === "production"

/**
 * Absolute URL for a site path, following the site's trailing-slash rule:
 * pages end in "/", files (anything with an extension) do not.
 */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  const isFile = /\.[a-z0-9]+$/i.test(clean)
  const withSlash = isFile || clean.endsWith("/") ? clean : `${clean}/`
  return `${siteUrl}${withSlash}`
}
