import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  CornerDownRight,
  Minus,
  RefreshCw,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type {
  StoryCascade,
  StoryClusters,
  StoryCompare,
  StoryFanIn,
  StoryLegibility,
  StoryMatrix,
  StoryReadings,
  StorySpecimen,
  StorySpecimenRow,
  StoryStates,
  StoryStrata,
  StorySwimlane,
  StoryTree,
} from "@/types/story-case-study"

/*
 * Systems diagrams for story case studies, drawn in HTML so they stay
 * readable, themable and accessible. They sit on the page ground rather than
 * in boxes; nodes carry the borders. Meaning never rests on colour alone.
 */

const node =
  "rounded-md border border-border-strong bg-surface-elevated px-2 py-1 text-sm leading-snug text-text-primary"
const quietNode =
  "rounded-md border border-dashed border-border-strong px-2 py-1 text-sm leading-snug text-text-secondary"
const caption = "max-w-[68ch] text-sm leading-relaxed text-text-secondary"

function Caption({ children }: { children: React.ReactNode }) {
  return <figcaption className={caption}>{children}</figcaption>
}

/* -------------------------------------------------------------- cascade */

export function Cascade({ block }: { block: StoryCascade }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {block.chains.map((chain) => (
        <figure key={chain.title} className="flex flex-col gap-2">
          <figcaption className="font-serif text-lg leading-snug">
            {chain.title}
          </figcaption>
          <ol className="flex flex-col gap-1">
            {chain.steps.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-1"
                style={{ paddingLeft: `${index * 16}px` }}
              >
                {index > 0 ? (
                  <CornerDownRight
                    aria-hidden
                    className="size-2 shrink-0 text-text-muted"
                    strokeWidth={1.5}
                  />
                ) : null}
                <span
                  className={cn(
                    node,
                    index === chain.steps.length - 1 &&
                      "border-accent-olive-strong",
                  )}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </figure>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------- states */

export function StateMachine({ block }: { block: StoryStates }) {
  const last = block.states.length - 1

  return (
    <figure className="flex flex-col gap-3">
      <p className="text-sm text-text-secondary">{block.label}</p>

      <ol className="flex flex-col gap-2 border-l border-border-strong pl-3 lg:flex-row lg:gap-1 lg:border-l-0 lg:pl-0">
        {block.states.map((state, index) => (
          <li key={state.name} className="flex flex-col gap-1 lg:flex-1">
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  node,
                  "lg:flex-1",
                  index === last &&
                    "border-accent-olive-strong bg-accent-olive-strong text-text-inverse dark:text-background",
                )}
              >
                {state.name}
              </span>
              {index < last ? (
                <ChevronRight
                  aria-hidden
                  className="hidden size-2 shrink-0 text-text-muted lg:block"
                  strokeWidth={1.5}
                />
              ) : null}
            </div>

            {state.exception ? (
              <p className="ml-2 flex items-start gap-1 border-l border-dashed border-border-strong pl-2 pt-1 text-sm leading-snug text-text-secondary lg:ml-2 lg:mr-3">
                <TriangleAlert
                  aria-hidden
                  className="mt-0.5 size-2 shrink-0 text-accent-amber"
                  strokeWidth={1.5}
                />
                <span>
                  <span className="sr-only">Exception: </span>
                  {state.exception}
                </span>
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      {block.outcome ? (
        <p className="flex items-center gap-1 text-sm text-text-primary">
          <ArrowRight
            aria-hidden
            className="size-2 shrink-0 text-accent-olive-strong"
            strokeWidth={1.5}
          />
          {block.outcome}
        </p>
      ) : null}

      <Caption>{block.caption}</Caption>
    </figure>
  )
}

/* -------------------------------------------------------------- compare */

export function Compare({ block }: { block: StoryCompare }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {block.sides.map((side, sideIndex) => {
          const chosen = sideIndex === 1

          return (
            <div key={side.label} className="flex flex-col gap-2">
              <p
                className={cn(
                  "font-serif text-lg leading-snug",
                  chosen ? "text-text-primary" : "text-text-secondary",
                )}
              >
                {side.label}
              </p>
              <ol className="flex flex-col gap-0.5">
                {side.steps.map((step, index) => (
                  <li key={step} className="flex flex-col items-start gap-0.5">
                    {index > 0 ? (
                      <ArrowDown
                        aria-hidden
                        className="ml-2 size-2 text-text-muted"
                        strokeWidth={1.5}
                      />
                    ) : null}
                    <span className={chosen ? node : quietNode}>{step}</span>
                  </li>
                ))}
              </ol>
              {side.note ? (
                <p className="text-sm leading-relaxed text-text-secondary">
                  {side.note}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------- clusters */

const clusterColumns: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
}

export function Clusters({ block }: { block: StoryClusters }) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className={cn(
          "grid grid-cols-1 gap-x-6 gap-y-4",
          clusterColumns[block.groups.length],
        )}
      >
        {block.groups.map((group) => (
          <div
            key={group.name}
            className="flex flex-col gap-1 border-t border-border-strong pt-2"
          >
            <p className="font-serif text-lg leading-snug">{group.name}</p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-1 text-sm leading-relaxed text-text-secondary"
                >
                  <span
                    aria-hidden
                    className="size-0.5 shrink-0 -translate-y-0.5 rounded-full bg-text-muted"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}

/* ----------------------------------------------------------------- tree */

export function Tree({ block }: { block: StoryTree }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex flex-col md:items-center">
        <span className={cn(node, "w-fit font-medium")}>{block.root}</span>
        <span
          aria-hidden
          className="hidden h-2 w-px bg-border-strong md:block"
        />
        {/* Narrow: an indented list. Wide: siblings hang from one bus. */}
        <ul className="ml-2 flex flex-col border-l border-border-strong pt-1 md:ml-0 md:w-full md:flex-row md:justify-between md:border-l-0 md:border-t md:pt-0">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-center pt-1 md:flex-col md:pt-0"
            >
              <span
                aria-hidden
                className="h-px w-2 shrink-0 bg-border-strong md:h-2 md:w-px"
              />
              <span className={cn(node, "md:whitespace-nowrap")}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------- swimlane */

export function Swimlane({ block }: { block: StorySwimlane }) {
  const laneIndex = (lane: string) => block.lanes.indexOf(lane)

  return (
    <figure className="flex flex-col gap-3">
      {/* Wide screens: one column per actor, time running downward, so
          every hand-off reads as a step sideways. */}
      <div
        className="hidden gap-x-1 md:grid"
        style={{
          gridTemplateColumns: `repeat(${block.lanes.length}, minmax(0, 1fr))`,
        }}
      >
        {block.lanes.map((lane, index) => (
          <div
            key={lane}
            aria-hidden
            className="rounded-md bg-surface"
            style={{
              gridColumn: index + 1,
              gridRow: `1 / ${block.steps.length + 2}`,
            }}
          />
        ))}
        {block.lanes.map((lane, index) => (
          <p
            key={lane}
            className="border-b border-border-subtle px-2 py-1.5 text-sm font-medium text-text-primary"
            style={{ gridColumn: index + 1, gridRow: 1 }}
          >
            {lane}
          </p>
        ))}
        {block.steps.map((step, index) => (
          <div
            key={step.text}
            className="relative flex px-1 py-0.5"
            style={{ gridColumn: laneIndex(step.lane) + 1, gridRow: index + 2 }}
          >
            <div className="flex w-full flex-wrap items-baseline gap-x-2 gap-y-1 rounded-md border border-border-strong bg-surface-elevated px-2 py-1 text-sm leading-snug">
              <span className="text-xs tabular-nums text-text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">{step.text}</span>
              {step.state ? <StateTag>{step.state}</StateTag> : null}
            </div>
          </div>
        ))}
      </div>

      {/* Narrow screens: one timeline, each step tagged with its actor. */}
      <ol className="flex flex-col gap-2 border-l border-border-strong pl-3 md:hidden">
        {block.steps.map((step, index) => (
          <li key={step.text} className="flex flex-col items-start gap-1">
            <span className="flex items-baseline gap-2">
              <span className="text-xs tabular-nums text-text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-border-strong px-1 text-xs text-text-primary">
                {step.lane}
              </span>
            </span>
            <span className="text-sm leading-snug">{step.text}</span>
            {step.state ? <StateTag>{step.state}</StateTag> : null}
          </li>
        ))}
      </ol>

      <Caption>{block.caption}</Caption>
    </figure>
  )
}

function StateTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-sm bg-accent-olive-strong px-1 py-0.5 text-xs text-text-inverse dark:text-background">
      <span className="sr-only">State: </span>
      {children}
    </span>
  )
}

/* --------------------------------------------------------------- fan-in */

export function FanIn({ block }: { block: StoryFanIn }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0">
        <ul className="flex flex-col gap-1 lg:flex-1 lg:border-r lg:border-border-strong">
          {block.inputs.map((input) => (
            <li key={input.source} className="flex items-center gap-1">
              <span className={cn(node, "shrink-0")}>{input.source}</span>
              <ArrowRight
                aria-hidden
                className="size-2 shrink-0 text-text-muted"
                strokeWidth={1.5}
              />
              <span className="text-sm text-text-secondary">{input.effect}</span>
              <span
                aria-hidden
                className="hidden h-px flex-1 bg-border-strong lg:block"
              />
            </li>
          ))}
        </ul>

        <ArrowDown
          aria-hidden
          className="ml-2 size-2 text-text-muted lg:hidden"
          strokeWidth={1.5}
        />
        <span
          aria-hidden
          className="hidden h-px w-4 bg-border-strong lg:block"
        />

        <div className="flex flex-col gap-0.5 rounded-md border border-accent-olive-strong bg-surface-elevated px-3 py-2 lg:w-32">
          <span className="font-serif text-xl leading-snug">
            {block.target.name}
          </span>
          <span className="text-sm text-text-secondary">
            {block.target.result}
          </span>
        </div>
      </div>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}

/* ------------------------------------------------------------- readings */

export function Readings({ block }: { block: StoryReadings }) {
  return (
    <figure className="flex flex-col gap-3">
      <p className="text-sm text-text-secondary">{block.label}</p>
      <ul className="grid grid-cols-2 overflow-hidden rounded-lg border border-border-strong lg:grid-cols-4">
        {block.states.map((state, index) => (
          <li
            key={state}
            className={cn(
              "flex flex-col gap-1 border-border-subtle bg-surface-elevated p-2",
              readingDividers[index],
            )}
          >
            <span className="text-sm text-text-secondary">{block.metric}</span>
            <span className="font-serif text-2xl tabular-nums leading-none">
              {block.value}
            </span>
            <span className="w-fit rounded-sm border border-border-strong px-1 text-xs text-text-primary">
              {state}
            </span>
          </li>
        ))}
      </ul>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}

/** Hairlines between the 2×2 (narrow) and 1×4 (wide) arrangements. */
const readingDividers = [
  "border-b border-r lg:border-b-0",
  "border-b lg:border-b-0 lg:border-r",
  "border-r",
  "",
]

/* --------------------------------------------------------------- matrix */

export function Matrix({ block }: { block: StoryMatrix }) {
  return (
    <figure className="flex flex-col gap-3">
      <table className="w-full max-w-2xl border-collapse text-left text-sm">
        <caption className="sr-only">{block.caption}</caption>
        <thead>
          <tr className="border-b border-border-strong">
            <th scope="col" className="pb-1 pr-3 font-medium text-text-primary">
              Action
            </th>
            {block.columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="w-1/6 pb-1 text-center font-medium text-text-primary"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.action} className="border-b border-border-subtle">
              <th
                scope="row"
                className="py-1.5 pr-3 align-middle font-normal text-text-primary"
              >
                {row.action}
              </th>
              {row.values.map((value, index) => (
                <td key={block.columns[index]} className="py-1.5 text-center">
                  <MatrixValue value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}

function MatrixValue({ value }: { value: string }) {
  if (value === "yes") {
    return (
      <>
        <Check
          aria-hidden
          className="inline size-2 text-accent-olive-strong"
          strokeWidth={2}
        />
        <span className="sr-only">Yes</span>
      </>
    )
  }
  if (value === "no") {
    return (
      <>
        <Minus
          aria-hidden
          className="inline size-2 text-text-muted"
          strokeWidth={1.5}
        />
        <span className="sr-only">No</span>
      </>
    )
  }
  return <span className="text-text-secondary">{value}</span>
}

/* ------------------------------------------------------ status language */

const statusStyle: Record<string, { icon: LucideIcon; tone: string; dot: string }> =
  {
    Pending: { icon: Clock, tone: "text-accent-amber", dot: "bg-accent-amber" },
    Approved: {
      icon: CircleCheck,
      tone: "text-accent-olive-strong",
      dot: "bg-accent-olive-strong",
    },
    Rejected: { icon: CircleX, tone: "text-accent-peach", dot: "bg-accent-peach" },
    Processing: { icon: RefreshCw, tone: "text-accent-blue", dot: "bg-accent-blue" },
  }

const fallbackStatus = {
  icon: Circle,
  tone: "text-text-muted",
  dot: "bg-text-muted",
}

function StatusChip({ state }: { state: string }) {
  const { icon: Icon, tone } = statusStyle[state] ?? fallbackStatus

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-surface-elevated px-2 py-0.5 text-sm text-text-primary">
      <Icon aria-hidden className={cn("size-2", tone)} strokeWidth={1.75} />
      {state}
    </span>
  )
}

/* ------------------------------------------------------------- specimen */

export function Specimen({ block }: { block: StorySpecimen }) {
  return (
    <figure className="flex flex-col gap-3">
      <p className="text-sm text-text-secondary">{block.label}</p>
      <dl className="flex flex-col">
        {block.rows.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-1 gap-2 border-t border-border-subtle py-3 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-4"
          >
            <dt className="flex flex-col gap-0.5">
              <span className="font-serif text-lg leading-snug">{row.name}</span>
              <span className="text-sm leading-relaxed text-text-secondary">
                {row.rule}
              </span>
            </dt>
            <dd
              className={
                row.kind === "confirm"
                  ? "flex"
                  : "grid grid-cols-2 items-start gap-x-3 gap-y-3 lg:grid-cols-4"
              }
            >
              <SpecimenRow row={row} />
            </dd>
          </div>
        ))}
      </dl>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}

function SpecimenState({
  state,
  children,
}: {
  state: string
  children: React.ReactNode
}) {
  return (
    <span className="flex flex-col items-start gap-1">
      <span className="text-xs text-text-secondary">{state}</span>
      {children}
    </span>
  )
}

const buttonBase =
  "inline-flex h-5 items-center rounded-full px-3 text-sm font-medium"

const buttonState: Record<string, string> = {
  Primary:
    "bg-accent-olive-strong text-text-inverse shadow-sm dark:text-background",
  Secondary:
    "border border-border-strong bg-surface-elevated text-text-primary",
  Destructive: "bg-accent-peach text-text-primary dark:text-background",
  Disabled:
    "bg-accent-olive-strong text-text-inverse opacity-50 dark:text-background",
}

function SpecimenRow({ row }: { row: StorySpecimenRow }) {
  switch (row.kind) {
    case "button":
      return row.states.map((state) => (
        <SpecimenState key={state} state={state}>
          <span className={cn(buttonBase, buttonState[state])}>{row.sample}</span>
        </SpecimenState>
      ))
    case "input":
      return row.states.map((state) => (
        <SpecimenState key={state} state={state}>
          <span className="flex w-full flex-col gap-0.5">
            <span className="text-xs text-text-secondary">{row.field}</span>
            <span
              className={cn(
                "flex h-5 items-center rounded-md border bg-background px-2 text-sm",
                state === "Default" && "border-border-strong text-text-secondary",
                state === "Focus" &&
                  "border-accent-olive-strong text-text-primary outline-2 outline-offset-2 outline-accent-olive-strong",
                state === "Error" && "border-accent-peach text-text-primary",
                state === "Disabled" &&
                  "border-border-subtle text-text-secondary opacity-50",
              )}
            >
              {state === "Default" ? row.field : row.value}
            </span>
            {state === "Error" ? (
              <span className="flex items-center gap-0.5 text-xs text-text-primary">
                <CircleAlert
                  aria-hidden
                  className="size-1.5 shrink-0 text-accent-peach"
                  strokeWidth={2}
                />
                {row.error}
              </span>
            ) : null}
          </span>
        </SpecimenState>
      ))
    case "status":
      return row.states.map((state) => (
        <span key={state}>
          <StatusChip state={state} />
        </span>
      ))
    case "confirm":
      return (
        <span className="flex w-full max-w-sm flex-col gap-3 rounded-lg border border-border-strong bg-surface-elevated p-3 shadow-md">
          <span className="font-medium text-text-primary">{row.title}</span>
          <span className="flex justify-end gap-1">
            <span className={cn(buttonBase, buttonState.Secondary, "h-4 px-2")}>
              {row.cancel}
            </span>
            <span className={cn(buttonBase, buttonState.Destructive, "h-4 px-2")}>
              {row.action}
            </span>
          </span>
        </span>
      )
  }
}

/* ---------------------------------------------------------- legibility */

export function Legibility({ block }: { block: StoryLegibility }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-text-secondary">{block.before}</p>
          <p className="flex items-center gap-2">
            {block.states.map((state) => (
              <span
                key={state}
                className={cn(
                  "size-2 rounded-full",
                  (statusStyle[state] ?? fallbackStatus).dot,
                )}
              />
            ))}
            <span className="sr-only">
              Three coloured dots with no labels.
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-text-primary">{block.after}</p>
          <p className="flex flex-wrap gap-1">
            {block.states.map((state) => (
              <StatusChip key={state} state={state} />
            ))}
          </p>
        </div>
      </div>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}

/* --------------------------------------------------------------- strata */

export function Strata({ block }: { block: StoryStrata }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex flex-col">
        <p className="rounded-t-md border border-accent-olive-strong bg-surface-elevated px-3 py-2 font-serif text-lg leading-snug">
          {block.surface}
        </p>
        <ul className="flex flex-col rounded-b-md border-x border-b border-border-strong">
          {block.layers.map((layer, index) => (
            <li
              key={layer}
              className="flex items-center gap-1 border-t border-dashed border-border-subtle py-1.5 pr-3 text-sm text-text-secondary"
              style={{ paddingLeft: `${24 + index * 16}px` }}
            >
              <span aria-hidden className="h-px w-1.5 shrink-0 bg-border-strong" />
              {layer}
            </li>
          ))}
        </ul>
      </div>
      <Caption>{block.caption}</Caption>
    </figure>
  )
}
