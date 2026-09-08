import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    slug: "dopamint",
    title: "Dopamint",
    description: "Mental wellness platform for a calmer, more balanced you.",
    statement: "A calmer mind, a brighter you",
    industries: ["Health", "Consumer"],
    accent: "blue",
    featured: true,
  },
  {
    slug: "medical-guardian",
    title: "Medical Guardian",
    description: "Connected care for greater independence.",
    statement: "People closer. Care smarter.",
    industries: ["Healthcare", "IoT"],
    accent: "peach",
    featured: true,
  },
  {
    slug: "hrms",
    title: "HRMS Platform",
    description: "A unified people platform for modern work.",
    statement: "People. Progress. Together.",
    industries: ["SaaS", "Enterprise"],
    accent: "olive",
    featured: true,
  },
  {
    slug: "pwd-oms",
    title: "PWD / OMS",
    description: "Streamlining operations for a more connected ecosystem.",
    statement: "Complex operations. Clearer outcomes.",
    industries: ["Government", "Operations"],
    accent: "amber",
    featured: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
