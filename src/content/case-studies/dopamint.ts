import type { StoryCaseStudy } from "@/types/story-case-study"

/**
 * Dopamint — AI Product Design + Design Engineering case study.
 *
 * Positioned around: "I used AI not only to design the product, but also to
 * research, explore interaction patterns, generate and refine UI, implement
 * the frontend, connect real APIs, and validate the product through an
 * AI-assisted development workflow."
 *
 * Uses the same StoryCaseStudy format as HRMS and Megathil.
 */
export const dopamintCaseStudy: StoryCaseStudy = {
  slug: "dopamint",
  eyebrow: "Dopamint",
  title: "Designing & building an AI-native Web3 financial platform",
  subtitle:
    "Using AI to research, design, build, and iterate on a product where conversational intent becomes financial action.",
  intro: [
    "Dopamint is an AI-powered Web3 financial platform designed to make complex crypto interactions easier through conversational AI. Instead of forcing users to navigate multiple Web3 interfaces, Dopamint allows users to interact with financial functionality through natural language.",
    "The challenge wasn't simply creating a chat interface. The real challenge was designing everything that happens after the user asks — the system needs to understand, collect information, retrieve trusted data, present an action, get confirmation, execute, communicate status, and update the user.",
    "I worked across product design and implementation — owning UX architecture, AI interaction design, the design system, frontend development, and API integration. I used AI not just to build the product, but as part of the research, exploration, and design process itself.",
  ],
  question: {
    label: "My design challenge",
    text: "How can we make an AI-led financial journey easy to follow while keeping meaningful decisions with the user — and how can AI itself accelerate the design and development of that experience?",
  },

  facts: [
    {
      label: "Product",
      value: "AI-powered Web3 financial platform — conversational crypto research and actions",
    },
    {
      label: "Intended users",
      value:
        "People researching crypto and acting on their wallets through an AI chat, with different levels of crypto knowledge",
    },
    {
      label: "My role",
      value:
        "AI Product Designer / Design Engineer — product UX, AI interaction design, UX architecture, UI design, design system, frontend development, API integration",
    },
    { label: "Platform", value: "Web" },
    {
      label: "Technology",
      value:
        "Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Vercel AI SDK, OpenRouter, Privy, viem, FastAPI, REST APIs, SSE/Streaming, Claude Code",
    },
    {
      label: "Project stage",
      value:
        "Product in development; this case study presents design decisions, implementation direction, and the AI-assisted workflow behind it",
    },
    {
      label: "Main problem",
      value:
        "A question and a financial transaction look alike in a chat. AI can understand intent but should not invent financial truth. The experience needs to translate conversational intent into safe, understandable workflows where the user retains control over consequential decisions.",
      wide: true,
    },
    {
      label: "Key contributions",
      value:
        "An AI-native interaction model for financial workflows. Intent-driven conversational UX with progressive information collection. Clear trust boundaries between AI interpretation and system-verified data. A design-to-code workflow using Claude Code with engineering discipline. Reusable frontend architecture for AI and Web3 experiences.",
      wide: true,
    },
    {
      label: "Outcomes and limits",
      value:
        "A documented interaction model, working frontend architecture, and AI-assisted development workflow. The product is in development, so there are no verified launch metrics or usability-study results. Impact is demonstrated through the breadth of the system designed and the reasoning behind decisions.",
      wide: true,
    },
  ],

  keyDecisions: {
    heading: "Three decisions that shaped the product",
    items: [
      {
        text: "AI should understand intent — it should not invent financial truth.",
        target: "trust-boundaries",
      },
      {
        text: "Complex actions should become progressive, guided workflows.",
        target: "ai-to-ui",
      },
      {
        text: "AI-assisted development requires human ownership of product decisions and quality.",
        target: "ai-dev-workflow",
      },
    ],
  },

  groups: [
    /* ================================================================
       01 — THE PRODUCT & CHALLENGE
       ================================================================ */
    {
      id: "product",
      index: "01",
      label: "The product",
      sections: [
        {
          id: "what-is-dopamint",
          index: "01",
          label: "What is Dopamint",
          heading:
            "An AI experience where users express intent and the system handles complexity.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Dopamint brings crypto research and financial actions into a conversational interface. A person might ask about a token, inspect their wallet, request a swap, or deposit funds — all from the same chat.",
                "For example, a user might say:",
              ],
            },
            {
              type: "quote",
              text: "\u201cSwap 5 USDC to ETH.\u201d",
            },
            {
              type: "prose",
              paragraphs: [
                "The product should translate that intent into a safe, understandable workflow — without requiring the user to understand wallets, networks, gas fees, slippage, or transaction signing.",
              ],
            },
          ],
        },
        {
          id: "challenge",
          index: "02",
          label: "The challenge",
          heading:
            "Web3 financial products expose users to unnecessary complexity.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "A simple task such as swapping tokens can require users to understand wallets, networks, token balances, token addresses, gas fees, slippage, price impact, minimum received, transaction signing, and blockchain confirmation.",
                "For experienced crypto users, these concepts are familiar. For mainstream users, they create significant cognitive load.",
                "Instead of making the user understand the underlying infrastructure, Dopamint should allow the user to express their **intent** — and the product should handle the rest.",
              ],
            },
            {
              type: "compare",
              caption: "The traditional approach versus the AI-native approach Dopamint chose.",
              sides: [
                {
                  label: "Traditional Web3",
                  steps: [
                    "Open dashboard",
                    "Connect wallet",
                    "Select token",
                    "Select network",
                    "Enter amount",
                    "Review details",
                    "Confirm transaction",
                  ],
                  note: "User must navigate every technical layer.",
                },
                {
                  label: "Dopamint AI-native",
                  steps: [
                    "Express intent",
                    "AI understands request",
                    "Missing information collected",
                    "Interactive UI presented",
                    "Quote retrieved",
                    "User confirms",
                    "Transaction executed",
                  ],
                  note: "Complexity is handled by the system, not the user.",
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       02 — MY ROLE
       ================================================================ */
    {
      id: "role",
      index: "02",
      label: "My role",
      sections: [
        {
          id: "what-i-did",
          index: "03",
          label: "Product + AI + UX + Engineering",
          heading:
            "I worked across product design, AI interaction design, and frontend implementation.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "This project expanded my role beyond traditional product design. I worked at the intersection of UX, product thinking, AI behaviour, data architecture, and frontend engineering.",
              ],
            },
            {
              type: "clusters",
              caption: "Responsibilities across three disciplines.",
              groups: [
                {
                  name: "Product design",
                  items: [
                    "Product requirements analysis",
                    "User flows and information architecture",
                    "Conversational UX",
                    "Interaction design",
                    "Web3/FinTech workflows",
                    "Edge cases and error states",
                    "Responsive design",
                  ],
                },
                {
                  name: "AI product design",
                  items: [
                    "Intent-driven interactions",
                    "AI → UI state mapping",
                    "Structured AI responses",
                    "Streaming response UX",
                    "Missing-information flows",
                    "Human-in-the-loop confirmations",
                    "Tool/action states",
                  ],
                },
                {
                  name: "Design engineering",
                  items: [
                    "Next.js / React / TypeScript",
                    "Tailwind CSS / shadcn/ui / design tokens",
                    "TanStack Query",
                    "Vercel AI SDK / OpenRouter",
                    "Privy / viem (Web3)",
                    "FastAPI / REST / SSE integration",
                    "BFF architecture",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       03 — THE AI-FIRST APPROACH
       ================================================================ */
    {
      id: "ai-approach",
      index: "03",
      label: "AI-first approach",
      sections: [
        {
          id: "ai-first-methodology",
          index: "04",
          label: "My AI-first methodology",
          heading:
            "AI became part of the design process — not a separate tool at the end.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "One of the most interesting aspects of this project was that I didn't use AI only for development. I used AI throughout the product design process — for research, UX exploration, concept generation, critique, and iteration.",
              ],
            },
            {
              type: "flow",
              label: "My AI-assisted design workflow",
              caption:
                "AI accelerated every phase, from research through implementation.",
              steps: [
                { text: "Research with AI", actor: "AI" },
                { text: "Understand the problem" },
                { text: "Define product requirements" },
                { text: "Explore UX with AI", actor: "AI" },
                { text: "Generate concepts" },
                { text: "Critique and refine" },
                { text: "Design in Figma" },
                { text: "Prototype" },
                { text: "Build with AI-assisted code", actor: "AI" },
                { text: "Test with real APIs" },
                {
                  text: "Iterate",
                  branch: {
                    when: "When feedback changes the approach",
                    path: ["Revisit the design or implementation"],
                  },
                },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "I used AI to accelerate research around AI financial assistants, crypto wallets, Web3 onboarding, conversational interfaces, portfolio experiences, swap and deposit flows, reward systems, and AI agent interactions.",
                "Rather than asking \u201cDesign a crypto dashboard,\u201d I broke the problem down into product reasoning questions:",
              ],
            },
            {
              type: "list",
              items: [
                "What information does a user need before confirming a token swap?",
                "What information should be trusted from the blockchain versus generated by the AI?",
                "What should happen if the user provides an incomplete swap request?",
                "How should the interface communicate a pending versus confirmed transaction?",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "This helped me move from **visual inspiration to product reasoning** — and the AI became a thinking partner rather than just a code generator.",
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       04 — AI → UI ARCHITECTURE
       ================================================================ */
    {
      id: "ai-ui",
      index: "04",
      label: "AI → UI",
      sections: [
        {
          id: "ai-to-ui",
          index: "05",
          label: "The core product architecture",
          heading:
            "From conversation to interface: structured data drives interactive UI.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "One of the key design decisions was: **don\u2019t make the user type everything.** If the user says \u201cSwap,\u201d the AI shouldn\u2019t respond with technical terminology. Instead, the experience should progressively collect missing information through interactive UI.",
                "This became the most important pattern in the product — the AI provides structured information that the frontend interprets and renders as the appropriate UI component.",
              ],
            },
            {
              type: "flow",
              label: "AI → UI → Action pipeline",
              caption:
                "The AI doesn't draw the entire experience — it provides structured intent that the frontend transforms.",
              steps: [
                { text: "User expresses intent", actor: "User" },
                { text: "AI interprets request", actor: "AI" },
                { text: "Intent detection and classification" },
                { text: "Structured action generated" },
                {
                  text: "Missing information?",
                  branch: {
                    when: "If yes",
                    path: ["Interactive UI collects details", "Back to step 04"],
                  },
                },
                {
                  text: "Trusted data retrieved",
                  inputs: ["Wallet balance", "Swap quote", "Network data"],
                },
                { text: "UI component rendered" },
                { text: "User confirms action", actor: "User" },
                { text: "System executes" },
                { text: "Transaction state communicated" },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "For example, the AI might return structured intent like:",
              ],
            },
            {
              type: "callout",
              label: "Structured AI response",
              text: "intent: swap · from_token: USDC · to_token: ETH · amount: 5",
            },
            {
              type: "prose",
              paragraphs: [
                "The frontend then transforms that structured intent into a swap review card with real wallet data, a live quote, and explicit confirmation controls.",
                "This created a **progressive disclosure model**: Intent → Missing information → Action → Confirmation. The conversational interface became a product experience rather than a generic chatbot.",
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       05 — KEY EXPERIENCES
       ================================================================ */
    {
      id: "experiences",
      index: "05",
      label: "Key experiences",
      sections: [
        {
          id: "swap-experience",
          index: "06",
          label: "Swap experience",
          heading:
            "A conversational request evolves into a structured financial workflow.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The swap experience demonstrates how AI UX and financial UX intersect. The user expresses an intent, and the system builds a complete review workflow.",
              ],
            },
            {
              type: "states",
              label: "Swap workflow states",
              states: [
                { name: "Intent expressed", exception: "Incomplete request" },
                { name: "AI interprets", exception: "Ambiguous intent" },
                { name: "Information validated", exception: "Missing fields" },
                { name: "Wallet/balance retrieved", exception: "Wallet disconnected" },
                { name: "Quote generated", exception: "Quote unavailable" },
                { name: "Review presented" },
                { name: "User confirms", exception: "User cancels" },
                { name: "Wallet signs", exception: "Rejected signature" },
                { name: "Transaction submitted", exception: "Transaction failed" },
                { name: "Processing" },
              ],
              outcome: "Success — balance updated and confirmation shown.",
              caption:
                "Each state has a defined exception path. The UI must handle every one.",
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
              paragraphs: [
                "The confirmation UI communicates: from token, to token, amount, estimated receive, rate, minimum received, network fee, slippage, price impact, wallet, network, and quote expiry. This is where AI UX and financial UX intersect — the review step adds friction, but that friction gives the user a chance to understand a consequential action.",
              ],
            },
          ],
        },
        {
          id: "deposit-recovery",
          index: "07",
          label: "Deposit & recovery",
          heading:
            "\u201cInsufficient funds\u201d should explain how to continue.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The deposit experience was designed around the user's wallet rather than asking the AI to generate an address. The AI explains the action, the wallet provides the address, and the blockchain provides the transaction truth.",
                "The most useful design scenario was a swap that could not proceed. If someone requested 100 USDC but had only 20 USDC available, a generic error would explain the failure without resolving their task.",
                "I defined a recovery flow that keeps the original intent in view — showing the required amount, available amount, missing amount, and source network, then offering a specific action such as **Deposit USDC**.",
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
                    caption: "A fresh review preserves the user\u2019s decision.",
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
                "**The trade-off:** showing success immediately would feel faster, but it could misrepresent the state of the user\u2019s funds. I prioritized an accurate state and a clear next action.",
              ],
            },
          ],
        },
        {
          id: "wallet-portfolio",
          index: "08",
          label: "Wallet & portfolio",
          heading:
            "Users shouldn\u2019t need to understand blockchain infrastructure to start using the product.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "For wallet functionality, I worked with **Privy** to handle the authentication and wallet layer. The experience included social login, email authentication, embedded wallets, network awareness, and transaction signing — all abstracted behind a familiar sign-in journey.",
                "A key architectural decision was separating **wallet identity** from **portfolio data**. This separation clarified which system was responsible for each piece of information.",
              ],
            },
            {
              type: "swimlane",
              caption: "Which layer is responsible for each piece of wallet/portfolio data.",
              lanes: ["Privy", "Blockchain data", "Dopamint data layer", "UI / AI"],
              steps: [
                { lane: "Privy", text: "Authentication" },
                { lane: "Privy", text: "Wallet creation / connection" },
                { lane: "Privy", text: "Wallet address" },
                { lane: "Privy", text: "Transaction signing" },
                { lane: "Blockchain data", text: "Token balances" },
                { lane: "Blockchain data", text: "Transaction history" },
                { lane: "Blockchain data", text: "Network state" },
                { lane: "Dopamint data layer", text: "Portfolio aggregation" },
                { lane: "Dopamint data layer", text: "Price data" },
                { lane: "UI / AI", text: "Conversational interface" },
                { lane: "UI / AI", text: "Portfolio display" },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The wallet view needed recognizable asset names, amounts, and network context — with pricing information when available. I also distinguished an unavailable balance from a zero balance. If data has not loaded, presenting \u201c0\u201d would make an unknown state look like a confirmed fact.",
              ],
            },
          ],
        },
        {
          id: "spin-earn",
          index: "09",
          label: "Spin & earn",
          heading:
            "The interface should visualize system truth, not create it.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Another product area involved rewards and gamification. The Spin & Earn experience required understanding the backend contract rather than simply designing a visual wheel.",
                "The backend determines: available spins, rewards, reward weights, winning reward, cooldown, new balance, and winning slice index. The frontend visualizes the result — it doesn\u2019t determine it.",
              ],
            },
            {
              type: "flow",
              label: "Spin & Earn data flow",
              caption:
                "The same trust principle as swap: the interface reflects system-verified truth.",
              steps: [
                { text: "GET spin state", actor: "System" },
                { text: "User clicks Spin", actor: "User" },
                { text: "POST spin request" },
                { text: "Backend selects reward", actor: "System" },
                { text: "Reward + slice_index returned" },
                { text: "Wheel animation plays" },
                { text: "Exact winning slice lands" },
                { text: "Reward celebration" },
                { text: "Balance update" },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "This reinforced the same principle from the swap and deposit experiences: **the interface should visualize system truth, not create it.** The animation is choreography around a verified outcome, not a random visual that determines the reward.",
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       06 — DESIGNING TRUST
       ================================================================ */
    {
      id: "trust",
      index: "06",
      label: "Designing trust",
      sections: [
        {
          id: "trust-boundaries",
          index: "10",
          label: "AI vs trusted data",
          heading:
            "AI should understand intent. It should not invent financial truth.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "One of my biggest learnings from this project was the importance of **trust boundaries in AI products.** I categorized information into two groups — and this distinction directly influenced the UX.",
              ],
            },
            {
              type: "table",
              caption: "The trust boundary between AI-generated and system-verified information",
              columns: ["AI-generated / probabilistic", "Trusted / deterministic"],
              rows: [
                ["Intent interpretation", "Wallet address"],
                ["Natural language responses", "Token balance"],
                ["Suggested actions", "Token price"],
                ["Explanations", "Swap quote"],
                ["Conversational context", "Network / gas fee"],
                ["User intent classification", "Transaction hash"],
                ["Formatting and display logic", "Transaction status"],
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "This became a design rule: the model\u2019s response could introduce an action, but it could not invent the balance, quote, or transaction outcome shown in the interface.",
              ],
            },
            {
              type: "table",
              caption: "Which layer answers each question in the product",
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
                  "The user\u2019s explicit confirmation",
                ],
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The review also needed to account for change. A displayed quote can become stale, and wallet context can change. The design therefore calls for renewed review when the terms are no longer current, rather than allowing an old chat card to imply that its details are still valid.",
                "**The trade-off:** a review step adds friction. Here, that friction gives the user a chance to understand a consequential action. In an AI product, interaction design includes deciding who is allowed to decide.",
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       07 — FROM DESIGN → CODE
       ================================================================ */
    {
      id: "design-to-code",
      index: "07",
      label: "Design → code",
      sections: [
        {
          id: "ai-dev-workflow",
          index: "11",
          label: "AI development workflow",
          heading:
            "Use AI to reduce implementation friction while keeping human ownership of product decisions.",
          variant: "decision",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "One of the biggest changes in my workflow was using **Claude Code** as part of development. I didn't use it to build the entire application — I used it as an engineering assistant inside the existing codebase.",
                "My prompts became much more structured. Instead of \"Create a wallet page,\" I would provide context, objective, architecture constraints, behaviour expectations, and acceptance criteria.",
              ],
            },
            {
              type: "flow",
              label: "AI-assisted development loop",
              caption:
                "AI accelerated implementation. I remained responsible for product decisions and quality.",
              steps: [
                { text: "Understand architecture" },
                { text: "Give Claude context and constraints" },
                { text: "Define objective and acceptance criteria" },
                { text: "Implement feature", actor: "AI" },
                { text: "Inspect generated code" },
                { text: "Run application" },
                { text: "Test behaviour" },
                {
                  text: "Find issues?",
                  branch: {
                    when: "If yes",
                    path: ["Prompt refinement", "Iterate"],
                  },
                },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "This approach — what I call \"vibe coding with engineering discipline\" — means using AI to reduce implementation friction while keeping human ownership of product decisions, architecture, security boundaries, API contracts, edge cases, and quality.",
              ],
            },
            {
              type: "clusters",
              caption: "What the AI handles versus what I own.",
              groups: [
                {
                  name: "AI accelerates",
                  items: [
                    "Boilerplate and scaffolding",
                    "Component implementation",
                    "API integration code",
                    "State management patterns",
                    "Style and layout implementation",
                  ],
                },
                {
                  name: "I own",
                  items: [
                    "Product decisions",
                    "UX decisions",
                    "Architecture",
                    "Security boundaries",
                    "API contracts",
                    "Edge cases and error handling",
                    "Final implementation quality",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       08 — TECHNICAL ARCHITECTURE
       ================================================================ */
    {
      id: "architecture",
      index: "08",
      label: "Architecture",
      sections: [
        {
          id: "streaming-ai",
          index: "12",
          label: "AI & streaming architecture",
          heading:
            "The AI response is not a single static block — it\u2019s a stream of events.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "For the AI layer, I worked with **OpenRouter** to access LLM models through a unified API layer, and **Vercel AI SDK** for the streaming interaction architecture. The streaming experience allows responses to appear progressively rather than presenting a large response after a long loading state.",
                "The interface handles distinct events: start, conversation, structured data, text-start, text-delta, text-end, interrupt/action, and finish. This allows the UI to distinguish between AI thinking, structured information, user input requirements, action states, and completed responses.",
              ],
            },
            {
              type: "strata",
              caption: "What the visible interface sits on top of.",
              surface: "Dopamint conversational UI",
              layers: [
                "assistant-ui (conversational components)",
                "Vercel AI SDK (streaming and structured AI)",
                "Next.js /api (BFF server layer)",
                "FastAPI (AI orchestration and business rules)",
                "OpenRouter (unified LLM access)",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "The important design principle was keeping the AI transport separate from the actual financial action. The AI doesn\u2019t execute the financial transaction simply because it understood the intent.",
                "I also explored **assistant-ui** to create a more structured conversational experience supporting streaming, message states, structured responses, interactive UI, action components, tool/data states, regeneration, and stop/cancel behaviour. The goal was to make the chat feel like a **product interface**, rather than a generic AI chatbot.",
              ],
            },
          ],
        },
        {
          id: "bff-architecture",
          index: "13",
          label: "BFF & design system",
          heading:
            "Reusable product primitives — not independent screen designs.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "A key technical/product decision was protecting internal backend architecture from unnecessary browser exposure through a Backend-for-Frontend (BFF) pattern.",
              ],
            },
            {
              type: "flow",
              label: "BFF request flow",
              caption:
                "The Next.js server layer creates a clean application boundary.",
              steps: [
                { text: "Browser request", actor: "User" },
                { text: "Next.js /api route" },
                { text: "FastAPI backend" },
                { text: "AI / Backend services" },
                { text: "Streaming response" },
                { text: "Dopamint UI", actor: "User" },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "For the design system, instead of designing every screen independently, I worked toward reusable product primitives: design tokens → UI primitives → shared components → feature components → product experiences.",
                "This allowed the same visual language to be reused across chat, wallet, portfolio, swap, deposit, rewards, referral, dashboard, and transaction states. The goal was not only visual consistency — it was **implementation consistency.**",
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       09 — CHALLENGES
       ================================================================ */
    {
      id: "challenges",
      index: "09",
      label: "Challenges",
      sections: [
        {
          id: "design-challenges",
          index: "14",
          label: "Challenges faced",
          heading:
            "Financial products can\u2019t only be designed around the happy path.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "This project surfaced challenges that live at the intersection of AI, Web3, and financial UX.",
              ],
            },
            {
              type: "table",
              caption: "Four key challenges and how I addressed them",
              columns: ["Challenge", "Solution"],
              rows: [
                [
                  "Designing around incomplete AI responses",
                  "Created structured states for missing information instead of relying only on conversational text",
                ],
                [
                  "AI vs trusted data boundaries",
                  "Defined explicit boundaries between AI-generated intent and trusted wallet/backend data",
                ],
                [
                  "Web3 complexity for mainstream users",
                  "Hide unnecessary blockchain complexity and expose only the information needed for each decision",
                ],
                [
                  "Designing while building",
                  "Used AI-assisted development to rapidly test design ideas in the actual product rather than relying on static prototypes",
                ],
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "I also had to design for a wide range of system states beyond the happy path:",
              ],
            },
            {
              type: "list",
              items: [
                "Loading and empty states",
                "Missing information from user",
                "Invalid input and insufficient balance",
                "Quote expired and stale data",
                "Wallet disconnected and wrong network",
                "Transaction pending, failed, and rejected",
                "API error and AI response failure",
                "Network timeout and recovery",
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "This changed the way I approached product design. Instead of asking \"What should this screen look like?\" I increasingly asked: **\"What states can this system be in?\"**",
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       10 — REFLECTION
       ================================================================ */
    {
      id: "reflection",
      index: "10",
      label: "Reflection",
      sections: [
        {
          id: "outcomes",
          index: "15",
          label: "What the work produced",
          heading:
            "The strongest evidence is the breadth of the system designed and the reasoning behind the decisions.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "Instead of claiming artificial metrics that weren\u2019t measured, I present the outcome honestly. The product is in development, so there are no verified launch metrics or usability-study results to report.",
              ],
            },
            { type: "subheading", text: "Product impact" },
            {
              type: "list",
              items: [
                "Created an AI-native interaction model for financial workflows",
                "Reduced complex Web3 actions into guided conversational experiences",
                "Connected AI responses with structured product UI",
                "Established clear AI vs trusted-data boundaries",
                "Built reusable frontend architecture for AI and Web3 workflows",
                "Integrated real wallet and backend systems rather than relying on static prototypes",
              ],
            },
            { type: "subheading", text: "Personal impact" },
            {
              type: "prose",
              paragraphs: [
                "The project expanded my role from **UI/UX Designer** to **Product Designer → AI Product Designer → Design Engineer.** I became more involved in product logic, APIs, architecture, AI behaviour, frontend implementation, and system states.",
              ],
            },
            { type: "subheading", text: "How I would evaluate the experience" },
            {
              type: "prose",
              paragraphs: [
                "The next step would be task-based evaluation across first-time entry, swap review, and insufficient-funds recovery. I would look for whether participants could explain the selected network, distinguish an estimate from a confirmed transaction, and understand that a deposit had not automatically executed their swap.",
                "The product measurement plan would track sign-in completion, progression from quote review to confirmation, and return to swap review after a verified deposit — paired with observed hesitation and misunderstanding, rather than treating completion alone as evidence of informed use.",
              ],
            },
          ],
        },
        {
          id: "learnings",
          index: "16",
          label: "Learnings & reflection",
          heading:
            "AI Product Design sits between multiple disciplines.",
          blocks: [
            {
              type: "prose",
              paragraphs: [
                "The biggest lesson wasn\u2019t a specific technology. It was that **AI Product Design requires thinking across UX, product, AI, data, engineering, security, and systems simultaneously.**",
              ],
            },
            {
              type: "clusters",
              caption: "The questions I learned to ask at each layer.",
              groups: [
                {
                  name: "UX",
                  items: ["What does the user need?", "What state is the system in?"],
                },
                {
                  name: "Product",
                  items: ["Why should the user do it?", "What\u2019s the workflow?"],
                },
                {
                  name: "AI",
                  items: ["What can the model understand?", "What should it not decide?"],
                },
                {
                  name: "Data",
                  items: ["Where does the truth come from?", "What\u2019s stale or missing?"],
                },
                {
                  name: "Engineering",
                  items: ["How does the experience actually work?", "What are the system boundaries?"],
                },
                {
                  name: "Security",
                  items: ["What should never be trusted from the client or AI?", "Where are the attack surfaces?"],
                },
              ],
            },
            {
              type: "prose",
              paragraphs: [
                "Before this project, I often thought of product design as: Research → Wireframes → UI → Prototype → Handoff. This project changed that model.",
              ],
            },
            {
              type: "callout",
              label: "My AI Product Design framework",
              text: "User Intent → AI Understands → Structured Data → Trusted System → Product UI → User Decision → Action → System State → Outcome",
            },
            {
              type: "prose",
              paragraphs: [
                "Working on Dopamint changed how I think about product design. I started with questions like \"How should this screen look?\" and ended up asking: What does the user intend? What does the AI understand? Where does the data come from? What should the system do? What should the user confirm? What happens if something fails? How does the interface communicate that state?",
                "That shift — from **designing screens to designing systems** — has been one of the most valuable parts of this project.",
              ],
            },
            {
              type: "callout",
              text: "Today, the direction I\u2019m building toward is AI-first Product Design — designing products where AI, UX, product thinking, and engineering work together.",
            },
          ],
        },
      ],
    },
  ],

  closingNote: {
    heading: "Selected work beyond this case study",
    body: "The broader product discussions also covered referrals, XP, daily rewards, and additional gamification features. I kept the main story focused on AI product design and financial actions so the most consequential product decisions remain clear. Those supporting features can be presented separately when their implementation and outcomes are ready to demonstrate.",
  },

  nextProject: {
    slug: "hrms",
    title: "Shenll HRMS",
    line: "Designing complexity out of everyday HR operations",
  },

  metadata: {
    title: "Dopamint: AI Product Design & Design Engineering case study",
    description:
      "How Naveen Kumar used AI to research, design, build, and iterate on Dopamint — an AI-powered Web3 financial platform. A case study covering AI interaction design, trust boundaries, conversational UX, and AI-assisted development.",
  },
}
