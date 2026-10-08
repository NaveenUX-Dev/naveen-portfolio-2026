import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ContentContainer } from "@/components/common/content-container"
import { profile } from "@/content/profile"

/** The About page. Everything here is visible text drawn from profile.ts. */
export function AboutPage() {
  // Roles are newest first; the company tenure starts with the earliest.
  const joined = profile.employer.roles[profile.employer.roles.length - 1]

  return (
    <ContentContainer className="flex flex-col gap-12 py-10 sm:gap-16 sm:py-14">
      <header className="flex flex-col gap-4">
        <h1 className="max-w-[18ch] text-4xl leading-title sm:text-5xl lg:text-6xl">
          About {profile.name}
        </h1>
        <div className="flex max-w-[68ch] flex-col gap-3 text-base leading-relaxed text-text-secondary sm:text-lg">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border-subtle pt-4 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Role">{profile.role}</Fact>
          <Fact label="Based in">
            {profile.location.city}, {profile.location.country}
          </Fact>
          <Fact label="Current employer">
            {profile.employer.name}, since {joined.dates.split(" – ")[0]}
          </Fact>
          <Fact label="Contact">
            <a
              href={`mailto:${profile.email}`}
              className="break-all underline decoration-border-strong underline-offset-4 transition-standard hover:decoration-current focus-ring"
            >
              {profile.email}
            </a>
          </Fact>
        </dl>
      </header>

      <Section id="experience" title="Experience">
        <ol className="flex flex-col gap-6">
          {profile.employer.roles.map((role) => (
            <li key={role.title} className="flex flex-col gap-2 border-t border-border-subtle pt-4">
              <h3 className="font-serif text-xl leading-snug sm:text-2xl">{role.title}</h3>
              <p className="text-sm text-text-secondary">
                {profile.employer.name} ·{" "}
                <time dateTime={role.start}>{role.dates.split(" – ")[0]}</time> –{" "}
                {role.end ? (
                  <time dateTime={role.end}>{role.dates.split(" – ")[1]}</time>
                ) : (
                  "Present"
                )}
              </p>
              <ul className="flex max-w-[68ch] flex-col gap-1">
                {role.points.map((point) => (
                  <li key={point} className="flex items-baseline gap-2 text-base leading-relaxed text-text-secondary">
                    <span aria-hidden className="size-0.5 shrink-0 -translate-y-1 rounded-full bg-text-secondary" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="specialisms" title="What I specialise in">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {profile.specialisms.map((item) => (
            <li key={item.name} className="flex flex-col gap-1 border-t border-border-subtle pt-3">
              <h3 className="font-serif text-lg leading-snug">{item.name}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{item.detail}</p>
              <EvidenceLink href={item.evidence.href}>
                Evidence: {item.evidence.label}
              </EvidenceLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="ai" title="AI in my work">
        <div className="flex max-w-[68ch] flex-col gap-3 text-base leading-relaxed text-text-secondary">
          <p>{profile.ai.productDesign}</p>
          <p>{profile.ai.tooling}</p>
        </div>
      </Section>

      <Section id="faq" title="Questions recruiters ask">
        <dl className="flex max-w-[68ch] flex-col gap-5">
          {profile.faq.map((item) => (
            <div key={item.question} className="flex flex-col gap-1 border-t border-border-subtle pt-3">
              <dt className="font-serif text-lg leading-snug text-text-primary">{item.question}</dt>
              <dd className="flex flex-col gap-2">
                <p className="text-base leading-relaxed text-text-secondary">{item.answer}</p>
                <p className="flex flex-wrap gap-x-4 gap-y-1">
                  {item.evidence.map((link) => (
                    <EvidenceLink key={link.href} href={link.href}>
                      {link.label}
                    </EvidenceLink>
                  ))}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="education" title="Education and certifications">
        <ul className="flex max-w-[68ch] flex-col gap-1 text-base leading-relaxed text-text-secondary">
          {profile.education.map((item) => (
            <li key={item.name}>
              {item.name}, {item.institution}
            </li>
          ))}
          {profile.certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="get-in-touch" title="Get in touch">
        <ul className="flex flex-col gap-2 text-base">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="break-all font-serif text-xl underline decoration-border-strong underline-offset-4 transition-standard hover:decoration-current focus-ring sm:text-2xl"
            >
              {profile.email}
            </a>
          </li>
          <li className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
            <ExternalLink href={profile.resumeUrl}>Résumé</ExternalLink>
            {profile.profiles.map((item) => (
              <ExternalLink key={item.url} href={item.url}>
                {item.label}
              </ExternalLink>
            ))}
          </li>
        </ul>
      </Section>
    </ContentContainer>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-12">
      <h2 id={`${id}-title`} className="mb-5 text-2xl leading-title sm:text-3xl">
        {title}
      </h2>
      {children}
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

function EvidenceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1 rounded-sm text-sm font-medium text-text-primary focus-ring"
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-2 transition-standard group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </Link>
  )
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-0.5 rounded-sm text-sm font-medium text-text-primary underline decoration-border-strong underline-offset-4 transition-standard hover:decoration-current focus-ring"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-2" strokeWidth={1.75} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
