import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyPage } from "@/features/case-study/components/case-study-page"
import { caseStudies } from "@/content/case-studies"
import { projects } from "@/config/projects"

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

  const project = projects.find((item) => item.slug === slug)

  return {
    title: study.title,
    description: project?.description ?? study.standfirst,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `/work/${slug}`,
      title: study.title,
      description: project?.description ?? study.standfirst,
    },
  }
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = caseStudies[slug]

  if (!study) notFound()

  return <CaseStudyPage study={study} />
}
