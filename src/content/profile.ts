/**
 * Verified professional facts. Source: Naveen's résumé, the Google Doc linked
 * from the site navigation ("Naveen Kumar Product Designer .docx", read
 * 2026-10-08), plus the case studies in this folder.
 *
 * Deliberately NOT published, pending Naveen's confirmation (see
 * docs/deployment.md → Missing facts): résumé metrics (−35% admin steps,
 * +22% task completion, ~25% shorter design cycles), phone number,
 * availability, notice period and work-arrangement preferences, and the
 * résumé's "AI-powered employee experiences" for HRMS, which the HRMS case
 * study presents only as a proposal.
 */
export const profile = {
  name: "Naveen Kumar",
  role: "Product Designer",
  location: { city: "Chennai", country: "India", countryCode: "IN" },

  summary: [
    "I'm a Product Designer with 4+ years of experience designing enterprise SaaS, AI-powered products and B2B platforms, from discovery to launch.",
    "My work covers UX research, workflow design, information architecture, interaction design and design systems. I partner with founders, product managers and engineers to turn complex business problems into products people can understand.",
  ],

  /** Shown as capability tags and as structured-data `knowsAbout`. */
  skills: [
    "Product design",
    "UX research",
    "Information architecture",
    "Interaction design",
    "Design systems",
    "Enterprise SaaS",
    "Accessibility",
    "AI interaction design",
  ],

  employer: {
    name: "Shenll Technology Solutions (P) Ltd",
    roles: [
      {
        title: "Product Designer",
        start: "2023-06",
        end: null,
        dates: "Jun 2023 – Present",
        points: [
          "Lead end-to-end product design for Shenll HRMS, working with founders, product managers and engineers from discovery through developer handoff.",
          "Design role-based experiences for HR teams, managers and employees across attendance, payroll, leave, recruitment, performance and employee self-service.",
          "Build reusable design systems, interaction patterns and documentation used across multiple enterprise products.",
          "Validate decisions through UX research, usability testing, journey mapping and heuristic evaluation.",
          "Work closely with frontend engineers on responsive, production-ready, accessible implementation.",
        ],
      },
      {
        title: "UI/UX Designer",
        start: "2022-06",
        end: "2023-06",
        dates: "Jun 2022 – Jun 2023",
        points: [
          "Designed responsive web and mobile experiences for enterprise SaaS products, including HR, CRM and internal business applications.",
          "Ran user interviews, usability testing and workflow analysis to find usability gaps in key journeys.",
          "Produced wireframes, interactive prototypes and production-ready UI aligned with business goals and technical constraints.",
        ],
      },
    ],
  },

  /**
   * Two separate capabilities, kept apart on purpose: designing how an AI
   * product behaves, and using AI tools in my own workflow.
   */
  ai: {
    productDesign:
      "I design how AI features behave for the people using them: what the assistant understood, what the system verified, and what the user is being asked to approve. Dopamint's swap review and deposit recovery are the clearest example.",
    tooling:
      "Separately, I use AI tools in my own design and prototyping workflow, including Claude Code, Antigravity, ChatGPT and Figma AI, and I build AI-powered MVPs with Claude Code, OpenRouter, Supabase and Python.",
  },

  /** Each specialism points at the case-study section that evidences it. */
  specialisms: [
    {
      name: "Enterprise SaaS workflows",
      detail:
        "Designing around system states, dependencies and exceptions rather than individual screens.",
      evidence: { label: "Shenll HRMS", href: "/work/hrms#states-not-pages" },
    },
    {
      name: "Design systems",
      detail:
        "Reusable patterns that encode product behaviour and reduce repeated design-development decisions.",
      evidence: { label: "Shenll HRMS", href: "/work/hrms#consistency" },
    },
    {
      name: "AI interaction design",
      detail:
        "Separating what an AI suggests from what the user authorises, and designing recovery when a task cannot continue.",
      evidence: { label: "Dopamint", href: "/work/dopamint#answers-actions" },
    },
    {
      name: "Multi-surface products",
      detail:
        "One product language across a mobile app, website, admin panel and LMS, delivered with a wider team.",
      evidence: { label: "Megathil", href: "/work/megathil#contribution" },
    },
  ],

  faq: [
    {
      question: "What kind of products do you design?",
      answer:
        "Enterprise SaaS, AI-powered products and B2B platforms. My most detailed case studies are an HR and payroll platform, an AI-assisted crypto product in development, and an AI career platform.",
      evidence: [
        { label: "Shenll HRMS", href: "/work/hrms" },
        { label: "Dopamint", href: "/work/dopamint" },
        { label: "Megathil", href: "/work/megathil" },
      ],
    },
    {
      question: "Do you design AI features, or use AI tools?",
      answer:
        "Both, and they are different skills. I design how AI features behave for users, such as review and confirmation before an AI-initiated action. Separately, I use AI tools like Claude Code in my own prototyping workflow.",
      evidence: [
        { label: "Dopamint: separating answers from actions", href: "/work/dopamint#answers-actions" },
        { label: "Dopamint: implementation workflow", href: "/work/dopamint#implementation" },
      ],
    },
    {
      question: "How do you work with engineering?",
      answer:
        "Through the build, not just at handoff: discussing interaction behaviour, validation, permissions, loading and failure states, and trade-offs when the ideal UX costs more to implement.",
      evidence: [
        { label: "Shenll HRMS: research, iteration & delivery", href: "/work/hrms#process" },
        { label: "Dopamint: connecting design to implementation", href: "/work/dopamint#implementation" },
      ],
    },
  ],

  education: [
    {
      name: "B.Tech, Mechatronics",
      institution: "SRM Institute of Science and Technology",
    },
  ],

  certifications: [
    "Product Management: Building AI-Powered Products — IBM (2025)",
    "Foundations of User Experience (UX) Design — Google / Coursera",
    "Foundations of Project Management — Google / Coursera",
  ],

  email: "snaveenkumar.design@gmail.com",
  resumeUrl:
    "https://docs.google.com/document/d/1stesH5dcl3F-kuM1nEeQeptB9mb_Qik5/edit",
  profiles: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/naveen-productdesign/" },
    { label: "Dribbble", url: "https://dribbble.com/Naveenkumar-designs" },
    { label: "GitHub", url: "https://github.com/NaveenUX-Dev" },
  ],
} as const
