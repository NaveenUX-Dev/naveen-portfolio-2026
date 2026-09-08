# Naveen Kumar — Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run typecheck
npm run build
```

## Spacing

Tailwind's spacing scale is redefined in `src/app/globals.css` as
`--spacing: 8px`, so every numeric utility is an 8px multiple:

| Utility | Value |
| ------- | ----- |
| `p-0.5` | 4px (half-step; sub-component use only) |
| `p-1`   | 8px  |
| `p-2`   | 16px |
| `p-3`   | 24px |
| `p-6`   | 48px |
| `p-8`   | 64px |

Section rhythm comes from the `section-y` utility (80 / 112 / 128px), page
gutters from `container-page` (24 / 40 / 64px).

## Breakpoints

| Name | Min width |
| ---- | --------- |
| `xs` | 360px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

## Before shipping

- `src/config/site.ts` — `heroStats` values are taken from the mockup and are
  **not verified**. Replace them with real figures or delete the array.
- `src/config/site.ts` — `url`, `email` and `socialLinks` hrefs are
  placeholders.
- `src/config/navigation.ts` — `/work`, `/about`, `/contact`, `/resume` routes
  do not exist yet; the landing page links to them.
- `public/images/projects/` — drop real covers in and set `coverImage` on each
  project in `src/config/projects.ts` to replace the CSS placeholder frames.
