"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { ComponentStateSet } from "@/types/case-study"

/**
 * One reusable pattern shown in its real states (master, Interaction F). The
 * point is systematic thinking, not a component inventory.
 */
export function ComponentStatePreview({ sets }: { sets: ComponentStateSet[] }) {
  const [activeSet, setActiveSet] = useState(sets[0]?.name)
  const [activeState, setActiveState] = useState(sets[0]?.states[0])

  const current = sets.find((set) => set.name === activeSet) ?? sets[0]

  function selectSet(name: string) {
    const next = sets.find((set) => set.name === name)
    if (!next) return
    setActiveSet(next.name)
    setActiveState(next.states[0])
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div role="tablist" aria-label="Component" className="flex flex-wrap gap-1">
          {sets.map((set) => (
            <button
              key={set.name}
              type="button"
              role="tab"
              aria-selected={set.name === current?.name}
              onClick={() => selectSet(set.name)}
              className={cn(
                "rounded-sm px-1 py-0.5 text-sm transition-standard focus-ring",
                set.name === current?.name
                  ? "text-text-primary underline underline-offset-4"
                  : "text-text-muted hover:text-text-secondary",
              )}
            >
              {set.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-t border-border-subtle pt-3">
        {current?.states.map((state) => (
          <button
            key={state}
            type="button"
            aria-pressed={state === activeState}
            onClick={() => setActiveState(state)}
            className={cn(
              "rounded-full border px-2 py-1 text-xs transition-standard focus-ring",
              state === activeState
                ? "border-border-strong bg-surface-elevated text-text-primary"
                : "border-border-subtle text-text-secondary hover:border-border-strong",
            )}
          >
            {state}
          </button>
        ))}
      </div>

      <div className="flex min-h-[6rem] items-center justify-center rounded-md border border-border-subtle bg-surface-elevated p-4">
        <StatePreview component={current?.name} state={activeState} />
      </div>
    </div>
  )
}

/** Status colours mapped to tokens — never a hardcoded hex (rules §8). */
const statusTone: Record<string, string> = {
  Pending: "border-accent-amber/50 bg-accent-amber/16 text-text-primary",
  Approved: "border-accent-olive/50 bg-accent-olive/16 text-text-primary",
  Rejected: "border-accent-peach/60 bg-accent-peach/18 text-text-primary",
  Processing: "border-accent-blue/50 bg-accent-blue/16 text-text-primary",
}

function StatePreview({
  component,
  state,
}: {
  component?: string
  state?: string
}) {
  if (!component || !state) return null

  if (component === "Status") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-sm",
          statusTone[state] ?? "border-border-subtle text-text-secondary",
        )}
      >
        <span aria-hidden className="size-1 rounded-full bg-current opacity-60" />
        {state}
      </span>
    )
  }

  if (component === "Button") {
    return (
      <span
        className={cn(
          "inline-flex h-5 items-center rounded-full px-3 text-sm",
          state === "Default" && "bg-accent-olive-strong text-text-inverse",
          state === "Hover" && "bg-accent-olive text-text-inverse",
          state === "Focus" &&
            "bg-accent-olive-strong text-text-inverse outline outline-2 outline-offset-2 outline-accent-olive-strong",
          state === "Disabled" &&
            "bg-accent-olive-strong text-text-inverse opacity-50",
        )}
      >
        Approve request
      </span>
    )
  }

  return (
    <span className="flex w-full max-w-[18rem] flex-col gap-1">
      <span className="text-xs text-text-muted">Employee ID</span>
      <span
        className={cn(
          "flex h-5 items-center rounded-md border bg-background px-2 text-sm",
          state === "Default" && "border-border-subtle text-text-muted",
          state === "Filled" && "border-border-strong text-text-primary",
          state === "Error" && "border-accent-peach text-text-primary",
          state === "Disabled" && "border-border-subtle text-text-muted opacity-50",
        )}
      >
        {state === "Default" ? "Search employees" : "EMP-2481"}
      </span>
      {state === "Error" ? (
        <span className="text-xs text-accent-peach">No employee matches that ID.</span>
      ) : null}
    </span>
  )
}
