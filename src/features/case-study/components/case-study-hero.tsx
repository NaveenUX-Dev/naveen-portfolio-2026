import type { ReactNode } from "react"
import type { CaseStudyMeta } from "@/types/case-study"

interface CaseStudyHeroProps {
  eyebrow: string
  title: string
  standfirst: string
  challenge: string
  meta: CaseStudyMeta[]
  /** Reading-mode toggle, passed in so the hero itself stays a server component. */
  controls?: ReactNode
}

export function CaseStudyHero({
  eyebrow,
  title,
  standfirst,
  challenge,
  meta,
  controls,
}: CaseStudyHeroProps) {
  return (
    <header className="flex flex-col gap-5 sm:gap-6">
      <p className="text-xs uppercase tracking-eyebrow text-text-muted">
        {eyebrow}
      </p>

      <h1 className="max-w-[20ch] text-2xl leading-title xs:text-3xl sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      <div className="flex max-w-[68ch] flex-col gap-3 text-base leading-relaxed text-text-secondary sm:text-lg">
        <p>{standfirst}</p>
        <p>{challenge}</p>
      </div>

      {controls}

      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border-subtle pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {meta.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <dt className="text-xs uppercase tracking-eyebrow text-text-muted">
              {item.label}
            </dt>
            <dd className="text-sm text-text-primary">
              {item.value}
              {item.unverified ? (
                <span className="ml-1 rounded-sm border border-border-subtle px-1 py-0.5 text-xs text-text-muted">
                  to verify
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
