# Deployment, domain migration and search setup

The site is a Next.js 16 App Router project built as a **static export**
(`output: "export"` in `next.config.ts`). Every route, including
`robots.txt`, `sitemap.xml` and the social images in `/og/*.png`, is
prerendered at build time. There is no server runtime, no middleware and no
rewrites.

## Build

| | |
|---|---|
| Install | `npm ci` |
| Build | `npm run build` (`next build`) |
| Output | `out/` (static files) |
| Checks | `npm run lint`, `npm run typecheck`, `npm run build` |

Trailing slashes are the canonical form for pages (`/about/`,
`/work/hrms/`). `next.config.ts` (`trailingSlash: true`) builds them that way,
`vercel.json` and `firebase.json` redirect the slashless form to them, and
files with an extension (`/sitemap.xml`, `/og/home.png`) are never
redirected.

## Environment variables

Current production: **`SITE_URL=https://naveenkumar-designs.vercel.app`** (chosen 2026-10-08). Google Search Console verifies it with the file `public/google7deee7c562411902.html`; do not delete that file. Vercel serves `.html` files from `public/` at a clean URL (`/google7deee7c562411902/`), so `vercel.json` rewrites the exact `.html` path Google checks to it.

| Name | Required | Value |
|---|---|---|
| `SITE_URL` | **Yes, on Vercel** (all environments) | The production origin only, e.g. `https://naveenkumar.design`. https, no path, no trailing slash. |

`SITE_URL` drives canonicals, the sitemap, structured-data IDs and
social-image URLs (`src/config/site-url.ts`). On Vercel the build **fails** if
it is missing, so no deployment can publish another host's canonicals. Set the
same production value for Preview too: previews are noindexed, so their
canonicals should point at production. Outside Vercel it falls back to the
current Firebase origin, `https://naveen2026-portfolio.web.app`.

Vercel's own system variables (`VERCEL`, `VERCEL_ENV`) are read
automatically; do not set them.

## Keeping previews out of search

1. **Vercel default:** preview deployments are served with
   `X-Robots-Tag: noindex`; the current production deployment is not.
2. **In the build:** when `VERCEL_ENV` is not `production`, every page gets
   `<meta name="robots" content="noindex, nofollow">` and `robots.txt`
   disallows everything. This covers the case Vercel's header does not: a
   custom domain assigned to a preview branch.
3. **Optional:** Vercel → Settings → Deployment Protection → Standard
   Protection puts previews behind Vercel login.

None of these can affect production: Vercel sets `VERCEL_ENV=production` on
production builds, and every non-Vercel build is treated as production.

## Vercel launch steps

1. Vercel → **Add New → Project** → import
   `NaveenUX-Dev/naveen-portfolio-2026`. Framework: Next.js, detected
   automatically. Leave the build and output settings at their defaults.
2. **Settings → Environment Variables:** add `SITE_URL` for Production and
   Preview. If the custom domain isn't ready, use the production
   `*.vercel.app` domain for now and change it once the domain is live.
3. Deploy. The first deployment of a new project is production.
4. **Settings → Domains:** add the custom domain and follow the DNS
   instructions. Pick one host (apex or `www`) and let Vercel redirect the
   other to it.
5. Set `SITE_URL` to that exact origin and **redeploy**, because the value is
   baked in at build time.
6. Verify on the production URL (see "Checks after deploying" below), then
   start the Firebase migration.

## Firebase → new domain migration

All page paths stay the same: `/`, `/about/`, `/work/hrms/`,
`/work/dopamint/`, `/work/megathil/`. No route has changed, so the
redirects are path-preserving with no route mapping.

**Activate only after the new production site is verified.** Then add the
following to `firebase.json` under `"hosting"` and run
`npm run deploy` (`next build && firebase deploy`) once more:

```json
"redirects": [
  {
    "source": "/:path*",
    "destination": "https://NEW-DOMAIN/:path",
    "type": 301
  }
]
```

Replace `NEW-DOMAIN` with the value of `SITE_URL`, without `https://`.
Afterwards, test that each old URL reaches its new page in a single hop:

```bash
curl -sI https://naveen2026-portfolio.web.app/work/hrms/ | grep -i -E "^(HTTP|location)"
```

If any request goes through two redirects (for example adding the trailing
slash on the new host), adjust the destination so each old URL lands on the
final new URL directly. Keep the Firebase project live for at least several
months so search engines and old links follow the redirects.

## Checks after deploying

Run against the live production URL:

- `/`, `/about/`, `/work/hrms/`, `/work/dopamint/`, `/work/megathil/` return
  200, with no `noindex` meta tag and no `X-Robots-Tag: noindex` header.
- `/robots.txt` returns text and lists the production sitemap URL.
- `/sitemap.xml` returns XML containing only the five URLs above.
- `/og/home.png` and the other cards return `image/png`.
- `/about` (no slash) 308-redirects to `/about/`.
- An unknown path such as `/does-not-exist/` returns 404.
- Test the structured data with Google's Rich Results Test and the
  Schema.org validator.
- Open a preview deployment and confirm it **does** send noindex.

## Search engines

These steps need your Google or Microsoft account; they have not been done.

**Google Search Console**
1. search.google.com/search-console → Add property → **Domain** property for
   the new domain, verified with the DNS TXT record Google gives you (add it
   wherever the domain's DNS is managed).
2. Sitemaps → submit `https://NEW-DOMAIN/sitemap.xml`.
3. URL Inspection → inspect `/`, `/about/` and one case study → "Test live
   URL" → "Request indexing".
4. If the Firebase site is a verified property, use **Settings → Change of
   address** once the redirects are active.

**Bing Webmaster Tools**
1. bing.com/webmasters → Add site. You can import the verified site from
   Google Search Console, or verify with the DNS record or meta tag.
2. Sitemaps → submit `https://NEW-DOMAIN/sitemap.xml`.
3. Optionally, URL Inspection → request indexing for the key pages.

Eligibility is not indexing. These steps let search engines find and
understand the pages; they do not guarantee indexing, ranking, or appearance
in AI answers.

## Missing facts (not published until confirmed)

- **Project dates** for each case study (HRMS, Dopamint, Megathil).
- **Measured results:** the résumé lists −35% admin steps, +22% HR task
  completion and ~25% shorter design cycles. They are not on the site until
  confirmed as measured, with what was measured and how.
- **Availability, notice period, and work preferences** (remote, hybrid,
  relocation).
- **HRMS AI features:** the résumé says AI-powered employee experiences were
  designed, but the case study presents AI as a proposal. Confirm what was
  designed and what shipped.
- **Phone number:** in the résumé but deliberately not on the site.
- **GPTBot (model training):** `robots.txt` sets no rule for it, which means
  it falls under the general allow. Add `User-agent: GPTBot` /
  `Disallow: /` in `src/app/robots.ts` if you don't want your content used
  for training. This is separate from search (OAI-SearchBot is allowed).

## Known limitation

Next 16's static export writes link-prefetch payloads as nested files
(`/work/hrms/__next.work/$d$slug/__PAGE__.txt`), while the client requests a
dot-joined name (`__next.work.$d$slug.__PAGE__.txt`). On Firebase that
prefetch request returns 404 and logs a console error. Navigation still works
because the router falls back to a normal request. Re-check on Vercel after
the first deploy.
