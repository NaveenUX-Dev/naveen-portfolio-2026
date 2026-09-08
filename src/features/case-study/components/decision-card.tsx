import type { DesignDecision, Outcome } from "@/types/case-study"

export function DecisionCard({ decision }: { decision: DesignDecision }) {
  return (
    <article className="flex flex-col gap-3 border-t border-border-subtle pt-4">
      <p className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-text-muted">
        <span className="tabular-nums text-text-primary">{decision.index}</span>
        Decision
      </p>

      <h3 className="max-w-[24ch] font-serif text-xl leading-snug sm:text-2xl">
        {decision.title}
      </h3>

      <div className="flex max-w-[68ch] flex-col gap-2 text-base leading-relaxed text-text-secondary">
        {decision.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {decision.principle ? (
        <p className="max-w-[52ch] border-l-2 border-accent-olive-strong pl-3 font-serif text-lg leading-snug text-text-primary">
          {decision.principle}
        </p>
      ) : null}

      {decision.points ? (
        <dl className="grid grid-cols-1 gap-3 rounded-lg border border-border-subtle bg-surface p-3 sm:grid-cols-2 sm:p-4">
          {decision.points.map((point) => (
            <div key={point.heading} className="flex flex-col gap-0.5">
              <dt className="text-sm text-text-primary">{point.heading}</dt>
              <dd className="text-sm leading-relaxed text-text-secondary">
                {point.detail}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  )
}

/** Qualitative outcomes only — no fabricated metric counters (master §30). */
export function OutcomeCards({ outcomes }: { outcomes: Outcome[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {outcomes.map((outcome) => (
        <li
          key={outcome.title}
          className="flex flex-col gap-1 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4"
        >
          <h3 className="font-serif text-lg leading-snug">{outcome.title}</h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            {outcome.body}
          </p>
        </li>
      ))}
    </ul>
  )
}
