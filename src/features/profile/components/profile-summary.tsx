import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ContentContainer } from "@/components/common/content-container"
import { caseStudies } from "@/content/case-studies"
import { profile } from "@/content/profile"

/**
 * A compact, factual profile for the home page: who, what, where, and the
 * case studies that back it up. Every fact comes from content/profile.ts.
 */
export function ProfileSummary() {
  const [current, first] = profile.employer.roles
  const evidence = Object.values(caseStudies)

  return (
    <section
      aria-labelledby="profile-title"
      className="border-t border-border-subtle bg-background py-12 sm:py-16"
    >
      <ContentContainer className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-3">
          <h2 id="profile-title" className="text-3xl leading-title sm:text-4xl">
            {profile.name}, {profile.role}
          </h2>
          <p className="max-w-[60ch] text-base leading-relaxed text-text-secondary sm:text-lg">
            {profile.summary[0]}
          </p>
          <ul aria-label="Capabilities" className="flex flex-wrap gap-1">
            {profile.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-border-strong px-2 py-0.5 text-sm text-text-primary"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            <Fact label="Based in">
              {profile.location.city}, {profile.location.country}
            </Fact>
            <Fact label="Current role">
              {current.title}, {profile.employer.name} ({current.dates})
            </Fact>
            <Fact label="Previously">
              {first.title}, {profile.employer.name} ({first.dates})
            </Fact>
            <Fact label="Evidence">
              {evidence.map((study, index) => (
                <span key={study.slug}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="underline decoration-border-strong underline-offset-4 transition-standard hover:decoration-current focus-ring"
                  >
                    {study.eyebrow.split(" · ")[0]}
                  </Link>
                  {index < evidence.length - 1 ? ", " : ""}
                </span>
              ))}
            </Fact>
          </dl>

          <Link
            href="/about"
            className="group inline-flex w-fit items-center gap-1 rounded-sm text-sm font-medium text-text-primary focus-ring"
          >
            Experience, education and how I work
            <ArrowRight
              aria-hidden
              className="size-2 transition-standard group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </div>
      </ContentContainer>
    </section>
  )
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="text-sm leading-relaxed text-text-primary">{children}</dd>
    </div>
  )
}
