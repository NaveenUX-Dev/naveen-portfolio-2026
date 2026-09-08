"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import type { CaseStudyRole } from "@/types/case-study"

/**
 * Role-based product thinking, not decorative tabs (master, Interaction B).
 * Click-driven so it works on touch and by keyboard — never hover-only.
 */
export function RoleSwitcher({ roles }: { roles: CaseStudyRole[] }) {
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState(roles[0]?.id)
  const active = roles.find((role) => role.id === activeId) ?? roles[0]

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="User roles" className="flex flex-wrap gap-1">
        {roles.map((role) => {
          const isActive = role.id === active?.id

          return (
            <button
              key={role.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="role-detail"
              onClick={() => setActiveId(role.id)}
              className={cn(
                "rounded-full border px-2 py-1 text-sm transition-standard focus-ring",
                isActive
                  ? "border-border-strong bg-surface-elevated text-text-primary"
                  : "border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary",
              )}
            >
              {role.name}
            </button>
          )
        })}
      </div>

      <motion.div
        key={active?.id}
        id="role-detail"
        role="tabpanel"
        aria-live="polite"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 gap-4 rounded-lg border border-border-subtle bg-surface p-3 sm:grid-cols-2 sm:gap-6 sm:p-4"
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-eyebrow text-text-muted">
            Goal
          </p>
          <p className="max-w-[36ch] font-serif text-lg leading-snug text-text-primary">
            {active?.goal}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-eyebrow text-text-muted">
            Typical actions
          </p>
          <ul className="flex flex-col gap-0.5">
            {active?.actions.map((action) => (
              <li
                key={action}
                className="flex items-baseline gap-2 text-sm text-text-secondary"
              >
                <span aria-hidden className="text-text-muted">
                  ·
                </span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
