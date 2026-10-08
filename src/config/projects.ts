import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    slug: "dopamint",
    title: "Dopamint",
    description:
      "Designing the transition from AI conversation to reviewed financial action, with clear wallet context and a recovery path when funds are insufficient.",
    statement: "From questions to informed action",
    industries: ["AI", "Fintech"],
    coverImage: "/images/projects/dopamint-swap-review.webp",
    coverAlt:
      "UI concept of the Dopamint swap review: a card inside an AI chat showing the amount to send, the estimated amount to receive and the network, with Cancel and Confirm swap buttons.",
    coverLabel: "UI concept · sample data",
    accent: "blue",
    featured: true,
  },
  {
    slug: "megathil",
    title: "Megathil",
    description:
      "An AI-powered career platform connecting skill assessment, personalized learning, interview practice and progress tracking for students and early-career learners.",
    statement: "Learn. Prepare. Grow.",
    industries: ["EdTech", "AI"],
    coverImage: "/images/projects/megathil-platform.webp",
    coverAlt:
      "Megathil on a laptop and phone: the web dashboard with a four-step learning path and course recommendations, and the mobile home screen with an AI career coach, continue-learning progress and an upcoming interview.",
    accent: "peach",
    featured: true,
  },
  {
    slug: "hrms",
    title: "Shenll HRMS",
    description:
      "Designing an HR platform around workflows, not screens: onboarding, attendance, leave and payroll for a B2B product used by 100+ customers.",
    statement: "Designing complexity out of everyday HR operations",
    industries: ["SaaS", "Enterprise"],
    coverImage: "/images/projects/shenll-hrms-dashboard.webp",
    coverAlt:
      "Shenll HRMS on a laptop: the HR dashboard with workforce totals, candidate summary, a leave request status chart and upcoming holidays, beside the mobile view of leave balances and monthly working hours.",
    accent: "olive",
    featured: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
