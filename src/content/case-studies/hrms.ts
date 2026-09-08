import type { CaseStudy } from "@/types/case-study"

/**
 * Source of truth: `Md Files/HRMS_CASE_STUDY_MASTER.md`.
 *
 * Every claim here is drawn from that document. Nothing quantitative appears
 * until it is verified — see §40 of the master file. Items still awaiting
 * verification are marked `unverified` rather than stated as fact.
 */
export const hrmsCaseStudy: CaseStudy = {
  slug: "hrms",
  eyebrow: "Enterprise SaaS · HR technology · End-to-end product design",
  title: "Designing an HRMS where people, workflows, and data stay connected",
  standfirst:
    "A multi-role HR management platform connecting employees and the organisation across employee records, attendance, leave, payroll, recruitment, finance, reporting, and administration.",
  challenge:
    "My challenge was not simply to design a collection of HR screens. It was to make a large operational system understandable across different roles while keeping workflows, permissions, and shared employee information consistent.",

  meta: [
    {
      label: "Role",
      value: "Product Designer — end-to-end UX/UI and engineering collaboration",
    },
    { label: "Product", value: "Shenll HRMS" },
    { label: "Platform", value: "Responsive web application" },
    { label: "Users", value: "Admin · HR · Manager · Employee" },
    {
      label: "Scope",
      value:
        "Requirements → workflows → IA → UI → design system → implementation support",
    },
    { label: "Status", value: "Production / redesign status", unverified: true },
    { label: "Timeline", value: "Project dates and duration", unverified: true },
  ],

  chapters: [
    { id: "summary", index: "01", label: "Summary", depth: "brief" },
    { id: "context", index: "02", label: "Context", depth: "brief" },
    { id: "system", index: "03", label: "System", depth: "brief" },
    { id: "roles", index: "04", label: "Roles", depth: "brief" },
    { id: "problem", index: "05", label: "Problem", depth: "brief" },
    { id: "evidence", index: "06", label: "Discovery", depth: "deep" },
    { id: "architecture", index: "07", label: "Architecture", depth: "deep" },
    { id: "decisions", index: "08", label: "Decisions", depth: "brief" },
    { id: "workflow", index: "09", label: "Workflow", depth: "brief" },
    { id: "design-system", index: "10", label: "Design system", depth: "brief" },
    { id: "responsive", index: "11", label: "Responsive", depth: "deep" },
    { id: "engineering", index: "12", label: "Engineering", depth: "brief" },
    { id: "validation", index: "13", label: "Validation", depth: "deep" },
    { id: "outcome", index: "14", label: "Outcome", depth: "brief" },
    { id: "reflection", index: "15", label: "Reflection", depth: "brief" },
  ],

  summary: [
    {
      index: "01",
      title: "The challenge",
      body: [
        "HR work spans many connected activities, but the experience can easily become fragmented when employee information, attendance, leave, payroll, recruitment, approvals, and administrative configuration behave like separate tools.",
        "The challenge was to create one coherent HRMS experience that could support different roles without making every user navigate the full complexity of the organisation.",
      ],
    },
    {
      index: "02",
      title: "My role",
      body: [
        "I worked across requirement understanding, workflow mapping, information architecture, interaction and UI design, reusable patterns, responsive behaviour, developer collaboration, and implementation validation.",
        "I also worked with frontend and backend teams on how employee information needed to be retrieved and reused across modules rather than treating each screen as an isolated data surface.",
      ],
    },
    {
      index: "03",
      title: "My approach",
      body: [
        "I treated the HRMS as a connected system: people, roles, permissions, data, workflow state, and reusable interaction patterns.",
        "The goal was to make each task feel focused while keeping the underlying product coherent.",
      ],
    },
    {
      index: "04",
      title: "The outcome",
      body: [
        "The design created a unified product model across core HR modules, with role-specific workflows, reusable UI patterns, responsive interfaces, and clearer collaboration between design and engineering.",
      ],
    },
  ],

  context: {
    heading: "HR software is a system of dependencies",
    body: [
      "An HRMS may look like a collection of modules in a navigation menu, but everyday actions cross those boundaries.",
      "An employee's identity can influence attendance, leave eligibility, payroll, reporting, finance, manager visibility, and administrative access.",
    ],
    chain: [
      "Employee",
      "Manager",
      "HR / System",
      "Updated status",
      "Other affected records",
    ],
    question:
      "How do we let each role focus on the work they need to do while maintaining one coherent system underneath?",
  },

  modules: [
    {
      id: "employee",
      name: "Employee Management",
      job: "The central place for employee information and organisational context.",
      roles: ["HR", "Admin", "Manager"],
      dependsOn: ["Administration"],
      affects: ["Attendance", "Leave", "Payroll", "Finance", "Reports"],
    },
    {
      id: "attendance",
      name: "Attendance",
      job: "Attendance records, time-related information, processing, and operational visibility.",
      roles: ["Employee", "Manager", "HR"],
      dependsOn: ["Employee Management"],
      affects: ["Payroll", "Reports"],
    },
    {
      id: "leave",
      name: "Leave Management",
      job: "Requests, approvals, balances and status, with role-specific visibility.",
      roles: ["Employee", "Manager", "HR"],
      dependsOn: ["Employee Management", "Attendance"],
      affects: ["Payroll", "Reports"],
    },
    {
      id: "payroll",
      name: "Payroll",
      job: "Payroll-related employee information, processing views, reports, and payslip access.",
      roles: ["HR", "Admin", "Employee"],
      dependsOn: ["Employee Management", "Attendance", "Leave"],
      affects: ["Finance", "Reports"],
    },
    {
      id: "recruitment",
      name: "Recruitment",
      job: "Job posting and hiring-related workflows.",
      roles: ["HR", "Manager"],
      dependsOn: ["Administration"],
      affects: ["Employee Management"],
    },
    {
      id: "finance",
      name: "Finance",
      job: "Relevant finance and account views and workflows within the HR platform.",
      roles: ["HR", "Admin"],
      dependsOn: ["Payroll"],
      affects: ["Reports"],
    },
    {
      id: "reports",
      name: "Reports",
      job: "KPI widgets, operational summaries, and decision-support views for the relevant role.",
      roles: ["HR", "Admin", "Manager"],
      dependsOn: ["Employee Management", "Attendance", "Leave", "Payroll"],
      affects: [],
    },
    {
      id: "administration",
      name: "Administration",
      job: "Configuration, system administration, roles, access, and organisation-level control.",
      roles: ["Admin"],
      dependsOn: [],
      affects: ["Every module"],
    },
  ],

  roles: [
    {
      id: "employee",
      name: "Employee",
      goal: "Complete everyday HR tasks without depending on HR.",
      actions: [
        "View attendance",
        "Request leave",
        "Access payslips",
        "Update personal information",
        "View announcements and messages",
      ],
    },
    {
      id: "manager",
      name: "Manager",
      goal: "Understand team status and resolve approvals quickly.",
      actions: [
        "Review leave requests",
        "View team attendance",
        "Track direct reports",
        "Act on pending approvals",
      ],
    },
    {
      id: "hr",
      name: "HR",
      goal: "Manage the employee lifecycle and keep operational data accurate.",
      actions: [
        "Employee records",
        "Attendance processing",
        "Payroll preparation",
        "Recruitment",
        "Reports",
        "Workflow oversight",
      ],
    },
    {
      id: "admin",
      name: "Admin",
      goal: "Configure and govern the organisation's HR system.",
      actions: [
        "User and role control",
        "Master data",
        "Configuration",
        "Administrative workflows",
        "System-level visibility",
      ],
    },
  ],

  problem: {
    heading: "Complexity was not coming from one bad screen",
    body: "It came from the relationships between screens.",
    items: [
      {
        title: "Fragmented information",
        detail:
          "The same employee could appear across multiple HR activities. Treating every module independently would create duplication, inconsistent context, and additional effort.",
      },
      {
        title: "Role complexity",
        detail:
          "Employees, managers, HR teams, and administrators do not need the same actions or information density.",
      },
      {
        title: "Approval state",
        detail:
          "Enterprise workflows are not simply forms. A submission moves between people, states, permissions, and downstream actions.",
      },
      {
        title: "Dense operational interfaces",
        detail:
          "HR teams work with tables, filters, forms, dashboards, reports, and status indicators. The interface needed to stay efficient without becoming overwhelming.",
      },
      {
        title: "Scalability",
        detail:
          "The product needed reusable patterns so that adding another module did not mean inventing a new interface language.",
      },
    ],
  },

  evidence: [
    {
      evidence: "Employee information was needed repeatedly across HR modules.",
      interpretation:
        "Employee data was not a screen-level concern; it was a shared product dependency.",
      implication:
        "Create predictable employee identity and context patterns, and collaborate with backend teams on reliable retrieval of the required data across modules.",
    },
    {
      evidence:
        "Different roles interacted with the same process at different stages.",
      interpretation:
        "Role-based navigation alone would not solve workflow clarity.",
      implication: "Design role-appropriate actions over shared workflow state.",
    },
    {
      evidence: "Operational screens contained large quantities of data.",
      interpretation: "Visibility without prioritisation becomes noise.",
      implication:
        "Design dashboards and tables around actions, exceptions, and decisions rather than displaying every available field at once.",
    },
  ],

  informationArchitecture: [
    { group: "Dashboard", items: [] },
    { group: "People", items: ["Employee Management"] },
    { group: "Time", items: ["Attendance", "Leave"] },
    { group: "Payroll", items: [] },
    { group: "Recruitment", items: [] },
    { group: "Finance", items: [] },
    { group: "Reports", items: [] },
    { group: "Administration", items: [] },
  ],

  decisions: [
    {
      index: "01",
      title: "Treat the employee record as a shared system dependency",
      body: [
        "One of the most important lessons from the HRMS was that an employee record was not just an Employee Profile page. Employee information was required across employee management, attendance, leave, payroll, finance, reporting, and administration.",
        "I worked with frontend and backend teams to understand which information each module required and how data needed to be retrieved across different tables and sources.",
        "Without a shared data model in mind, the interface could easily create duplicate employee selectors, inconsistent identifiers, repeated data entry, missing context, mismatched records, and unnecessary navigation.",
      ],
      principle:
        "The exact fields can change by module, but the user's identity should remain recognisable and predictable.",
    },
    {
      index: "02",
      title: "Role-specific actions over shared workflow state",
      body: [
        "A leave request, attendance correction, recruitment action, or other approval workflow can pass through multiple roles.",
        "Instead of designing each role as an isolated experience, I treated the workflow as one underlying process with role-specific actions.",
      ],
      principle:
        "The interface changes with responsibility. The product state should remain coherent.",
      points: [
        { heading: "Status language", detail: "Clear and shared across roles." },
        { heading: "Ownership", detail: "Visible at every step." },
        { heading: "Next action", detail: "Explicit rather than inferred." },
        {
          heading: "Consequential actions",
          detail: "Confirmed, with consistent success and error feedback.",
        },
      ],
    },
    {
      index: "03",
      title: "Dashboards should answer: what needs my attention?",
      body: [
        "Enterprise dashboards can become decorative collections of KPI cards. I wanted the dashboard to support decisions.",
        "Instead of asking how much data can be displayed, the design asks what this role needs to know now, what changed, what requires action, and where they should go next.",
      ],
      points: [
        {
          heading: "Employee",
          detail:
            "Today's attendance and status, leave status, payslip, announcements, immediate self-service.",
        },
        {
          heading: "Manager",
          detail:
            "Pending approvals, team attendance exceptions, direct-report context, actions blocking another employee.",
        },
        {
          heading: "HR",
          detail:
            "Organisation-level exceptions, attendance and leave processing, lifecycle activity, payroll preparation.",
        },
        {
          heading: "Admin",
          detail:
            "Configuration, user and role governance, system-level exceptions, administrative status.",
        },
      ],
    },
    {
      index: "04",
      title: "Reuse patterns instead of redesigning every module",
      body: [
        "An enterprise product becomes difficult to learn when each module behaves differently. I used reusable patterns for repeated product behaviour — page headers, filters, search, data tables, pagination, tabs, status badges, form fields, date controls, drawers, confirmations, approval actions, and empty, loading and error states.",
        "A reusable system improves learnability, consistency, design speed, handoff clarity, implementation reuse, and future module scalability.",
      ],
    },
  ],

  workflow: {
    heading: "Designing approval as a stateful workflow — not a form",
    body: "The visible form is only one moment. The complete product behaviour spans initiation, validation, review, decision, system update, and downstream visibility.",
    steps: [
      {
        index: "01",
        title: "Employee initiates action",
        role: "Employee",
        state: "Draft",
        detail:
          "The employee submits from their own surface, with the information they already hold rather than data HR would have to supply.",
      },
      {
        index: "02",
        title: "System validates required information",
        role: "System",
        state: "Validating",
        detail:
          "Validation happens before the request enters anyone's queue, so reviewers never receive incomplete work.",
      },
      {
        index: "03",
        title: "Request enters pending state",
        role: "System",
        state: "Pending",
        detail:
          "The state is visible to the employee immediately. Ownership moves, and the interface says who holds it.",
      },
      {
        index: "04",
        title: "Responsible reviewer receives the action",
        role: "Manager",
        state: "Pending review",
        detail:
          "The request surfaces where the reviewer already works, alongside the team context needed to decide.",
      },
      {
        index: "05",
        title: "Reviewer approves, rejects, or requests change",
        role: "Manager",
        state: "In decision",
        detail:
          "Consequential actions are confirmed. A rejection or change request carries a reason back to the employee.",
      },
      {
        index: "06",
        title: "System updates status",
        role: "System",
        state: "Resolved",
        detail:
          "One state change, propagated once, rather than each module tracking its own version of the truth.",
      },
      {
        index: "07",
        title: "Employee sees the result",
        role: "Employee",
        state: "Resolved",
        detail:
          "The employee learns the outcome from the same surface they submitted on, not from a separate notification trail.",
      },
      {
        index: "08",
        title: "Downstream views reflect the new state",
        role: "HR · Payroll · Reports",
        state: "Propagated",
        detail:
          "Attendance, payroll and reporting read the resolved state rather than requiring a second manual entry.",
      },
    ],
    edgeStates: [
      "Pending",
      "Approved",
      "Rejected",
      "Cancelled",
      "Validation error",
      "No permission",
      "Loading",
      "Empty",
    ],
  },

  designSystem: {
    layers: [
      { name: "Foundations", items: "Colour · type · spacing · radius · shadows" },
      { name: "Primitives", items: "Button · input · checkbox · select · badge" },
      {
        name: "Patterns",
        items: "Filter bar · data table · form section · approval controls",
      },
      {
        name: "Product components",
        items: "Employee row · attendance status · payroll summary · workflow item",
      },
    ],
    preview: [
      {
        name: "Status",
        states: ["Pending", "Approved", "Rejected", "Processing"],
      },
      { name: "Button", states: ["Default", "Hover", "Focus", "Disabled"] },
      { name: "Form field", states: ["Default", "Filled", "Error", "Disabled"] },
    ],
  },

  responsive: {
    heading: "Responsive meant changing behaviour — not shrinking desktop",
    body: "The same workflow had to remain usable when the available space changed what could reasonably be shown at once.",
    changes: [
      "Side navigation becomes a drawer",
      "Tables prioritise critical columns",
      "Secondary data moves to detail surfaces",
      "Filters collapse progressively",
      "Actions remain reachable",
      "Forms stack",
      "Modals may become full-screen sheets",
    ],
  },

  engineering: {
    heading: "The design did not stop at Figma",
    body: [
      "I collaborated with frontend and backend developers to translate the product model into working interfaces.",
      "When the same employee information appeared across several modules, the UX could not be solved by independently designing each screen. The team needed clarity on which employee fields were required, where they originated, which module owned the information, what was reusable, and how the UI should behave when information was missing.",
      "A designer does not need to own the database. But a designer should understand when a UI decision depends on data availability, shared identifiers, permissions, API state, workflow state, and system errors.",
    ],
    involvement: [
      "Discussing functional requirements",
      "Validating workflow behaviour",
      "Clarifying what data a screen required",
      "Understanding dependencies between HR modules",
      "Helping structure employee information retrieval across multiple data sources",
      "Reviewing API-driven states",
      "Aligning reusable design patterns with reusable frontend components",
      "Supporting debugging, UAT and production fixes",
      "Checking responsive and implementation consistency",
    ],
    chain: [
      "Business requirement",
      "Product flow",
      "UI state",
      "Required data",
      "API / backend",
      "Frontend component",
      "User action",
    ],
  },

  validation: {
    heading: "Validate the workflow, not only the screen",
    body: "Formal usability research was limited during this engagement. Validation happened primarily through stakeholder review, workflow walkthroughs, engineering feasibility discussions, UAT, and implementation feedback. I therefore treat these results as product-delivery evidence rather than claiming statistically validated usability improvement.",
  },

  outcomes: [
    {
      title: "Product coherence",
      body: "Multiple HR modules expressed through one consistent product language.",
    },
    {
      title: "Cross-role workflow",
      body: "Admin, HR, manager, and employee experiences connected through role-aware workflows.",
    },
    {
      title: "Design → implementation",
      body: "Reusable UI patterns and clearer product and data requirements supported closer collaboration with engineering.",
    },
  ],

  reflection: {
    heading: "Complex enterprise UX is mostly about relationships",
    body: [
      "The biggest lesson from the HRMS was that complexity rarely lives inside one component. It lives between roles, permissions, records, workflows, modules, system states, and handoffs.",
      "That shift — from screen design to system design — is one of the most important parts of my product-design practice.",
    ],
    before: "What should this screen look like?",
    after:
      "What happened before this screen, what state is the system in, who is responsible now, what information is required, and what happens next?",
  },

  nextSteps: [
    "Validate the highest-frequency workflows with real HR users.",
    "Measure task completion and error rates for approval-heavy workflows.",
    "Improve configurable role and permission patterns.",
    "Audit data-heavy screens for accessibility and keyboard efficiency.",
    "Define analytics for high-value workflows.",
    "Continue aligning design tokens and components with frontend implementation.",
  ],

  nextProject: {
    slug: "medical-guardian",
    title: "Medical Guardian",
    line: "Making complex care technology feel calmer",
  },
}
