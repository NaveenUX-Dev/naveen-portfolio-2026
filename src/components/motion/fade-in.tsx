"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  /** Seconds. Use a small offset to sequence a few sibling reveals. */
  delay?: number
  /** Distance in px the element travels upward on entry. */
  distance?: number
  className?: string
}

export function FadeIn({
  children,
  delay = 0,
  distance = 16,
  className,
}: FadeInProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
