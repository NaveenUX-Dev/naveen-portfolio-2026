import type { BrandMark } from "@/features/hero/brand-marks"

export type HeroGlyph = "sparkles" | "rocket" | "chart" | "code"

export interface HeroTool {
  name: string
  /** An inline brand mark, a static brand image, or a generic glyph. */
  mark?: BrandMark
  image?: string
  glyph?: HeroGlyph
}

/** Copy and data for the home hero. Presentation lives in ./components. */
export const heroContent = {
  pill: "Product Designer",

  primaryAction: { label: "View Work", href: "/#work" },
  secondaryAction: { label: "Let's Connect", href: "/#contact" },

  /** Taglines floating on the orbit. Decorative; hidden on small screens. */
  chips: [
    { glyph: "sparkles", label: "Ideas", to: "Products" },
    { glyph: "rocket", label: "AI-powered workflows" },
    { glyph: "chart", label: "Design for real impact" },
  ] satisfies { glyph: HeroGlyph; label: string; to?: string }[],

  toolsLabel: "Tools I work with",
  tools: [
    { name: "Figma", mark: "figma" },
    { name: "Figma Make AI", glyph: "sparkles" },
    { name: "Claude Code", mark: "claude" },
    { name: "Codex", mark: "openai" },
    { name: "Antigravity", image: "/images/tools/antigravity.svg" },
    { name: "React.js", mark: "react" },
    { name: "Next.js", mark: "nextjs" },
    { name: "Frontend", glyph: "code" },
  ] satisfies HeroTool[],

  scrollCue: { label: "Scroll to explore", href: "/#work" },
} as const
