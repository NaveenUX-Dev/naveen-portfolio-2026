"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // Theme is unknown until hydration: the server snapshot is `false`, the
  // client's is `true`, so server and first client render match.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

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
