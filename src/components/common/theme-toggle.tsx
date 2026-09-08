"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Theme is unknown until hydration; render a stable placeholder first so
  // server and client markup match.
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Switch theme"
      }
      className="flex size-5 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated text-text-secondary transition-standard hover:border-border-strong hover:text-text-primary focus-ring"
    >
      {mounted && isDark ? (
        <Sun className="size-2" strokeWidth={1.5} />
      ) : (
        <Moon className="size-2" strokeWidth={1.5} />
      )}
    </button>
  )
}
