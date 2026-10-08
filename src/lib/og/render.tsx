import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

/*
 * Branded social preview cards (Open Graph / Twitter), rendered at build
 * time. Palette and type follow the site: "Quiet Future" dark tokens, the
 * hero's warm horizon, Fraunces for titles, Inter for supporting text.
 * Fonts are static WOFF files (SIL OFL 1.1) from Fontsource; see ./fonts.
 */

export const ogSize = { width: 1200, height: 630 }

const colour = {
  sky: "#121311",
  horizon: "#1a1f26",
  text: "#f3efe7",
  secondary: "#b8b5ae",
  amber: "#d7a35d",
  peach: "#c98f73",
  blue: "#8ea7be",
}

function font(file: string) {
  return readFile(join(process.cwd(), "src/lib/og/fonts", file))
}

interface OgCard {
  /** Small line above the title, e.g. a product name. */
  kicker: string
  title: string
  subtitle?: string
  footer: string
}

export async function renderOgImage({ kicker, title, subtitle, footer }: OgCard) {
  const [fraunces, inter, interSemi] = await Promise.all([
    font("fraunces-500.woff"),
    font("inter-400.woff"),
    font("inter-600.woff"),
  ])
  const titleSize = title.length > 70 ? 50 : title.length > 44 ? 58 : 68

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          position: "relative",
          background: `linear-gradient(180deg, ${colour.sky} 0%, ${colour.horizon} 100%)`,
          color: colour.text,
          fontFamily: "Inter",
        }}
      >
        {/* Horizon glow and planet edge, as in the home hero. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 260,
            display: "flex",
            background: `radial-gradient(ellipse 60% 100% at 70% 100%, rgba(215, 163, 93, 0.32), rgba(215, 163, 93, 0) 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -400,
            top: 604, // crest sits below the footer line
            width: 2000,
            height: 2000,
            display: "flex",
            borderRadius: 1000,
            borderTop: `2px solid ${colour.amber}`,
            background: colour.sky,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="54" height="36" viewBox="0 0 42 28" fill={colour.text}>
            <polygon points="0,0 5.5,0 16,19 16,0 21,0 21,28 15.5,28 5,9 5,28 0,28" />
            <polygon points="21,12.5 33.5,0 40.5,0 21,19.5" />
            <polygon points="25.6,15.6 29.4,11.8 42,28 35.2,28" />
          </svg>
          <span style={{ fontSize: 26, fontWeight: 600 }}>Naveen Kumar</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 1000 }}>
          <span style={{ fontSize: 26, color: colour.amber, fontWeight: 600 }}>
            {kicker}
          </span>
          <span
            style={{
              fontFamily: "Fraunces",
              fontSize: titleSize,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span style={{ fontSize: 28, lineHeight: 1.35, color: colour.secondary }}>
              {subtitle}
            </span>
          ) : null}
        </div>

        <span style={{ fontSize: 22, color: colour.secondary, position: "relative" }}>
          {footer}
        </span>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 500, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Inter", data: interSemi, weight: 600, style: "normal" },
      ],
    },
  )
}
