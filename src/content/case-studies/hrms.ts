import type { StoryCaseStudy } from "@/types/story-case-study"

/**
 * Source of truth: Naveen's Shenll HRMS case-study narrative (October 2026),
 * plus his description of the per-module process (2026-10-09).
 *
 * Updated October 2026 with enriched narrative, additional visuals covering
 * the employee lifecycle state diagram, before/after onboarding comparison,
 * product screens (employee directory, employee detail, payroll explanation),
 * system dependency diagram, design system snapshot, and research insights.
 *
 * The "Research, iteration & delivery" section follows the process Naveen
 * described: interviews with the primary HR user, problem definition and
 * competitor review, sketches and wireframes, prototype walkthroughs and
 * feedback discussions with HR and engineering, then handoff; and, after
 * HRMS 2.0, live prototypes and frontend UI modules that engineering refines
 * and integrates. These sessions are not described as formal usability
 * tests, and no participant counts, quotes or competitor names are given.
 * The employee-creation iteration comes from the earlier
 * Shenll_HRMS_2024_Traditional_UX_Case_Study.md.
 *
 * Sections are unnumbered; the chapter rail numbers the seven chapters.
 */
export const hrmsCaseStudy: StoryCaseStudy = {
  slug: "hrms",
  eyebrow: "Shenll HRMS",
  title: "Designing complexity out of everyday HR operations",
  subtitle: "Designing an HR platform around workflows, not screens.",
  intro: [
    "Shenll HRMS faced a classic enterprise challenge: every HR function worked in isolation, but the real complexity lived in the dependencies between them — attendance affecting leave balances, leave affecting payroll, onboarding status controlling access, and policy rules creating exceptions at every step.",
    "The design problem was not creating better screens for payroll or attendance. It was creating a system that made status, ownership, and next actions visible so that HR teams and employees did not have to mentally reconstruct how the system worked.",
    "I led end-to-end product design for the platform — owning the state model, progressive onboarding, information architecture, and design system — while collaborating closely with founders, product managers, and engineers from discovery through handoff and post-release iteration. The product is now in production and serves 100+ customers across manufacturing and education.",
  ],
  question: {
    label: "My design challenge",
    text: "How might we make a complex HR operating system feel predictable to the people who use it every day?",
  },

  facts: [
    { label: "Product", value: "Shenll HRMS — B2B HRMS & Payroll SaaS" },
    { label: "Primary users", value: "HR teams, administrators, employees" },
    {
      label: "My role",
      value: "Product Designer (end-to-end ownership)",
    },
    { label: "Company", value: "Shenll Technology Solutions" },
    {
      label: "Stage",
      value: "In production · 100+ customers",
    },
    {
      label: "Focus areas",
      value:
        "Employee lifecycle, attendance, leave, payroll, recruitment, performance, self-service",
    },
    {
      label: "Key contributions",
      value:
        "State-driven employee lifecycle that made status and next actions explicit. Information architecture organized around jobs, not database structure. Progressive onboarding that shifted data collection from HR to the employee. Payroll experiences that explain outcomes instead of exposing calculation logic. Centralized design system that enforced consistency across modules.",
      wide: true,
    },
    {
      label: "Outcomes",
      value:
        "The redesign delivered clearer lifecycle visibility, reduced friction in onboarding and self-service, and more consistent patterns across the product. These improvements supported the platform's growth to 100+ customers. Exact quantitative metrics are not published here.",
      wide: true,
    },
  ],

  keyDecisions: {
    heading: "Three decisions that shaped the product",
    items: [
      {
        text: "Design around states instead of individual pages.",
        target: "states-not-pages",
      },
      {
        text: "Build the information architecture around jobs, not database structure.",
        target: "jobs-not-database",
      },
      {
        text: "Expose the information users need, not the calculation engine.",
        target: "outcomes-not-engine",
      },
    ],
  },

  groups: [
    {
      id: "problem",
      index: "01",
      label: "Problem",
      sections: [
        {
          id: "situation",
          label: "The situation",
          heading: "HR software looks straightforward from the outside.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Create an employee. Track attendance. Process payroll. Approve leave.",
                "But once these workflows begin interacting, complexity grows quickly.",
              ],
            },
            {
              type: "cascade",
              chains: [
                {
                  title: "How attendance reaches the payslip",
                  steps: [
                    "Attendance",
                    "Working days",
                    "Leave",
                    "Payroll",
                    "Deductions",
                    "Employee payslip",
                  ],
                },
                {
                  title: "How a new employee reaches payroll",
                  steps: [
                    "Employee creation",
                    "Profile completion",
                    "HR verification",
                    "Employee activation",
                    "Portal access",
                    "Attendance and payroll eligibility",
                  ],
                },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "So designing each module independently would have created a fragmented product.",
                "The challenge was to create a system where the underlying complexity remained manageable while the user's experience remained understandable.",
              ],
            },
            {
              type: "figure",
              src: "/images/projects/shenll-hrms-dashboard.webp",
              width: 1600,
              height: 900,
              alt: "Shenll HRMS on a laptop: the HR dashboard with workforce totals, candidate summary, a leave request status chart and upcoming holidays, beside the mobile view of leave balances and monthly working hours.",
              caption:
                "A multi-module HR platform designed around connected employee and operational workflows rather than isolated features.",
              annotations: [],
            },
          ],
        },
        {
          id: "system-problem",
          label: "A system problem",
          heading:
            "What looked like a UI problem was actually a system problem.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "One of my earliest realizations was that most HRMS friction wasn't caused by individual interfaces. It came from dependencies between workflows. An employee might ask:",
              ],
            },
            { type: "quote", text: "\u201cWhy isn\u2019t my leave balance updated?\u201d" },
            {
              type: "prose",
              paragraphs: [
                "But the answer could depend on payroll finalization, attendance processing, approved leave, overtime, policy rules, or the current payroll cycle.",
                "Similarly, HR might see an employee but not immediately understand whether that person had received the onboarding link, completed their profile, submitted details, been reviewed, or been activated.",
                "The product therefore needed more than forms and tables. It needed a state model.",
              ],
            },
            {
              type: "figure",
              src: "/images/projects/hrms-system-dependencies.jpg",
              width: 1600,
              height: 900,
              alt: "System dependency diagram showing how Attendance, Leave, and Overtime modules feed into Payroll Processing, which produces Employee Payslips and HR Reports. Employee Status gates all modules.",
              label: "System diagram",
              caption:
                "Attendance, leave and overtime all resolve in payroll — and employee status gates everything.",
              annotations: [],
            },
            {
              type: "states",
              label: "Employee lifecycle, with the exception each state can raise",
              states: [
                { name: "Created", exception: "Duplicate employee" },
                { name: "Invitation sent", exception: "Expired invitation" },
                { name: "Profile pending", exception: "Incomplete information" },
                {
                  name: "Waiting for HR review",
                  exception: "Rejected information",
                },
                { name: "Verified" },
                { name: "Active" },
              ],
              outcome:
                "Active unlocks portal access, attendance and payroll eligibility.",
              caption:
                "That state then affects access to other parts of the platform.",
            },
            {
              type: "figure",
              src: "/images/projects/hrms-lifecycle-states.jpg",
              width: 1600,
              height: 900,
              alt: "Employee lifecycle state diagram showing the flow from Created through Invitation Sent, Profile Pending, Waiting for HR Review, Verified, to Active, with exceptions under each state and Active unlocking Portal Access, Attendance Tracking, and Payroll Eligibility.",
              label: "State diagram",
              caption:
                "Each state carries clear ownership and possible exceptions. Reaching Active unlocks portal access, attendance tracking, and payroll eligibility.",
              annotations: [],
            },
          ],
        },
      ],
    },
    {
      id: "research",
      index: "02",
      label: "Research & delivery",
      sections: [
        {
          id: "process",
          label: "Research, iteration & delivery",
          heading:
            "Every module went through the same loop, rarely in a straight line.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "I treated every module as a cycle of understanding the real work, defining the problem, exploring solutions, reviewing with users and engineering, and only then delivering.",
              ],
            },
            {
              type: "flow",
              label: "The loop behind each module",
              caption:
                "Handoff came only after the reviewed flow had been refined and finalised.",
              steps: [
                { text: "Understand the HR task" },
                { text: "Define the problem and compare approaches" },
                { text: "Explore the workflow" },
                {
                  text: "Review and refine with HR and engineering",
                  branch: {
                    when: "When feedback changes the design",
                    path: ["Revisit the flow, wireframes or UI"],
                  },
                },
                { text: "Deliver the intended behaviour" },
              ],
            },
            { type: "subheading", text: "Key research activities" },
            {
              type: "list",
              items: [
                "Interviews with the primary HR user focused on actual workflows rather than feature requests",
                "Observation of hesitation, backtracking, and uncertainty during prototype walkthroughs",
                "Competitor analysis focused on how other systems handled status, ownership, and exceptions",
                "Continuous feedback loops with engineering on technical constraints",
              ],
            },
            { type: "subheading", text: "Key insights that drove design decisions" },
            {
              type: "figure",
              src: "/images/projects/hrms-research-insights.jpg",
              width: 1600,
              height: 900,
              alt: "Four research insight cards: HR couldn't tell employee status leading to state-driven lifecycle; employees asked about leave balance updates leading to dependency visibility; too much info collected upfront leading to progressive onboarding; lack of processing state visibility leading to states-instead-of-pages model.",
              label: "Research insights",
              caption:
                "Each insight directly led to a design decision that shaped the product.",
              annotations: [],
            },
            {
              type: "clusters",
              caption: "Recurring friction, grouped by what it cost the user.",
              groups: [
                {
                  name: "Visibility",
                  items: [
                    "HR couldn't tell whether an employee was waiting on profile completion, review, or activation",
                    "Unclear processing state",
                    "Unclear ownership",
                  ],
                },
                {
                  name: "Efficiency",
                  items: [
                    "Creating a new employee required collecting too much information in a single step",
                    "Employees asked why leave balances didn't update after attendance changes",
                    "Back-and-forth between HR and employees",
                  ],
                },
                {
                  name: "Confidence",
                  items: [
                    "Lack of visibility into processing state",
                    "Unclear ownership of next actions",
                    "Low confidence in payroll outcomes",
                  ],
                },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "These insights directly led to the shift from a record-based model to a state-driven model and the redesign of onboarding as a progressive flow.",
              ],
            },
            { type: "subheading", text: "1. Understand the HR task" },
            {
              type: "prose",
              paragraphs: [
                "The aim was to learn how the work actually happened before deciding what any screen should do. For each module I interviewed our primary HR user about the task, the problems they ran into, and what would make the work easier.",
                "Because the product covered so many HR functions, I couldn't treat this as asking which features they wanted. The questions were closer to:",
              ],
            },
            {
              type: "list",
              items: [
                "What triggers this task?",
                "Who performs it?",
                "What information do they need?",
                "Which other workflow depends on its completion?",
                "What happens if it is delayed?",
                "What exceptions occur?",
                "Which decisions require HR judgment?",
                "Which activities can safely be automated?",
              ],
            },
            { type: "subheading", text: "2. Define the problem and compare approaches" },
            {
              type: "prose",
              paragraphs: [
                "Next I clarified the problem statement, so later decisions could be checked against the actual problem rather than against preference. I then reviewed comparable products and ran a competitor analysis to understand how similar problems had been addressed elsewhere.",
                "Across workflows such as attendance, payroll and employee self-service, this helped identify recurring friction around visibility, dependencies and completion states.",
              ],
            },
            { type: "subheading", text: "3. Explore the workflow" },
            {
              type: "prose",
              paragraphs: [
                "Before any UI, I explored solutions through sketches and wireframes, while changing direction was still cheap. I then designed each module's complete flow: the happy path, the errors, and the uncommon scenarios, deciding how the interface should respond in each. The exceptions covered later in this case study are part of that work.",
              ],
            },
            { type: "subheading", text: "4. Review and refine with HR and engineering" },
            {
              type: "prose",
              paragraphs: [
                "I turned each flow into a prototype and walked through it with our primary HR user, inviting them to explore it and judge whether it addressed their problem. Engineering took part in these prototype discussions, so feasibility questions came up while the design could still change. In the walkthroughs I watched for:",
              ],
            },
            {
              type: "list",
              items: [
                "Hesitation",
                "Repeated backtracking",
                "Misinterpreted labels",
                "Uncertainty before actions",
                "Errors",
                "Unnecessary steps",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "I collected the feedback and revisited whatever it pointed to: sometimes the UI, sometimes the wireframes, sometimes the flow itself. One of these loops changed how employees are created:",
              ],
            },
            {
              type: "table",
              caption: "How employee creation changed between versions",
              columns: ["Stage", "Detail"],
              rows: [
                [
                  "Version\u00a01",
                  "Employee creation asked HR for too much information in one step.",
                ],
                [
                  "Problem",
                  "HR had to collect and enter details that the employee could provide directly.",
                ],
                [
                  "Insight",
                  "Core employee creation and full profile completion are different stages.",
                ],
                [
                  "Change",
                  "Create the record with essential data, then send a profile-completion link.",
                ],
                [
                  "Version\u00a02",
                  "Onboarding becomes a staged flow: profile completion, review, verification, active.",
                ],
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "That change became the progressive onboarding described in the onboarding chapter.",
              ],
            },
            { type: "subheading", text: "5. Deliver the intended behaviour" },
            {
              type: "prose",
              paragraphs: [
                "After refinement and finalisation, I prepared the handoff. Its job was to carry the intended behaviour, not only the screens, and collaboration with engineering continued through the build. It covered:",
              ],
            },
            {
              type: "list",
              items: [
                "Interaction behavior",
                "Component reuse",
                "Responsiveness",
                "Validation rules",
                "Permissions",
                "Loading states",
                "Empty states",
                "Failure states",
                "Technical limitations",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "Sometimes the technically cleanest implementation wasn't the best user experience; sometimes the ideal UX cost significantly more to build. Those cases went through their own short loop: design intention, technical constraint, trade-off, adjusted solution, then QA. This is where product design becomes less about artifacts and more about decisions.",
              ],
            },
            { type: "subheading", text: "How delivery evolved after HRMS 2.0" },
            {
              type: "prose",
              paragraphs: [
                "After HRMS 2.0, the later stages of this process changed. I began using Figma Make, Claude Code and Antigravity to build live, dynamic, interactive prototypes, so reviews could happen on working behaviour rather than linked screens. I then delivered frontend UI modules to engineering, and engineering refined the code and completed the API integration.",
              ],
            },
            {
              type: "compare",
              caption:
                "How work reached engineering, before and after HRMS 2.0.",
              sides: [
                {
                  label: "Through HRMS 2.0",
                  steps: [
                    "Prototype",
                    "Feedback and refinement",
                    "Finalised design handed off",
                    "Engineering builds and integrates",
                  ],
                },
                {
                  label: "After HRMS 2.0",
                  steps: [
                    "Live, interactive prototype",
                    "Feedback and refinement",
                    "Frontend UI modules delivered",
                    "Engineering refines the code and integrates the APIs",
                  ],
                },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The prototypes were not production-ready on their own. What changed is what reached engineering: frontend modules to refine and connect to the APIs, instead of static designs to implement.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "structure",
      index: "03",
      label: "Structure",
      sections: [
        {
          id: "states-not-pages",
          label: "My first major decision",
          heading: "Design around states instead of individual pages.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "A traditional approach would have been an employee list, an employee form and an employee detail page. That works visually, but it doesn't solve the operational question HR actually has:",
              ],
            },
            {
              type: "quote",
              text: "\u201cWhere is this employee in the process, and what needs to happen next?\u201d",
            },
            {
              type: "prose",
              paragraphs: [
                "I shifted the experience from a record-based model toward a state-driven workflow. Waiting for profile completion became different from waiting for review, and different again from an active employee.",
              ],
            },
            {
              type: "compare",
              caption:
                "The same employee, seen as records and seen as states.",
              sides: [
                {
                  label: "Record-based",
                  steps: ["Employee list", "Employee form", "Employee detail"],
                },
                {
                  label: "State-driven",
                  steps: [
                    "Waiting for profile completion",
                    "Waiting for review",
                    "Active employee",
                  ],
                },
              ],
            },
            {
              type: "figure",
              src: "/images/projects/hrms-employee-directory.jpg",
              width: 1600,
              height: 900,
              alt: "HRMS employee directory screen showing a data table with employee names, departments, roles, status badges (Active, Under Review, Profile Pending, Invitation Expired), and contextual Next Action buttons. Sidebar navigation shows People, Time and Attendance, Leave, Payroll, Hiring, Performance, Self Service.",
              label: "Product screen · sample data",
              caption:
                "The employee directory with clear status badges and contextual next actions — HR can see where every employee stands at a glance.",
              annotations: [],
            },
            { type: "subheading", text: "Why this mattered" },
            {
              type: "prose",
              paragraphs: [
                "This allowed the interface to communicate what has happened, what hasn't happened, who owns the next action, and whether HR needs to intervene, instead of requiring the HR administrator to interpret several pieces of information manually.",
                "**Trade-off:** more states create more system complexity. The design challenge was ensuring every state was operationally meaningful to users, not just a technical backend status.",
              ],
            },
            {
              type: "figure",
              src: "/images/projects/hrms-employee-detail.jpg",
              width: 1600,
              height: 900,
              alt: "HRMS employee detail page for Priya Nair showing Profile Pending status with a Next Action button, a lifecycle progress tracker from Created to Active, Employment Details, Onboarding Progress at 3/7 sections, and Pending Items listing Bank details and ID proof.",
              label: "Product screen · sample data",
              caption:
                "The employee detail page highlights current state, next action, onboarding progress and pending items — making status and ownership explicit.",
              annotations: [],
            },
          ],
        },
        {
          id: "modules",
          label: "Connected modules",
          heading: "The product wasn't one workflow.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "A major challenge was designing multiple connected systems. Each module has its own workflows, but from the user's perspective they still need to feel like one product.",
              ],
            },
            {
              type: "table",
              caption: "Shenll HRMS modules and what each covers",
              columns: ["Module", "Covers"],
              rows: [
                [
                  "Employee Management",
                  "Employee data, employment status, documents, roles",
                ],
                ["Attendance", "Presence, late entry, shifts, overtime"],
                ["Leave", "Balances, approvals, policies"],
                [
                  "Payroll",
                  "Salary structure, attendance impact, deductions, payslips",
                ],
                ["Recruitment", "Candidates, interviews, hiring"],
                ["Performance", "Goals, appraisal, review cycles"],
                [
                  "Employee Self-Service",
                  "Personal information, leave, attendance and payroll visibility",
                ],
              ],
            },
          ],
        },
        {
          id: "jobs-not-database",
          label: "My second major decision",
          heading:
            "Build the information architecture around jobs, not database structure.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Enterprise products often let backend structure dictate navigation. Users, however, think in terms of the job they need to complete.",
                "I organized the top-level navigation around operational jobs rather than exposing technical system categories.",
              ],
            },
            {
              type: "tree",
              root: "Shenll HRMS",
              items: [
                "People",
                "Time & Attendance",
                "Leave",
                "Payroll",
                "Hiring",
                "Performance",
                "Self Service",
              ],
              caption:
                "Top-level navigation named for the job a user is doing, not the table the data lives in.",
            },
            {
              type: "callout",
              label: "The objective",
              text: "A user should know where to go based on what they are trying to accomplish, not on how the data is stored.",
            },
          ],
        },
      ],
    },
    {
      id: "onboarding",
      index: "04",
      label: "Onboarding",
      sections: [
        {
          id: "employee-onboarding",
          label: "Employee onboarding",
          heading:
            "Onboarding became the clearest example of the system-thinking approach.",
          blocks: [
            {
              type: "figure",
              src: "/images/projects/hrms-onboarding-comparison.jpg",
              width: 1600,
              height: 900,
              alt: "Before vs After comparison. Left: Everything up front — a long scrolling form where HR had to enter all employee information. Right: Progressive onboarding — Step 1 HR creates basic record, Step 2 System sends onboarding link, Step 3 Employee completes profile, Step 4 HR reviews and activates.",
              label: "Before vs After",
              caption:
                "Shifting data collection from HR to the employee — from a monolithic form to a progressive, ownership-aware flow.",
              annotations: [],
            },
            {
              type: "swimlane",
              caption: "Who acts at each step of onboarding, in order.",
              lanes: ["HR", "System", "Employee"],
              steps: [
                { lane: "HR", text: "Creates the employee" },
                { lane: "System", text: "Sends the onboarding link" },
                { lane: "Employee", text: "Completes their profile" },
                {
                  lane: "System",
                  text: "Marks the record",
                  state: "Waiting for review",
                },
                { lane: "HR", text: "Verifies the employee's information" },
                { lane: "System", text: "Activates the employee", state: "Active" },
                { lane: "System", text: "Sends portal credentials" },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The important design problem was not the form. It was coordination between two people who don't complete the workflow at the same time.",
              ],
            },
            {
              type: "callout",
              label: "UX principle",
              text: "Make asynchronous workflows observable.",
            },
            {
              type: "prose",
              paragraphs: [
                "HR should never need to ask \u201cDid the employee complete this?\u201d The system should answer that.",
              ],
            },
          ],
        },
        {
          id: "progressive",
          label: "Progressive onboarding",
          heading: "Delegation without losing governance.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Instead of asking HR to collect everything upfront, the flow became:",
              ],
            },
            {
              type: "flow",
              label: "Progressive onboarding flow",
              caption:
                "The person closest to the information provides it, while HR retains control through review.",
              steps: [
                { text: "HR creates the employee with essential data", actor: "HR" },
                { text: "System sends onboarding link", actor: "System" },
                { text: "Employee completes their profile", actor: "Employee" },
                { text: "HR reviews and verifies", actor: "HR" },
                { text: "Employee is activated", actor: "System" },
              ],
            },
            {
              type: "compare",
              caption:
                "The person closest to the information should ideally provide it.",
              sides: [
                {
                  label: "Everything up front",
                  steps: [
                    "HR collects all employee information",
                    "HR creates the employee",
                  ],
                },
                {
                  label: "Progressive onboarding",
                  steps: [
                    "HR enters the minimum required information",
                    "Employee completes personal information",
                    "HR verifies it",
                  ],
                },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "This reduced duplicate data entry, incorrect information and HR administrative workload. But HR still retains control through review.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "rules",
      index: "05",
      label: "Payroll & rules",
      sections: [
        {
          id: "dependencies",
          label: "Attendance and payroll",
          heading: "Attendance data isn't valuable in isolation.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Its importance comes from its downstream effects. So instead of treating payroll as an isolated module, I needed to consider how information from previous workflows becomes visible and understandable.",
              ],
            },
            {
              type: "fanin",
              caption: "Attendance, leave and overtime all resolve in payroll.",
              inputs: [
                { source: "Attendance", effect: "Working days" },
                { source: "Leave", effect: "Paid or unpaid absence" },
                { source: "Overtime", effect: "Additional compensation" },
              ],
              target: { name: "Payroll", result: "Final salary calculation" },
            },
            {
              type: "prose",
              paragraphs: [
                "This also influenced employee-facing copy. Instead of showing an ambiguous \u201cRemaining leave\u201d number, we needed to communicate which kind of number it was.",
              ],
            },
            {
              type: "readings",
              label: "Illustrative value",
              metric: "Remaining leave",
              value: "12 days",
              states: [
                "Provisional",
                "Approved",
                "Calculated",
                "Finalized after payroll",
              ],
              caption:
                "The same number means something different in each state, so the state belongs in the label.",
            },
          ],
        },
        {
          id: "outcomes-not-engine",
          label: "My third major decision",
          heading:
            "Expose the information users need, not the calculation engine.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Payroll systems can become extremely complex. One approach would be exposing every internal calculation, but that transfers system complexity to users.",
                "Rather than exposing the full calculation engine, the experience focused on explaining outcomes — why a number appeared on a payslip and what influenced it — so users could build confidence without needing to understand every rule.",
              ],
            },
            {
              type: "callout",
              label: "The principle",
              text: "Expose outcomes and explanations; hide unnecessary computation.",
            },
            {
              type: "figure",
              src: "/images/projects/hrms-payroll-explained.jpg",
              width: 1600,
              height: 900,
              alt: "HRMS payslip screen for Rahul Sharma showing salary breakdown with Basic Salary, HRA, Special Allowance, deductions including Loss of Pay with tooltip explaining 2 days absent based on attendance records, Net Pay of 66,938 rupees, and a What Affected This Payslip panel showing Attendance, Leave, and Overtime factors.",
              label: "Product screen · sample data",
              caption:
                "The payslip explains outcomes — why a number appeared and what influenced it — so employees build confidence without needing to understand every rule.",
              annotations: [],
            },
            {
              type: "table",
              caption: "What the system prioritizes for each audience",
              columns: ["Audience", "What the system prioritizes"],
              rows: [
                ["HR", "Detailed information, available where necessary"],
                [
                  "Employees",
                  "Salary breakdown, approved leave, overtime, deductions, payslip",
                ],
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The underlying payroll rules can remain sophisticated without requiring every employee to understand the engine behind them.",
              ],
            },
          ],
        },
        {
          id: "exceptions",
          label: "Handling exceptions",
          heading:
            "Enterprise UX is often defined by how gracefully the product handles exceptions.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The product had to account for situations where the happy path doesn't happen. Instead of treating these as secondary cases, I considered them part of the product model.",
              ],
            },
            {
              type: "compare",
              caption:
                "The same payroll run, with and without an attendance discrepancy.",
              sides: [
                {
                  label: "Normal",
                  steps: ["Attendance", "Payroll calculation", "Payslip"],
                },
                {
                  label: "Exception",
                  steps: [
                    "Attendance discrepancy",
                    "Flagged",
                    "HR review",
                    "Correction",
                    "Payroll recalculation",
                    "Finalized",
                  ],
                },
              ],
            },
            {
              type: "prose",
              paragraphs: ["Examples the product had to account for:"],
            },
            {
              type: "list",
              items: [
                "Incomplete employee profiles",
                "Delayed HR verification",
                "Attendance corrections",
                "Rejected leave",
                "Missing attendance",
                "Overtime adjustments",
                "Payroll recalculation",
                "Employees joining during a payroll cycle",
                "Employee deactivation",
                "Permission differences",
                "Missing documents",
                "Incorrect employee information",
              ],
            },
          ],
        },
        {
          id: "authority",
          label: "Levels of authority",
          heading: "Not every user should be able to perform every action.",
          blocks: [
            {
              type: "clusters",
              caption: "What each level of authority may do.",
              groups: [
                {
                  name: "Employee",
                  items: [
                    "View personal attendance",
                    "Request leave",
                    "See payslips",
                  ],
                },
                {
                  name: "HR administrator",
                  items: [
                    "Update employee information",
                    "Approve workflows",
                    "Configure policies",
                  ],
                },
                {
                  name: "Higher-level administrator",
                  items: [
                    "Configure payroll",
                    "Manage permissions",
                    "Access company-wide information",
                  ],
                },
              ],
            },
            {
              type: "callout",
              label: "This required thinking about",
              text: "Role \u00d7 permission \u00d7 action \u00d7 data visibility, not simply screens.",
            },
            {
              type: "matrix",
              caption: "Permissions for four representative actions.",
              columns: ["Employee", "HR", "Admin"],
              rows: [
                { action: "View own attendance", values: ["yes", "yes", "yes"] },
                { action: "Edit employee record", values: ["no", "yes", "yes"] },
                { action: "Approve leave", values: ["no", "yes", "yes"] },
                { action: "Configure payroll", values: ["no", "Limited", "yes"] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "system",
      index: "06",
      label: "Design system",
      sections: [
        {
          id: "consistency",
          label: "Design system",
          heading: "Making a large product feel consistent.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "As the number of modules grew, another problem appeared. If every new feature was designed independently, inconsistency would increase exponentially. So I created a centralized design system for recurring patterns:",
              ],
            },
            {
              type: "list",
              items: [
                "Tables",
                "Filters",
                "Forms",
                "Inputs",
                "Navigation",
                "Dialogs",
                "Status indicators",
                "Empty states",
                "Alerts",
                "Actions",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The design system wasn't created simply for visual consistency. It became a way of encoding product behavior.",
              ],
            },
            {
              type: "figure",
              src: "/images/projects/hrms-design-system.jpg",
              width: 1600,
              height: 900,
              alt: "HRMS Design System component library showing Status Badges (Active, Pending, Rejected, Processing, Inactive), Button variants (Primary Approve, Secondary Cancel, Destructive Deactivate, Disabled Submit), Form Input States (Default, Focus, Error, Disabled), Employee Cards with avatars and status, and Alert components (Success, Warning, Error, Info).",
              label: "Design system snapshot",
              caption:
                "Key components from the design system — status badges, buttons, form states, cards and alerts — ensuring consistent treatment across all modules.",
              annotations: [],
            },
            {
              type: "specimen",
              label:
                "Illustrative specimen, rebuilt with this portfolio's tokens rather than the product's",
              caption:
                "Every state is shown at once: behavior is part of the component, not an afterthought.",
              rows: [
                {
                  kind: "button",
                  name: "Button",
                  rule: "Variants for primary, secondary and destructive actions.",
                  sample: "Approve leave",
                  states: ["Primary", "Secondary", "Destructive", "Disabled"],
                },
                {
                  kind: "input",
                  name: "Input",
                  rule: "A form should communicate validation consistently.",
                  field: "Employee ID",
                  value: "EMP-2481",
                  error: "No employee matches that ID.",
                  states: ["Default", "Focus", "Error", "Disabled"],
                },
                {
                  kind: "status",
                  name: "Status",
                  rule: "A status should have predictable visual treatment.",
                  states: ["Pending", "Approved", "Rejected", "Processing"],
                },
                {
                  kind: "confirm",
                  name: "Confirmation",
                  rule: "A destructive action should behave consistently everywhere.",
                  title: "Deactivate this employee?",
                  cancel: "Cancel",
                  action: "Deactivate",
                },
              ],
            },
          ],
        },
        {
          id: "infrastructure",
          label: "Operational infrastructure",
          heading: "The design system as operational infrastructure.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "One of the outcomes from centralizing reusable components was improved consistency and smoother collaboration with development. Instead of repeatedly discussing \u201cHow should this dropdown behave?\u201d, the team could work from shared interaction patterns.",
                "This reduced repeated design-development decisions and made new modules easier to build consistently.",
              ],
            },
          ],
        },
        {
          id: "accessibility",
          label: "Accessibility",
          heading:
            "For a product used all day, accessibility also affects operational efficiency.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "For enterprise products used repeatedly throughout the day, accessibility also affects operational efficiency. Accessibility considerations (contrast, clear status communication, logical focus order, and understandable error states) were treated as part of the core experience rather than an afterthought. I considered:",
              ],
            },
            {
              type: "list",
              items: [
                "Color contrast",
                "Text hierarchy",
                "Readable font sizes",
                "Keyboard interaction",
                "Focus states",
                "Icon clarity",
                "Status differentiation beyond color",
                "Error messaging",
                "Touch target size",
              ],
            },
            {
              type: "legibility",
              before: "Colour alone",
              after: "Colour, icon and label",
              states: ["Approved", "Pending", "Rejected"],
              caption:
                "Status differences should not rely exclusively on green, orange and red. Users should also have textual labels or other indicators.",
            },
          ],
        },
      ],
    },
    {
      id: "outcome",
      index: "07",
      label: "Outcome",
      sections: [
        {
          id: "outcomes",
          label: "Outcomes",
          heading: "What changed, for the product, the team and the business.",
          blocks: [
            {
              type: "clusters",
              caption: "Outcomes, separated by kind.",
              groups: [
                {
                  name: "Product",
                  items: [
                    "Improved clarity across employee lifecycle workflows",
                    "Reduced friction in onboarding and self-service",
                    "More consistent interaction patterns across modules",
                  ],
                },
                {
                  name: "Operational",
                  items: [
                    "Reduced design-development ambiguity through reusable design-system patterns",
                    "Improved visibility into workflow states and responsibilities",
                  ],
                },
                {
                  name: "Business",
                  items: [
                    "Grew to 100+ customers, including manufacturing and education",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "learned",
          label: "What I learned",
          heading:
            "The visible UI is often only the final expression of decisions underneath.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The biggest learning from this product wasn't about HR software. It was about complex systems.",
                "Complex enterprise products rarely fail because of individual screens. They fail when dependencies between workflows remain invisible. Designing for states, ownership, and recovery paths proved more valuable than polishing isolated interfaces.",
              ],
            },
            {
              type: "strata",
              surface: "The visible UI",
              layers: [
                "Business rules",
                "User responsibilities",
                "System states",
                "Permissions",
                "Data dependencies",
                "Exceptions",
              ],
              caption:
                "The more complex the system becomes, the more important it is to make those relationships clear before designing the interface.",
            },
          ],
        },
        {
          id: "today",
          label: "What I would improve today",
          heading: "Three directions I would push further.",
          blocks: [
            { type: "subheading", text: "Stronger product analytics" },
            {
              type: "prose",
              paragraphs: [
                "Instrument workflows such as onboarding completion, payroll exceptions, attendance corrections, leave approval time and feature adoption. That would allow design decisions to rely more heavily on behavioral evidence.",
              ],
            },
            {
              type: "subheading",
              text: "More configurable workflow architecture",
            },
            {
              type: "prose",
              paragraphs: [
                "Instead of relying heavily on predefined HR workflows, allow organizations to configure rules, approvals, triggers and actions, while maintaining safe defaults.",
              ],
            },
            { type: "subheading", text: "AI-assisted HR operations" },
            {
              type: "prose",
              paragraphs: [
                "I would explore AI-assisted experiences that surface exceptions, suggest next actions, and explain outcomes in plain language — while keeping clear human control and auditability. These remain proposals and are not part of the shipped product.",
                "AI could help with summarizing attendance anomalies, detecting payroll irregularities, extracting employee-document information, drafting HR communications, answering policy questions and recommending follow-up actions.",
                "But I wouldn't automatically let AI execute high-impact HR or payroll actions. The interaction model would be:",
              ],
            },
            {
              type: "flow",
              label: "Proposed interaction model",
              caption:
                "That preserves human judgment where decisions have financial or employee impact.",
              steps: [
                { text: "Detects", actor: "AI" },
                { text: "Explains", actor: "AI" },
                { text: "Recommends", actor: "AI" },
                { text: "Reviews", actor: "HR" },
                { text: "Approves", actor: "HR" },
                { text: "Executes", actor: "System" },
                { text: "Records an audit trail", actor: "System" },
              ],
            },
          ],
        },
        {
          id: "closing",
          label: "Closing",
          heading: "Deciding where the complexity should live.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Designing the interface was only part of the job.",
                "The more important work was understanding how employee data, workflows, business rules, permissions and operational decisions connected, and then deciding where that complexity should live so the user didn't have to carry all of it.",
                "That is the part of this project that most shaped how I approach Product Design today.",
              ],
            },
          ],
        },
      ],
    },
  ],

  nextProject: {
    slug: "dopamint",
    title: "Dopamint",
    line: "From questions to informed action",
  },

  metadata: {
    title: "Shenll HRMS: HR platform case study",
    description:
      "How Naveen Kumar designed Shenll HRMS around workflows and system states, from onboarding to attendance, leave and payroll, for a B2B HR platform used by 100+ customers.",
  },
}
