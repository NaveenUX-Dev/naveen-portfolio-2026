import {
  ChartNoAxesColumn,
  CodeXml,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import type { HeroGlyph } from "@/features/hero/hero-content"

/** Generic icons for hero chips and tools that have no brand mark. */
export const heroGlyphs: Record<HeroGlyph, LucideIcon> = {
  sparkles: Sparkles,
  rocket: Rocket,
  chart: ChartNoAxesColumn,
  code: CodeXml,
}
