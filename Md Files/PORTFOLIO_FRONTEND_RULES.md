# Portfolio Frontend Rules

## Purpose

This file is the implementation source of truth for Naveen Kumar's portfolio website.

The portfolio should feel like:

- warm optimistic futurism
- premium and editorial
- calm, human-centered technology
- cinematic but not flashy
- futuristic without looking cyberpunk
- expressive in presentation, disciplined in product UX
- maintainable, fast, accessible, and production-ready

The site should NOT become:

- a generic SaaS template
- a neon crypto website
- a heavy 3D experiment
- a collection of unrelated visual effects
- a page full of hardcoded values
- an over-engineered application

When implementing any feature, follow this file before creating new architecture.

---

# 1. Required Tech Stack

Use this stack unless there is a clear technical reason not to.

```text
Next.js 16
React 19
TypeScript
Tailwind CSS v4
CSS Variables / Design Tokens
shadcn/ui with Base UI foundation
Motion for React
Lucide React
MDX or local structured content
Next/Image
next/font
Vercel
GitHub
```

Optional:

```text
React Three Fiber
```

Use React Three Fiber only for one carefully controlled signature 3D artifact if the visual cannot be achieved efficiently with CSS, SVG, images, and Motion.

Do not introduce new frameworks or libraries without checking whether the existing stack can solve the requirement first.

---

# 2. Do Not Add These by Default

Do NOT install these unless a real implementation requirement proves they are needed.

```text
Redux
Zustand
React Query
Supabase
Firebase
Prisma
PostgreSQL
Sanity
Contentful
Strapi
GSAP
Lenis
Three.js throughout the website
Large animation libraries
Multiple icon libraries
Multiple UI component libraries
```

The portfolio is a content-driven website, not a large enterprise application.

Prefer the simplest architecture that remains scalable.

---

# 3. Core Architecture Principle

The website should follow this dependency direction:

```text
Pages
  ↓
Features
  ↓
Common Components
  ↓
UI Primitives
  ↓
Design System
  ↓
Design Tokens
```

Never reverse this dependency.

Bad:

```text
page.tsx
  ↓
hardcoded color
hardcoded shadow
hardcoded animation
hardcoded layout logic
```

Good:

```text
page.tsx
  ↓
Feature Component
  ↓
Reusable Component
  ↓
Semantic Design Tokens
```

Pages should compose the product.

Pages should not become the design system.

---

# 4. Required Project Structure

Use the following structure.

```text
portfolio/
│
├── public/
│   ├── images/
│   │   ├── projects/
│   │   ├── hero/
│   │   ├── about/
│   │   └── shared/
│   │
│   ├── icons/
│   └── assets/
│
├── src/
│   │
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── layout/
│   │   └── motion/
│   │
│   ├── features/
│   │   ├── hero/
│   │   ├── portfolio/
│   │   ├── case-study/
│   │   ├── capabilities/
│   │   ├── about/
│   │   ├── contact/
│   │   └── theme/
│   │
│   ├── content/
│   │   └── projects/
│   │       ├── dopamint.mdx
│   │       ├── megathil.mdx
│   │       └── hrms.mdx
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── metadata/
│   │   ├── animation/
│   │   └── content/
│   │
│   ├── config/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   └── projects.ts
│   │
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── light.css
│   │   ├── dark.css
│   │   └── utilities.css
│   │
│   └── types/
│       ├── project.ts
│       └── global.ts
│
├── components.json
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

Do not create directories that have no actual use.

Do not create empty architecture for imagined future requirements.

---

# 5. Folder Responsibility Rules

## `src/app`

Contains:

- routes
- layouts
- metadata
- page composition
- route-level loading/error/not-found states

Do not place large reusable UI or business/content logic here.

A page should ideally look like:

```tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <CapabilitiesSection />
      <ClosingCTA />
    </>
  )
}
```

---

## `src/components/ui`

Contains low-level, reusable, business-agnostic primitives.

Examples:

```text
button.tsx
badge.tsx
card.tsx
dialog.tsx
tooltip.tsx
tabs.tsx
separator.tsx
accordion.tsx
```

Rules:

- keep generic
- keep accessible
- no portfolio-specific copy
- no case-study-specific logic
- no API calls
- no content fetching
- use variants instead of duplicate components

Bad:

```text
dopamint-button.tsx
portfolio-green-card.tsx
megathil-dialog.tsx
```

Good:

```text
button.tsx
card.tsx
dialog.tsx
```

---

## `src/components/common`

Contains reusable compositions used across multiple pages/features.

Examples:

```text
section-heading.tsx
project-card.tsx
eyebrow.tsx
content-container.tsx
theme-toggle.tsx
external-link.tsx
image-frame.tsx
```

Use this folder when a component is reusable across the site but is too specific to be a UI primitive.

---

## `src/components/layout`

Contains global structural components.

Examples:

```text
site-header.tsx
site-footer.tsx
navigation.tsx
mobile-navigation.tsx
page-shell.tsx
```

---

## `src/components/motion`

Contains reusable animation wrappers.

Examples:

```text
fade-in.tsx
stagger.tsx
reveal.tsx
parallax-layer.tsx
motion-link.tsx
```

Do not create a custom animation component for every section.

---

## `src/features`

Contains feature-specific presentation and behavior.

Example:

```text
features/hero/
├── components/
│   ├── hero-section.tsx
│   ├── hero-artifacts.tsx
│   ├── floating-card.tsx
│   └── orbital-artifact.tsx
├── constants.ts
└── types.ts
```

Example:

```text
features/case-study/
├── components/
│   ├── case-study-hero.tsx
│   ├── project-overview.tsx
│   ├── problem-section.tsx
│   ├── design-process.tsx
│   ├── outcome-section.tsx
│   └── next-project.tsx
├── utils/
└── types.ts
```

Keep feature logic inside the feature.

Do not move feature-specific behavior into generic UI folders.

---

# 6. Component Decision Rule

Before creating any component, ask:

### Is it a low-level generic primitive?

Use:

```text
components/ui/
```

### Is it reusable throughout several parts of the portfolio?

Use:

```text
components/common/
```

### Is it layout infrastructure?

Use:

```text
components/layout/
```

### Is it reusable animation behavior?

Use:

```text
components/motion/
```

### Is it specific to one feature or section?

Use:

```text
features/<feature>/
```

### Is it only used once and extremely small?

Keep it local until reuse is demonstrated.

Do not create unnecessary abstractions.

---

# 7. Design System Architecture

The visual system must follow:

```text
Design Tokens
      ↓
Theme
      ↓
UI Primitives
      ↓
Common Components
      ↓
Feature Components
      ↓
Pages
```

Feature components consume the design system.

Feature components must not redefine the design system.

---

# 8. Design Tokens

All recurring visual decisions must come from semantic design tokens.

Tokens should cover:

```text
color
background
surface
text
border
accent
spacing
radius
shadow
typography
transition
animation duration
z-index
container width
breakpoints when needed
```

Use CSS variables.

Example:

```css
:root {
  --background: #f4f0e8;
  --foreground: #1b1c19;

  --surface: #faf7f1;
  --surface-elevated: #ffffff;

  --text-primary: #1b1c19;
  --text-secondary: #63665f;
  --text-muted: #888b84;

  --border-subtle: rgba(27, 28, 25, 0.10);

  --accent-olive: #747d65;
  --accent-blue: #94aabe;
  --accent-amber: #d8a263;
  --accent-peach: #c98f73;

  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;

  --duration-fast: 140ms;
  --duration-normal: 240ms;
  --duration-slow: 500ms;
}
```

Do not scatter arbitrary hex values throughout JSX.

---

# 9. Theme Rules

The visual identity has two modes.

## Light Theme

Name:

```text
Optimistic Daylight
```

Characteristics:

- warm ivory
- paper beige
- soft charcoal
- atmospheric blue
- pale amber
- muted peach
- restrained olive

---

## Dark Theme

Name:

```text
Quiet Future
```

Suggested direction:

```css
.dark {
  --background: #121311;
  --foreground: #f3efe7;

  --surface: #191b18;
  --surface-elevated: #20231f;

  --text-primary: #f3efe7;
  --text-secondary: #b8b5ae;
  --text-muted: #878a84;

  --border-subtle: #30342e;

  --accent-olive: #788269;
  --accent-blue: #8ea7be;
  --accent-amber: #d7a35d;
  --accent-peach: #c98f73;
}
```

Dark mode should feel like:

```text
evening
blue hour
warm city lights
calm future
```

Dark mode should NOT feel like:

```text
cyberpunk
hacker UI
crypto exchange
neon sci-fi
pure black everywhere
```

---

# 10. Hero Design Rules

The hero should express the visual theme using artifacts, not a large portrait.

Preferred elements:

- translucent floating UI cards
- glass orbs
- orbital lines
- abstract geometric forms
- curved architectural framing
- small product UI fragments
- books / design objects
- subtle plant or organic accent
- ambient horizon or city scenery
- soft amber and blue atmospheric light
- restrained 3D objects
- layered depth

The hero must still prioritize:

```text
Name / Positioning
Headline
Supporting copy
Primary CTA
Secondary CTA
Selected visual artifacts
```

Do not let decorative visuals compete with the headline.

Do not turn the hero into an illustration portfolio.

Do not make the hero dependent on heavy WebGL.

---

# 11. Motion Rules

Primary animation stack:

```text
CSS transitions
+
Motion for React
```

Use:

```tsx
import { motion } from "motion/react"
```

Motion should feel:

- slow enough to feel premium
- subtle
- purposeful
- spatial
- calm
- responsive

Good uses:

- fade + translate reveals
- staggered text entrance
- gentle project-card hover
- small floating artifact movement
- subtle parallax
- page transitions
- opacity changes
- restrained scale
- layout transitions

Avoid:

- constant bouncing
- exaggerated spring effects
- huge cursor followers
- unnecessary scroll hijacking
- aggressive zoom transitions
- animations that delay reading

Respect:

```text
prefers-reduced-motion
```

Every important experience must still work with motion disabled.

---

# 12. Animation Token Rules

Centralize repeated timings.

Example:

```css
:root {
  --motion-fast: 140ms;
  --motion-normal: 240ms;
  --motion-medium: 360ms;
  --motion-slow: 600ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
}
```

Do not invent random durations in every component.

---

# 13. Three.js / React Three Fiber Rules

Do not use 3D by default.

First attempt visual requirements using:

```text
CSS
SVG
optimized images
gradients
Motion
```

Only use React Three Fiber when a meaningful interactive artifact genuinely requires 3D.

Maximum recommended homepage usage:

```text
1 isolated 3D canvas
```

Do not make core navigation or content depend on WebGL.

The portfolio must remain usable if WebGL fails.

---

# 14. Content Architecture

Use local structured content or MDX.

Recommended:

```text
src/content/projects/
```

Each major case study should be content-driven.

Example case-study sections:

```text
Project Hero
Overview
Context
Problem
Users
Role
Team
Constraints
Research
User Flows
Key Decisions
Design Exploration
Design System
Final Experience
Engineering Collaboration
Outcome
Reflection
Next Project
```

Do not manually create a completely different React page architecture for every project.

Reuse case-study components.

---

# 15. Initial Portfolio Projects

Primary work currently includes:

```text
Dopamint
Megathil
HRMS Platform
```

Project order and visibility may change later.

Do not hardcode project card markup repeatedly.

Use project data.

Example:

```ts
export interface Project {
  slug: string
  title: string
  description: string
  year?: string
  role?: string
  industries: string[]
  coverImage: string
  featured: boolean
}
```

---

# 16. Image Rules

Use:

```tsx
import Image from "next/image"
```

Prefer:

```text
AVIF
WebP
```

Avoid unnecessarily large PNG assets.

Do not ship:

```text
8 MB hero image
12 MB case-study image
multiple huge full-resolution screenshots
```

Large images must have:

- correct dimensions
- responsive sizing
- optimized formats
- appropriate loading priority
- descriptive alt text when meaningful

Hero artwork should be optimized aggressively.

---

# 17. Typography Rules

Use:

```text
next/font
```

Recommended visual structure:

```text
Editorial Serif
+
Neutral Sans Serif
```

Serif:

- major hero headline
- section headlines
- selected expressive statements

Sans:

- body text
- navigation
- buttons
- labels
- metadata
- UI content

Do not use decorative serif fonts for small body text.

---

# 18. Icons

Use:

```text
Lucide React
```

Do not mix multiple icon libraries unless absolutely required.

Icons should generally inherit:

- current text color
- component sizing
- hover states

Avoid decorative icons with no informational value.

---

# 19. Accessibility Rules

Minimum requirements:

- semantic HTML
- correct heading order
- keyboard navigation
- visible focus states
- sufficient color contrast
- button/link semantics
- useful alt text
- reduced-motion support
- accessible dialogs
- accessible navigation
- responsive text sizing
- no critical content hidden behind hover only

Accessibility is part of product quality, not an optional cleanup step.

---

# 20. Responsive Rules

Design mobile intentionally.

Do not simply shrink desktop.

Required breakpoints should support:

```text
mobile
tablet
desktop
large desktop
```

On mobile:

- hero artifacts simplify
- decorative elements can disappear
- project cards stack
- typography remains readable
- CTA remains obvious
- navigation becomes accessible mobile navigation
- avoid large fixed heights
- avoid horizontal overflow

The experience must remain fast on mid-range mobile devices.

---

# 21. Performance Rules

Performance is a design requirement.

Avoid:

- unnecessary client components
- loading large JS libraries for tiny effects
- giant videos
- unoptimized images
- multiple WebGL canvases
- excessive blur layers
- deeply nested animation trees
- unnecessary hydration

Use Server Components by default.

Add:

```tsx
"use client"
```

only where browser interaction or client state is required.

---

# 22. Next.js Rules

Use App Router.

Prefer Server Components.

Use Client Components only for:

- interactive state
- theme controls
- animation requiring browser APIs
- event handling
- client-only 3D
- responsive interaction where necessary

Use Next.js metadata APIs for SEO.

Use route-level metadata for project case studies.

Use `next/image`.

Use `next/font`.

Do not recreate framework features manually.

---

# 23. State Management Rules

Do not introduce global state by default.

Start with:

```text
local React state
URL state
server-rendered data
Context only when needed
```

The site currently does not justify Redux.

Theme state may use an appropriate lightweight provider such as `next-themes`.

Do not build a global store because it looks architecturally advanced.

---

# 24. Styling Rules

Use Tailwind for layout and utility composition.

Use CSS variables for system-level styling.

Use dedicated CSS only when:

- complex animation
- global token definition
- typography
- theme
- browser-specific styling
- effect is clearer in CSS than utilities

Do not fill components with arbitrary Tailwind values.

Avoid patterns like:

```text
rounded-[27px]
shadow-[0_11px_34px_rgba(...)]
text-[13.4px]
bg-[#141613]
```

unless there is a documented exception.

Prefer semantic utilities and tokens.

---

# 25. Component Variant Rules

Prefer variants.

Good:

```text
Button
├── default
├── secondary
├── outline
├── ghost
└── link
```

Bad:

```text
PrimaryButton
SecondaryButton
PortfolioButton
DarkButton
HeroButton
ProjectButton
```

Use composition and variants rather than duplication.

---

# 26. Naming Rules

Use predictable kebab-case filenames.

Good:

```text
project-card.tsx
case-study-hero.tsx
theme-toggle.tsx
hero-artifacts.tsx
```

React component:

```tsx
export function ProjectCard() {}
```

Types:

```ts
export interface Project {}
```

Hooks:

```text
use-theme.ts
use-media-query.ts
```

Do not use vague names:

```text
stuff.ts
helpers-new.ts
test-final.tsx
component2.tsx
temp.ts
```

---

# 27. Import Rules

Use absolute imports.

Good:

```tsx
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/common/project-card"
import { HeroSection } from "@/features/hero/components/hero-section"
```

Avoid:

```tsx
../../../../components/ui/button
```

---

# 28. AI / Vibe Coding Rules

When using Claude Code, Codex, Antigravity, Cursor, or another AI coding assistant:

1. Inspect the existing repository first.
2. Read this file before changing architecture.
3. Do not create duplicate components.
4. Search for reusable components before adding a new one.
5. Reuse existing semantic design tokens.
6. Do not hardcode brand colors if a token exists.
7. Do not introduce new libraries without explaining why.
8. Keep generic UI business-agnostic.
9. Keep feature logic inside its feature.
10. Keep pages lightweight.
11. Keep content separate from presentation.
12. Keep API/server logic out of visual components.
13. Prefer Server Components.
14. Add `"use client"` only when necessary.
15. Use TypeScript strictly.
16. Prefer composition over duplication.
17. Maintain naming conventions.
18. Do not refactor unrelated files.
19. Do not change the design system while implementing a single feature unless required.
20. Do not remove working functionality just to simplify an implementation.
21. Preserve accessibility.
22. Preserve responsive behavior.
23. Preserve dark and light themes.
24. Preserve reduced-motion support.
25. Preserve performance.
26. Avoid unnecessary abstractions.
27. Explain architectural deviations before implementing them.
28. Do not install a package when native browser, React, Next.js, CSS, or the existing stack can solve the problem cleanly.
29. Do not add fake metrics, fake project outcomes, fake client quotes, or fake case-study content.
30. Do not invent professional experience.

---

# 29. Strict Visual Rules

The brand direction is:

```text
Warm Tech Futurism
```

Light:

```text
Optimistic Daylight
```

Dark:

```text
Quiet Future
```

The site should feel:

- thoughtful
- forward-looking
- crafted
- calm
- warm
- intelligent
- human
- cinematic
- premium

Avoid:

- cyberpunk neon
- purple SaaS gradients everywhere
- overuse of green
- generic glassmorphism
- generic shadcn appearance
- crypto dashboard aesthetics
- heavy gaming-style 3D
- excessive glow
- excessive animation
- random illustration styles
- overly playful typography

---

# 30. Homepage Architecture

Recommended homepage order:

```text
Header
↓
Hero
↓
Featured Work
↓
Capabilities
↓
Selected Design / Technical Principles
↓
About / Personal Positioning
↓
Closing CTA
↓
Footer
```

The page should establish credibility quickly.

The first viewport must communicate:

```text
Who Naveen is
What he designs
What makes him different
Where to view the work
```

Do not force users to scroll before understanding the positioning.

---

# 31. Case Study Quality Rule

A case study is not:

```text
Problem
Wireframe
UI
Done
```

A strong case study should communicate:

```text
Business / product context
User problem
Constraints
Role and ownership
Research / evidence
Information architecture
Key product decisions
Trade-offs
Interaction design
Design system decisions
Engineering collaboration
Outcome
What was learned
```

Do not invent missing impact metrics.

If quantitative metrics are unavailable, use truthful qualitative outcomes.

---

# 32. SEO Rules

Every major page must include appropriate:

- title
- description
- Open Graph metadata
- canonical URL where appropriate
- structured page hierarchy

Project pages should have unique metadata.

Use semantic text rather than rendering important content inside images.

---

# 33. Deployment

Deployment flow:

```text
Local Development
      ↓
GitHub
      ↓
Vercel
      ↓
Production Domain
```

Use preview deployments for significant changes before production.

Do not commit secrets.

Use environment variables only when required.

---

# 34. Definition of Done

A feature is complete only when:

- it follows this architecture
- it uses existing design tokens
- it works in light theme
- it works in dark theme
- it is responsive
- it works with keyboard navigation
- it supports reduced motion
- it has no obvious accessibility regression
- it avoids duplicate components
- it does not introduce unnecessary libraries
- images are optimized
- TypeScript passes
- linting passes
- production build succeeds
- the visual result matches the Warm Tech Futurism direction
- content is truthful
- performance remains acceptable

---

# 35. Pre-Implementation Checklist for AI Coding Agents

Before coding any task, answer internally:

```text
1. What existing component can be reused?
2. What feature owns this behavior?
3. Does a design token already exist?
4. Does this require a client component?
5. Does this require a new dependency?
6. Can CSS or Motion solve the effect?
7. Will this work on mobile?
8. Will this work in dark mode?
9. Will this work with reduced motion?
10. Is the content factual?
```

If the answer introduces unnecessary complexity, simplify before implementation.

---

# 36. Final Golden Rule

Build a portfolio that demonstrates the same qualities expected from a strong Senior Product Designer:

```text
clarity
systems thinking
craft
restraint
accessibility
consistency
technical awareness
human-centered decision making
```

The website should not prove that the creator knows the most libraries.

It should prove that the creator knows how to make strong product decisions.
