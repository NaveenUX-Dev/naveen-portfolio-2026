import Image from "next/image"
import {
  Callout,
  FlowChain,
  Prose,
} from "@/features/case-study/components/chapter"
import { RecoveryDemo } from "@/features/case-study/components/recovery-demo"
import {
  Cascade,
  Clusters,
  Compare,
  FanIn,
  Legibility,
  Matrix,
  Readings,
  Specimen,
  StateMachine,
  Strata,
  Swimlane,
  Tree,
} from "@/features/case-study/components/story-diagrams"
import type {
  StoryBlock,
  StoryFigure,
  StoryFlow,
} from "@/types/story-case-study"

/** Renders one content block of a story case study. */
export function StoryBlockView({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "prose":
      return (
        <Prose>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{renderInline(paragraph)}</p>
          ))}
        </Prose>
      )
    case "callout":
      return (
        <Callout>
          {block.label ? (
            <span className="mb-1 block font-sans text-sm text-text-secondary">
              {block.label}
            </span>
          ) : null}
          {block.text}
        </Callout>
      )
    case "quote":
      return (
        <blockquote className="max-w-[52ch] rounded-lg border border-border-subtle bg-surface p-3 font-serif text-lg leading-snug text-text-primary sm:p-4 sm:text-xl">
          <p>{block.text}</p>
        </blockquote>
      )
    case "subheading":
      return (
        <h3 className="mt-2 font-serif text-xl leading-snug sm:text-2xl">
          {block.text}
        </h3>
      )
    case "list":
      return (
        <ul className="grid max-w-[68ch] grid-cols-1 gap-1 sm:grid-cols-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-2 text-sm leading-relaxed text-text-secondary"
            >
              <span aria-hidden className="text-text-muted">
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      )
    case "table":
      return (
        <table className="w-full max-w-[68ch] border-collapse text-left text-sm">
          <caption className="sr-only">{block.caption}</caption>
          <thead>
            <tr className="border-b border-border-strong">
              {block.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="pb-1 pr-3 align-bottom text-xs font-normal uppercase tracking-eyebrow text-text-muted"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map(([label, value]) => (
              <tr key={label} className="border-b border-border-subtle">
                <th
                  scope="row"
                  className="py-1.5 pr-3 align-top font-normal text-text-primary"
                >
                  {label}
                </th>
                <td className="py-1.5 align-top text-text-secondary">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    case "figure":
      return <AnnotatedFigure figure={block} />
    case "flow":
      return <ResponsibilityFlow flow={block} />
    case "recovery-demo":
      return <RecoveryDemo demo={block.demo} />
    case "cascade":
      return <Cascade block={block} />
    case "states":
      return <StateMachine block={block} />
    case "compare":
      return <Compare block={block} />
    case "clusters":
      return <Clusters block={block} />
    case "tree":
      return <Tree block={block} />
    case "swimlane":
      return <Swimlane block={block} />
    case "fanin":
      return <FanIn block={block} />
    case "readings":
      return <Readings block={block} />
    case "matrix":
      return <Matrix block={block} />
    case "specimen":
      return <Specimen block={block} />
    case "legibility":
      return <Legibility block={block} />
    case "strata":
      return <Strata block={block} />
  }
}

/** Supports the source copy's `**bold**` emphasis — nothing else. */
function renderInline(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-medium text-text-primary">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

/**
 * A product visual with numbered markers. The markers are decorative; the
 * numbered list below carries the same explanations for every reader.
 */
function AnnotatedFigure({ figure }: { figure: StoryFigure }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-lg border border-border-subtle bg-surface-sunken">
        <Image
          src={figure.src}
          width={figure.width}
          height={figure.height}
          alt={figure.alt}
          sizes="(min-width: 1280px) 896px, 100vw"
          className="h-auto w-full"
        />
        {figure.annotations.map((annotation, index) => (
          <span
            key={annotation.text}
            aria-hidden
            className="absolute flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-amber text-xs font-medium tabular-nums text-text-primary shadow-md dark:text-background"
            style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <figcaption className="flex flex-col gap-3">
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {figure.label ? (
            <span className="rounded-full border border-border-subtle px-1 py-0.5 text-xs text-text-secondary">
              {figure.label}
            </span>
          ) : null}
          <span className="font-serif text-lg leading-snug text-text-primary">
            {figure.caption}
          </span>
        </p>

        {figure.annotations.length > 0 ? (
        <ol className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-3">
          {figure.annotations.map((annotation, index) => (
            <li
              key={annotation.text}
              className="flex items-baseline gap-2 text-sm leading-relaxed text-text-secondary"
            >
              <span
                aria-hidden
                className="shrink-0 text-xs tabular-nums text-text-primary"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {annotation.text}
            </li>
          ))}
        </ol>
        ) : null}
      </figcaption>
    </figure>
  )
}

/** A vertical process with off-path branches, built in HTML (not an image). */
function ResponsibilityFlow({ flow }: { flow: StoryFlow }) {
  return (
    <figure className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-3 sm:p-4">
      <p className="text-xs uppercase tracking-eyebrow text-text-muted">
        {flow.label}
      </p>

      <ol className="flex flex-col gap-2 border-l border-border-strong pl-3">
        {flow.steps.map((step, index) => (
          <li key={step.text} className="flex flex-col gap-1">
            <p className="flex items-baseline gap-2">
              <span className="text-xs tabular-nums text-text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-md border border-border-subtle bg-surface-elevated px-2 py-1 text-sm text-text-primary">
                {step.text}
              </span>
              {step.actor && step.actor !== flow.steps[index - 1]?.actor ? (
                <span className="rounded-full border border-border-strong px-1 text-xs text-text-secondary">
                  {step.actor}
                </span>
              ) : null}
            </p>

            {step.inputs ? (
              <p className="pl-4 text-sm text-text-secondary">
                Inputs: {step.inputs.join(" · ")}
              </p>
            ) : null}

            {step.branch ? (
              <div className="flex flex-wrap items-center gap-2 pl-4">
                <span className="text-xs uppercase tracking-eyebrow text-text-muted">
                  {step.branch.when}
                </span>
                <FlowChain steps={step.branch.path} />
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <figcaption className="border-t border-border-subtle pt-2 text-sm text-text-secondary">
        {flow.caption}
      </figcaption>
    </figure>
  )
}
