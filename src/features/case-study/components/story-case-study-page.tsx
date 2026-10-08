import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ContentContainer } from "@/components/common/content-container"
import { hasCaseStudy } from "@/content/case-studies"
import { Callout, Chapter } from "@/features/case-study/components/chapter"
import {
  ChapterNav,
  ChapterProgress,
  type ChapterLink,
} from "@/features/case-study/components/chapter-nav"
import { StoryBlockView } from "@/features/case-study/components/story-block"
import { cn } from "@/lib/utils"
import type { StoryCaseStudy, StorySection } from "@/types/story-case-study"

/**
 * Renders a narrative case study. A server component: only the recovery demo
 * ships interactive JavaScript. Each rail entry is a group of sections, so
 * the rail stays short while the numbered sections keep their order.
 */
export function StoryCaseStudyPage({ study }: { study: StoryCaseStudy }) {
  const chapters: ChapterLink[] = study.groups.map(({ id, index, label }) => ({
    id,
    index,
    label,
  }))
  const showNext = hasCaseStudy(study.nextProject.slug)
  const decisionIds = study.groups
    .flatMap((group) => group.sections)
    .filter((section) => section.variant === "decision")
    .map((section) => section.id)

  return (
    <>
      <ChapterProgress chapters={chapters} />

      <ContentContainer className="py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[10rem_minmax(0,1fr)] xl:gap-12">
          <ChapterNav chapters={chapters} />

          <article className="flex min-w-0 flex-col gap-10 sm:gap-14">
            {study.groups.map((group, groupIndex) => (
              <div
                key={group.id}
                id={group.id}
                className="flex scroll-mt-12 flex-col gap-10 sm:gap-14"
              >
                {groupIndex === 0 ? <StoryHero study={study} /> : null}

                {group.sections.map((section) =>
                  section.variant === "decision" ? (
                    <DecisionFrame
                      key={section.id}
                      section={section}
                      number={decisionIds.indexOf(section.id) + 1}
                    />
                  ) : (
                    <StorySectionView key={section.id} section={section} />
                  ),
                )}
              </div>
            ))}

            {study.closingNote ? (
              <aside
                aria-labelledby="closing-note"
                className="flex max-w-[68ch] flex-col gap-2 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4"
              >
                <h2 id="closing-note" className="text-xl leading-snug">
                  {study.closingNote.heading}
                </h2>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {study.closingNote.body}
                </p>
              </aside>
            ) : null}

            {showNext ? (
              <Link
                href={`/work/${study.nextProject.slug}`}
                className="group flex flex-col gap-1 border-t border-border-subtle pt-5 focus-ring"
              >
                <span className="text-xs uppercase tracking-eyebrow text-text-muted">
                  Next case study
                </span>
                <span className="flex items-center gap-2 font-serif text-2xl leading-snug sm:text-3xl">
                  {study.nextProject.title}
                  <ArrowRight
                    aria-hidden
                    className="size-3 transition-standard group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </span>
                <span className="text-sm text-text-secondary">
                  {study.nextProject.line}
                </span>
              </Link>
            ) : null}
          </article>
        </div>
      </ContentContainer>
    </>
  )
}

function StorySectionView({
  section,
  className,
}: {
  section: StorySection
  className?: string
}) {
  return (
    <Chapter
      id={section.id}
      index={section.index}
      label={section.label}
      heading={section.heading}
      className={className}
    >
      <div className="flex flex-col gap-5">
        {section.blocks.map((block, blockIndex) => (
          <StoryBlockView key={blockIndex} block={block} />
        ))}
      </div>
    </Chapter>
  )
}

/**
 * The case study's centrepiece: each major decision sits on its own ground
 * with its ordinal set large, so a scanning reader finds all of them.
 */
function DecisionFrame({
  section,
  number,
}: {
  section: StorySection
  number: number
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface px-3 py-4 ring-1 ring-border-subtle sm:px-6 sm:py-6">
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-2 hidden font-serif text-8xl leading-none text-border-strong sm:block"
      >
        {number}
      </span>
      <StorySectionView section={section} className="relative border-t-0 pt-0" />
    </div>
  )
}

function StoryHero({ study }: { study: StoryCaseStudy }) {
  return (
    <header className="flex flex-col gap-5 sm:gap-6">
      <p className="text-xs uppercase tracking-eyebrow text-text-muted">
        {study.eyebrow}
      </p>

      <h1 className="max-w-[20ch] text-2xl leading-title xs:text-3xl sm:text-5xl lg:text-6xl">
        {study.title}
      </h1>

      <p className="max-w-[52ch] font-serif text-lg leading-snug text-text-primary sm:text-2xl">
        {study.subtitle}
      </p>

      <div className="flex max-w-[68ch] flex-col gap-3 text-base leading-relaxed text-text-secondary sm:text-lg">
        {study.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {study.question ? (
        <Callout>
          <span className="mb-1 block font-sans text-sm text-text-secondary">
            {study.question.label}
          </span>
          {study.question.text}
        </Callout>
      ) : null}

      <dl
        aria-label="At a glance"
        className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border-subtle pt-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {study.facts.map((fact) => (
          <div
            key={fact.label}
            className={cn(
              "flex flex-col gap-0.5",
              fact.wide && "max-w-[68ch] sm:col-span-2 lg:col-span-3",
            )}
          >
            <dt className="text-xs uppercase tracking-eyebrow text-text-muted">
              {fact.label}
            </dt>
            <dd className="text-sm leading-relaxed text-text-primary">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {/* The one-minute scan path: each decision jumps to its section. */}
      <section aria-labelledby="key-decisions" className="flex flex-col gap-2">
        <h2
          id="key-decisions"
          className="font-sans text-xs uppercase tracking-eyebrow text-text-muted"
        >
          {study.keyDecisions.heading}
        </h2>
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {study.keyDecisions.items.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                className="group flex h-full flex-col gap-2 rounded-lg border border-border-subtle bg-surface p-3 transition-standard hover:border-border-strong focus-ring"
              >
                <span className="font-serif text-lg leading-snug text-text-primary">
                  {item.text}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 text-sm text-text-secondary">
                  Read decision
                  <ArrowRight
                    aria-hidden
                    className="size-2 transition-standard group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </header>
  )
}
