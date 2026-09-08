"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { ReadingDepth } from "@/types/case-study"

const ReadingModeContext = createContext<ReadingDepth>("brief")

/**
 * Brief is the default: a recruiter can understand the project without losing
 * access to depth (master §36). Deep reveals the `deep` chapters in place —
 * no route change, so the browser back button keeps working.
 */
export function ReadingModeProvider({
  children,
  value,
}: {
  children: ReactNode
  value: ReadingDepth
}) {
  return (
    <ReadingModeContext.Provider value={value}>
      {children}
    </ReadingModeContext.Provider>
  )
}

export function useReadingMode() {
  return useContext(ReadingModeContext)
}

interface ReadingModeToggleProps {
  value: ReadingDepth
  onChange: (value: ReadingDepth) => void
  briefLabel: string
  deepLabel: string
}

export function ReadingModeToggle({
  value,
  onChange,
  briefLabel,
  deepLabel,
}: ReadingModeToggleProps) {
  const options: { depth: ReadingDepth; label: string }[] = [
    { depth: "brief", label: briefLabel },
    { depth: "deep", label: deepLabel },
  ]

  return (
    <div
      role="radiogroup"
      aria-label="Reading depth"
      className="inline-flex w-fit max-w-full flex-wrap gap-0.5 rounded-full border border-border-subtle bg-surface p-0.5"
    >
      {options.map((option) => (
        <button
          key={option.depth}
          type="button"
          role="radio"
          aria-checked={value === option.depth}
          onClick={() => onChange(option.depth)}
          className={cn(
            "rounded-full px-2 py-1 text-xs transition-standard focus-ring sm:text-sm",
            value === option.depth
              ? "bg-surface-elevated text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

/** Hook up state once, at the top of a case study. */
export function useReadingModeState() {
  return useState<ReadingDepth>("brief")
}
