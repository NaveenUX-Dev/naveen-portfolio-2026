/** Sections marked `deep` are hidden until the reader opens Deep dive mode. */
export type ReadingDepth = "brief" | "deep"

export interface CaseStudyMeta {
  label: string
  value: string
  /** Renders with a verification marker rather than as a settled fact. */
  unverified?: boolean
}

export interface SummaryIdea {
  index: string
  title: string
  body: string[]
}

export interface SystemModule {
  id: string
  name: string
  job: string
  roles: string[]
  dependsOn: string[]
  affects: string[]
}

export interface CaseStudyRole {
  id: string
  name: string
  goal: string
  actions: string[]
}

export interface EvidenceItem {
  evidence: string
  interpretation: string
  implication: string
}

export interface DesignDecision {
  index: string
  title: string
  body: string[]
  /** Short principle pulled out as a callout. */
  principle?: string
  points?: { heading: string; detail: string }[]
}

export interface WorkflowStep {
  index: string
  title: string
  role: string
  state: string
  detail: string
}

export interface ComponentStateSet {
  name: string
  states: string[]
}

export interface Outcome {
  title: string
  body: string
}

export interface CaseStudyChapter {
  id: string
  index: string
  label: string
  depth: ReadingDepth
}

export interface CaseStudy {
  slug: string
  eyebrow: string
  title: string
  standfirst: string
  challenge: string
  meta: CaseStudyMeta[]
  chapters: CaseStudyChapter[]
  summary: SummaryIdea[]
  context: { heading: string; body: string[]; chain: string[]; question: string }
  modules: SystemModule[]
  roles: CaseStudyRole[]
  problem: { heading: string; body: string; items: { title: string; detail: string }[] }
  evidence: EvidenceItem[]
  informationArchitecture: { group: string; items: string[] }[]
  decisions: DesignDecision[]
  workflow: { heading: string; body: string; steps: WorkflowStep[]; edgeStates: string[] }
  designSystem: { layers: { name: string; items: string }[]; preview: ComponentStateSet[] }
  responsive: { heading: string; body: string; changes: string[] }
  engineering: { heading: string; body: string[]; involvement: string[]; chain: string[] }
  validation: { heading: string; body: string }
  outcomes: Outcome[]
  reflection: { heading: string; body: string[]; before: string; after: string }
  nextSteps: string[]
  nextProject: { slug: string; title: string; line: string }
}
