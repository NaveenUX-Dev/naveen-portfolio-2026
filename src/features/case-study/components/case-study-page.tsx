"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ContentContainer } from "@/components/common/content-container"
import { CaseStudyHero } from "@/features/case-study/components/case-study-hero"
import {
  Callout,
  Chapter,
  FlowChain,
  Prose,
} from "@/features/case-study/components/chapter"
import {
  ChapterNav,
  ChapterProgress,
} from "@/features/case-study/components/chapter-nav"
import { ComponentStatePreview } from "@/features/case-study/components/component-state-preview"
import {
  DecisionCard,
  OutcomeCards,
} from "@/features/case-study/components/decision-card"
import { EvidenceBoard } from "@/features/case-study/components/evidence-board"
import {
  ReadingModeProvider,
  ReadingModeToggle,
  useReadingModeState,
} from "@/features/case-study/components/reading-mode"
import { RoleSwitcher } from "@/features/case-study/components/role-switcher"
import { SystemMap } from "@/features/case-study/components/system-map"
import { WorkflowStepper } from "@/features/case-study/components/workflow-stepper"
import type { CaseStudy } from "@/types/case-study"

/**
 * Renders any case study from its content object. Chapter order follows the
 * master file's recommended hierarchy; the reading mode decides which
 * chapters are present.
 */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const [mode, setMode] = useReadingModeState()

  return (
    <ReadingModeProvider value={mode}>
      <ChapterProgress chapters={study.chapters} />

      <ContentContainer className="py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[10rem_minmax(0,1fr)] xl:gap-12">
          <ChapterNav chapters={study.chapters} />

          <article className="flex flex-col gap-10 sm:gap-14">
            <CaseStudyHero
              eyebrow={study.eyebrow}
              title={study.title}
              standfirst={study.standfirst}
              challenge={study.challenge}
              meta={study.meta}
              controls={
                <ReadingModeToggle
                  value={mode}
                  onChange={setMode}
                  briefLabel="Brief · 5 min"
                  deepLabel="Deep dive · 15 min"
                />
              }
            />

            <Chapter
              id="summary"
              index="01"
              label="Summary"
              heading="The project in four ideas"
            >
              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {study.summary.map((idea) => (
                  <li key={idea.index} className="flex flex-col gap-2">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-text-muted">
                      <span className="tabular-nums text-text-primary">
                        {idea.index}
                      </span>
                      {idea.title}
                    </p>
                    {idea.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-text-secondary"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </li>
                ))}
              </ol>
            </Chapter>

            <Chapter
              id="context"
              index="02"
              label="Context"
              heading={study.context.heading}
            >
              <div className="flex flex-col gap-5">
                <Prose>
                  {study.context.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Prose>
                <FlowChain steps={study.context.chain} />
                <Callout>{study.context.question}</Callout>
              </div>
            </Chapter>

            <Chapter
              id="system"
              index="03"
              label="System"
              heading="The product landscape"
              standfirst="Select a module to see the job it performs, who uses it, what it depends on, and what it affects."
            >
              <SystemMap modules={study.modules} />
            </Chapter>

            <Chapter
              id="roles"
              index="04"
              label="Roles"
              heading="One product. Different responsibilities."
              standfirst="Different users should see different priorities and actions — not different versions of the underlying organisational reality."
            >
              <RoleSwitcher roles={study.roles} />
            </Chapter>

            <Chapter
              id="problem"
              index="05"
              label="Problem"
              heading={study.problem.heading}
              standfirst={study.problem.body}
            >
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {study.problem.items.map((item) => (
                  <div key={item.title} className="flex flex-col gap-1">
                    <dt className="font-serif text-lg leading-snug">
                      {item.title}
                    </dt>
                    <dd className="text-sm leading-relaxed text-text-secondary">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Chapter>

            <Chapter
              id="evidence"
              index="06"
              label="Discovery"
              depth="deep"
              heading="I started by understanding how work moved"
              standfirst="The evidence that changed a design decision, rather than a list of methods."
            >
              <EvidenceBoard items={study.evidence} />
            </Chapter>

            <Chapter
              id="architecture"
              index="07"
              label="Architecture"
              depth="deep"
              heading="Organising the system around predictable domains"
              standfirst="A portfolio presentation model of the structure — not a claim about the production navigation."
            >
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {study.informationArchitecture.map((group) => (
                  <li
                    key={group.group}
                    className="flex flex-col gap-1 rounded-md border border-border-subtle bg-surface p-2"
                  >
                    <p className="text-sm text-text-primary">{group.group}</p>
                    {group.items.map((item) => (
                      <p key={item} className="text-xs text-text-secondary">
                        {item}
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter
              id="decisions"
              index="08"
              label="Decisions"
              heading="Four decisions that shaped the product"
            >
              <div className="flex flex-col gap-8">
                {study.decisions.map((decision) => (
                  <DecisionCard key={decision.index} decision={decision} />
                ))}
              </div>
            </Chapter>

            <Chapter
              id="workflow"
              index="09"
              label="Workflow"
              heading={study.workflow.heading}
              standfirst={study.workflow.body}
            >
              <WorkflowStepper
                steps={study.workflow.steps}
                edgeStates={study.workflow.edgeStates}
              />
            </Chapter>

            <Chapter
              id="design-system"
              index="10"
              label="Design system"
              heading="Turning recurring decisions into a reusable product language"
              standfirst="The story is not that I made a component library. It is that I reduced repeated design decisions by turning common enterprise behaviour into reusable patterns."
            >
              <div className="flex flex-col gap-5">
                <ol className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                  {study.designSystem.layers.map((layer, index) => (
                    <li
                      key={layer.name}
                      className="flex flex-col gap-1 rounded-md border border-border-subtle bg-surface p-2"
                    >
                      <p className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-text-muted">
                        <span className="tabular-nums text-text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {layer.name}
                      </p>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {layer.items}
                      </p>
                    </li>
                  ))}
                </ol>

                <ComponentStatePreview sets={study.designSystem.preview} />
              </div>
            </Chapter>

            <Chapter
              id="responsive"
              index="11"
              label="Responsive"
              depth="deep"
              heading={study.responsive.heading}
              standfirst={study.responsive.body}
            >
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {study.responsive.changes.map((change) => (
                  <li
                    key={change}
                    className="flex items-baseline gap-2 text-sm text-text-secondary"
                  >
                    <span aria-hidden className="text-text-muted">
                      ·
                    </span>
                    {change}
                  </li>
                ))}
              </ul>
            </Chapter>

            <Chapter
              id="engineering"
              index="12"
              label="Engineering"
              heading={study.engineering.heading}
            >
              <div className="flex flex-col gap-5">
                <Prose>
                  {study.engineering.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Prose>

                <FlowChain steps={study.engineering.chain} />

                <div className="flex flex-col gap-2 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4">
                  <p className="text-xs uppercase tracking-eyebrow text-text-muted">
                    What I was involved in
                  </p>
                  <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                    {study.engineering.involvement.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-2 text-sm text-text-secondary"
                      >
                        <span aria-hidden className="text-text-muted">
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Chapter>

            <Chapter
              id="validation"
              index="13"
              label="Validation"
              depth="deep"
              heading={study.validation.heading}
            >
              <Prose>
                <p>{study.validation.body}</p>
              </Prose>
            </Chapter>

            <Chapter
              id="outcome"
              index="14"
              label="Outcome"
              heading="What changed because of the design"
              standfirst="Qualitative outcomes only. Numerical results are not published until they can be verified."
            >
              <OutcomeCards outcomes={study.outcomes} />
            </Chapter>

            <Chapter
              id="reflection"
              index="15"
              label="Reflection"
              heading={study.reflection.heading}
            >
              <div className="flex flex-col gap-5">
                <Prose>
                  {study.reflection.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Prose>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Shift label="I used to ask" quote={study.reflection.before} />
                  <Shift
                    label="I now ask"
                    quote={study.reflection.after}
                    emphasis
                  />
                </div>

                <div className="flex flex-col gap-2 border-t border-border-subtle pt-4">
                  <p className="text-xs uppercase tracking-eyebrow text-text-muted">
                    What I would improve next
                  </p>
                  <ol className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                    {study.nextSteps.map((step, index) => (
                      <li
                        key={step}
                        className="flex items-baseline gap-2 text-sm text-text-secondary"
                      >
                        <span className="tabular-nums text-xs text-text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Chapter>

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
          </article>
        </div>
      </ContentContainer>
    </ReadingModeProvider>
  )
}

function Shift({
  label,
  quote,
  emphasis,
}: {
  label: string
  quote: string
  emphasis?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border-subtle bg-surface p-3">
      <p className="text-xs uppercase tracking-eyebrow text-text-muted">
        {label}
      </p>
      <p
        className={
          emphasis
            ? "font-serif text-lg leading-snug text-text-primary"
            : "font-serif text-lg leading-snug text-text-secondary"
        }
      >
        {quote}
      </p>
    </div>
  )
}
