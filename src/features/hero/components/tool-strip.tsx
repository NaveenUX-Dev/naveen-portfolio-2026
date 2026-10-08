import Image from "next/image"
import { brandMarks } from "@/features/hero/brand-marks"
import { heroGlyphs } from "@/features/hero/hero-glyphs"
import type { HeroTool } from "@/features/hero/hero-content"

/** The tools in daily use. Marks are decorative; the names carry meaning. */
export function ToolStrip({
  label,
  tools,
}: {
  label: string
  tools: readonly HeroTool[]
}) {
  return (
    <ul
      aria-label={label}
      className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1 md:rounded-2xl md:border md:border-border-subtle md:bg-surface md:p-1"
    >
      {tools.map((tool) => (
        <li
          key={tool.name}
          className="group flex items-center gap-1 rounded-xl border border-border-subtle bg-surface-elevated px-2 py-1 text-sm text-text-primary transition-standard hover:border-border-strong"
        >
          <span
            aria-hidden
            className="flex size-3 items-center justify-center transition-standard group-hover:-rotate-8 group-hover:scale-110"
          >
            <ToolMark tool={tool} />
          </span>
          {tool.name}
        </li>
      ))}
    </ul>
  )
}

function ToolMark({ tool }: { tool: HeroTool }) {
  if (tool.mark) {
    const mark = brandMarks[tool.mark]

    return (
      <svg
        viewBox="0 0 24 24"
        className="size-2.5"
        fill={"mono" in mark ? "currentColor" : mark.hex}
        fillRule={"evenOdd" in mark ? "evenodd" : undefined}
      >
        <path d={mark.path} />
      </svg>
    )
  }

  if (tool.image) {
    return <Image src={tool.image} alt="" width={20} height={20} className="size-2.5" />
  }

  if (tool.glyph) {
    const Icon = heroGlyphs[tool.glyph]
    return <Icon className="size-2.5 text-accent-olive-strong" strokeWidth={1.75} />
  }

  return null
}
