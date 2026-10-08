"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface ChapterLink {
  id: string
  index: string
  label: string
}

/**
 * Sticky chapter rail (master §1). Native anchors — no scroll hijacking, and
 * back/forward keep working. Hidden below `xl`, where a compact progress bar
 * takes over.
 */
export function ChapterNav({ chapters: visible }: { chapters: ChapterLink[] }) {
  const activeId = useActiveChapter(visible.map((chapter) => chapter.id))

  return (
    <nav
      aria-label="Chapters"
      className="sticky top-6 hidden max-h-[calc(100svh-96px)] overflow-y-auto xl:block"
    >
      <ul className="flex flex-col gap-1">
        {visible.map((chapter) => {
          const isActive = chapter.id === activeId

          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-baseline gap-2 rounded-sm py-1 text-sm transition-standard focus-ring",
                  isActive
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary",
                )}
              >
                <span className="tabular-nums text-xs">{chapter.index}</span>
                {chapter.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** Compact progress readout for viewports without room for the rail. */
export function ChapterProgress({
  chapters: visible,
}: {
  chapters: ChapterLink[]
}) {
  const activeId = useActiveChapter(visible.map((chapter) => chapter.id))
  const position = visible.findIndex((chapter) => chapter.id === activeId)
  const active = position >= 0 ? visible[position] : visible[0]
  const progress = ((position + 1) / visible.length) * 100

  return (
    <div className="sticky top-0 z-40 border-b border-border-subtle bg-background/90 backdrop-blur-md xl:hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-1 sm:px-5">
        <p className="truncate text-xs uppercase tracking-eyebrow text-text-muted">
          <span className="tabular-nums text-text-primary">{active?.index}</span>{" "}
          {active?.label}
        </p>
        <p className="shrink-0 text-xs tabular-nums text-text-muted">
          {position + 1} / {visible.length}
        </p>
      </div>
      <div
        aria-hidden
        className="h-px w-full bg-border-subtle"
      >
        <div
          className="h-px bg-accent-olive-strong transition-standard"
          style={{ width: `${Math.max(progress, 0)}%` }}
        />
      </div>
    </div>
  )
}

/** Tracks which chapter is currently in view. */
function useActiveChapter(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = ids.join(",")

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (inView[0]) setActiveId(inView[0].target.id)
      },
      { rootMargin: "-72px 0px -60% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key])

  return activeId
}
