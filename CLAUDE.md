# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**depute** is an open-source (MIT) React component library for Agentic Experience (AX) design — purpose-built UI primitives for AI agent supervision and human oversight.

**Distribution:** CLI copy-paste model (like shadcn/ui). `npx ax-depute@latest add <component>` copies source files into the user's project. No npm black box.

**Brand:** `depute` (lowercase in prose). CLI package: `ax-depute`. GitHub: `Iambizi/depute`.

**Current State:**
- v0.1.0 released (7 core primitives) ✅
- v0.2.0 released (11 orchestration primitives) ✅
- v0.3.0 released (7 compliance primitives) ✅
- v0.4.0 released (Taxonomy + Async Handoff) ✅
- v0.5.0 released (visual system, dark mode, status on the label) ✅
- v0.5.1 is the repo version (lexicon in `init`, orchestrator nodes are rows, unused `src/types/ax-common.ts` removed). Tag `v0.5.1` and npm publish follow once this commit is on `main`. Until then, `npx ax-depute@latest` installs `0.5.0`.
- Storybook redeployed to GitHub Pages on October 20, 2026 ✅
- Docs site deployed to Vercel (`apps/www`, Next.js + Fumadocs) ✅
- AI Skill layer written (Claude + skills.sh) ✅
- Audit Mode added to skill ✅

## What is Agentic Experience (AX)?

AX is the design discipline for interfaces where AI agents act on behalf of users. Key challenges:

- **Probabilistic outcomes**: Agent actions have confidence scores, not binary success/failure
- **Autonomous multi-step workflows**: Agents execute complex tasks without constant human input
- **Transparency requirements**: Users need to see what agents are doing and why
- **Human-in-the-loop patterns**: Critical decisions require human approval
- **Asynchronous operations**: Agent tasks may take seconds or minutes to complete
- **Safe delegation**: Scoped, bounded, revocable control over what agents can do

## Shipped Components (27 total)

### v0 — Core Primitives (Single Agent)

| Component | AX Problem Solved |
|-----------|-------------------|
| `Plan Card` | Show agent's proposed plan before execution |
| `Approval Gate` | Gate high-risk actions with human approval (supports scoped/staged grants) |
| `Confidence Meter` | Surface agent confidence (meter + badge displays) |
| `Run Controls` | Pause, resume, stop, retry a running agent |
| `Tool Trace` | Live timeline of every tool call with I/O |
| `Artifact Card` | Render final output with export and provenance |
| `Automation Bias Alert` | Counteract "rubber-stamping" with deliberate friction |

### v1 — Multi-Agent Orchestration

| Component | AX Problem Solved |
|-----------|-------------------|
| `Orchestrator View` | Recursive tree of agent hierarchy |
| `Agent Roster` | Dense status dashboard for 20+ agents |
| `Subagent Card` | Single-agent card with task/token context |
| `Branch Controls` | Scoped pause/resume/quarantine per branch |
| `Swarm Monitor` | KPI grid: throughput, errors, token spend |
| `Swarm Inbox` | Attention-triage inbox for agent messages |
| `Task Queue` | Ordered task backlog with priority |
| `Delegation Gate` | Gate for agent spawning/delegation |
| `Handoff Protocol` | Structured handoff viewer |
| `Shared Context Ledger` | Read-only shared memory viewer |
| `Escalation Router` | Error escalation with 3-way resolution |

### v2 — Strict Compliance & Forensics

| Component | AX Problem Solved |
|-----------|-------------------|
| `Policy Banner` | Sandbox vs production environment signaling |
| `Budget Meter` | Session budget and burn rate guardrails |
| `State Diff` | Field-level mutation visibility |
| `Capability Matrix`| Permission inspector / agent handshake |
| `Rollback Timeline`| Undo-tree with cascade awareness |
| `Transaction Receipt`| Provenance receipt and audit. Displays a backend-supplied hash. |
| `Binding Approval`| High-stakes intent gate. Displays a backend-supplied signature. |
| `Decision Record` | Immutable visual receipt of a human approval decision |
| `Session Overview` | Semantic rollup of a high-velocity agent session to prevent execution amnesia |

## Tech Stack

- React 18+ with TypeScript (strict, no `any` types)
- CSS Modules (NOT Tailwind) — components use `--ax-*` custom properties
- Storybook for component documentation and live examples
- Vitest + React Testing Library (373 tests, 27 test files)
- Vite for library build (ES + CJS output)
- Next.js + Fumadocs for docs site (`apps/www`)

## Project Structure

```
depute/
├── src/
│   ├── components/          # All 27 React components
│   │   └── [ComponentName]/
│   │       ├── [ComponentName].tsx
│   │       ├── [ComponentName].types.ts
│   │       ├── [ComponentName].module.css
│   │       ├── [ComponentName].test.tsx
│   │       └── index.ts
│   ├── types/               # Shared TypeScript types
│   │   └── common.ts
│   ├── utils/               # Utilities and mock data generators
│   │   ├── mockData.ts
│   │   └── a11y.tsx
│   ├── styles/              # Design tokens + animations
│   │   ├── tokens.css
│   │   ├── animations.css
│   │   └── index.css
│   └── index.ts
├── stories/                 # Storybook stories (27 files)
├── packages/cli/            # ax-depute CLI (npm package)
├── registry/                # registry.json (component manifest)
├── apps/www/                # Next.js + Fumadocs docs site
├── skills/depute/           # Cross-agent skill (skills.sh). No separate .claude/skills copy is in this repo.
├── examples/                # Prototype + production setups
├── docs/                    # Internal docs (gitignored)
│   ├── internal/            # Session notes, strategy, research
│   └── orchestration/       # PRD docs + progress.json
└── dist/                    # Build output
```

## Distribution Architecture

- **CLI:** `npx ax-depute@latest add <component>` — installs the sources for the CLI's own version tag (not `main`), checks them against `packages/cli/src/checksums.json`, and copies them into the user's project
- **Registry:** `registry/registry.json` — manifest of all 27 components with file lists and metadata
- **Shared Files:** The CLI copies `src/types/common.ts` into the user's project as `src/types/ax-common.ts`, copies `packages/core/src/presented.ts` as `src/types/ax-core.ts`, copies `packages/core/src/receipt.ts` as `src/utils/ax-receipt.ts`, copies `packages/core/src/triggers.ts` as `src/utils/ax-triggers.ts`, copies `src/utils/receiptSign.ts` as `src/utils/ax-receipt-sign.ts`, copies `src/utils/a11y.tsx` as `src/utils/ax-a11y.tsx`, and installs `src/styles/index.css` as `depute.css` once beside the component directory. `add mock-data` copies the generators separately.
- **Config:** Repo and version pin live in `packages/cli/src/config.js`

## AI Skill Layer

The skill that teaches AI agents how to use depute lives in one place:
- `skills/depute/SKILL.md` — cross-agent skill (skills.sh / Vercel standard)
- `skills/depute/references/lexicon.md` — canonical term definitions

It includes:
- Component selection decision tree (v0 vs v1)
- Install commands for the component set
- Common composition patterns
- **Audit Mode** — 12 heuristics (H1–H12) for scanning codebases for missing oversight. Definitions are in `references/lexicon.md`.

## Design Principles

- **Transparency First**: Always show what the agent is doing and why
- **Safe Delegation**: Scoped, bounded, revocable permissions — not binary approve/reject
- **Human oversight, not human bottleneck**: Surface the right info at the right moment
- **You own the code**: CLI copy-paste; source lives in user's repo
- **Agent-agnostic**: Works with any AI backend (OpenAI, Anthropic, LangChain, etc.)
- **Accessible by default**: built with WCAG 2.1 AA in mind (keyboard nav, ARIA roles). Automated axe checks are not in CI yet.

## Code Quality Requirements

- **Fully typed TypeScript** — No `any` types
- **Accessible components** — ARIA labels, keyboard navigation, screen reader support
- **Responsive design** — Works across device sizes
- **Components work with mock data AND live data**
- **CSS Modules only** — Do NOT use Tailwind in components

## Common Development Tasks

```bash
npm install          # Install dependencies
npm run storybook    # Run Storybook at localhost:6006
npm test             # Run 373 tests
npm run build        # Production build (Vite)
npm run type-check   # tsc --noEmit (uses tsconfig.build.json)
```

### Docs site (apps/www)
```bash
cd apps/www && npm run dev    # Local dev server
cd apps/www && npm run build  # Production build (23 static pages)
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `RELEASES.md` | Release notes, starting at v0.4.0 |
| `packages/cli/src/config.js` | Repo location and the version tag the CLI installs |
| `packages/cli/src/checksums.json` | sha256 manifest checked before a file is written |
| `registry/registry.json` | Component manifest the CLI installs from |
| `skills/depute/SKILL.md` | Agent skill for composing depute |

## TypeScript Configuration

- `tsconfig.json` — Editor/language server config. All files, `vitest/globals` types.
- `tsconfig.build.json` — Build config. Excludes tests/stories, emits declarations.
- `tsconfig.test.json` — Test config. Includes test files for `tsc --noEmit` verification.

## Important Context

- CSS Modules preferred over Tailwind to avoid external dependencies
- Components should never be tied to specific AI backends
- Approvals should be scoped, bounded, and revocable — not binary yes/no (Stripe SPT pattern)
- A new approval control ships with its rationale in the same change. The pattern is the requirement. A report is a dated illustration. An unconfirmed report is not a requirement. Update `apps/www/content/docs/approval-record.mdx`, the component page, and `skills/depute/references/design-rationale.md` together. The component page states the pattern and links to the approval record. It does not retell a headline as the reason.
- `docs/` is gitignored — internal docs are local-only, not tracked in git
- `RELEASES.md` is at repo root (tracked in git)
- If GitHub username changes: edit `REPO` in `packages/cli/src/config.js` only
