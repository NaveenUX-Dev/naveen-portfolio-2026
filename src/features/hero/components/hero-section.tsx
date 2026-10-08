import Link from "next/link"
import { ArrowRight, Link2 } from "lucide-react"
import { ContentContainer } from "@/components/common/content-container"
import { ButtonLink } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import {
  HeroRise,
  HeroStage,
  Magnetic,
} from "@/features/hero/components/hero-stage"
import { ToolStrip } from "@/features/hero/components/tool-strip"
import { heroContent } from "@/features/hero/hero-content"

/**
 * The home hero. Text and actions render on the server; the scene behind
 * them (sky, orbit, horizon, parallax) is the one client island.
 */
export function HeroSection() {
  const { pill, primaryAction, secondaryAction, chips, tools, toolsLabel, scrollCue } =
    heroContent

  return (
    <HeroStage
      labelledBy="hero-title"
      chips={chips}
      ground={
        <ContentContainer className="flex flex-col items-center gap-6 pb-6 pt-5 sm:pt-6">
          <HeroRise order={5} className="w-full">
            <ToolStrip label={toolsLabel} tools={tools} />
          </HeroRise>

          <Link
            href={scrollCue.href}
            className="hidden flex-col items-center gap-1 rounded-md text-xs text-text-secondary transition-standard hover:text-text-primary focus-ring md:flex"
          >
            <span
              aria-hidden
              className="flex h-4 w-2.5 justify-center rounded-full border border-border-strong pt-0.5"
            >
              <span className="size-0.5 rounded-full bg-current animate-scroll-cue" />
            </span>
            {scrollCue.label}
          </Link>
        </ContentContainer>
      }
    >
      <ContentContainer className="flex flex-col items-center gap-3 pt-8 text-center sm:pt-10 lg:pt-12">
        <HeroRise order={0}>
          <p className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-surface-elevated px-2 py-0.5 text-sm text-text-primary">
            <span aria-hidden className="size-1 rounded-full bg-accent-olive-strong" />
            {pill}
          </p>
        </HeroRise>

        <HeroRise order={1}>
          <h1
            id="hero-title"
            className="text-4xl leading-display xs:text-5xl sm:text-6xl lg:text-7xl"
          >
            {siteConfig.greeting}
          </h1>
        </HeroRise>

        <HeroRise order={2}>
          <p className="max-w-[40ch] font-serif text-xl leading-snug text-text-primary sm:text-2xl lg:text-3xl">
            {siteConfig.headline}
          </p>
        </HeroRise>

        <HeroRise order={3}>
          <p className="max-w-[58ch] text-base leading-relaxed text-text-secondary sm:text-lg">
            {siteConfig.intro}
          </p>
        </HeroRise>

        <HeroRise order={4} className="mt-2 flex flex-wrap justify-center gap-2">
          <Magnetic>
            <ButtonLink href={primaryAction.href} className="group">
              {primaryAction.label}
              <ArrowRight
                aria-hidden
                className="size-2 transition-standard group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </ButtonLink>
          </Magnetic>
          <ButtonLink
            href={secondaryAction.href}
            variant="secondary"
            className="group"
          >
            {secondaryAction.label}
            <Link2
              aria-hidden
              className="size-2 transition-standard group-hover:-rotate-12"
              strokeWidth={1.75}
            />
          </ButtonLink>
        </HeroRise>
      </ContentContainer>
    </HeroStage>
  )
}
