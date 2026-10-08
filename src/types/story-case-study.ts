/**
 * A narrative case study: numbered sections of editorial blocks, grouped for
 * the chapter rail. Every case study on the site uses this one format.
 */
export interface StoryCaseStudy {
  slug: string
  eyebrow: string
  title: string
  subtitle: string
  intro: string[]
  /** The framing design question, set under the introduction. */
  question?: { label: string; text: string }
  /** The opening "at a glance" summary. `wide` rows span the full grid. */
  facts: { label: string; value: string; wide?: boolean }[]
  /** Headline decisions, each linking to the section that explains it. */
  keyDecisions: { heading: string; items: { text: string; target: string }[] }
  /** Rail entries. Each group wraps one or more sections. */
  groups: StoryGroup[]
  closingNote?: { heading: string; body: string }
  nextProject: { slug: string; title: string; line: string }
  metadata: { title: string; description: string }
}

export interface StoryGroup {
  id: string
  index: string
  label: string
  sections: StorySection[]
}

export interface StorySection {
  id: string
  index: string
  label: string
  heading: string
  /** Decisions are the case study's centrepiece and get their own frame. */
  variant?: "decision"
  blocks: StoryBlock[]
}

export type StoryBlock =
  | { type: "prose"; paragraphs: string[] }
  | { type: "callout"; text: string; label?: string }
  | { type: "quote"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "table"
      caption: string
      columns: [string, string]
      rows: [string, string][]
    }
  | StoryFigure
  | StoryFlow
  | { type: "recovery-demo"; demo: RecoveryDemo }
  | StoryCascade
  | StoryStates
  | StoryCompare
  | StoryClusters
  | StoryTree
  | StorySwimlane
  | StoryFanIn
  | StoryReadings
  | StoryMatrix
  | StorySpecimen
  | StoryLegibility
  | StoryStrata

export interface StoryFigure {
  type: "figure"
  src: string
  width: number
  height: number
  alt: string
  /** Evidence label, e.g. "UI concept · sample data". Omit when unknown. */
  label?: string
  caption: string
  /** Numbered markers; x / y are percentages of the image box. */
  annotations: { text: string; x: number; y: number }[]
}

export interface StoryFlow {
  type: "flow"
  label: string
  caption: string
  steps: {
    text: string
    /** Who acts at this step, e.g. "AI", "HR", "System". */
    actor?: string
    inputs?: string[]
    /** The off-path route from a decision step. */
    branch?: { when: string; path: string[] }
  }[]
}

/** Chains where each step causes the next, set as a descending staircase. */
export interface StoryCascade {
  type: "cascade"
  chains: { title: string; steps: string[] }[]
}

/** A state machine: the happy path, with exceptions where they occur. */
export interface StoryStates {
  type: "states"
  label: string
  caption: string
  states: { name: string; exception?: string }[]
  /** What reaching the final state unlocks. */
  outcome?: string
}

/** Two approaches side by side; the second is the one the design chose. */
export interface StoryCompare {
  type: "compare"
  caption: string
  sides: [StoryCompareSide, StoryCompareSide]
}

export interface StoryCompareSide {
  label: string
  steps: string[]
  note?: string
}

/** Grouped findings or lists, read as columns. */
export interface StoryClusters {
  type: "clusters"
  caption: string
  groups: { name: string; items: string[] }[]
}

/** A navigation tree. */
export interface StoryTree {
  type: "tree"
  root: string
  items: string[]
  caption: string
}

/** One workflow across several actors, each in its own lane. */
export interface StorySwimlane {
  type: "swimlane"
  caption: string
  lanes: string[]
  steps: { lane: string; text: string; state?: string }[]
}

/** Several inputs converging on one outcome. */
export interface StoryFanIn {
  type: "fanin"
  caption: string
  inputs: { source: string; effect: string }[]
  target: { name: string; result: string }
}

/** One value shown under each state it can be in. */
export interface StoryReadings {
  type: "readings"
  caption: string
  label: string
  metric: string
  value: string
  states: string[]
}

/** Who can do what. `yes` and `no` render as icons with text alternatives. */
export interface StoryMatrix {
  type: "matrix"
  caption: string
  columns: string[]
  rows: { action: string; values: string[] }[]
}

/** Design-system components shown in every state at once. */
export interface StorySpecimen {
  type: "specimen"
  label: string
  caption: string
  rows: StorySpecimenRow[]
}

export type StorySpecimenRow =
  | { kind: "button"; name: string; rule: string; sample: string; states: string[] }
  | {
      kind: "input"
      name: string
      rule: string
      field: string
      value: string
      error: string
      states: string[]
    }
  | { kind: "status"; name: string; rule: string; states: string[] }
  | {
      kind: "confirm"
      name: string
      rule: string
      title: string
      cancel: string
      action: string
    }

/** The same statuses communicated by colour alone, then legibly. */
export interface StoryLegibility {
  type: "legibility"
  caption: string
  before: string
  after: string
  states: string[]
}

/** What the visible interface sits on top of. */
export interface StoryStrata {
  type: "strata"
  caption: string
  surface: string
  layers: string[]
}

export interface RecoveryDemo {
  label: string
  controlLabel: string
  states: RecoveryDemoState[]
}

export interface RecoveryDemoState {
  id: string
  tab: string
  title: string
  tone: "warning" | "pending" | "success" | "review"
  rows: { label: string; value: string }[]
  /** Renders a clearly non-scannable QR stand-in. */
  qrPlaceholder?: string
  /** Advances the demo to another state. */
  advance?: { label: string; to: string }
  /** Buttons shown disabled, with a note that nothing is sent. */
  demoOnly?: { actions: string[]; note: string }
  caption: string
}
