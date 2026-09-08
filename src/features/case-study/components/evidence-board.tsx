import type { EvidenceItem } from "@/types/case-study"

/**
 * Evidence → interpretation → product implication (master §11). Shows the
 * research that changed a decision, not that "UX research happened".
 */
export function EvidenceBoard({ items }: { items: EvidenceItem[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li
          key={item.evidence}
          className="grid grid-cols-1 gap-3 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4 lg:grid-cols-3 lg:gap-6"
        >
          <Column
            label="What I heard or observed"
            value={item.evidence}
            index={String(index + 1).padStart(2, "0")}
          />
          <Column label="What it meant" value={item.interpretation} />
          <Column label="Product implication" value={item.implication} accent />
        </li>
      ))}
    </ol>
  )
}

function Column({
  label,
  value,
  index,
  accent,
}: {
  label: string
  value: string
  index?: string
  accent?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-text-muted">
        {index ? (
          <span className="tabular-nums text-text-primary">{index}</span>
        ) : null}
        {label}
      </p>
      <p
        className={
          accent
            ? "text-sm leading-relaxed text-text-primary"
            : "text-sm leading-relaxed text-text-secondary"
        }
      >
        {value}
      </p>
    </div>
  )
}
