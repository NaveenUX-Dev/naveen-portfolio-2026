"use client"

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { ArrowRight } from "lucide-react"
import { heroGlyphs } from "@/features/hero/hero-glyphs"
import type { HeroGlyph } from "@/features/hero/hero-content"

/* ------------------------------------------------------------------ sky */

/** Deterministic PRNG so the server and the browser draw the same sky. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const random = seeded(11)
const round = (value: number) => Math.round(value * 100) / 100

/** Far layers drift least. `depth` is the parallax travel in px. */
const starLayers = [
  { depth: 6, count: 36, min: 1, max: 1.5, bright: false },
  { depth: 14, count: 18, min: 1.5, max: 2, bright: false },
  { depth: 28, count: 7, min: 7, max: 10, bright: true },
].map((layer) => ({
  ...layer,
  stars: Array.from({ length: layer.count }, () => {
    let left: number
    let top: number
    // Keep the reading column clear: no star sits behind the copy.
    do {
      left = random() * 100
      top = random() * 70
    } while (left > 22 && left < 78 && top > 16 && top < 70)
    return {
      left: round(left),
      top: round(top),
      size: round(layer.min + random() * (layer.max - layer.min)),
    }
  }),
}))

/* ---------------------------------------------------------------- orbit */

/** The orbit, in a 1600 × 900 box that stretches with the hero. */
const orbit = { cx: 800, cy: 410, rx: 660, ry: 300, tilt: 6 }

/** A point on the orbit and the tangent angle there, for placing chips. */
function onOrbit(degrees: number) {
  const t = (degrees * Math.PI) / 180
  const phi = (orbit.tilt * Math.PI) / 180
  const ex = orbit.rx * Math.cos(t)
  const ey = orbit.ry * Math.sin(t)
  const x = orbit.cx + ex * Math.cos(phi) - ey * Math.sin(phi)
  const y = orbit.cy + ex * Math.sin(phi) + ey * Math.cos(phi)
  const dx = -orbit.rx * Math.sin(t) * Math.cos(phi) - orbit.ry * Math.cos(t) * Math.sin(phi)
  const dy = -orbit.rx * Math.sin(t) * Math.sin(phi) + orbit.ry * Math.cos(t) * Math.cos(phi)
  let angle = (Math.atan2(dy, dx) * 180) / Math.PI
  if (angle > 90) angle -= 180
  if (angle < -90) angle += 180
  return {
    left: `${round((x / 1600) * 100)}%`,
    top: `${round((y / 900) * 100)}%`,
    rotate: Math.max(-16, Math.min(16, round(angle))),
  }
}

/** Chosen so every chip clears the centred copy (about 23–77% wide). */
const chipAngles = [188, 338, 16]

/* ---------------------------------------------------------------- stage */

const spring = { stiffness: 60, damping: 20, mass: 0.6 }

interface HeroStageProps {
  labelledBy: string
  chips: readonly { glyph: HeroGlyph; label: string; to?: string }[]
  /** Headline, copy and actions. */
  children: ReactNode
  /** Sits on the planet's surface, just under the horizon. */
  ground: ReactNode
}

/**
 * The home hero's scene: a sky with depth, an orbit carrying taglines, and a
 * planet horizon whose glow follows the cursor. Everything here is
 * decoration; the content arrives through `children` and `ground` and reads
 * the same with motion off.
 */
export function HeroStage({ labelledBy, chips, children, ground }: HeroStageProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Pointer position, -1 to 1 on each axis, smoothed by springs.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, spring)
  const y = useSpring(pointerY, spring)

  // Touch screens have no hover: give the sky a slow drift instead.
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: coarse)").matches) return
    const drift = animate(pointerX, [-0.35, 0.35], {
      duration: 14,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    })
    return () => drift.stop()
  }, [reduce, pointerX])

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reduce || event.pointerType !== "mouse") return
    const box = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - box.left) / box.width) * 2 - 1)
    pointerY.set(((event.clientY - box.top) / box.height) * 2 - 1)
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return
    pointerX.set(0)
    pointerY.set(0)
  }

  // The orbit moves against the stars, which reads as depth.
  const orbitX = useTransform(x, (value) => value * -18)
  const orbitY = useTransform(y, (value) => value * -10)

  // The horizon's light follows the cursor along the rim.
  const glowX = useTransform(x, (value) => 50 + value * 22)
  const glow = useMotionTemplate`radial-gradient(55% 8rem at ${glowX}% 8rem, var(--hero-glow), transparent 72%)`

  // Leaving the hero, the content lifts away and the orbit turns slightly.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25])
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  return (
    <section
      ref={ref}
      aria-labelledby={labelledBy}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, var(--background) 0%, var(--hero-sky-horizon) 100%)",
      }}
    >
      {starLayers.map((layer) => (
        <StarLayer key={layer.depth} layer={layer} x={x} y={y} still={!!reduce} />
      ))}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        style={reduce ? undefined : { x: orbitX, y: orbitY, rotate: orbitRotate }}
      >
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <ellipse
            cx={orbit.cx}
            cy={orbit.cy}
            rx={orbit.rx}
            ry={orbit.ry}
            transform={`rotate(${orbit.tilt} ${orbit.cx} ${orbit.cy})`}
            stroke="var(--hero-orbit)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {chips.map((chip, index) => {
          const Icon = heroGlyphs[chip.glyph]
          const place = onOrbit(chipAngles[index] ?? 0)

          return (
            <span
              key={chip.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-border-strong bg-surface-elevated px-2 py-1 text-sm text-text-primary shadow-md"
              style={{ left: place.left, top: place.top, rotate: `${place.rotate}deg` }}
            >
              <Icon className="size-2 text-accent-olive-strong" strokeWidth={1.75} />
              {chip.label}
              {chip.to ? (
                <>
                  <ArrowRight className="size-1.5 text-text-secondary" strokeWidth={1.75} />
                  {chip.to}
                </>
              ) : null}
            </span>
          )
        })}
      </motion.div>

      <motion.div
        className="relative"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {children}
      </motion.div>

      <div className="relative mt-8 sm:mt-10">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-16 bottom-0"
          style={{ background: glow }}
        />
        {/* The planet: page-coloured, so its surface flows into the page. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 aspect-square -translate-x-1/2 rounded-full"
          style={{
            width: "max(2400px, 260%)",
            border: "1.5px solid transparent",
            background:
              "linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(90deg, transparent 8%, var(--accent-blue) 30%, var(--accent-amber) 50%, var(--accent-peach) 70%, transparent 92%) border-box",
          }}
        />
        <div className="relative">{ground}</div>
      </div>
    </section>
  )
}

function StarLayer({
  layer,
  x,
  y,
  still,
}: {
  layer: (typeof starLayers)[number]
  x: MotionValue<number>
  y: MotionValue<number>
  still: boolean
}) {
  const layerX = useTransform(x, (value) => value * layer.depth)
  const layerY = useTransform(y, (value) => value * layer.depth * 0.6)

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -inset-4 -z-10"
      style={still ? undefined : { x: layerX, y: layerY }}
    >
      {layer.stars.map((star) => (
        <span
          key={`${star.left}-${star.top}`}
          className="absolute rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            background: layer.bright
              ? "radial-gradient(circle, var(--hero-star-bright) 0 18%, transparent 65%)"
              : "var(--hero-star)",
          }}
        />
      ))}
    </motion.div>
  )
}

/* ------------------------------------------------------- micro-motion */

/** Content enters from just below, already visible: nothing waits on JS. */
export function HeroRise({
  children,
  order,
  className,
}: {
  children: ReactNode
  order: number
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 14 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay: order * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Pulls its child a little toward the cursor, then springs back. */
export function Magnetic({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })

  return (
    <motion.span
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse") return
        const box = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - (box.left + box.width / 2)) * 0.22)
        y.set((event.clientY - (box.top + box.height / 2)) * 0.32)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
