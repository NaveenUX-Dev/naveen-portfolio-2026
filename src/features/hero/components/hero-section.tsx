import { ContentContainer } from "@/components/common/content-container"
import { FadeIn } from "@/components/motion/fade-in"
import { siteConfig } from "@/config/site"

export function HeroSection() {
  return (
    <section className="bg-background">
      <ContentContainer className="flex flex-col gap-3 pb-12 pt-10 sm:gap-4 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
        <FadeIn distance={8}>
          <h1 className="text-3xl leading-title sm:text-4xl lg:text-5xl">
            {siteConfig.greeting}
            <span className="block text-text-secondary">{siteConfig.role}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="max-w-[60ch] text-base leading-relaxed text-text-secondary sm:text-lg">
            {siteConfig.intro}
          </p>
        </FadeIn>
      </ContentContainer>
    </section>
  )
}
