"use client"

import { useId, useRef, useState, type KeyboardEvent } from "react"
import {
  CircleAlert,
  CircleCheck,
  Clock,
  RefreshCw,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type {
  RecoveryDemo as RecoveryDemoData,
  RecoveryDemoState,
} from "@/types/story-case-study"

/** The icon supports the title text; state is never conveyed by colour alone. */
const toneIcon: Record<
  RecoveryDemoState["tone"],
  { icon: LucideIcon; className: string }
> = {
  warning: { icon: CircleAlert, className: "text-accent-amber" },
  pending: { icon: Clock, className: "text-accent-blue" },
  success: { icon: CircleCheck, className: "text-accent-olive-strong" },
  review: { icon: RefreshCw, className: "text-text-secondary" },
}

/**
 * Deterministic demo of the insufficient-funds recovery (brief B4). Selecting
 * a state swaps the illustration — no timers, no network, no animation.
 * Tabs follow the WAI-ARIA pattern: one tab stop, arrow keys, Home / End.
 */
export function RecoveryDemo({ demo }: { demo: RecoveryDemoData }) {
  const id = useId()
  const [activeIndex, setActiveIndex] = useState(0)
  const [announcement, setAnnouncement] = useState("")
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const count = demo.states.length
  const active = demo.states[activeIndex]

  function select(index: number, moveFocus: boolean) {
    setActiveIndex(index)
    setAnnouncement(`Step ${index + 1} of ${count}: ${demo.states[index].title}`)
    if (moveFocus) tabRefs.current[index]?.focus()
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const targets: Record<string, number> = {
      ArrowRight: (index + 1) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }
    const next = targets[event.key]
    if (next === undefined) return
    event.preventDefault()
    select(next, true)
  }

  function advanceTo(stateId: string) {
    const index = demo.states.findIndex((state) => state.id === stateId)
    // The clicked button unmounts, so focus follows to the new state's tab.
    if (index >= 0) select(index, true)
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-eyebrow text-text-muted">
          {demo.label}
        </p>
        <p id={`${id}-label`} className="font-serif text-lg leading-snug">
          {demo.controlLabel}
        </p>
      </div>

      <div
        role="tablist"
        aria-labelledby={`${id}-label`}
        className="flex flex-wrap gap-1"
      >
        {demo.states.map((state, index) => {
          const selected = index === activeIndex

          return (
            <button
              key={state.id}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index, false)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                "flex items-baseline gap-1 rounded-full border px-2 py-1 text-sm transition-standard focus-ring",
                selected
                  ? "border-border-strong bg-surface-elevated text-text-primary"
                  : "border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary",
              )}
            >
              <span className="text-xs tabular-nums">{index + 1}</span>
              {state.tab}
            </button>
          )
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${activeIndex}`}
        tabIndex={0}
        className="grid grid-cols-1 gap-3 rounded-md focus-ring md:grid-cols-2 md:items-center md:gap-6"
      >
        <StateCard state={active} onAdvance={advanceTo} />
        <p className="font-serif text-lg leading-snug text-text-primary sm:text-xl">
          {active.caption}
        </p>
      </div>

      <p role="status" className="sr-only">
        {announcement}
      </p>
    </div>
  )
}

function StateCard({
  state,
  onAdvance,
}: {
  state: RecoveryDemoState
  onAdvance: (stateId: string) => void
}) {
  const { icon: Icon, className } = toneIcon[state.tone]
  const { advance } = state

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border border-border-subtle bg-surface-elevated p-3 shadow-sm">
      <p className="flex items-start gap-1 font-medium text-text-primary">
        <Icon
          aria-hidden
          className={cn("mt-0.5 size-2 shrink-0", className)}
          strokeWidth={1.75}
        />
        {state.title}
      </p>

      <dl className="flex flex-col gap-1 text-sm">
        {state.rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-2 border-b border-border-subtle pb-1 last:border-b-0 last:pb-0"
          >
            <dt className="text-text-secondary">{row.label}</dt>
            <dd className="text-right tabular-nums text-text-primary">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {state.qrPlaceholder ? (
        <div className="flex size-12 items-center justify-center self-center rounded-md border border-dashed border-border-strong bg-surface text-xs uppercase tracking-eyebrow text-text-secondary">
          <span className="sr-only">Placeholder QR code, not scannable: </span>
          {state.qrPlaceholder}
        </div>
      ) : null}

      {advance ? (
        <Button size="sm" onClick={() => onAdvance(advance.to)}>
          {advance.label}
        </Button>
      ) : null}

      {state.demoOnly ? (
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-2 gap-1">
            {state.demoOnly.actions.map((action, index, all) => (
              <Button
                key={action}
                size="sm"
                variant={index === all.length - 1 ? "primary" : "secondary"}
                disabled
              >
                {action}
              </Button>
            ))}
          </div>
          <p className="text-xs text-text-secondary">{state.demoOnly.note}</p>
        </div>
      ) : null}
    </div>
  )
}
