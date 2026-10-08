import { dopamintCaseStudy } from "@/content/case-studies/dopamint"
import { hrmsCaseStudy } from "@/content/case-studies/hrms"
import { megathilCaseStudy } from "@/content/case-studies/megathil"
import type { StoryCaseStudy } from "@/types/story-case-study"

/**
 * Published case studies, keyed by slug. Projects in `config/projects.ts`
 * without an entry here still list on the home page but have no detail route
 * yet — see `hasCaseStudy` below.
 */
export const caseStudies: Record<string, StoryCaseStudy> = {
  [hrmsCaseStudy.slug]: hrmsCaseStudy,
  [dopamintCaseStudy.slug]: dopamintCaseStudy,
  [megathilCaseStudy.slug]: megathilCaseStudy,
}

export function hasCaseStudy(slug: string) {
  return slug in caseStudies
}
