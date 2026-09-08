"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { SystemModule } from "@/types/case-study"

/**
 * The product as a connected system rather than eight disconnected
 * screenshots (master, Interaction C). Selecting a module reveals the job it
 * performs, who uses it, what it depends on, and what it affects.
 */
export function SystemMap({ modules }: { modules: SystemModule[] }) {
  const [activeId, setActiveId] = useState(modules[0]?.id)
  const active = modules.find((module) => module.id === activeId) ?? modules[0]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[40fr_60fr] lg:gap-6">
      <ul
        role="tablist"
        aria-label="Product modules"
        aria-orientation="vertical"
        className="grid grid-cols-1 gap-1 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-1"
      >
        {modules.map((module) => {
          const isActive = module.id === active?.id

          return (
            <li key={module.id}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="system-map-detail"
                onClick={() => setActiveId(module.id)}
                className={cn(
                  "w-full rounded-md border px-2 py-1 text-left text-sm transition-standard focus-ring",
                  isActive
                    ? "border-border-strong bg-surface-elevated text-text-primary"
                    : "border-border-subtle bg-surface text-text-secondary hover:border-border-strong hover:text-text-primary",
                )}
              >
                {module.name}
              </button>
            </li>
          )
        })}
      </ul>

      <div
        id="system-map-detail"
        role="tabpanel"
        aria-live="polite"
        className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4"
      >
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-xl leading-snug">{active?.name}</h3>
          <p className="max-w-[52ch] text-sm leading-relaxed text-text-secondary">
            {active?.job}
          </p>
        </div>

        <dl className="flex flex-col gap-2 border-t border-border-subtle pt-3">
          <Relation label="Used by" values={active?.roles ?? []} />
          <Relation label="Depends on" values={active?.dependsOn ?? []} />
          <Relation label="Affects" values={active?.affects ?? []} />
        </dl>
      </div>
    </div>
  )
}

function Relation({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-xs uppercase tracking-eyebrow text-text-muted sm:w-[7rem]">
        {label}
      </dt>
      <dd className="flex flex-wrap gap-1">
        {values.length === 0 ? (
          <span className="text-sm text-text-muted">—</span>
        ) : (
          values.map((value) => (
            <span
              key={value}
              className="rounded-sm border border-border-subtle bg-surface-elevated px-1 py-0.5 text-xs text-text-secondary"
            >
              {value}
            </span>
          ))
        )}
      </dd>
    </div>
  )
}
