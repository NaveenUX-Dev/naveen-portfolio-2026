import { hrmsCaseStudy } from "@/content/case-studies/hrms"
import type { CaseStudy } from "@/types/case-study"

/**
 * Published case studies, keyed by slug. Projects in `config/projects.ts`
 * without an entry here still list on the home page but have no detail route
 * yet — see `hasCaseStudy` below.
 */
export const caseStudies: Record<string, CaseStudy> = {
  [hrmsCaseStudy.slug]: hrmsCaseStudy,
}

export function hasCaseStudy(slug: string) {
  return slug in caseStudies
}
