"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import type { WorkflowStep } from "@/types/case-study"

/**
 * The flagship workflow as a stateful process (master, Interaction D).
 * Horizontal on desktop, vertical on mobile; selection is click-driven so it
 * works on touch.
 */
export function WorkflowStepper({
  steps,
  edgeStates,
}: {
  steps: WorkflowStep[]
  edgeStates: string[]
}) {
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const active = steps[activeIndex]

  return (
    <div className="flex flex-col gap-4">
      <ol
        role="tablist"
        aria-label="Workflow steps"
        className="flex flex-col gap-0.5 lg:flex-row lg:gap-0.5"
      >
        {steps.map((step, index) => {
          const isActive = index === activeIndex

          return (
            <li key={step.index} className="lg:flex-1">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="workflow-detail"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex w-full items-baseline gap-2 border-l-2 px-2 py-1 text-left text-sm transition-standard focus-ring lg:flex-col lg:gap-1 lg:border-l-0 lg:border-t-2 lg:px-1 lg:py-2",
                  isActive
                    ? "border-accent-olive-strong text-text-primary"
                    : "border-border-subtle text-text-muted hover:border-border-strong hover:text-text-secondary",
                )}
              >
                <span className="shrink-0 text-xs tabular-nums">
                  {step.index}
                </span>
                <span className="leading-snug lg:text-xs">{step.title}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <motion.div
        key={active?.index}
        id="workflow-detail"
        role="tabpanel"
        aria-live="polite"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm border border-border-subtle bg-surface-elevated px-1 py-0.5 text-xs text-text-secondary">
            {active?.role}
          </span>
          <span className="rounded-sm bg-accent-olive-strong px-1 py-0.5 text-xs text-text-inverse dark:text-background">
            {active?.state}
          </span>
        </div>

        <h3 className="font-serif text-xl leading-snug">{active?.title}</h3>

        <p className="max-w-[60ch] text-base leading-relaxed text-text-secondary">
          {active?.detail}
        </p>
      </motion.div>

      <div className="flex flex-col gap-2 border-t border-border-subtle pt-3">
        <p className="text-xs uppercase tracking-eyebrow text-text-muted">
          States designed beyond the happy path
        </p>
        <ul className="flex flex-wrap gap-1">
          {edgeStates.map((state) => (
            <li
              key={state}
              className="rounded-sm border border-border-subtle bg-surface px-1 py-0.5 text-xs text-text-secondary"
            >
              {state}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
