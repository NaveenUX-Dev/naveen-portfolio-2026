import type { StoryCaseStudy } from "@/types/story-case-study"

/**
 * Source of truth: Megathil_AI_Career_Platform_Case_Study.md — a template.
 *
 * Only statements the source gives as fact are used. Everything it marks as
 * "potential", "may include", "representative" or "verify before
 * publishing" is left out: placeholders, feature wishlists, the technology
 * stack, metrics and accessibility claims. Personal contribution is as
 * confirmed by Naveen on 27 September 2026 (the source leaves it blank).
 */
export const megathilCaseStudy: StoryCaseStudy = {
  slug: "megathil",
  eyebrow: "Megathil · End-to-end product design",
  title: "Connecting learning, practice and feedback into career readiness",
  subtitle:
    "An AI-powered career platform for college students and early-career learners.",
  intro: [
    "Megathil was designed as an end-to-end career-development ecosystem for students and early-career learners. The product connected skill assessment, personalized learning, interview preparation, AI-assisted feedback, progress tracking, and gamification through a learner-facing mobile experience, supported by web, Admin, and LMS environments.",
  ],

  facts: [
    { label: "Product type", value: "AI-powered career platform" },
    {
      label: "Primary users",
      value: "College students / learners / early-career users",
    },
    {
      label: "Platforms",
      value: "Mobile app + web, supported by an Admin Panel and LMS Admin",
    },
    { label: "Stage", value: "Taken from concept to MVP; live at megathil.com" },
    { label: "AI scope", value: "Primarily the learner-facing mobile experience" },
    {
      label: "Team delivery",
      value:
        "End-to-end product development by Shenll; development, testing and deployment by the wider team",
    },
    {
      label: "My contribution",
      value:
        "Product / UX, UI & design system, and AI & backend collaboration, across all four products",
      wide: true,
    },
    {
      label: "Main problem",
      value:
        "Students have access to learning content but struggle to turn it into measurable career readiness.",
      wide: true,
    },
    {
      label: "Outcomes and limits",
      value:
        "Verified usage and outcome metrics are not available, so none are published.",
      wide: true,
    },
  ],

  keyDecisions: {
    heading: "Four decisions shaped the product",
    items: [
      {
        text: "Separate product experiences by role.",
        target: "decision-roles",
      },
      { text: "Make progress actionable.", target: "decision-progress" },
      {
        text: "Connect assessment to action.",
        target: "decision-assessment",
      },
      { text: "Treat AI as an interaction layer.", target: "decision-ai" },
    ],
  },

  groups: [
    {
      id: "overview",
      index: "01",
      label: "Overview",
      sections: [
        {
          id: "ecosystem",
          index: "01",
          label: "The ecosystem",
          heading: "One product, with different experiences for different roles.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Megathil focuses on helping learners improve interview readiness, communication, critical thinking, professional etiquette, job-oriented skills, and continuous learning through personalized experiences.",
                "The product was not treated as a single interface. It was designed as an ecosystem with different experiences for different roles:",
              ],
            },
            {
              type: "table",
              caption: "The four Megathil products and what each is for",
              columns: ["Product", "Role in the ecosystem"],
              rows: [
                ["Mobile App", "Deliver the AI-powered learner experience"],
                ["Website", "Explain the platform and its value"],
                ["Admin Panel", "Operate the platform"],
                ["LMS Admin", "Manage learning content and learning operations"],
              ],
            },
            {
              type: "figure",
              src: "/images/projects/megathil-platform.webp",
              width: 1536,
              height: 1024,
              alt: "Megathil on a laptop and phone: the web dashboard with a four-step learning path and course recommendations, and the mobile home screen with an AI career coach, continue-learning progress and an upcoming interview.",
              caption: "Megathil's learner experience on the web and on mobile.",
              annotations: [],
            },
          ],
        },
        {
          id: "challenge",
          index: "02",
          label: "The challenge",
          heading:
            "Students have access to learning. Turning it into career readiness is harder.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Students often have access to educational content but struggle to convert learning into measurable career readiness. The product needed to connect several fragmented activities:",
              ],
            },
            {
              type: "list",
              items: [
                "Learning new skills",
                "Understanding skill gaps",
                "Practicing interview scenarios",
                "Improving communication",
                "Receiving feedback",
                "Tracking progress",
                "Building confidence",
                "Preparing for professional situations",
                "Maintaining motivation through learning progress and gamification",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The UX challenge was therefore not simply to build another learning application. The larger challenge was:",
              ],
            },
            {
              type: "callout",
              text: "How might we create a career-development experience that continuously connects learning, assessment, practice, feedback, and measurable progress?",
            },
            {
              type: "prose",
              paragraphs: ["The experience needed to balance:"],
            },
            {
              type: "table",
              caption: "What each part of the experience needed to provide",
              columns: ["Area", "What it needed to provide"],
              rows: [
                ["Career guidance", "Relevant recommendations and next steps"],
                ["Learning", "Structured skill development"],
                ["Assessment", "Understanding current capability"],
                ["Practice", "Interview and communication preparation"],
                ["Feedback", "Actionable improvement areas"],
                ["Progress", "Visible evidence of development"],
                [
                  "Engagement",
                  "Gamification without making the experience feel like a game",
                ],
              ],
            },
          ],
        },
        {
          id: "users-goals",
          index: "03",
          label: "Users and goals",
          heading:
            "Built for students preparing for internships, placements and interviews.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The primary audience was students preparing for internships, placements, interviews, and professional careers. They needed to:",
              ],
            },
            {
              type: "list",
              items: [
                "Understand their current skill level",
                "Identify areas that need improvement",
                "Learn relevant skills",
                "Practice interview scenarios",
                "Improve communication",
                "Receive useful feedback",
                "Track development",
                "Follow a structured learning path",
                "Stay motivated",
                "Prepare for real-world professional situations",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The product experience was designed around five connected outcomes:",
              ],
            },
            {
              type: "table",
              caption: "Megathil's five product goals",
              columns: ["Goal", "What it means"],
              rows: [
                [
                  "Career readiness",
                  "Help learners move from passive learning toward practical preparation for interviews and professional situations.",
                ],
                [
                  "Personalized development",
                  "Use assessments, activity, skills, and recommendations to create a more relevant learning journey.",
                ],
                [
                  "Continuous feedback",
                  "Give users feedback that helps them understand what to improve rather than only showing a score.",
                ],
                [
                  "Structured learning",
                  "Connect skills and learning content into clearer development paths.",
                ],
                [
                  "Engagement",
                  "Use progress, achievements, and gamification to encourage continued participation.",
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "experience",
      index: "04",
      label: "Experience",
      sections: [
        {
          id: "loop",
          index: "04",
          label: "UX strategy",
          heading: "More than an LMS: a continuous loop.",
          blocks: [
            {
              type: "flow",
              label: "The learner loop",
              caption:
                "The learner repeatedly moves between knowing what they need, learning it, applying it, receiving feedback, and understanding what to do next.",
              steps: [
                { text: "Discover" },
                { text: "Assess" },
                { text: "Understand gaps" },
                { text: "Learn" },
                { text: "Practice" },
                { text: "Receive feedback" },
                { text: "Track progress" },
                {
                  text: "Reassess",
                  branch: { when: "Then", path: ["The loop repeats"] },
                },
              ],
            },
          ],
        },
        {
          id: "mobile-ai",
          index: "05",
          label: "Mobile app and AI",
          heading: "AI where it helps the learner, not on every screen.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The mobile app was the primary learner-facing experience and the part of the ecosystem where AI functionality was integrated. Its home dashboard should communicate the learner's current state quickly.",
                "AI was intentionally positioned within the learner-facing mobile experience rather than treating every administrative workflow as an AI interface. The AI layer supported career-development experiences such as:",
              ],
            },
            {
              type: "list",
              items: [
                "Personalized guidance",
                "Recommendations",
                "Skill-related insights",
                "Interview preparation",
                "AI-generated feedback",
                "Career-oriented learning support",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "One of the important product directions was helping users prepare for interviews through practice and feedback.",
              ],
            },
          ],
        },
        {
          id: "assessment-learning",
          index: "06",
          label: "Assessment and learning",
          heading: "An assessment should answer: what should I do with this result?",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Skill assessment creates the bridge between a learner's current capability and their recommended development path. It should not feel like an isolated test. The result experience should connect scores or observations with skills, learning recommendations, next actions, and progress.",
                "Personalization was used to make the learning journey more relevant to the learner's goals and skill gaps, and the learning experience supports structured skill development.",
                "Gamification was used as an engagement layer around learning and career development. The goal is not to turn career preparation into a game: the gamification layer should reinforce meaningful behaviours such as completing learning, practicing, improving skills, and maintaining momentum.",
                "The platform also focused on capabilities that extend beyond technical knowledge:",
              ],
            },
            {
              type: "list",
              items: [
                "Communication",
                "Critical thinking",
                "Interview etiquette",
                "Professional behaviour",
                "Interview readiness",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "decisions",
      index: "07",
      label: "Decisions",
      sections: [
        {
          id: "decision-roles",
          index: "07",
          label: "Decision 01",
          heading: "Separate product experiences by role.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Rather than forcing learners and administrators into one interface, the ecosystem uses dedicated experiences. Different users have different goals:",
              ],
            },
            {
              type: "list",
              items: [
                "Learners need guidance and motivation.",
                "Administrators need efficiency and control.",
                "LMS operators need content-management workflows.",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "**The trade-off:** more interfaces increase design and maintenance complexity, but can reduce cognitive load when role boundaries are strong.",
              ],
            },
          ],
        },
        {
          id: "decision-progress",
          index: "08",
          label: "Decision 02",
          heading: "Make progress actionable.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Progress should not only be represented as a percentage. A useful progress state should answer three questions:",
              ],
            },
            {
              type: "list",
              items: [
                "What have I completed?",
                "What am I improving?",
                "What should I do next?",
              ],
            },
          ],
        },
        {
          id: "decision-assessment",
          index: "09",
          label: "Decision 03",
          heading: "Connect assessment to action.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Assessment results should lead naturally into recommendations or learning:",
              ],
            },
            { type: "callout", text: "Result → Insight → Recommendation → Action" },
            {
              type: "prose",
              paragraphs: [
                "This reduces the risk of assessment becoming a dead-end screen.",
              ],
            },
          ],
        },
        {
          id: "decision-ai",
          index: "10",
          label: "Decision 04",
          heading: "Treat AI as an interaction layer.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "AI should be integrated where it provides meaningful value to the learner rather than appearing as decoration: in practice, feedback, recommendations, and career guidance.",
                "**The failure mode to avoid:** an interface can look “AI-powered” while providing little additional value. The UX should make the AI's role understandable and actionable.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "platforms",
      index: "11",
      label: "Platforms",
      sections: [
        {
          id: "admin-lms",
          index: "11",
          label: "Website, Admin and LMS",
          heading: "The supporting surfaces each have a distinct job.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The website acts as the public-facing layer of the product ecosystem. Its role is different from the mobile application: it explains the platform and its value, while the app delivers the learner experience.",
                "The Admin Panel was designed as an operational interface for managing the platform.",
                "The LMS Admin is a separate learning-management environment focused on creating and maintaining the learning ecosystem. The distinction matters: the Admin Panel manages the broader platform, while the LMS Admin manages learning operations and educational content.",
              ],
            },
          ],
        },
        {
          id: "form-factors",
          index: "12",
          label: "Platform considerations",
          heading: "Mobile, web and admin needed different priorities.",
          blocks: [
            {
              type: "table",
              caption: "Design priorities by form factor",
              columns: ["Surface", "Priorities"],
              rows: [
                [
                  "Mobile",
                  "Touch, short sessions, clear hierarchy, focused actions, progressive disclosure",
                ],
                [
                  "Web",
                  "Information density, navigation, content discovery, responsive layouts",
                ],
                [
                  "Admin / LMS",
                  "Productivity, tables, search, filtering, bulk operations, clear states, efficient navigation",
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "process",
      index: "13",
      label: "Process",
      sections: [
        {
          id: "design-process",
          index: "13",
          label: "Process",
          heading: "Structure and flows were settled before detailed UI.",
          blocks: [
            {
              type: "prose",
              paragraphs: ["Discovery covered:"],
            },
            {
              type: "list",
              items: [
                "Understanding the product vision",
                "Understanding learner problems",
                "Identifying platform roles",
                "Mapping business and product requirements",
                "Defining core journeys",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The product ecosystem was separated into distinct experiences so each user type could focus on relevant tasks. Key flows were mapped before moving into detailed UI, and wireframes were used to validate information hierarchy, navigation, content structure, and task flows before visual refinement.",
              ],
            },
          ],
        },
        {
          id: "collaboration",
          index: "14",
          label: "Collaboration",
          heading: "Built as one system across design, engineering and AI.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The product was developed as an end-to-end system involving frontend, backend, API, AI, and data layers. The project involved collaboration across:",
              ],
            },
            {
              type: "list",
              items: [
                "Product requirements",
                "UX/UI design",
                "Frontend development",
                "Backend development",
                "API integration",
                "AI functionality",
                "LMS workflows",
                "Admin workflows",
                "QA / testing",
                "Deployment",
                "Iterative improvements",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "outcome",
      index: "15",
      label: "Outcome",
      sections: [
        {
          id: "result",
          index: "15",
          label: "Outcome",
          heading:
            "A career-development ecosystem, not a standalone learning interface.",
          blocks: [
            {
              type: "flow",
              label: "What the product connected",
              caption:
                "The supporting Admin and LMS environments enabled the platform to operate beyond the learner-facing application.",
              steps: [
                { text: "Career goals" },
                { text: "Skill assessment" },
                { text: "Personalized development" },
                { text: "Learning" },
                { text: "Practice" },
                { text: "AI-assisted feedback" },
                { text: "Progress" },
                { text: "Career readiness" },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "Verified usage and outcome metrics are not available, so none are shown here.",
              ],
            },
          ],
        },
        {
          id: "contribution",
          index: "16",
          label: "My contribution",
          heading: "What I worked on",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "I worked across all four products: the Megathil Mobile App, Website, Admin Panel, and LMS Admin.",
              ],
            },
            {
              type: "table",
              caption: "My contribution by area",
              columns: ["Area", "What I did"],
              rows: [
                [
                  "Product / UX",
                  "Requirement analysis, information architecture, user flows, wireframes, interaction design",
                ],
                [
                  "UI & design system",
                  "Visual design, components, typography and colour tokens, prototyping",
                ],
                [
                  "AI & backend collaboration",
                  "Working with the AI and backend teams on how AI features behave in the product",
                ],
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "Development, testing, and deployment were part of Shenll's end-to-end delivery of the product.",
              ],
            },
          ],
        },
      ],
    },
  ],

  nextProject: {
    slug: "hrms",
    title: "Shenll HRMS",
    line: "Designing complexity out of everyday HR operations",
  },

  metadata: {
    title: "Megathil: AI career platform case study",
    description:
      "How Naveen Kumar approached product UX, UI and the design system for Megathil, an AI-powered career platform for students and early-career learners.",
  },
}
