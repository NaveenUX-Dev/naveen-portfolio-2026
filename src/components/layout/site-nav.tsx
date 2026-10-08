"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/global"

/**
 * Which section the reader is in. On the home page it follows the scroll
 * (Home → Work → Contact); on a case study, Work stays current until the
 * footer comes into view.
 */
function useActiveHref(pathname: string) {
  const base = pathname.startsWith("/work")
    ? "/#work"
    : pathname.startsWith("/about")
      ? "/about"
      : "/"
  const [active, setActive] = useState(base)

  useEffect(() => {
    let frame = 0

    function measure() {
      frame = 0
      const work = document.getElementById("work")
      const contact = document.getElementById("contact")
      const viewport = window.innerHeight

      if (contact && contact.getBoundingClientRect().top < viewport * 0.6) {
        setActive("/#contact")
      } else if (work && work.getBoundingClientRect().top < viewport * 0.4) {
        setActive("/#work")
      } else {
        setActive(base)
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    // First reading on the next frame, once the page has laid out.
    frame = requestAnimationFrame(measure)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [base])

  return active
}

export function SiteNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const active = useActiveHref(pathname)
  const reduce = useReducedMotion()

  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-x-1 xs:gap-x-1.5 sm:gap-x-5">
        {items.map((item) => {
          const isActive = !item.external && item.href === active

          return (
            <li key={item.href} className={item.hideOnMobile ? "hidden sm:block" : undefined}>
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex flex-col items-center rounded-sm py-1 text-sm transition-standard focus-ring",
                  isActive
                    ? "font-medium text-text-primary"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {item.label}
                {item.external ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-dot"
                    aria-hidden
                    className="absolute -bottom-0.5 size-0.5 rounded-full bg-accent-olive-strong"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 32 }
                    }
                  />
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
