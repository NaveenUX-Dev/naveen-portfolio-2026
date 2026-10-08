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

## Deploying

See [docs/deployment.md](docs/deployment.md): Vercel launch steps, the
`SITE_URL` environment variable, preview indexing controls, the Firebase
migration plan, and search-console setup.
