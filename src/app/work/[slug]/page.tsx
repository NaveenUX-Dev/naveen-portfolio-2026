import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/common/json-ld"
import { StoryCaseStudyPage } from "@/features/case-study/components/story-case-study-page"
import { caseStudies } from "@/content/case-studies"
import { projects } from "@/config/projects"
import { pageMetadata } from "@/lib/page-metadata"
import { caseStudyGraph } from "@/lib/structured-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies[slug]

  if (!study) return {}

  return pageMetadata({
    title: study.metadata.title,
    description: study.metadata.description,
    path: `/work/${slug}/`,
    type: "article",
    image: `work-${slug}.png`,
  })
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = caseStudies[slug]

  if (!study) notFound()

  const cover = projects.find((project) => project.slug === slug)?.coverImage

  return (
    <>
      <JsonLd data={caseStudyGraph(study, cover)} />
      <StoryCaseStudyPage study={study} />
    </>
  )
}
