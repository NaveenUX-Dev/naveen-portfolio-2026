import { ContentContainer } from "@/components/common/content-container"
import { ProjectRow } from "@/components/common/project-row"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { featuredProjects } from "@/config/projects"

export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-10 bg-background pb-12 sm:pb-16">
      <ContentContainer>
        <h2 className="text-xs uppercase tracking-eyebrow text-text-muted">
          Work
        </h2>

        <Stagger className="mt-4 flex flex-col gap-10 sm:mt-6 sm:gap-14">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectRow project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </ContentContainer>
    </section>
  )
}
