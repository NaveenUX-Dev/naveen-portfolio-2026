## Core Behavior
1. Don't assume. Don't hide confusion. Surface tradeoffs.
2. Minimum code that solves the problem. Nothing speculative.
3. Touch only what you must. Clean up only your own mess.
4. Define success criteria. Loop until verified.

## How I Work
- Plan before build — confirm approach in chat before generating files
- I prefer execution-ready output, not outlines or scaffolds
- When iterating, make targeted corrections — don't rewrite the whole thing

## Communication
- Ask before assuming scope on ambiguous requests
- If a task needs more than ~3 file changes, outline the plan first
- Flag when you're uncertain rather than picking silently

## Never
- Never touch .env, secrets, or credentials files without asking
- Never `git push --force` without explicit confirmation
- Never delete files outside the current task's scope

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
