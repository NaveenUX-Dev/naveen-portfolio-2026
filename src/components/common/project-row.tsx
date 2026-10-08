import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { hasCaseStudy } from "@/content/case-studies"
import type { Project } from "@/types/project"

/** Static class lookup — Tailwind cannot resolve interpolated class names. */
const accentWash: Record<Project["accent"], string> = {
  blue: "from-accent-blue/32 via-surface-elevated to-accent-amber/16",
  amber: "from-accent-amber/28 via-surface-elevated to-accent-blue/16",
  peach: "from-accent-peach/28 via-surface-elevated to-accent-blue/18",
  olive: "from-accent-olive/26 via-surface-elevated to-accent-blue/18",
}

const rowLayout =
  "group grid grid-cols-1 items-center gap-3 rounded-lg sm:gap-5 " +
  "lg:grid-cols-[58fr_42fr] lg:gap-8"

/**
 * One project as a list row. Projects whose case study is not written yet
 * render without a link rather than pointing at a 404.
 */
export function ProjectRow({ project }: { project: Project }) {
  const published = hasCaseStudy(project.slug)
  const content = <RowContent project={project} published={published} />

  if (!published) {
    return <div className={rowLayout}>{content}</div>
  }

  return (
    <Link href={`/work/${project.slug}`} className={cn(rowLayout, "focus-ring")}>
      {content}
    </Link>
  )
}

function RowContent({
  project,
  published,
}: {
  project: Project
  published: boolean
}) {
  return (
    <>
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-lg border border-border-subtle bg-gradient-to-br",
          accentWash[project.accent],
        )}
      >
        {project.coverImage ? (
          <>
            <Image
              src={project.coverImage}
              alt={project.coverAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-emphasized group-hover:scale-[1.02]"
            />
            {project.coverLabel ? (
              <span className="absolute bottom-1 left-1 rounded-full bg-background/85 px-1 py-0.5 text-xs text-text-primary backdrop-blur-sm">
                {project.coverLabel}
              </span>
            ) : null}
          </>
        ) : (
          <p className="absolute inset-0 flex items-center p-3 font-serif text-xl leading-snug text-text-primary sm:p-4 sm:text-2xl">
            <span className="max-w-[20ch]">{project.statement}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-xl leading-snug sm:text-2xl">
          {project.title}
        </h3>

        <p className="max-w-[44ch] text-base leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {published ? (
          <span className="mt-1 inline-flex items-center gap-1 text-sm text-text-primary">
            View case study
            <ArrowRight
              aria-hidden
              className="size-2 transition-standard group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </span>
        ) : (
          <span className="mt-1 text-sm text-text-muted">
            Case study in progress
          </span>
        )}
      </div>
    </>
  )
}
