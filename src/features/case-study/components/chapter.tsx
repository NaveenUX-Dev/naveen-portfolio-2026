import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ChapterProps {
  id: string
  /** Optional section number shown before the label. */
  index?: string
  label: string
  heading?: string
  /** Sits directly under the heading, at reading measure. */
  standfirst?: string
  children: ReactNode
  className?: string
}

/**
 * One chapter of a case study: an anchor target, a numbered rule, an optional
 * heading, and the content. Generic — Dopamint, Megathil and HRMS use
 * the same component (master §44).
 */
export function Chapter({
  id,
  index,
  label,
  heading,
  standfirst,
  children,
  className,
}: ChapterProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={cn("scroll-mt-12 border-t border-border-subtle pt-4", className)}
    >
      <div className="flex items-center gap-2">
        {index ? (
          <span className="text-xs tabular-nums text-text-primary">{index}</span>
        ) : null}
        <span
          id={`${id}-label`}
          className="text-xs uppercase tracking-eyebrow text-text-muted"
        >
          {label}
        </span>
      </div>

      {heading ? (
        <h2 className="mt-3 max-w-[22ch] text-xl leading-title xs:text-2xl sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
      ) : null}

      {standfirst ? (
        <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-text-secondary">
          {standfirst}
        </p>
      ) : null}

      <div className="mt-5 sm:mt-6">{children}</div>
    </section>
  )
}

/** Body prose held to a comfortable measure (master §3: 640–760px). */
export function Prose({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex max-w-[68ch] flex-col gap-3 text-base leading-relaxed text-text-secondary",
        className,
      )}
    >
      {children}
    </div>
  )
}

/** A pulled-out principle or question. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[52ch] border-l-2 border-accent-olive-strong pl-3 font-serif text-lg leading-snug text-text-primary sm:text-xl">
      {children}
    </p>
  )
}

/** A left-to-right chain of stages, wrapping on small screens. */
export function FlowChain({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-md border border-border-subtle bg-surface px-2 py-1 text-sm text-text-primary">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden className="text-text-muted">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
