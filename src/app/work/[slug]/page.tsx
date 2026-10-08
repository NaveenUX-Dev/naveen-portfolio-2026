import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { StoryCaseStudyPage } from "@/features/case-study/components/story-case-study-page"
import { caseStudies } from "@/content/case-studies"

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

  const { title, description } = study.metadata

  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `/work/${slug}`,
      title,
      description,
    },
  }
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = caseStudies[slug]

  if (!study) notFound()

  return <StoryCaseStudyPage study={study} />
}
