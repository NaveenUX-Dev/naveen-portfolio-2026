import type { StoryCaseStudy } from "@/types/story-case-study"

/**
 * Source of truth: DOPAMINT_PORTFOLIO_CASE_STUDY.md.
 *
 * Copy is Part A of that file, verbatim. Captions, the recovery demo and the
 * responsibility flow come from Part B. Part D (private author notes) is
 * deliberately excluded. `**text**` marks the file's own bold emphasis.
 */
export const dopamintCaseStudy: StoryCaseStudy = {
  slug: "dopamint",
  eyebrow: "Dopamint",
  title: "From crypto questions to informed action",
  subtitle:
    "Designing an AI experience where users can understand, review, and confirm before committing funds.",
  intro: [
    "An AI assistant can make a financial action feel as simple as sending a message. The design challenge is helping people understand what will happen before that action moves money.",
    "For Dopamint, I worked through the experience connecting AI chat, wallet access, deposits, and token swaps. My focus was the transition between asking a question and authorizing an action: what the interface should explain, when it should ask for confirmation, and how it should help someone recover when they cannot continue.",
  ],

  facts: [
    {
      label: "Product",
      value: "AI-assisted crypto research and financial actions",
    },
    {
      label: "My contribution",
      value:
        "Product flows, interaction design, design-system application, frontend prototyping, and integration planning",
    },
    { label: "Collaboration", value: "Backend and LLM teams" },
    {
      label: "Scope of this case study",
      value: "Onboarding, wallet context, swap review, and deposit recovery",
    },
    {
      label: "Project stage",
      value:
        "Product in development; this case study presents selected design decisions and implementation direction",
    },
  ],

  keyDecisions: {
    heading: "Three decisions shaped the experience",
    items: [
      {
        text: "Make wallet access part of a familiar sign-in journey.",
        target: "familiar-entry",
      },
      {
        text: "Separate an AI suggestion from an action the user authorizes.",
        target: "answers-actions",
      },
      {
        text: "Turn insufficient funds into a clear recovery path.",
        target: "recovery-path",
      },
    ],
  },

  groups: [
    {
      id: "overview",
      index: "01",
      label: "Overview",
      sections: [
        {
          id: "challenge",
          index: "01",
          label: "The challenge",
          heading:
            "A conversation is easy to start. A financial action needs more context.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Dopamint brings crypto research and wallet actions into a conversational interface. A person might ask about a token, inspect their wallet, or request a swap from the same chat.",
                "Those requests look similar in a message box, but they have different consequences. An answer can be read and dismissed. A transaction needs a valid wallet, the right network, sufficient funds, a current quote, and an explicit decision to proceed.",
                "I framed the design challenge around one question:",
              ],
            },
            {
              type: "callout",
              text: "How can we make an AI-led financial journey easy to follow while keeping meaningful decisions with the user?",
            },
            {
              type: "prose",
              paragraphs: [
                "The experience needed to make three things clear: what the assistant understood, what the application had verified, and what the user was being asked to approve.",
              ],
            },
          ],
        },
        {
          id: "scope",
          index: "02",
          label: "Defining the scope",
          heading:
            "Start with a task people can complete, then design what happens when they cannot.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "I used a simple scenario to connect the product's separate capabilities:",
              ],
            },
            {
              type: "quote",
              text: "“I want to swap USDC for ETH. Help me understand the next step.”",
            },
            {
              type: "prose",
              paragraphs: [
                "This is an illustrative design scenario. It gave the work a concrete starting point without assuming that every user has the same level of crypto knowledge.",
                "I considered two starting conditions: someone entering through social or email sign-in, and someone connecting an existing wallet. From there, the journey needed to support both a successful swap review and a blocked path where the source-token balance was too low.",
                "The scope was shaped by an existing frontend, Privy authentication, a FastAPI service supplied by the LLM team, and backend capabilities arriving at different stages. I worked within those constraints and kept unresolved integrations visible in the design requirements.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "entry",
      index: "03",
      label: "Entry",
      sections: [
        {
          id: "familiar-entry",
          index: "03",
          label: "Decision one: make entry familiar",
          heading:
            "Let people sign in before asking them to understand the wallet system.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The client requirement was for social or email users to receive a usable embedded wallet without handling a seed phrase during normal onboarding. Existing wallet users also needed an entry path.",
                "I worked toward one coherent sign-in experience using Google, Apple, email, or an external wallet. The application would use an existing wallet where appropriate and create an embedded wallet for users who did not already have one.",
                "I also questioned the extra custom wallet-signing step after Privy login. My proposed direction was to use verified Privy authentication for the application session, subject to backend support, rather than add another sign-in interaction without a clear user need.",
                "The design still needed a distinct state between successful provider login and a ready application session. If backend setup failed, the interface should explain the problem and offer a retry instead of leaving the user on a permanent loader.",
                "**The trade-off:** fewer visible steps still require careful coordination behind the interface. I treated authentication readiness, wallet readiness, and application readiness as related states that needed deliberate handling.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "review",
      index: "04",
      label: "Review",
      sections: [
        {
          id: "answers-actions",
          index: "04",
          label: "Decision two: separate answers from actions",
          heading:
            "The assistant can interpret intent. The user must be able to inspect the action.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "For a request such as “Swap 100 USDC to ETH,” an ordinary text response is not enough to support a confident decision. The interface needs to show the details of the proposed transaction in a consistent structure.",
                "I defined the swap review around a dedicated card inside the conversation. It brings together the source amount, estimated output, network, wallet context, and the fees or limits supplied by the quote service. Confirm and Cancel sit with those details so the decision remains connected to the information being reviewed.",
              ],
            },
            {
              type: "figure",
              src: "/images/projects/dopamint-swap-review.webp",
              width: 1600,
              height: 900,
              alt: "UI concept of the Dopamint swap review. A chat message asks to swap 100 USDC to ETH. The reply is a review card showing 100 USDC to send, an estimated 0.04 ETH to receive, and the Base network, with Cancel and Confirm swap buttons. A wallet panel shows 250 USDC on Base.",
              label: "UI concept · sample data",
              caption:
                "The AI introduces the action; the user reviews its verified details.",
              annotations: [
                {
                  text: "Source amount and balance establish whether the request can proceed.",
                  x: 50,
                  y: 48.4,
                },
                {
                  text: "Network and current quote details explain the transaction context.",
                  x: 46,
                  y: 68.6,
                },
                {
                  text: "Explicit confirmation separates requesting information from authorizing action.",
                  x: 73.1,
                  y: 72.5,
                },
              ],
            },
            {
              type: "prose",
              paragraphs: ["Each layer has a different responsibility:"],
            },
            {
              type: "table",
              caption: "Which layer answers each question in a swap",
              columns: ["Question", "Source of the answer"],
              rows: [
                [
                  "What does the user want to do?",
                  "AI interpretation of the request",
                ],
                [
                  "Which wallet and network are involved?",
                  "Authenticated application context",
                ],
                ["What funds are available?", "Wallet or backend data"],
                ["What are the current exchange terms?", "Swap quote provider"],
                [
                  "Should the transaction proceed?",
                  "The user's explicit confirmation",
                ],
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "This separation became a design rule: the model's response could introduce an action, but it could not invent the balance, quote, or transaction outcome shown in the interface.",
                "The review also needed to account for change. A displayed quote can become stale, and wallet context can change. The design direction therefore calls for renewed review when the terms are no longer current, rather than allowing an old chat card to imply that its details are still valid.",
                "**The trade-off:** a review step adds friction. Here, that friction gives the user a chance to understand a consequential action.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "recovery",
      index: "05",
      label: "Recovery",
      sections: [
        {
          id: "recovery-path",
          index: "05",
          label: "Decision three: design the recovery path",
          heading: "“Insufficient funds” should explain how to continue.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The most useful design scenario was a swap that could not proceed. If someone requested 100 USDC but had only 20 USDC available, a generic error would explain the failure without resolving their task.",
                "I defined a recovery flow that keeps the original intent in view. The interface should show the required amount, available amount, missing amount, and source network, then offer a specific action such as **Deposit USDC**.",
                "The deposit modal should carry that context forward. It shows the relevant token and network, the wallet address, and a QR code. While the user transfers funds from another device, the interface waits for verified receipt rather than treating a QR scan as success.",
                "Once receipt is confirmed, the modal can show a success state and updated balance. The user can then return to a fresh swap review. Depositing funds does not authorize the swap itself.",
              ],
            },
            {
              type: "recovery-demo",
              demo: {
                label: "Interactive concept · example values",
                controlLabel: "Explore the flow",
                states: [
                  {
                    id: "short",
                    tab: "Not enough USDC",
                    title: "You need 80 more USDC.",
                    tone: "warning",
                    rows: [
                      { label: "Required", value: "100 USDC" },
                      { label: "Available", value: "20 USDC" },
                      { label: "Network", value: "Base" },
                    ],
                    advance: { label: "Deposit USDC", to: "waiting" },
                    caption:
                      "Explain the shortfall and offer a relevant next action.",
                  },
                  {
                    id: "waiting",
                    tab: "Waiting",
                    title: "Waiting for your deposit.",
                    tone: "pending",
                    rows: [
                      { label: "Token", value: "USDC" },
                      { label: "Network", value: "Base" },
                    ],
                    qrPlaceholder: "Demo",
                    caption: "A scan is not proof that funds arrived.",
                  },
                  {
                    id: "received",
                    tab: "Received",
                    title: "80 USDC received.",
                    tone: "success",
                    rows: [{ label: "Updated balance", value: "100 USDC" }],
                    advance: { label: "Review swap", to: "review" },
                    caption: "Show success only after trusted confirmation.",
                  },
                  {
                    id: "review",
                    tab: "Review again",
                    title: "Review your updated quote.",
                    tone: "review",
                    rows: [
                      { label: "You send", value: "100 USDC" },
                      {
                        label: "You receive",
                        value: "Estimated 0.04 ETH (example)",
                      },
                      { label: "Network", value: "Base" },
                    ],
                    demoOnly: {
                      actions: ["Cancel", "Confirm swap"],
                      note: "Demo only. This example never sends a transaction.",
                    },
                    caption: "A fresh review preserves the user's decision.",
                  },
                ],
              },
            },
            {
              type: "table",
              caption: "What each recovery state communicates",
              columns: ["State", "What the interface needs to communicate"],
              rows: [
                [
                  "Insufficient balance",
                  "What is missing and which asset/network to fund",
                ],
                [
                  "Waiting for deposit",
                  "Where to send funds and that receipt is still pending",
                ],
                [
                  "Confirming receipt",
                  "What is known about the incoming transfer",
                ],
                [
                  "Deposit received",
                  "The verified amount, network, and updated balance",
                ],
                [
                  "Ready to review again",
                  "A refreshed quote and a new opportunity to confirm",
                ],
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The 100 / 20 / 80 USDC example is illustrative, not customer transaction data.",
                "**The trade-off:** showing success immediately would feel faster, but it could misrepresent the state of the user's funds. I prioritized an accurate state and a clear next action.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "system",
      index: "06",
      label: "System",
      sections: [
        {
          id: "wallet-context",
          index: "06",
          label: "Bringing wallet context into the conversation",
          heading:
            "Users should not have to reconstruct the meaning of a balance.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "A wallet address alone does not explain what a person can do. The wallet view needed recognizable asset names, amounts, and network context, with pricing information when available.",
                "I worked through a shared wallet presentation that could support the sidebar, wallet details, deposit flow, and swap review. Reusing that context helps keep the experience coherent as someone moves between chat and financial actions.",
                "The design also distinguishes an unavailable balance from a zero balance. If data has not loaded or an integration is not connected, presenting “0” would make an unknown state look like a confirmed fact.",
                "For conversation history, I chose an infrastructure-first approach: start with a default chat icon and support a token or intent icon when the backend provides reliable classification. I did not want temporary keyword matching to make the interface appear more certain than its underlying data.",
              ],
            },
          ],
        },
        {
          id: "implementation",
          index: "07",
          label: "Connecting design to implementation",
          heading:
            "I used implementation questions to make the interaction model more precise.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The work involved more than arranging screens. I needed to understand where identity, wallet data, chat responses, and transaction details originated so that the interface could represent them accurately.",
                "I used Claude Code and Antigravity as part of the implementation workflow, developing prompts and reviewing how the frontend pieces should fit together. The project discussions covered authentication hooks, API boundaries, wallet data, streaming responses, shared components, and design tokens.",
                "The latest chat direction uses the existing FastAPI service through a Next.js server route. That server layer is intended to preserve the response stream while keeping upstream service configuration on the server. The backend remains responsible for AI orchestration and business rules.",
                "For the chat interface, I explored integrating assistant-ui while retaining working AI SDK functionality. The goal was to reuse suitable conversation components while preserving the product-specific swap, deposit, wallet, and transaction-status experiences.",
                "I kept the existing light and dark themes, typography, radii, and shadows as constraints. A useful implementation needed to fit the product's system, including loading, empty, error, and recovery states.",
              ],
            },
            {
              type: "flow",
              label: "Architecture proposal · not a deployed architecture audit",
              caption: "Each value and decision has an explicit owner.",
              steps: [
                { text: "User requests a swap" },
                { text: "AI interprets intent" },
                {
                  text: "Application validates context",
                  inputs: ["Wallet and balance data", "Current provider quote"],
                },
                {
                  text: "Funds sufficient?",
                  branch: {
                    when: "If no",
                    path: [
                      "Deposit recovery",
                      "Receipt verified",
                      "Back to step 03",
                    ],
                  },
                },
                { text: "Review current terms" },
                {
                  text: "User confirms?",
                  branch: { when: "If no", path: ["Return to conversation"] },
                },
                { text: "Authorized execution flow" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "reflection",
      index: "08",
      label: "Reflection",
      sections: [
        {
          id: "outputs",
          index: "08",
          label: "What the work produced",
          heading: "A more explicit model for how the product should behave.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The documented work established a connected set of interaction requirements: how people enter the app, where trusted wallet context comes from, how a proposed swap is reviewed, and how a funding interruption returns to the original task.",
                "It also clarified the boundaries between frontend presentation, backend verification, AI interpretation, and user authorization. Those boundaries gave the implementation discussions a more concrete basis than treating every response as text in a chat window.",
                "The case study presents design decisions and implementation direction. I do not have verified post-launch metrics or usability-study results to report for these flows.",
              ],
            },
            { type: "subheading", text: "How I would evaluate the experience" },
            {
              type: "prose",
              paragraphs: [
                "The next step would be task-based evaluation across first-time entry, swap review, and insufficient-funds recovery. I would look for whether participants could explain the selected network, distinguish an estimate from a confirmed transaction, and understand that a deposit had not automatically executed their swap.",
                "The product measurement plan would track sign-in completion, progression from quote review to confirmation, and return to swap review after a verified deposit. I would pair those events with observed hesitation and misunderstanding, rather than treat completion alone as evidence of informed use.",
              ],
            },
          ],
        },
        {
          id: "lesson",
          index: "09",
          label: "Reflection",
          heading:
            "In an AI product, interaction design includes deciding who is allowed to decide.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The central lesson from Dopamint was that a fluent response and a reliable action are different design problems. A useful interface needs to show what is known, make uncertainty visible, and preserve a deliberate confirmation point when the consequences matter.",
                "This work expanded my product-design practice into data flow, integration boundaries, and state handling. I could make better interface decisions by understanding what the system could verify and where it still depended on an assumption.",
                "My next priority would be testing the recovery flow with people who have different levels of wallet experience, then using those findings to simplify the review and deposit states without removing the information they need.",
              ],
            },
          ],
        },
      ],
    },
  ],

  closingNote: {
    heading: "Selected work beyond this case study",
    body: "The broader product discussions also covered referrals, XP, daily rewards, and a spin-wheel interface. I kept the main story focused on financial actions so the most consequential product decisions remain clear. Those supporting features can be presented separately when their implementation and outcomes are ready to demonstrate.",
  },

  nextProject: {
    slug: "hrms",
    title: "Shenll HRMS",
    line: "Designing complexity out of everyday HR operations",
  },

  metadata: {
    title: "Dopamint: AI product design case study",
    description:
      "How Naveen Kumar approached onboarding, swap review, and deposit recovery for Dopamint, an AI-assisted crypto product.",
  },
}
