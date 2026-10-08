import type { StoryCaseStudy } from "@/types/story-case-study"

/**
 * Source of truth: Naveen's Shenll HRMS case-study narrative (October 2026).
 *
 * Author instructions in that draft ([IMAGE] notes, "what I would show"
 * advice, headline options) are not page copy and are left out. Claims
 * confirmed by Naveen on 2026-10-07: 100+ customers; usability testing took
 * place; measured improvements exist (figures not yet supplied, so none are
 * stated). The employee-creation iteration in "After testing" comes from the
 * earlier Shenll_HRMS_2024_Traditional_UX_Case_Study.md.
 */
export const hrmsCaseStudy: StoryCaseStudy = {
  slug: "hrms",
  eyebrow: "Shenll HRMS",
  title: "Designing complexity out of everyday HR operations",
  subtitle: "Designing an HR platform around workflows, not screens.",
  intro: [
    "Shenll HRMS started with a familiar enterprise-product challenge: every HR function worked, but each function introduced its own rules, dependencies and exceptions.",
    "The design problem was not simply creating screens for payroll, attendance or onboarding. It was designing a system where employees, HR teams, approvals, attendance, leave, payroll, business rules and compliance all affect one another, without forcing users to understand that complexity.",
    "I worked across the product lifecycle, from understanding workflows and structuring the product to interaction design, design systems, prototyping, developer collaboration and iteration after release.",
    "The product eventually grew to serve 100+ customers, particularly across businesses such as manufacturing and education.",
  ],
  question: {
    label: "My design challenge",
    text: "How might we make a complex HR operating system feel predictable to people who use it every day?",
  },

  facts: [
    { label: "Product", value: "Shenll HRMS, a B2B HRMS / payroll SaaS" },
    { label: "Primary users", value: "HR teams, administrators, employees" },
    { label: "My role", value: "Product Designer, end-to-end product design" },
    { label: "Company", value: "Shenll Technology Solutions" },
    {
      label: "Stage",
      value: "In production; 100+ customers, including manufacturing and education",
    },
    {
      label: "Focus",
      value:
        "Employee lifecycle, attendance, leave, payroll, recruitment, performance and self-service",
    },
    {
      label: "Main problem",
      value:
        "Every HR function worked, but each introduced its own rules, dependencies and exceptions, and users had to interpret that complexity themselves.",
      wide: true,
    },
    {
      label: "Key contributions",
      value:
        "A state-driven employee lifecycle, information architecture built around jobs, progressive onboarding, payroll that explains outcomes instead of exposing calculations, and a centralised design system.",
      wide: true,
    },
    {
      label: "Outcomes and limits",
      value:
        "Clearer lifecycle workflows, less friction in onboarding and self-service, and more consistent patterns across modules. Measured figures are not published here. The AI-assisted HR operations in section 20 are proposals, not shipped features.",
      wide: true,
    },
  ],

  keyDecisions: {
    heading: "Three decisions shaped the product",
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
          index: "01",
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
          index: "02",
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
            { type: "quote", text: "“Why isn't my leave balance updated?”" },
            {
              type: "prose",
              paragraphs: [
                "But the answer could depend on payroll finalization, attendance processing, approved leave, overtime, policy rules, or the current payroll cycle.",
                "Similarly, HR might see an employee but not immediately understand whether that person had received the onboarding link, completed their profile, submitted details, been reviewed, or been activated.",
                "The product therefore needed more than forms and tables. It needed a state model.",
              ],
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
          index: "03",
          label: "My first major decision",
          heading: "Design around states instead of individual pages.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "A traditional approach could have been an employee list, an employee form and an employee detail page. That works visually, but it doesn't solve the operational question HR actually has:",
              ],
            },
            {
              type: "quote",
              text: "“Where is this employee in the onboarding process, and what needs to happen next?”",
            },
            {
              type: "prose",
              paragraphs: [
                "So I shifted the experience from a record-based model toward a state-driven workflow. Waiting for profile completion became different from waiting for review, and different again from an active employee.",
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
            { type: "subheading", text: "Why this mattered" },
            {
              type: "prose",
              paragraphs: [
                "This allowed the interface to communicate what has happened, what hasn't happened, who owns the next action, and whether HR needs to intervene, instead of requiring the HR administrator to interpret several pieces of information manually.",
                "**Trade-off:** more states create more system complexity. So the challenge was ensuring that states were meaningful operationally, not simply technical backend statuses exposed to users.",
              ],
            },
          ],
        },
        {
          id: "workflows",
          index: "04",
          label: "Understanding the workflows",
          heading: "I focused on how work was actually being completed.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Because the product covered multiple HR functions, I couldn't treat research as “ask users what features they want.” The questions were closer to:",
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
            {
              type: "prose",
              paragraphs: [
                "Across workflows such as attendance, payroll and employee self-service, this helped identify recurring friction around visibility, dependencies and completion states.",
              ],
            },
            {
              type: "clusters",
              caption: "Recurring friction, grouped by what it cost the user.",
              groups: [
                {
                  name: "Visibility",
                  items: [
                    "Unclear processing state",
                    "Unclear ownership",
                    "Delayed updates",
                  ],
                },
                {
                  name: "Efficiency",
                  items: [
                    "Repeated manual actions",
                    "Duplicated information",
                    "Back-and-forth",
                  ],
                },
                {
                  name: "Confidence",
                  items: [
                    "Uncertainty about payroll impact",
                    "Unclear balances",
                    "Lack of status feedback",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "modules",
          index: "05",
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
          index: "06",
          label: "My second major decision",
          heading:
            "Build the information architecture around jobs, not database structure.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "One of the risks in enterprise products is allowing backend structure to dictate navigation. A database might categorize objects one way; users think about their work differently.",
                "So I structured the product around operational jobs rather than exposing technical system categories.",
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
              text: "A user should know where to go based on what they are trying to accomplish.",
            },
          ],
        },
      ],
    },
    {
      id: "onboarding",
      index: "07",
      label: "Onboarding",
      sections: [
        {
          id: "employee-onboarding",
          index: "07",
          label: "Employee onboarding",
          heading:
            "Onboarding became the clearest example of the system-thinking approach.",
          blocks: [
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
                "HR should never need to ask “Did the employee complete this?” The system should answer that.",
              ],
            },
          ],
        },
        {
          id: "progressive",
          index: "08",
          label: "Progressive onboarding",
          heading: "Delegation without losing governance.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Another option would have been forcing HR to collect all employee information before creating the employee. I avoided that because it creates unnecessary administrative effort.",
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
                "This reduces duplicate data entry, incorrect information and HR administrative workload. But HR still retains control through review.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "rules",
      index: "09",
      label: "Payroll & rules",
      sections: [
        {
          id: "dependencies",
          index: "09",
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
                "This also influenced employee-facing copy. Instead of showing an ambiguous “Remaining leave” number, we needed to communicate which kind of number it was.",
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
          index: "10",
          label: "My third major decision",
          heading:
            "Expose the information users need, not the calculation engine.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Payroll systems can become extremely complex. One approach would be exposing every internal calculation, but that transfers system complexity to users.",
              ],
            },
            {
              type: "callout",
              label: "The principle",
              text: "Expose outcomes and explanations; hide unnecessary computation.",
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
          index: "11",
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
          index: "12",
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
              text: "Role × permission × action × data visibility, not simply screens.",
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
      id: "delivery",
      index: "13",
      label: "Delivery",
      sections: [
        {
          id: "consistency",
          index: "13",
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
          index: "14",
          label: "Operational infrastructure",
          heading: "The design system as operational infrastructure.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "One of the outcomes from centralizing reusable components was improved consistency and smoother collaboration with development. Instead of repeatedly discussing “How should this dropdown behave?”, the team could work from shared interaction patterns.",
                "This reduced repeated design-development decisions and made new modules easier to build consistently.",
              ],
            },
          ],
        },
        {
          id: "engineering",
          index: "15",
          label: "Working with engineering",
          heading: "I didn't treat handoff as the end of the design process.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Many important product decisions became clearer during implementation. My collaboration with engineering included discussing:",
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
                "Sometimes the technically cleanest implementation wasn't the best user experience. Sometimes the ideal UX required significantly more implementation cost. So the process often became:",
              ],
            },
            {
              type: "flow",
              label: "From intention to shipped behavior",
              caption:
                "This is where product design becomes less about artifacts and more about decisions.",
              steps: [
                { text: "Design intention" },
                { text: "Technical constraint" },
                { text: "Trade-off" },
                { text: "Adjusted solution" },
                { text: "QA" },
              ],
            },
          ],
        },
        {
          id: "accessibility",
          index: "16",
          label: "Accessibility",
          heading:
            "For a product used all day, accessibility also affects operational efficiency.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "For enterprise products used repeatedly throughout the day, accessibility also affects operational efficiency. I considered:",
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
        {
          id: "testing",
          index: "17",
          label: "After testing",
          heading:
            "A workflow isn't successful simply because users eventually complete it.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Usability feedback exposed areas where users could technically complete tasks but required unnecessary interpretation. I looked for:",
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
                "This led to iterations across workflows including onboarding, attendance and payroll, and employee self-service. Some research and usability improvements contributed to stronger task completion across these workflows.",
              ],
            },
            { type: "subheading", text: "One iteration: creating an employee" },
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
          ],
        },
      ],
    },
    {
      id: "outcome",
      index: "18",
      label: "Outcome",
      sections: [
        {
          id: "outcomes",
          index: "18",
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
          index: "19",
          label: "What I learned",
          heading:
            "The visible UI is often only the final expression of decisions underneath.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The biggest learning from this product wasn't about HR software. It was about complex systems.",
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
          index: "20",
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
          index: "21",
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
