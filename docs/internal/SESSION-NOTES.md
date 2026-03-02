# Current Status & Next Steps

**Last Updated:** March 2, 2026
**Updated By:** AI Assistant
**Current Branch:** `main`
**Overall Progress:** Skill layer ✅ · Audit Mode ✅ · Docs site deployed + polished ✅ · Storybook embeds ✅ · Search (Orama) ✅ · OG images ✅ · Brand capitalized (Depute) ✅ · **Next: PoC app (Agent Wallet Console) → Audit export formats**

**IMPORTANT:** See `docs/internal/DEFERRED-LOG.md` for the latest strategic context and deferred triggers.

---

# Depute - Session Notes

*Latest sessions appear at the top*

---

## Session 23 - March 2, 2026

### Overview
Docs site polish session. Added three features (Storybook iframe embeds, Orama search, dynamic OG images), capitalized brand name to "Depute", cleaned up sidebar navigation, and fixed Vercel deployment.

### Accomplishments

#### 75. Storybook Iframe Embeds
- ✅ Created reusable `<StorybookEmbed>` component (`src/components/storybook-embed.tsx`)
- ✅ Uses `/iframe.html` endpoint for clean render (no Storybook toolbar/sidebar)
- ✅ Added to all 17 component `.mdx` pages
- ✅ Fixed story IDs with correct category prefixes (`ax-components-` / `ax-components-v1-`)
- ✅ Fixed Callout text URLs to match
- ✅ Switched ConfidenceMeter to `AllFeatures` variant for richer visual

#### 76. Search (Orama)
- ✅ Added `/api/search/route.ts` using `createFromSource` from `fumadocs-core`
- ✅ ⌘K search dialog works automatically via Fumadocs UI

#### 77. Dynamic OG Images
- ✅ Added `/api/og/route.tsx` — edge runtime, `ImageResponse`
- ✅ Dark gradient background with Depute branding + component title + description
- ✅ Wired `openGraph` + `twitter` metadata into `generateMetadata` in `page.tsx`
- ✅ Added `metadataBase` to root layout

#### 78. Branding & Sidebar
- ✅ Capitalized brand: `depute` → `Depute` in all display text (metadata, hero, OG, README, docs prose)
- ✅ Sidebar sections renamed: `v0: Single Agent` → `Single Agent`, `v1: Multi-Agent` → `Multi-Agent`
- ✅ Sidebar separator CSS: bold uppercase headers with divider lines (`globals.css`)

#### 79. Vercel Deployment Fix
- ✅ Diagnosed failed Vercel deploy: Root Directory was blank (defaulting to repo root)
- ✅ Fixed via dashboard: Build and Deployment → Root Directory → `apps/www`

### Key Decisions
1. **Depute (capital D) for branding only.** npm package (`ax-depute`), repo URL, CLI commands, imports all stay lowercase. Same pattern as Next.js/Tailwind.
2. **Drop v0/v1 labels from sidebar.** "Single Agent" and "Multi-Agent" are the meaningful user-facing categories. Internal versioning shouldn't leak into docs.
3. **`/iframe.html` for embeds.** Gives just the rendered component without Storybook chrome — much cleaner inline.

---

## Session 22 - March 1, 2026

### Overview
Rewrote the root `README.md` with the **"Delegation UI"** paradigm framing. Replaced the generic tagline and problem statement with the 3-era arc (Command Line → Navigation → Delegation) and repositioned depute as "the React component library for Delegation UI." Added docs site link alongside Storybook.

### Accomplishments

#### 74. README Rewrite — "Delegation UI" Framing
- ✅ New tagline: *"The React component library for Delegation UI"*
- ✅ Hero section introduces the 3-paradigm arc: Command Line → Navigation → Delegation
- ✅ "The Problem" → renamed to "Why This Exists" — reframed around autonomy/oversight tradeoff
- ✅ Added docs site link: `https://www-one-rho-67.vercel.app`
- ✅ Component tables, quick start, CLI, and design principles left untouched (already solid)

### Key Decisions
1. **"Delegation UI" as the brand concept.** This is the strongest framing we've produced — it positions depute as a category-defining library, not just another component kit.
2. **README ≠ essay.** The 3-paradigm arc is compressed to ~4 lines. The full essay lives on LinkedIn/blog.

---

## Session 21 - March 1, 2026

### Overview
QA review of Sessions 19–20 and full audit of the `docs/` folder. Found 5 stale docs and 2 minor issues. Updated all 7 files.

### Accomplishments

#### 70. QA Review of Today's Sessions
- ✅ Reviewed Session 19 (Vertical Strategy) and Session 20 (Audit Mode) — both verified clean
- ✅ Confirmed both `SKILL.md` copies (`skills/depute/` and `.claude/skills/depute/`) are byte-for-byte identical (10,939 bytes, 232 lines)
- ✅ Verified all 8 audit heuristics map correctly to depute components

#### 71. Internal Docs Audit + Update
- ✅ **`CLAUDE.md`** — Full rewrite. Was frozen at pre-build state (48-primitive catalog, speculative 3-layer architecture). Now reflects shipped product: 17 components, CLI on npm, docs site, skills, actual directory structure.
- ✅ **`CLAUDE.md` moved to repo root** — was buried at `docs/internal/CLAUDE.md` where Claude Code couldn't auto-load it. Copied to root (tracked in git), deleted from `docs/internal/`.
- ✅ **`docs/internal/README.md`** — Status updated from "🟡 Research phase" to accurate shipped state. Added `DEFERRED-LOG.md` to file table.
- ✅ **`docs/internal/VC-ORCHESTRATION.md`** — Master Roadmap updated: all phases marked ✅ DONE, added Distribution + Intelligence phases, current phase shows docs polish + PoC app.
- ✅ **`docs/orchestration/progress.json`** — CLI step changed from `not_started` → `completed`. Added 5 new milestone steps: rebranding, Storybook deploy, skill layer, docs site, audit mode. Updated `lastUpdated` to `2026-03-01`.
- ✅ **`docs/orchestration/01-project-specification.md`** — Catalog status updated with release dates. v1 section changed from "Upcoming" → "Shipped (Feb 22, 2026)".
- ✅ **`docs/internal/DEFERRED-LOG.md`** — Flagged 2 silently-hit triggers: A2UI (README trigger hit Feb 24), Meta Strategy (public launch trigger hit Feb 26).
- ✅ **`docs/distribution-vision.md`** — Fixed incorrect "Tailwind/CSS" reference → "CSS Modules with `--ax-*` custom properties".

#### 72. Public Docs Site Audit (apps/www)
- ✅ Verified all 17 component `.mdx` files present and accurate
- ✅ `index.mdx`, `installation.mdx`, `meta.json` (sidebar nav) — all current
- ✅ Landing page (`page.tsx`) — correct hero, feature grid, GitHub link
- ✅ Local `npm run build` — 23 static pages, zero errors

#### 73. Vercel Deployment Fix
- ✅ Diagnosed failed Vercel deployment: `No Next.js version detected`
- ✅ **Root cause:** Vercel project `www` had Root Directory setting blank (defaulting to repo root, which has Vite not Next.js). The `www-one-rho-67` project was configured correctly.
- ✅ Fixed via Vercel dashboard: Build and Deployment → Root Directory → `apps/www`
- ✅ Triggered redeploy

### Key Decisions
1. **`CLAUDE.md` at repo root.** Anthropic's convention is root-level for auto-loading. `docs/` is gitignored, so the old location was invisible to git AND Claude Code.
2. **Deferred triggers need periodic review.** Two triggers had been silently hit without anyone noticing. Added ⚠️ flags to prompt review.

### Next Steps
- [ ] Add Storybook `<Callout>` link to `plan-card.mdx` and `approval-gate.mdx` (missing from initial port)
- [ ] **Storybook embed** — Add `<iframe>` or screenshot for each component story across all 17 docs pages
- [ ] **Audit export formats** — `FORMAT=markdown` + `FORMAT=comment` (higher leverage than PoC — the report gets depute into *other people's* projects)
- [ ] **Search** — Enable Fumadocs built-in search (Orama) via `DocsLayout` `search` prop
- [ ] **OG image / metadata** — Add `opengraph-image.tsx` under `src/app/` for social sharing
- [ ] **PoC app** — Agent Wallet Console (Fintech vertical) to prove depute in a regulated, irreversible-action environment

## Session 20 - March 1, 2026

### Overview
Added an instruction-based **Audit Mode** to the `depute` skill (`skills/depute/SKILL.md`). This teaches AI agents to systematically scan a codebase for missing AX oversight patterns and produce a structured report with install commands for each gap. Creates a natural discovery → install funnel: the skill sells the library.

### Accomplishments

#### 69. Audit Mode — Instruction-Based Codebase Review
- ✅ Added new section to `skills/depute/SKILL.md`: **"Audit Mode — Codebase Oversight Review"** (lines 144–195)
- ✅ Defined **8 AX heuristics** (H1–H8), each mapping a specific oversight gap to its corresponding depute component:
  - H1: Irreversible actions ungated → `ApprovalGate` (🔴 Critical)
  - H2: Confidence not surfaced → `ConfidenceMeter` (🟡 Warning)
  - H3: No pause/stop controls → `RunControls` (🔴 Critical)
  - H4: Tool calls invisible → `ToolTrace` (🟡 Warning)
  - H5: Plan not disclosed → `PlanCard` (🟡 Warning)
  - H6: Output without provenance → `ArtifactCard` (🟢 Info)
  - H7: Multi-agent coordination opaque → `OrchestratorView` + `AgentRoster` (🔴 Critical)
  - H8: Agent spawning ungated → `DelegationGate` (🟡 Warning)
- ✅ Defined structured **audit report template** (severity, file, line, gap, recommendation, install command)
- ✅ Report includes **"Quick Fix"** section listing all unique `npx ax-depute add` commands
- ✅ Updated frontmatter trigger keywords: added `"ax audit"`, `"oversight review"`, `"audit agent code"`, `"what AX components am I missing"`

### Key Decisions
1. **Instruction-based first, script later.** The audit is encoded as agent instructions in SKILL.md — no runtime script, no dependencies, works in any agent context. If heuristics get sophisticated enough to justify deterministic static analysis, graduate to `scripts/ax-audit.js` later.
2. **Audit as funnel.** The audit report surfaces `npx ax-depute add` commands inline with each finding. Someone installs the skill, runs an audit, and gets a shopping list of components to install. The skill sells the library.
3. **Pattern 5 from Anthropic's guide.** This is executable domain intelligence baked into a skill — exactly the kind of high-value skill behavior the Anthropic guide describes.

### Graduation Path
- **Now:** Instruction-based audit (SKILL.md section). Zero setup, works in any agent.
- **Later (if demand):** `scripts/ax-audit.js` — static analysis via AST parsing for larger codebases. More deterministic, but adds complexity and a runtime dependency. The `scripts/` directory is already supported by the skill spec.

---

## Session 19 - March 1, 2026

### Overview
Integrated two major strategic insights into the research documentation: (1) the **Depute Vertical Strategy** — targeting regulated industries where irreversible agent actions make oversight a compliance necessity, and (2) the **Audit Mode as Distribution Wedge** — reframing depute as 3 products (component library + skill layer + audit/conversion engine) with exportable reports as the viral adoption mechanism.

### Accomplishments
- ✅ Created `docs/internal/research/strategy/VERTICAL-STRATEGY.md` — irreversibility as the wedge in regulated verticals (Fintech, Healthcare, Legal, HR, DevOps, etc.).
- ✅ Added insights on the "Platform Market" (React/Web vs Native apps — the larger wave is existing web products adding agentic features).
- ✅ Created `docs/internal/research/strategy/AUDIT-MODE-DISTRIBUTION.md` — the "3 products" framing, "oversight linting" analogy, report export formats (markdown/comment/json/security-style), and skills.sh as top-of-funnel.
- ✅ Updated `DEFERRED-LOG.md` with both new strategy items and triggers.

### Key Decisions
1. **Focus on Regulated Verticals:** The PoC dogfooding app should target a high-stakes, regulated environment (e.g., Fintech/Crypto wallet) to demonstrate the absolute necessity of the Depute oversight layer.
2. **React Ecosystem Validation:** Double down on React as the primary integration point, since the larger wave of agentic features will be added to existing web products.
3. **Depute = 3 Products:** Component library (what ships) + Skill layer (how agents discover it) + Audit Mode (how humans adopt it). Audit Mode is the conversion engine.
4. **Export Formats First:** `FORMAT=markdown` and `FORMAT=comment` are the highest-leverage exports — they drop cleanly into GitHub Issues/PRs and make the audit report a referral loop.
5. **No Premature Heuristics:** Keep audit heuristics tied to primitives that exist today. Don't flag gaps that depute can't fill yet.
6. **PoC = Agent Wallet Console:** Fintech wallet PoC maps every core primitive to a concrete, high-stakes action (payment intent → ApprovalGate, emergency stop → RunControls, etc.).

---

## Session 18 - February 28, 2026

### Overview
Built the AX Skill layer — purpose-built skill files that teach AI agents how to use `depute` components. Created two skill packages: one for the Claude/Anthropic ecosystem and one following the open `skills.sh` standard for cross-agent discovery (Cursor, Codex, Copilot, etc.).

### Accomplishments

#### 66. Claude Skill — `.claude/skills/depute/`
- ✅ Rewrote `.claude/skills/depute/SKILL.md` per Anthropic's official skill guide (shared as PDF).
  - Added `compatibility` field (React 18+, TypeScript, CSS Modules, agent-agnostic)
  - Enriched `metadata` (author, version, documentation URL, category, tags)
  - Added `## Instructions` header — structured as 4 workflow steps (determine complexity → select → install → wire)
  - Moved detailed prop shapes to `references/`, kept decision tree and patterns in SKILL.md
- ✅ Created `references/v0-components.md` — composition flow, all 6 v0 prop examples, triage decisions, shared types
- ✅ Created `references/v1-components.md` — Figure 7 vs 8 architecture, all 11 v1 primitives with props, integration pattern
- ✅ Created `references/design-rationale.md` — WHY behind key design decisions (sources: Stripe SPT, Coinbase Mandate+Guardrails, Claude Cowork)

#### 67. Vercel/skills.sh Skill — `skills/depute/`
- ✅ Researched skills.sh open standard — Claude format is a superset (Claude adds `allowed-tools` and `disable-model-invocation`; not used in our skill so no stripping needed)
- ✅ Created `skills/depute/SKILL.md` — canonical cross-agent version (identical content since body was already fully agent-agnostic)
- ✅ Created `skills/depute/references/` — same 3 reference files (v0, v1, design-rationale)
- ✅ Both `skills/` (cross-agent) and `.claude/skills/` (Claude-specific) are valid discovery locations per skills.sh spec

### Key Decisions
1. **Claude format is a superset of skills.sh** — `allowed-tools` and `disable-model-invocation` are Claude-only. Since we don't use them, both files are identical.
2. **3-level progressive disclosure** — YAML frontmatter (always loaded) → SKILL.md body (loaded when relevant) → references/ (loaded on demand)
3. **Design rationale as a separate reference** — catalogs cover *what* ships; design-rationale.md covers *why* it was designed that way
4. **Monorepo conversion deferred** — `apps/www` is a standalone Next.js app (no workspace wiring). Avoids breaking the working Vite build, Storybook, and CLI. Revisit if a third package is added.
5. **`docs/` path is gitignored** — do NOT put the docs site at `docs/`. Use `apps/www` (already done). `docs/` is reserved for internal session notes.

### Final Skill Structure
```
skills/depute/                     ← Vercel/skills.sh canonical (cross-agent)
├── SKILL.md
└── references/
    ├── v0-components.md
    ├── v1-components.md
    └── design-rationale.md

.claude/skills/depute/              ← Claude Code specific
├── SKILL.md
└── references/
    ├── v0-components.md
    ├── v1-components.md
    └── design-rationale.md
```

---

#### 68. Docs Site Scaffold — `apps/www`

- ✅ **Architecture decision:** Standalone Next.js app at `apps/www/` (not a monorepo conversion, not a separate repo). Vercel can deploy a subdirectory independently.
- ✅ Scaffolded with `create-next-app` — Next.js 16 (Turbopack), TypeScript, Tailwind v4, App Router, `src/` layout.
- ✅ Installed Fumadocs: `fumadocs-ui@16.6.8`, `fumadocs-core@16.6.8`, `fumadocs-mdx@14.2.9`.

**Config files written:**
- `source.config.ts` — defines the `docs` collection via `defineDocs({ dir: 'content/docs' })`
- `next.config.ts` — wrapped with `createMDX()` from `fumadocs-mdx/next`; `turbopack.root: __dirname` silences workspace warning
- `tsconfig.json` — added `"@/.source/*": ["./.source/*"]` path alias for generated source
- `mdx-components.tsx` — registers `defaultMdxComponents` from `fumadocs-ui/mdx` so `<Callout>` etc. work in all MDX files
- `src/lib/source.ts` — calls `loader({ source: docs.toFumadocsSource() })` (fumadocs 16.x: must call `.toFumadocsSource()`, not pass `docs` directly)

**App routes:**
- `src/app/layout.tsx` — `RootProvider` from `fumadocs-ui/provider/next`, Geist fonts
- `src/app/page.tsx` — landing page with hero copy, "Browse components →" CTA, 3-column feature grid
- `src/app/docs/layout.tsx` — `DocsLayout` with sidebar nav from `source.pageTree`
- `src/app/docs/[[...slug]]/page.tsx` — MDX renderer passing `defaultMdxComponents` to `<MDX />`

**CSS:** `globals.css` imports `fumadocs-ui/css/neutral.css` + `fumadocs-ui/css/preset.css` + `tailwindcss` (Tailwind v4, no separate `tailwind.config.ts` needed).

**Content written:**
- `content/docs/meta.json` — full sidebar nav (index, installation, 8 v0 separators + components, 11 v1 separators + components)
- `content/docs/index.mdx` — Introduction (what, why, distribution model, v0/v1 table)
- `content/docs/installation.mdx` — Requirements, CLI usage, shared types, mock data generators
- `content/docs/components/approval-gate.mdx` — Full docs: basic usage, scoped grant, staged mode, props table, design rationale
- `content/docs/components/plan-card.mdx` — Full docs: basic usage, mock data, live execution, PlanStep type, composition flow, design rationale
- 15 remaining component stubs — install command + overview + Storybook Callout link

**Build result:** `npm run build` — zero errors, zero warnings, **23 static pages** generated.

**fumadocs 16.x gotchas documented:**
- `docs.toFumadocsSource()` is required (breaking change from v15)
- MDX `body` is on `page.data.body` — pass `components={defaultMdxComponents}` to `<MDX />` or `<Callout>` throws at build time
- Import from `@/.source/server` not `@/.source` (generated directory has `server.ts`, `browser.ts`, `dynamic.ts` — no `index.ts`)

### Next Steps
- ✅ **Vercel deploy** — Created project, root directory: `apps/www`, Framework: Next.js. Deployed to production at: `https://www-one-rho-67.vercel.app` and `https://33fa1ur95-edznpxme4-amir-bizimanas-projects.vercel.app`.
- ✅ **Port full component docs (v0)** — Ported ToolTrace, RunControls, ConfidenceMeter, and ArtifactCard. Added full props tables, usage examples, design rationale, and Storybook callouts.
- ✅ **Fumadocs TOC styling** — Configured `<DocsPage tableOfContent={{ style: 'clerk' }}>` to use the branched/indented tree style for the Table of Contents.
- ✅ **Port full component docs (v1)** — Ported all 11 v1 orchestration primitives (OrchestratorView, AgentRoster, SubagentCard, TaskQueue, HandoffProtocol, DelegationGate, SwarmMonitor, EscalationRouter, SwarmInbox, BranchControls, SharedContextLedger).
- [ ] **Storybook embed** — Add `<iframe>` or screenshot for each component story; link to https://iambizi.github.io/depute/?path=/story/ComponentName
- [ ] **Search** — Fumadocs ships with built-in search (Orama). Enable via `DocsLayout` `search` prop when content is fuller.
- [ ] **OG image / metadata** — Add `opengraph-image.tsx` under `src/app/` for social sharing.

---

## Session 17 - February 28, 2026

### Overview
Pivoted the immediate post-v0 strategy. Based on the "Skill Layer Opportunity" and the success of the shadcn/ui distribution model, we decided to **defer the Reference App** in favor of building the **intelligence layer (AX Skill)** and the **distribution layer (Public Docs Site)**.

### Key Decisions
1. **Prioritize AX Skill (`SKILL.md`):** Instead of a reference app, we will focus on teaching agents *how* to use the `depute` primitives via an Anthropic-native Skill file. This encodes our judgment on primitive selection.
2. **Prioritize shadcn-like Docs Site:** We will build a premium Next.js + Fumadocs public website in `apps/www` to serve as the interactive component showcase and documentation hub. This replaces the Storybook deployment as the permanent public face.

### Next Steps (Tomorrow)
- [ ] Draft the `skills/ax-depute/SKILL.md` file.
- [ ] Scaffold the `apps/www` Next.js application with Tailwind CSS and MDX support.
- [ ] Begin porting components into the interactive documentation site.

---

## Session 16 - February 26, 2026

### Overview
Prepared the demo environment and finalized the distribution strategy documentation for the March 2nd launch. Fixed an inline style missing from `ApprovalGate` and deployed the Storybook component catalog to GitHub Pages as the official public documentation.

### Accomplishments

#### 63. Demo App & Visual Bug Fix
- ✅ Set up Vite + Tailwind + TypeScript path aliasing in `examples/demo-app` so the user has a clean, raw terminal environment to record the `npx ax-depute add` CLI screencast.
- ✅ Discovered and fixed a missing CSS module class (`.btn`) on the Reject/Approve buttons inside `src/components/ApprovalGate/ApprovalGate.tsx`. The fix was applied to the main component source, preventing users from receiving unstyled browser-default buttons.
- ✅ Advised the user to discard the fast `demo-app` after recording, while keeping the high-quality `prototype-setup` environment for reference.

#### 64. Finalizing the Distribution Strategy
- ✅ Authored the 1-page "Distribution Vision" document (`docs/distribution-vision.md`) explaining why `depute` uses the copy-paste CLI model ("Ownership over Abstraction") rather than a monolithic NPM dependency model.
- ✅ Validated that hosting the Storybook instance is an excellent intermediate step for public documentation while the full Next.js/Fumadocs site is planned.

#### 65. Storybook Deployment to GitHub Pages
- ✅ Built the Storybook instance (`npm run build-storybook`) locally.
- ✅ Deployed the static output directly to the repository's `gh-pages` branch.
- ✅ Updated the root `README.md` to feature a prominent link to the interactive catalog: `https://iambizi.github.io/depute/`

### Key Decisions
1. **Storybook over Video:** We decided a live, interactive Storybook URL is a significantly stronger trust signal for evaluators than a static demo video.
2. **Ghost Tab Fix:** Diagnosed that VSCode explorer red dots post-deletion are caused by deleted files staying open in editor tabs, causing background language server crashes.

### What's Left
- [x] Record the final 2-minute CLI clip and publish promotional material.
- [x] March 2nd Launch!

---

## Session 15 - February 25, 2026

### Overview
Standardized the project branding from "AX Components" to **depute** cross-platform (Docs, Registry, Storybook). Established legal foundation by adding an MIT License, the industry standard for permissive open-source libraries.

### Context for the Next AI Reading This
- **Brand Name:** `depute` (delegation/appointment). 
- **Spelling:** All-lowercase `depute` is the preferred brand mark in prose/labels.
- **License:** MIT (Permissive). Copyright held by **Amir Bizimana** (legal name).
- **GitHub username:** `Iambizi` — if it ever changes, update only `packages/cli/src/config.js` (one line: `export const REPO = '...'`).
- **`docs/` is gitignored** — all session notes and internal docs live on-disk only, not tracked by git. `RELEASES.md` was moved to the repo root so it stays public.
- The project is now fully consolidated: `depute` repo, `ax-depute` CLI, and `depute` registry.

### Accomplishments

#### 56. Universal Rebranding to `depute`
- ✅ Rebranded root `README.md` (Title and Hero) to `depute`.
- ✅ Updated `registry/registry.json` name and description to `depute`.
- ✅ Updated `docs/RELEASES.md` and `docs/orchestration/` suite to use `depute` brand.
- ✅ Updated Storybook title structure in `07-universal-format-standards.md` to `depute/ComponentName`.
- ✅ Renamed Session Notes header to `# depute - Session Notes`.

#### 57. Licensing & Legal Setup
- ✅ Created root `LICENSE` file (MIT).
- ✅ Updated root `package.json` with `"license": "MIT"`.
- ✅ Verified `packages/cli/package.json` already has `"license": "MIT"`.

#### 58. Legal Copyright Updated
- ✅ `LICENSE` — copyright updated from `Iambizi` to **`Amir Bizimana`** (legal name).
- ✅ README footer updated to `MIT © Amir Bizimana`.

#### 59. CLI Config Centralized (`config.js`)
- ✅ Created `packages/cli/src/config.js` — single source of truth with `REPO`, `BRANCH`, `RAW_BASE`, `REGISTRY_URL`, `DOCS_URL`.
- ✅ `utils/registry.js` — removed hardcoded URL, now imports `REGISTRY_URL` from config.
- ✅ `utils/github.js` — removed hardcoded URL, now imports `RAW_BASE` from config.
- ✅ `commands/help.js` — removed hardcoded docs URL, now imports `DOCS_URL` from config.
- **If GitHub username changes:** edit `REPO` in `config.js` only, then `npm publish` a patch version. Zero other files needed.

#### 60. Fixed `ApprovalGate` Quick-Start Example in README
- ✅ The code example was using fake props (`action`, `risk`). Fixed to match the real API: `title`, `description`, `agentReasoning`, `mode`, `status`, `onApprove`, `onReject`.

#### 61. Repository Hygiene — `docs/` Gitignored
- ✅ Added `docs/` to `.gitignore` — all internal session notes, orchestration docs, and research are now local-only.
- ✅ Moved `docs/RELEASES.md` → `RELEASES.md` (repo root) so public release history stays tracked.
- ✅ Removed `docs/` from git tracking (`git rm -r --cached docs/`).
- **Note:** SESSION-NOTES.md (this file) is no longer pushed to git. It lives only on this machine.
#### 62. `ax-components-react` Unpublished from npm
- ✅ Ran `npm unpublish ax-components-react -f` to remove the accidentally published bundle from the registry.
- ✅ Removed `npm install ax-components-react` instructions from `README.md`.
- **Reasoning:** Enforcing the "You own the code" primitive philosophy (like shadcn/ui). The only distribution method is now the CLI (`npx ax-depute add <component>`).

### Verification
- `node packages/cli/bin/depute.js list` — ✅ fetches registry live, returns 17 components
- `cat LICENSE` — MIT 2026 Amir Bizimana ✅
- `grep -r "Iambizi" packages/cli/src/` — only `config.js` now (0 hardcoded URLs elsewhere) ✅
- `grep -r "AX Components" docs/ registry/` — only archived research/case studies, appropriate ✅

### What's Left Before March 2, 2026
- [ ] Demo video — 2-3 min: Storybook walkthrough + `npx ax-depute add` in fresh project
- [ ] Written reasoning doc — 1-page: the human/AI boundary problem this library solves

---

## Session 14 - February 24, 2026

### Overview
Published the CLI to npm as `ax-depute@0.2.0`. The npm package name `depute` was already taken by an unrelated utility, so renamed to `ax-depute`. The command is now `npx ax-depute add <component>`. Also accidentally published the root `ax-components-react@0.2.0` package in the process (this is fine — it's the React component library bundle and was already built).

### Context for the Next AI Reading This
- **CLI npm package:** `ax-depute` → `npx ax-depute add <component>` | `npx ax-depute list`
- **npm URLs:**
  - https://www.npmjs.com/package/ax-depute
  - https://www.npmjs.com/package/ax-components-react
- **GitHub repo:** `https://github.com/Iambizi/depute` (public)
- The CLI fetches components live from GitHub raw. Now that the repo is public and the CLI is on npm, `npx ax-depute add approval-gate` works globally.

### Accomplishments

#### 54. `ax-depute@0.2.0` Published to npm
- ✅ Attempted `npm publish` from wrong directory first — accidentally published `ax-components-react@0.2.0` (the root bundle package). This is harmless.
- ✅ Discovered npm package name `depute` was already taken (unrelated 2016 utility).
- ✅ Renamed CLI package from `depute` → `ax-depute` across all files:
  - `packages/cli/package.json` — name, description, bin key
  - `packages/cli/src/commands/help.js` — usage banner + all `npx depute` examples
  - `packages/cli/src/commands/add.js` — error messages
  - `packages/cli/src/commands/list.js` — usage footer
  - `packages/cli/src/index.js` — unknown command error
  - `packages/cli/README.md` — title and all code examples
- ✅ `npm publish --access public` from `packages/cli/` succeeded: `+ ax-depute@0.2.0`

### Verification
- `npx ax-depute list` — fetches all 17 components from the public `depute` repo ✅
- `npx ax-depute add approval-gate` — copies 4 source files into project ✅

#### 55. Root `README.md` Rewritten for Public Audience
- ✅ Complete rewrite of root `README.md` — replaces thin placeholder with evaluator-ready content.
- ✅ Added **problem statement** section: explains why agentic UI is hard and what AX solves.
- ✅ Added **full component catalog** for all 17 components (v0 + v1) with descriptions.
- ✅ Added **CLI quick-start** with `npx ax-depute add` as the primary entry point.
- ✅ Added **design principles** section: human oversight, code ownership, agent-agnostic, accessible.
- ✅ Fixed stale `npx depute` references → `npx ax-depute`.
- ✅ Added links to npm packages (`ax-depute`, `ax-components-react`).

### What's Left Before March 2, 2026
- [x] Polish root `README.md` for Wealthsimple evaluators (hero copy, quick-start, motivation)
- [ ] Demo video — 2-3 min: Storybook walkthrough + `npx ax-depute add` in fresh project
- [ ] Written reasoning doc — 1-page: the human/AI boundary problem this library solves

---

## Session 13 - February 24, 2026


### Overview
Fixed TypeScript language server errors across all test files. Tests were already passing at runtime (219/219), but the TS language server showed `Property 'toBeInTheDocument' does not exist on type 'Assertion<HTMLElement>'` in every test file. Also fixed a `BranchControlsProps` type mismatch where required callback props conflicted with test usage.

### Context for the Next AI Reading This
The repo uses **Vitest** (not Jest) for testing with `@testing-library/react` and `@testing-library/jest-dom`. The TS configuration is now split into two files:
- `tsconfig.json` — editor/language-server config. Includes all `src/` + `stories/` files with no exclusions. Has `"types": ["vitest/globals"]`. Used by VS Code.
- `tsconfig.build.json` — build config. Excludes `*.test.*` and `*.stories.*`, enforces `noUnusedLocals`, emits declarations to `dist/`. Used by `npm run build` and `npm run type-check`.
- `src/test.d.ts` — `/// <reference types="@testing-library/jest-dom/vitest" />` — augments Vitest's `Assertion` type with jest-dom matchers globally.
- `src/test-setup.ts` — imports `@testing-library/jest-dom/vitest` at runtime for Vitest setup.

### Accomplishments

#### 52. Fixed TS Language Server Errors in All Test Files
- **Root cause:** `tsconfig.json` excluded `**/*.test.tsx`, causing VS Code to create "orphaned" inferred TS projects for test files that don't inherit the main config's types. `src/test.d.ts` was unreachable from these orphaned projects.
- ✅ Split `tsconfig.json` into editor config (all files, vitest globals) and `tsconfig.build.json` (strict, excludes tests, emits declarations).
- ✅ Updated `package.json` — `build` and `type-check` scripts now use `tsconfig.build.json`.
- ✅ `src/test-setup.ts` updated to import `@testing-library/jest-dom/vitest` (Vitest-specific entry) instead of the generic `@testing-library/jest-dom`.
- ✅ `src/test.d.ts` added — `/// <reference types="@testing-library/jest-dom/vitest" />` so jest-dom matchers augment `Assertion<T>` for all files under the editor tsconfig.
- ✅ `tsconfig.test.json` added — alias for `tsconfig.build.json` with test files included (used for `tsc -p tsconfig.test.json --noEmit` verification).

#### 53. Fixed `BranchControlsProps` Required Callback Type Mismatch
- **Root cause:** `onPause`, `onResume`, `onQuarantine`, `onCancel` were required props, but tests correctly pass only the callback relevant to the test case being verified.
- ✅ Made all four callbacks optional in `BranchControls.types.ts`.
- ✅ Added `?.()` optional chaining on all four callback invocations in `BranchControls.tsx`.

### Verification
- `npx tsc -p tsconfig.build.json --noEmit` — clean (0 errors)
- `npx tsc -p tsconfig.test.json --noEmit` — clean (0 errors)
- `CI=true npx vitest run` — **219/219 tests passing, 17 test files**
- `npm run build` — production bundle builds successfully

### What's Left (unchanged from Session 12)
- [ ] Make `depute` repo public on GitHub
- [ ] `cd packages/cli && npm publish --access public`
- [ ] Polish root `README.md` for evaluators
- [ ] Demo video
- [ ] Written reasoning doc (human/AI boundary problem)

---

## Session 12 - February 23, 2026


### Overview
Built the `depute` CLI (`npx depute`) and renamed the GitHub repo from `AX-CMP-S-K` to `depute`. The CLI implements the shadcn-style distribution model: it reads `registry.json` from GitHub raw and copies component source files directly into the user's project. Completed a full AXK → depute branding sweep across all public-facing and internal docs.

### Context for the Next AI Reading This
This project is a React component library for Agentic Experience (AX) design. The distribution model is **copy-paste via CLI** (not `npm install`), identical to how shadcn/ui works. The CLI package (`packages/cli/`) is a vanilla Node.js ESM package with zero runtime dependencies.

**Repo:** `https://github.com/Iambizi/depute` (must be made public before CLI works for the world)  
**GitHub raw base URL used by CLI:** `https://raw.githubusercontent.com/Iambizi/depute/main`  
**CLI npm package name:** `depute` (set in `packages/cli/package.json`, bin: `depute`)  
**CLI command:** `npx depute add <component>` | `npx depute list` | `npx depute help`

### Accomplishments

#### 47. GitHub Repo Renamed to `depute`
- ✅ Repo renamed from `AX-CMP-S-K` → `depute` on GitHub.
- ✅ Local git remote updated: `git remote set-url origin git@github.com:Iambizi/depute.git`

#### 48. depute CLI Built (`packages/cli/`)
- ✅ `packages/cli/package.json` — name: `depute`, bin: `depute`, Node 18+, zero runtime dependencies.
- ✅ `packages/cli/bin/depute.js` — shebang entry point (chmod +x).
- ✅ `packages/cli/src/index.js` — argv parser, routes to add/list/help commands.
- ✅ `packages/cli/src/commands/add.js` — core command: fetches registry, finds component, fetches each file from GitHub raw, writes to `src/components/<Name>/`, auto-adds `src/types/ax-common.ts` and `src/utils/ax-a11y.tsx` on first install. Rewrites internal import paths.
- ✅ `packages/cli/src/commands/list.js` — fetches registry, prints grouped table of all 17 components.
- ✅ `packages/cli/src/commands/help.js` — usage, examples, options.
- ✅ `packages/cli/src/utils/github.js` — raw GitHub fetcher (pure Node `https` builtin).
- ✅ `packages/cli/src/utils/registry.js` — fetches and parses `registry.json` from GitHub.
- ✅ `packages/cli/src/utils/fs.js` — `writeFileToDisk` with colored output, skip-if-exists logic.
- ✅ `packages/cli/README.md` — user-facing docs with quick-start and component table.
- ✅ All 3 commands verified working locally.

#### 49. `registry.json` Expanded to 17 Components
- ✅ Updated `registry/registry.json` from 6 (v0 only) → 17 (v0 + v1 orchestration primitives).
- ✅ Added `repo`, `branch`, and `sharedFiles` fields to the registry schema.
- ✅ `"distribution": "depute"` set in registry.

#### 50. Shared Files Committed
- ✅ `src/types/ax-common.ts` — shared types file for CLI to deliver to user projects.
- ✅ `src/utils/ax-a11y.tsx` — a11y utilities file for CLI to deliver.

#### 51. Full AXK → depute Branding Sweep
- ✅ Renamed CLI npm package from `axk` → `depute` (bin file, package.json, all help/error text).
- ✅ Replaced all `AXK` / `axk` references across 20+ files:
  - `registry/registry.json` — `"distribution"` field
  - `README.md` — distribution model section
  - `docs/orchestration/01-project-specification.md` — distribution model
  - `docs/orchestration/02-technical-architecture.md` — tech stack, constraints, directory tree
  - `docs/orchestration/03-ux-design.md` — depute implication note
  - `docs/orchestration/04-design-system.md` — design tokens section
  - `docs/orchestration/06-technical-specifications.md` — section heading
  - `docs/orchestration/07-universal-format-standards.md` — section heading
  - `docs/orchestration/progress.json` — step-12 name
  - `docs/internal/research/README.md` — AX-SKILL-SPEC description
  - `examples/prototype-setup/README.md` and `examples/production-setup/README.md`
  - All `packages/cli/src/**` file header comments
- ✅ Intentionally preserved: historical session notes (accurate record), research archive files with AXK in filename (`AXK-DISTRIBUTION-DEEP-DIVE.md`), `RELEASES.md` (historical context), and `DEFERRED-LOG.md`.

### Key Decisions
1. **`npx depute` not `npx axk`** — Renamed CLI package to match repo name. Evaluators landing on `github.com/Iambizi/depute` and reading `npx depute` get instant brand coherence.
2. **Zero dependencies in CLI** — Pure Node builtins (`https`, `fs`, `path`). No install step, no lock-in.
3. **Files fetched live from GitHub raw** — CLI always delivers latest `main`. Not bundled in the CLI package.
4. **Import path rewriting** — `add.js` rewrites `../../types/common` → `../../types/ax-common` so users get isolated, non-colliding filenames.

### What's Left Before the Wealthsimple Deadline (March 2, 2026)
- [ ] **Make `depute` repo public** on GitHub — required for `npx depute` to work for anyone.
- [ ] **Publish `depute` to npm** — `cd packages/cli && npm publish --access public`.
- [ ] **Polish root `README.md`** — Needs a proper public-facing hero for Wealthsimple evaluators.
- [ ] **Demo video** — 2-3 min showing ApprovalGate, OrchestratorView, SwarmMonitor in Storybook, then `npx depute add` in a fresh project.
- [ ] **Written reasoning** — 1-page doc on the human/AI boundary problem this library solves.

### Next Steps (Immediate)
1. Make `depute` repo public on GitHub.
2. `cd packages/cli && npm publish --access public`.
3. Polish root README.

---

## Session 11 - February 22, 2026

### Overview
Completed all Step 5–7 work for v1 orchestration primitives (mock data, Storybook stories, unit tests). Patched PlanCard Step 6 story gap from v0. Tagged v0.2.0. Made the strategic decision to build the AXK CLI now rather than waiting for the reference app.

### Accomplishments

#### 42. Step 5 (Mock Data) Complete — All 11 v1 Primitives
- ✅ Added generator functions to `src/utils/mockData.ts` for all 11 v1 orchestration components.

#### 43. Step 6 (Storybook Stories) Complete — All 11 v1 Primitives
- ✅ Created `.stories.tsx` files for all 11 v1 primitives in `stories/`.
- ✅ Each story follows the CSF3 pattern: Default, AllFeatures, state variants, interactive prototypes, production examples.

#### 44. Step 7 (Unit Tests) Complete — All 11 v1 Primitives
- ✅ Created `.test.tsx` files for all 11 v1 primitives using Vitest + React Testing Library.
- ✅ All 219 tests pass across 17 test files (11 v1 + 6 v0).

#### 45. PlanCard Step 6 Gap Patched
- ✅ Wrote `stories/PlanCard.stories.tsx` — the only missing v0 story file.
- ✅ `npm run build` clean. Committed and pushed.

#### 46. v0.2.0 Released
- ✅ Wrote `docs/RELEASES.md` v0.2.0 release notes covering all 11 new orchestration primitives.
- ✅ Bumped `package.json` version from `0.1.0` → `0.2.0`.
- ✅ `tsc --noEmit` clean, `npm run build` clean, all 219 tests passing.
- ✅ Committed `b7869ba`, tagged `v0.2.0`, pushed tag to origin.

### Key Decisions
1. **Override CLI deferral.** The previous decision was to defer the AXK CLI until after the reference app. Overriding this: build the CLI now. Rationale: the registry.json is complete for v0; the CLI is a short, well-scoped deliverable; and shipping it unlocks the distribution story before reference app work begins.
2. **CLI before Reference App.** New sequence: AXK CLI → Reference App → Skills layer.

### Next Steps
- [ ] **Build AXK CLI** (`packages/cli/`) — Node.js package, `npx axk add <component>` copies source files into user repo from `registry.json`.
- [ ] Update `registry.json` to include all 11 v1 orchestration primitives (first step of CLI work).
- [ ] Add `step-11-cli` to `progress.json` global steps.

---

## Session 10 - February 22, 2026

### Overview
Finalized the v1 Orchestration Primitive scope, scaffolded all 11 new components, refactored the TypeScript architecture, and completed full production-quality implementations (Step 4) for all 11 v1 orchestration primitives.

### Accomplishments

#### 35. Finalized v1 Draft Catalog (11 Primitives)
- ✅ Integrated expert AI feedback (Claude + ChatGPT) on the requirements for Figure 7/8 multi-agent orchestration.
- ✅ Added `SwarmInbox` (attention triage), `BranchControls` (scoped steering), and `SharedContextLedger` (scoped read memory) to the v1 specification.
- ✅ Updated `CATALOG-v1.md`, `AX-PRIMITIVES-STARTER.md`, and `01-project-specification.md` to secure the 11 locked v1 orchestration primitives.

#### 36. Scaffolded v1 Codebase
- ✅ Created React TSX and CSS Module boilerplates for all 11 orchestration primitives.
- ✅ Exported all new primitives from `src/index.ts`.

#### 37. Refactored v1 TypeScript Architecture
- ✅ Extracted inline TypeScript interfaces from `.tsx` files into dedicated `.types.ts` files for all 11 primitives.
- ✅ Updated `index.ts` files to use explicit named exports, resolving Vite/Bundler module resolution errors.
- ✅ `npm run build` passing with zero TS errors in < 500ms.

#### 38. Implemented `OrchestratorView` (Step 4 Complete)
- ✅ Recursive `TreeNode` sub-component with expand/collapse and keyboard navigation.
- ✅ Properly typed recursive `OrchestratorNode` interface replacing initial `any[]`.
- ✅ Depth-coded left border colors (indigo→sky→emerald→amber) and animated `working` status dot.

#### 39. Implemented `AgentRoster` (Step 4 Complete)
- ✅ Dense operational table layout for flat-swarm (Figure 7) scanning across 20+ agents.
- ✅ Summary status pills (working/blocked/failed/idle/done) in the header.
- ✅ Hover-to-reveal row actions and shared `AgentStatus` type from `OrchestratorView`.

#### 40. Implemented Remaining 9 v1 Primitives (Step 4 Complete)
All components have a production-quality TSX file, CSS module, and enriched `.types.ts`. Committed to git in two batches:
- ✅ **`SubagentCard`** — Compact embeddable card with plan progress bar, token count footer, and expand-to-detail action.
- ✅ **`TaskQueue`** — Grouped list (In Progress → Assigned → Pending) with priority chips and hover-reveal inline actions.
- ✅ **`HandoffProtocol`** — "Comprehension UI" (not a gate): structured payload viewer with Accept / Intercept / Cancel actions.
- ✅ **`DelegationGate`** — Amber alertdialog with tool constraints chip list, cost estimate, and Approve/Deny gate.
- ✅ **`SwarmMonitor`** — Auto-fit KPI grid with error-severity tinting, gradient completion progress bar, and global Pause/Kill controls.
- ✅ **`EscalationRouter`** — Red alertdialog with collapsible dark-themed error trace and 3-way resolution (Retry / Reassign / Cancel Branch).
- ✅ **`SwarmInbox`** — Attention-triage list with severity-tinted rows, pulsing critical badge, and dismissable items.
- ✅ **`BranchControls`** — Scoped steering panel with status-coded top border (green/amber/red) and contextual action buttons.
- ✅ **`SharedContextLedger`** — Read-only scoped memory viewer with key/value entries, type tags, provenance metadata, and conflict signaling.

#### 41. Updated `docs/orchestration/progress.json`
- ✅ Added all 11 new v1 components to the tracker with their 4-step completion statuses.
- ✅ `step-4-component` marked as `completed` for all 11 primitives.

### Next Steps
- **Step 5:** Write mock data generator functions for all 11 v1 components in `src/utils/mockData.ts`.
- **Step 6:** Create Storybook stories for each component.
- **Step 7:** Write unit tests.

---


## Session 9 - February 20-21, 2026

### Overview
Finalized v0 validation, documented the "Levels of Agentic Coding" framework, and officially released v0.1.0 of the AX Components library.

### Accomplishments

#### 32. Step 8 (Documentation & Examples) Complete
- ✅ Wrote root `README.md` introducing the AXK distribution architecture and outlining the 6 v0 primitives.
- ✅ Created `examples/prototype-setup` showcasing how to build a mock UI using `mockData.ts` generators without a real API.
- ✅ Created `examples/production-setup` demonstrating how to swap mock data for a live API stream/SSE hook while preserving the exact same agent UI.
- ✅ Updated `docs/orchestration/progress.json` to mark `step-8-docs` as completed.

#### 33. TypeScript Fix — `scope` type in prototype example
- ✅ Fixed TS error in `examples/prototype-setup/App.tsx` line 51: `scope` prop on `ApprovalGateProps` is `{ resourceLimit?, durationSeconds?, target? }` (object), not a string.
- ✅ Changed `scope: 'resource'` → `scope: { target: 'Stripe API' }` and removed the incorrectly placed `metadata: { target: ... }` override.
- ✅ Committed: `fix(examples): correct scope type in generateMockApproval call`

#### 34. Step 9 (Validation) Complete -> v0 is READY
- ✅ `tsc --noEmit` clean across `src/`, `stories/`, and `examples/`.
- ✅ All 84 Vitest unit tests passing (100% coverage of v0).
- ✅ `vite build` generated correct `dist/ax-components.es.js` and `.cjs.js`.
- ✅ Storybook build completed successfully to `storybook-static/`.
- ✅ Verified ZERO `any` types in source files, 100% `aria-` and `role=` attribute coverage, and full `--ax-` token adoption in all CSS modules.
- ✅ Marked `step-9-validate` as completed in `progress.json`. The AX Components v0 library is officially built and validated.

#### 35. v0.1.0 Officially Released
- ✅ Drafted release notes and launch announcement in `docs/RELEASES.md`.
- ✅ Tagged commit as `v0.1.0` in git and pushed to remote.
- ✅ Marked v0 as fully complete and released.

### Key Decisions
1. **Defer Reference App.** While valuable, building a full reference app is deferred in favor of officially wrapping up v0 and capitalizing on the Agentic Coding Levels research to draft the v1 catalog.
2. **Prioritize v0 Launch & v1 Design.** Next immediate actions are administrative wrap-up for v0 (tag release, etc.) and defining the new orchestration primitives for v1 based on the Fig 8 model.

### Next Steps
- [ ] Draft v1 catalog (AgentRoster, OrchestratorView, SubagentCard, TaskQueue, etc.)
- [ ] Define AX Skill distribution architecture (skills.sh vs Anthropic native)

---

## Session 8 - February 20, 2026

### Overview
Completed all unit tests for v0 primitives.

### Accomplishments

#### 31. Step 7 (Unit Tests) Complete
- ✅ Created comprehensive Vitest test suites for `ApprovalGate`, `ConfidenceMeter`, `RunControls`, `ToolTrace`, and `ArtifactCard`.
- ✅ Fixed failing tests in `PlanCard` related to `aria-live` staleness.
- ✅ All 6 components now have fully passing unit tests covering rendering, state matrix, interactions, and a11y properties.
- ✅ Fixed TypeScript compilation errors in `ArtifactCard.test.tsx` and `ToolTrace.test.tsx` related to mock payload timestamps.
- ✅ `vitest` logs 84 out of 84 tests passing. `progress.json` step-7-tests tracked as completed.

---

## Session 7 - February 19, 2026

### Overview
Built Mock Data Utilities, reviewed distribution strategy, created Deferred Log, finished Step 6 Stories, and upgraded Node environment.

### Accomplishments

#### 28. Mock Data Utilities Built
- ✅ `src/utils/mockData.ts` — generators + simulators for all 6 primitives
  - `generateMockPlan` (stepCount, confidence, reasoning options)
  - `simulatePlanExecution` — auto-advances steps pending → active → completed with real timing; returns `cancel()`
  - `generateMockApproval` (mode, scope, metadata, agent reasoning)
  - `generateRandomConfidence`
  - `generateMockToolCalls` — completed/failed calls with policy flags (15% failure rate)
  - `simulateToolStream` — streams running → completed/failed entries for ToolTrace; returns `cancel()`
  - `generateMockArtifact` — realistic markdown/json/csv/code content
  - `buildRunMonitoringScenario` — composite scenario wired to all 6 components at once
  - Label banks: `MOCK_STEP_LABELS`, `MOCK_TOOL_NAMES`, `MOCK_APPROVAL_SCENARIOS`
- ✅ All exports added to `src/index.ts`
- ✅ Build verified: `tsc --noEmit` ✓, `vite build` ✓ (54.74 kB JS, 32 modules)

#### 29. Distribution Review + Registry Fix + Deferred Log
- ✅ Reviewed `AXK-DISTRIBUTION-DEEP-DIVE.md` and `DISTRIBUTION-STRATEGY-SHADCN.md` (overdue since v0 shipped)
- ✅ Fixed `registry/registry.json` — restructured from `primitives{}` object to `items[]` array (shadcn convention)
  - Added kebab-case `name` field, `type: "primitive"`, `registryDependencies: []` to each item
  - All a11yNotes, stateModel, axPrinciples, requiredTokens preserved
- ✅ Created `docs/internal/DEFERRED-LOG.md` — single source of truth for all deferred research, with milestone triggers
- ✅ Captured `docs/internal/research/DELEGATION-ERA-STRATEGY.md` — OpenClaw→OpenAI signal analysis
  - Confirms supervision UX direction; identifies event model gap for post-reference-app phase
- ✅ CLI / `axk.json` / Block 01 remain deferred to post-reference-app (no premature optimization)

#### 30. Stories Built & Node Upgraded
- ✅ **Step 6 Complete**: Wrote Storybook stories for all 6 v0 primitives.
  - 9 stories per component (3 shared, 3 prototyping, 3 production).
  - Includes live simulation states using `mockData.ts` utilities.
  - Re-mapped CSS imports in `.storybook/preview.ts` to include AX tokens so rendering matches spec.
- ✅ **TypeScript check**: `tsc --noEmit` is clean across the entire `stories/` directory.
- ✅ **Environment Upgrade**: Storybook v10 required Node.js 20.19+, so upgraded from `v20.10.0` to `v20.20.0` via `nvm`.
- ✅ Verified `npm run build-storybook` successfully builds `storybook-static` output.

---

## Session 6 - February 11–18, 2026

### Overview
Created Claude Cowork case study from live workshop screenshots. Added AX Book reading notes. Cross-referenced Cowork patterns with AX Book's 6 foundational patterns.

### Accomplishments

#### 1. Claude Cowork Case Study
- ✅ Analyzed two states: **landing page** (idle) and **active task view** (working)
- ✅ Identified 11 AX patterns across both views
- ✅ Mapped all patterns to our primitives catalog — ~80-85% coverage
- ✅ Found gaps: `TaskQueue`, `TaskSuggestions`/`StarterCards`, inline reasoning mode, `ModelBadge`
- ✅ Connected landing page to AX Book's Generative Momentum pattern (Pattern 6)
- ✅ Key finding: Cowork optimizes for simplicity; we optimize for trust/control — both valid, different audiences

#### 2. AX Book Notes
- ✅ Added reading notes from *AX: The Rise of Agentic Experience* (Theo Tabah / LCA)
- ✅ Structured under the 4 parts from the book index, with placeholder sections for unread chapters
- ✅ Confirmed our primitives catalog maps cleanly to all 6 AX patterns from Chapter 4
- ✅ Noted that Chapter 8 (8 AX Principles) and Chapter 9 (Safe & Ethical Design) are most likely to reveal gaps

#### 3. Research Documentation
- ✅ Updated `research/README.md` with new entries (Cowork analysis, AX Book)
- ✅ Added new 📖 Book Notes category to research index

#### 4. AX Book Chapter 6 — Generative UI (Feb 12)
- ✅ Integrated Chapter 6 notes into `docs/internal/research/book-notes/AX-BOOK.md` — Generative UI as precision, not vibes
- ✅ Key concepts: "generative within guardrails," stable spine + contextual surfaces, conversational discovery
- ✅ Cross-referenced 7 implied primitives against catalog — 1 genuinely new (`CapabilityGlossary`)

#### 5. Primitives Research Tracker (Feb 12)
- ✅ Added "📋 Candidates from Research" appendix to `AX-PRIMITIVES-STARTER.md`
- ✅ Centralized 6 candidates from Cowork + AX Book: `TaskQueue`, `TaskSuggestions`, `ModelBadge`, `CapabilityGlossary`, `ContextViewer`, `WhyThisUI`
- ✅ Decision: wait to revise catalog until book is finished (Ch 7-12 still pending)

#### 6. AX Book Chapter 7 — Invisible UI (Feb 13)
- ✅ Integrated Chapter 7 notes into `docs/internal/research/book-notes/AX-BOOK.md` — invisible UI as "ambient unless needed"
- ✅ Key concepts: interface detail vs machine intelligence, gradual fade, escalation thresholds, "trust becomes everything"
- ✅ Cross-referenced 7 implied primitives — 3 genuinely new: `AmbientNudge`, `ExceptionInbox`, `QuietMode`
- ✅ These are the first primitives for the **ambient/invisible side** of AX — a new category
- ✅ Tracker now at 9 total candidates

#### 7. AX Book Chapter 8 — The 8 AX Principles (Feb 13)
- ✅ Integrated all 8 principles + trust framework (4 stages: functional → contextual → judgment → advocacy)
- ✅ **Most validating chapter yet** — ~12 existing primitives got direct confirmation
- ✅ 5 new candidates: `TransparencyDial`, `TrustMeter`, `PushbackCard`, `TeamPanel`, `PreferenceDefaults`
- ✅ Noted: `HumanTakeover` should expand to `ExpertRouter` (sub-agents + APIs, not just humans)
- ✅ Tracker now at 14 total candidates

#### 8. Folder Rename: vibe-coding → orchestration (Feb 13)
- ✅ Renamed `docs/vibe-coding/` to `docs/orchestration/`
- ✅ Updated all 15 references across 5 files (`CLAUDE.md`, `SESSION-NOTES.md`, `VC-ORCHESTRATION.md`, `research/README.md`, `02-technical-architecture.md`)
- ✅ Verified zero remaining references with full repo grep

#### 9. AX Book Chapter 9 — Safe & Ethical Relationship Design (Feb 14)
- ✅ Integrated Chapter 9 notes — ethics as product design, not compliance
- ✅ Key frameworks: 3I Lens (Industry × Intent × Individual), Ethics Rubric (9-point checklist), Ethics Playbook (6 operational steps)
- ✅ 3 new candidates: `RelationshipCard`, `EscapeHatchBar`, `OveruseNudge`
- ✅ Part 03 (AX Design, Ch 5-9) now complete
- ✅ Tracker now at 17 total candidates

#### 10. AX Book Chapter 10 — The Business Case (Feb 14)
- ✅ Integrated Chapter 10 notes — "Relationship as Moat" + "3 Key User Questions"
- ✅ Identified 5 new candidates: `RelationshipHealth`, `LearningChangelog`, `IncentiveDisclosure`, `BehaviorContract`, `WorkflowTemplate`
- ✅ Tracker now at 22 total candidates

#### 11. Real-World Research: Coinbase Agentic Wallets (Feb 14)
- ✅ Analyzed Coinbase "Agentic Wallets" launch (Feb 10, 2026)
- ✅ **Deep Dive Update:** Integrated "Safe Autonomy" wedge, Mandate+Guardrails pattern, and Receipts UI analysis
- ✅ Added 4 financial primitives to tracker: `MandateEditor`, `BudgetMeter`, `TransactionReceipt`, `SpendApprovalInbox` (26 total candidates)
- ✅ Validated "Spend Controls Kit" as a key library use case

#### 12. Strategic Vision: The "AX Playbook" (Feb 14)
- ✅ Captured growing sentiment that research > just library specs
- ✅ Created `docs/internal/research/strategy/AX-META-STRATEGY.md`
- ✅ Created `docs/internal/research/strategy/DELEGATION-ERA-STRATEGY.md`gent" concept (using this folder as training data)
- ✅ Documented "3I Lens" as a consulting framework

#### 13. Distribution Strategy: The shadcn Model (Feb 14)
- ✅ Analyzed shadcn/ui's "copy-paste" architecture as the ideal model for AX components
- ✅ Analyzed technical anatomy (Radix + Tailwind + CVA + CLI) based on manupa.dev
- ✅ Created `docs/internal/research/DISTRIBUTION-STRATEGY-SHADCN.md`
- ✅ Strategic benefit: "Code Ownership" is critical for agents to read/edit their own UI

### Key Decisions
1. **Adopt "AXK" model** — Distribute via CLI copy-paste (Headless hooks + Tailwind UI), not strict npm packages.
2. **Wait to formalize AX Book analysis** until complete (through Chapter 12) — notes are raw research for now
3. **Generative Momentum validated** as a pattern we should support — consider `TaskSuggestions` primitive
4. **Two-phase UI** (idle → active) is a smart Adaptive Canvas application worth considering
5. **Centralize primitive candidates** — tracking appendix in `AX-PRIMITIVES-STARTER.md` rather than scattered across research docs
6. **Ambient/invisible primitives** are a new category emerging from Ch 7 — agent-initiated notifications, attention budgets, exception-only workflows
7. **Catalog validated by Ch 8** — 12 of 48 primitives directly confirmed by the book's 8 principles. Catalog was well-designed from the start
8. **3I Lens as config model** — Industry × Intent × Individual should inform props/config (e.g., `strictness` prop on safety primitives)

#### 14. AX Book Complete (Ch 11-12)
- ✅ Integrated "Potential Futures" (Ch 11) & "A New Discipline" (Ch 12)
- ✅ Added 8 new primitives to catalog (Total: ~34 candidates)
- ✅ **Key Insight:** Trust is moved upstream (Browser, OS, or Vertical Agent). We must build "Agent-Readable" interfaces.

#### 15. Catalog v0 Locked (Feb 15)
- ✅ Selected 6 primitives: `PlanCard`, `ApprovalGate`, `ConfidenceMeter`, `RunControls`, `ToolTrace`, `ArtifactCard`
- ✅ Triaged 3 overlapping candidates: `CommitGate` absorbed into ApprovalGate, `UncertaintyBadge` absorbed into ConfidenceMeter, `EscapeHatchBar` deferred to v1
- ✅ Created `docs/internal/research/catalog-versions/CATALOG-v0.md`
- ✅ Documented master roadmap in `VC-ORCHESTRATION.md`

#### 16. v0 Migration — Full Repo Update (Feb 15)
- ✅ Updated all 14 skill files: replaced old component names + fixed `docs/vibe-coding/` → `docs/orchestration/` paths
- ✅ Rewrote `05-interface-states.md` — new state matrices for all 6 v0 primitives
- ✅ Rewrote `06-technical-specifications.md` — new TypeScript interfaces, shared types, mock data API for v0
- ✅ Updated `02-technical-architecture.md` — directory structure + exports for 6 primitives
- ✅ Updated `03-ux-design.md` — layout patterns for PlanCard, ConfidenceMeter, RunControls, ApprovalGate
- ✅ Updated `04-design-system.md` — CSS module example renamed
- ✅ Updated `07-universal-format-standards.md` — naming conventions, commit examples, import examples
- ✅ Fixed `VC-ORCHESTRATION.md` — example flow uses v0 component names
- ✅ Reset `progress.json` — v2.0.0 with 6 v0 components, `step-1-ideation` marked completed
#### 17. Project Scaffolded — `/vibe-step-1b-init-project` (Feb 15)
- ✅ Created `package.json` — library mode exports (ES + CJS), React peer deps, all scripts
- ✅ Created `vite.config.ts` — library build with React externalized
- ✅ Created `tsconfig.json` — strict mode, declarations to `dist/types`
- ✅ Created `vitest.config.ts` — jsdom environment, global test setup
- ✅ Created `.storybook/main.ts` + `preview.ts` — React + Vite framework
- ✅ Created `src/` structure: `index.ts`, `types/common.ts`, `utils/mockData.ts`, `test-setup.ts`
- ✅ Created `stories/`, `examples/` directories
- ✅ Installed 246 npm packages (0 vulnerabilities)
- ✅ Verified: `tsc --noEmit` ✅, `vite build` ✅ (74ms, 0 warnings)

#### 18. Node Upgrade + Clean Install (Feb 15)
- ✅ Upgraded to Node v24.13.1 (LTS) via nvm — zero engine warnings
- ✅ Upgraded Storybook to v10 (essentials now built into core)
- ✅ Clean `npm install` — all deps resolve without `--legacy-peer-deps`

#### 19. Research Synthesis Audit (Feb 15)
- ✅ Audited all 10 research files against PRD docs 01-07
- ✅ Found 6 gaps, closed all:
  1. **Scoped approvals** → added `scope` prop to `ApprovalGateProps` (resource/time-bounded grants)
  2. **Artifact provenance** → added `sourceStepId` + `toolCallIds` to `Artifact` type
  3. **Multi-gate flows** → documented in `05-interface-states.md`
  4. **Streaming behavior** → new section in `05` for all 6 components
  5. **ToolTrace defaults** → entries start collapsed, running entry auto-expands
  6. **Policy flags** → added `policyFlags` to `ToolCall` type (v1 A2UI compatibility)

#### 20. Second AI Review — AXK Model Hardened (Feb 15)
- ✅ Another AI reviewed all PRD docs and added AXK distribution context
- ✅ `01` — added v0 catalog status, distribution model, scoped roadmap to 6 primitives
- ✅ `02` — added `registry/` + `packages/headless/` to structure, AXK constraint
- ✅ `03` — added v0 scope lock + AXK ownership implication
- ✅ `04` — noted tokens are copied into consumer repos
- ✅ `05` — added v0 scope note
- ✅ `06` — added AXK distribution notes section
- ✅ `07` — added AXK distribution conventions
- ⚠️ Fixed: `progress.json` step-1b was incorrectly reset to `not_started` — restored to `completed`

#### 21. Primitives Catalog v0 Status (Feb 15)
- ✅ Added v0 Implementation Key to `AX-PRIMITIVES-STARTER.md`
- ✅ All 48+ primitives now have a `v0 Status` column: 🔨 v0 / ⏳ v1 / ⏳ v2 / —

#### 22. Design Tokens + Shared Types (Feb 16)
- ✅ `src/styles/tokens.css` — all CSS custom properties (palette, status, confidence, typography, spacing, radius, shadows, animation, surfaces)
- ✅ `src/styles/animations.css` — 5 keyframes (pulse, spin, slide-in, fade-in, scale-pop)
- ✅ `src/styles/index.css` — style aggregator
- ✅ `src/types/common.ts` — PlanStep, ToolCall (w/ policyFlags), Artifact (w/ provenance), all union types, `getConfidenceLevel()`
- ✅ `src/index.ts` — style import + type re-exports
- ✅ Build verified: `tsc --noEmit` ✓, `vite build` ✓ (4.12 kB CSS, 0.11 kB JS)

#### 23. AX-CN → AXK Rename (Feb 17)
- ✅ Renamed distribution model from AX-CN to AXK (AX Kit) across 11 doc files (25 references)
- ✅ Future CLI will be `axk` (init, add, list, doctor)
- Rationale: avoid derivative naming confusion with shadcn

#### 24. A11y Utilities + Registry Schema (Feb 17)
- ✅ `src/utils/a11y.tsx` — `VisuallyHidden`, `useAnnouncer` (aria-live), `useFocusTrap`
- ✅ `registry/registry.json` — full manifest for all 6 v0 primitives (files, tokens, a11y notes, principles, state models)
- ✅ Updated `src/index.ts` with a11y exports
- ✅ Build verified: `tsc --noEmit` ✓, `vite build` ✓ (4.12 kB CSS, 10.66 kB JS)

#### 25. Distribution Deep Dive — Saved for Post-v0 (Feb 17)
- 📖 Finished reading **Chapter 10 (Relationship Moats)** and added notes to `docs/internal/research/book-notes/AX-BOOK.md`.-DISTRIBUTION-DEEP-DIVE.md`
- Covers: `axk.json` fingerprint, registry manifests, blocks (run-monitoring-flow, failure-recovery, confidence-escalation)
- 🚫 Deferred: CLI + blocks require components to exist first — revisit after all 6 primitives ship

#### 26. PlanCard — First v0 Primitive (Feb 17)
- ✅ `src/components/PlanCard/PlanCard.types.ts` — props per doc 06
- ✅ `src/components/PlanCard/PlanCard.module.css` — all 6 states, confidence badges, expandable sections
- ✅ `src/components/PlanCard/PlanCard.tsx` — full component with a11y (aria-current, aria-label, useAnnouncer, keyboard nav)
- ✅ `src/components/PlanCard/index.ts` — barrel export
- ✅ `src/css-modules.d.ts` — CSS Modules type declarations
- ✅ Build verified: `tsc --noEmit` ✓, `vite build` ✓ (9.07 kB CSS, 19.25 kB JS)

#### 27. All V0 Primitives Built (Feb 18)
- ✅ `ApprovalGate` — focus trap, aria-live assertive, role=alertdialog, countdown timer (3 urgency levels), staged mode (preview→confirm→execute), scoped approvals (Grant Details), metadata table
- ✅ `ConfidenceMeter` — meter (horizontal bar) + badge (compact pill) displays, role=meter, 3 sizes, animated transitions
- ✅ `RunControls` — role=toolbar, state-dependent button visibility, pulsing status dot, actions slot for v1 extensibility
- ✅ `ToolTrace` — vertical timeline with connector line, auto-scroll for streaming, expandable JSON input/output, policy flag badges, role=log + aria-live
- ✅ `ArtifactCard` — semantic `<article>`, type icon, truncatable preview with gradient fade, metadata table, export buttons, provenance chain
- ✅ Build verified: `tsc --noEmit` ✓, `vite build` ✓ (28.75 kB CSS, 47.26 kB JS, 31 modules)

### Key Decisions
9. **v0 = 6 primitives** — PlanCard, ApprovalGate, ConfidenceMeter, RunControls, ToolTrace, ArtifactCard
10. **CommitGate absorbed** — becomes `ApprovalGate mode="staged"`
11. **UncertaintyBadge absorbed** — becomes `ConfidenceMeter display="badge"`
12. **Scoped approvals** — `ApprovalGate` supports resource-bounded + time-bounded grants (Stripe SPT pattern)
13. **Artifact provenance** — outputs trace back to plan steps and tool calls
14. **AXK model** — renamed from AX-CN to avoid derivative naming with shadcn
15. **A11y as trust** — accessibility failures = trust failures in agent UIs; baked in from primitive #1
16. **Build components before infrastructure** — CLI, blocks, and registry manifests deferred until primitives exist

### Next Steps
- [x] Finish reading AX Book (Chapters 10-12)
- [x] Define Catalog v0 (6-10 primitives)
- [x] Update PRD docs (01-07) to reflect v0 + AXK model
- [x] Reset `progress.json` to match v0
- [x] Scaffold the library (`/vibe-step-1b-init-project`)
- [x] Research synthesis audit (6 gaps closed)
- [x] Second AI review + AXK hardening
- [x] Primitives catalog v0 status tracking
- [x] Design tokens (`/vibe-step-2-design-tokens`)
- [x] Shared types (`/vibe-step-3-shared-types`)
- [x] AX-CN → AXK rename
- [x] A11y utilities (VisuallyHidden, useAnnouncer, useFocusTrap)
- [x] Registry schema (registry.json with a11y notes + state models)
- [x] Build PlanCard (first primitive) ✅
- [x] Build ApprovalGate, ConfidenceMeter, RunControls, ToolTrace, ArtifactCard ✅
- [x] Mock data utilities (step 5) ✅
- [x] Stories / visual tests (step 6) ✅
- [x] Unit tests (step 7)

---

## Session 5 - February 10, 2026

### Overview
Corrected A2UI strategic positioning, expanded Stripe research doc, and audited all internal docs for accuracy and relevance.

### Accomplishments

#### 1. A2UI Strategy Correction
- ✅ Verified A2UI roadmap: Google is building their own React renderer (Q1 2026 with `useA2UI` hook)
- ✅ Reframed strategic opportunity: AX Components is a **design system on top**, not a competing renderer
- ✅ Added renderer landscape table, "Our Actual Wedge" section, and ecosystem alignment framing
- ✅ Added "Dependency Independence" section — A2UI is a compatibility target, not a dependency

#### 2. Stripe Research Expansion
- ✅ Expanded `AX-STRIPE-CHECKOUT-INSIGHTS.md` from 26-line stub to ~170-line analysis
- ✅ Extracted 7 design patterns: layered architecture, SPTs (trust pattern), function calling, authorization chains, auditability, full primitive mapping, and design principles
- ✅ Key insight: `ApprovalGate` should support scoped/bounded/revocable grants, not binary approve/reject

#### 3. Internal Docs Audit
- ✅ Audited all files in `docs/internal/` and `docs/internal/research/`
- ✅ Rewrote `CLAUDE.md` — now reflects 48-primitive catalog, open-source-first, 3-layer architecture, A2UI compatibility
- ✅ Rewrote `BUILDER-SPEC.md` — from single-component spec to full catalog-first specification
- ✅ Added content to `README.md` — now has table of contents and orientation guide
- ✅ Confirmed `SESSION-NOTES.md`, `MONETIZATION-MODEL.md`, and `VC-ORCHESTRATION.md` are current

### Key Decisions
1. **Not competing with Google's renderer** — our wedge is the AX catalog + safety patterns layer above
2. **Approval model is nuanced** — support scoped grants, time-bounded grants, resource caps (from Stripe)
3. **All internal docs now consistent** — no more references to old 4-component/paid-tier model

### Next Steps
- [ ] Define Catalog v0 (6-10 primitives from the 48)
- [ ] Continue AX research in Notion
- [ ] Proceed with project scaffolding when catalog is defined
- [ ] Consider engaging A2UI GitHub repo

---

## Session 4 - February 10, 2026

### Overview
Continued AX research phase. Imported Stripe Agentic Checkout insights and A2UI protocol analysis. Identified a major strategic opportunity: building the reference React renderer for Google's A2UI spec.

### Accomplishments

#### 1. Research Documents
- ✅ Created `docs/internal/research/case-studies/AX-STRIPE-CHECKOUT-INSIGHTS.md`
  - Stripe's approach: protocol + event stream, permissions + approvals, stateful replayable/auditable flows
- ✅ Created `docs/internal/research/architecture-and-protocols/A2UI-Implications.md`
  - Analyzed Google's A2UI spec (v0.8, Apache 2.0) for implications on AX Components
  - Key takeaways: catalog-first, schema-first, event-first design
  - Extracted surface model, adjacency list structure, 4 message types, JSON Pointer data binding
  - Proposed 3-layer architecture: pure primitives → catalog/schemas → renderer/adapter

#### 2. Research Folder Organization
- ✅ Created `docs/internal/research/README.md` — context prompt for AI agents reading the folder

#### 3. A2UI Strategic Opportunity Identified
- 🔥 **A2UI has renderers for Angular and Flutter, but no mature React renderer**
- Building the reference React renderer would give AX Components instant legitimacy
- Aligns perfectly with open-source-first strategy (Apache 2.0 + MIT compatible)
- Opens door to collaboration with Google and CopilotKit teams
- Documented in `docs/internal/research/architecture-and-protocols/A2UI-Implications.md` § "Strategic Opportunity"

### Key Decisions Made
1. **Catalog-first design** — Even without adopting A2UI directly, design primitives as schema-renderable contracts
2. **3-layer library split** — Pure primitives (Layer A), catalog/schemas (Layer B), renderer/adapter (Layer C)
3. **React renderer opportunity** — Noted for future decision, not a commitment yet

### Next Steps
- [ ] Continue AX research in Notion
- [ ] Evaluate feasibility of A2UI React renderer approach
- [ ] Engage with A2UI GitHub repo to signal interest
- [ ] Finalize Catalog v0 primitive selection (6-10 components)
- [ ] Proceed with project scaffolding when research is complete

### Notes
- A2UI is v0.8 and still evolving — tight coupling risk, mitigated by keeping Layer A independent
- Stripe + A2UI research converge on same themes: schemas, state machines, approval flows, auditability

---

## Session 3 (Continued) - February 9, 2026

### Overview
Imported initial AX primitives research, analyzed Storybook limitations, and pivoted monetization strategy from freemium to open-source-first.

### Accomplishments

#### 1. AX Primitives Research
- ✅ Created `docs/internal/research/AX-PRIMITIVES-STARTER.md`
  - 48 primitives across 8 categories
  - Categories: Intent & Delegation, Trust & Approval, Transparency & Trace, Memory, Adaptive Canvas, Control & Steering, Output, Social & Shared-Work
  - Proposed 3-layer architecture: headless primitives, UI components, reference recipes

#### 2. Storybook Analysis
- ⚠️ Identified Storybook limitations for dual-audience (designers + engineers) goals
- Storybook good for development, not ideal for marketing/sales
- Recommendation: Keep Storybook for dev, add lightweight marketing site for demos

#### 3. Monetization Strategy Pivot
- ✅ Rewrote `MONETIZATION-MODEL.md` with open-source-first approach
- **Old:** Freemium with $29-99 paid tiers starting Month 1
- **New:** All primitives MIT licensed, monetize via expertise later
- Phase 1 (Months 1-6): Pure open source, build community
- Phase 2 (Months 3-9): Consulting/workshops ($2-5k/mo target)
- Phase 3 (Month 9+): Enterprise support, premium add-ons
- Updated `01-project-specification.md` to reflect new roadmap

### Key Decisions Made
1. **Open source everything** — 48+ primitives, no paywall
2. **Delay monetization** — Build trust and adoption first
3. **Revenue via expertise** — Consulting, workshops, content, enterprise support
4. **Category leadership over quick revenue** — Become "the standard" for AX

### Next Steps
- [ ] Continue AX research in Notion
- [ ] Expand primitives documentation
- [ ] Decide on marketing site approach (simple Next.js?)
- [ ] Proceed with project scaffolding when research complete

### Notes
- Comparable models: Tailwind (open source → Tailwind UI), Shadcn (fully open → authority)
- Playing long game: adoption → authority → monetization

---

## Session 3 - February 8, 2026

### Overview
Reviewed project status after running `/vibe-status`. Discussed the foundational AX research phase and whether project scaffolding can proceed before research is complete.

### Current Status
- 🟡 **AX Research Phase** — In progress (Notion notes + reading books on AX concepts)
- ✅ **PRD Docs (01-07)** — Exist on disk but not marked complete in `progress.json`
- ⏳ **Vibe Coding Orchestration** — Ready to launch once research informs final component list

### Key Discussion: Research → Ideation → Build

The goal is to capture as much foundational knowledge as possible before launching the orchestration system. This ensures:
- Complete component list (not just the initial 4)
- Well-defined primitives and composition patterns
- Thorough AX concept glossary informing all design decisions

**Proposed workflow:**
1. Complete AX research (Notion + external sources)
2. Bring notes into repo → Create `docs/orchestration/00-ax-concepts.md`
3. Update PRD docs (01-06) if needed
4. Mark Step 1 complete → Proceed to Step 1b+

### Key Decision: Scaffolding Before Research?

**Question:** Can we run `/vibe-step-1b-init-project` while research is ongoing?

**Analysis:**

| Step | Depends on Research? | Safe to Run Now? |
|------|---------------------|------------------|
| 1b: Init Project | ❌ No — tooling is fixed (Vite, React, TS, Storybook, Vitest) | ✅ Yes |
| 2: Design Tokens | ✅ Yes — colors, spacing may change based on concepts | ⚠️ Wait |
| 3: Shared Types | ✅ Yes — types depend on final component list | ⚠️ Wait |
| 4+: Component Build | ✅ Yes — fully dependent on research | ⚠️ Wait |

**Recommendation:** Step 1b (scaffolding) is safe to run now. It sets up infrastructure that won't change regardless of research outcomes. Steps 2-9 should wait for research completion.

### Next Steps
- [ ] Complete AX research in Notion
- [ ] (Optional) Run `/vibe-step-1b-init-project` to scaffold project now
- [ ] Import notes into `docs/orchestration/00-ax-concepts.md`
- [ ] Update PRD docs as needed
- [ ] Resume orchestration workflow from Step 2

### Notes
- Progress.json shows Step 1 as `not_started` despite PRD docs existing — will fix when research is complete
- Scaffolding now would allow testing the dev environment while research continues

---

## Session 2 - February 7, 2026

### Overview
Evaluated Claude Code Agent Teams as an alternative orchestration approach, decided to keep the current skill-based system, and added a new `/vibe-validate-step` utility command for early issue detection.

### Accomplishments
- ✅ Evaluated Agent Teams feature against current Vibe Coding orchestration system
  - Compared on 5 dimensions: dependency chain, file safety, stability, token cost, reproducibility
  - Concluded current skill-based approach is better fit for sequential component library builds with shared files
- ✅ Created `/vibe-validate-step [step]` skill — lightweight per-step validation
  - Runs targeted checks after any step completes (TypeScript compiles, files exist, no `any` types, exports correct, ARIA attributes present)
  - Auto-detects last completed step if no argument given
  - Diagnostic only — does not update progress.json
- ✅ Updated `VC-ORCHESTRATION.md` — added new command to listings, updated count to 14
- ✅ Updated `CLAUDE.md` — added `/vibe-validate-step` to utilities section

### Key Decisions Made
1. **Keep skill-based orchestration** over Agent Teams — sequential dependency chain, shared files, and reproducibility favor the current approach
2. **Agent Teams better suited for** parallel read-heavy tasks (e.g., multi-angle code review), not sequential builds
3. **Validate-step is diagnostic only** — does not mutate progress.json, each step owns its own progress updates

### Next Steps
- [ ] Run `/vibe-status` to verify system works
- [ ] Run `/vibe-step-1b-init-project` to scaffold React project
- [ ] Begin component development workflow

### Notes
- Agent Teams is still experimental (disabled by default) with known limitations around session resumption
- The only real parallelism windows in our dependency graph are step 2+3 and cross-component step 4-7, both too small or conflict-prone to justify Agent Teams overhead
- `/vibe-validate-step` fills the gap between per-step exit criteria and the full step-9 audit

---

## Session 1 (Continued) - February 7, 2026

### Overview
Implemented the complete Vibe Coding orchestration system - a structured workflow using numbered PRD docs and slash commands to orchestrate AI-driven component development.

### Accomplishments

#### 1. Vibe Coding Orchestration Plan
- ✅ Created `VC-ORCHESTRATION.md` - Complete implementation plan
  - Defined 7 numbered PRD docs structure
  - Specified 13 slash commands for workflow automation
  - Documented dependency graph and execution order
  - Added utility commands (`/vibe-clean`, `/vibe-skip-to`)
  - Included verification steps

#### 2. PRD Documentation (docs/orchestration/)
- ✅ Created all 7 numbered specification documents:
  - `01-project-specification.md` (4.6KB) - Project identity, goals, roadmap
  - `02-technical-architecture.md` (6.7KB) - Stack, pipeline, structure
  - `03-ux-design.md` (7.0KB) - Interaction patterns, dual-audience UX
  - `04-design-system.md` (7.4KB) - Color tokens, typography, CSS vars
  - `05-interface-states.md` (8.2KB) - State matrix for all components
  - `06-technical-specifications.md` (8.7KB) - TypeScript API reference
  - `07-universal-format-standards.md` (7.4KB) - Code style, conventions
- ✅ Created `progress.json` (2.6KB) - Progress tracking system

#### 3. Slash Command Skills (.claude/skills/)
- ✅ Created all 13 skill files:
  - **Foundation (5):** status, step-1-ideation, step-1b-init-project, step-2-design-tokens, step-3-shared-types
  - **Per-component (4):** step-4-component, step-5-mock-data, step-6-stories, step-7-tests
  - **Finalization (2):** step-8-docs, step-9-validate
  - **Utilities (2):** vibe-clean, vibe-skip-to

#### 4. Documentation Updates
- ✅ Updated `CLAUDE.md` - Added Vibe Coding system documentation
- ✅ Removed `PROJECT-CONTEXT.md` - Content merged into builder-spec.md

### System Architecture

**Workflow:** PRD Docs → Slash Commands → Progress Tracking → Component Output

**Key Features:**
- **Modular:** Build one component at a time
- **Scalable:** Easy to add new components
- **Tracked:** JSON-based progress monitoring
- **Reusable:** Foundation steps run once
- **Parallel:** Some steps can run concurrently

### Files Created This Session

```
docs/orchestration/
├── 01-project-specification.md
├── 02-technical-architecture.md
├── 03-ux-design.md
├── 04-design-system.md
├── 05-interface-states.md
├── 06-technical-specifications.md
├── 07-universal-format-standards.md
└── progress.json

.claude/skills/
├── vibe-status/SKILL.md
├── vibe-step-1-ideation/SKILL.md
├── vibe-step-1b-init-project/SKILL.md
├── vibe-step-2-design-tokens/SKILL.md
├── vibe-step-3-shared-types/SKILL.md
├── vibe-step-4-component/SKILL.md
├── vibe-step-5-mock-data/SKILL.md
├── vibe-step-6-stories/SKILL.md
├── vibe-step-7-tests/SKILL.md
├── vibe-step-8-docs/SKILL.md
├── vibe-step-9-validate/SKILL.md
├── vibe-clean/SKILL.md
└── vibe-skip-to/SKILL.md

Root:
├── VC-ORCHESTRATION.md
├── BUILDER-SPEC.md (renamed from builder-spec.md)
├── MONETIZATION-MODEL.md
└── SESSION-NOTES.md (this file)
```

### Next Steps

- [ ] Push all changes to GitHub
- [ ] Run `/vibe-status` to verify system works
- [ ] Run `/vibe-step-1b-init-project` to scaffold React project
- [ ] Begin component development workflow

### Notes

- Complete Vibe Coding orchestration system is now in place
- All documentation is properly formatted and organized
- Ready to begin automated component development
- System supports incremental component additions

---

## Session 1 - February 7, 2026

### Overview
Initial project setup and documentation formatting. Established core project structure and strategic documents for the AX Components React library.

### Accomplishments

#### 1. Documentation Formatting
- ✅ Formatted `PROJECT-CONTEXT.md` with proper markdown structure
  - Added consistent heading hierarchy
  - Fixed code blocks with language specification
  - Improved spacing and readability
  
- ✅ Formatted `BUILDER-SPEC-updated.md`
  - Added proper heading levels
  - Organized implementation tasks clearly
  - Split example usage into two paths (Prototyping vs Production)
  
- ✅ Compared `BUILDER-SPEC.md` and `BUILDER-SPEC-updated.md`
  - Identified that updated version is more comprehensive
  - Recommended using updated version as primary spec
  
- ✅ User merged improvements into `builder-spec.md`
  - Added "Prototype to Production" positioning
  - Included dual-audience approach (designers + engineers)
  - Added mock data utilities and examples folder
  - Expanded success criteria

- ✅ Formatted `MONETIZATION-MODEL.md`
  - Created clear tier structure (Free, $29, $79, $99)
  - Organized revenue projections and 90-day rollout plan
  - Improved readability with proper hierarchy and visual separation

#### 2. Repository Setup
- ✅ Attempted GitHub repository initialization
  - Git already initialized locally
  - Remote configured: `git@github.com:Iambizi/AX-CMP-S-K.git`
  - ⚠️ Push failed due to SSH timeout (network/configuration issue)
  - **Action needed:** User needs to either configure SSH keys or use HTTPS remote

#### 3. Project Files Created/Updated
- `PROJECT-CONTEXT.md` - Core project specification
- `builder-spec.md` - Comprehensive builder specification (merged with updated version)
- `BUILDER-SPEC-updated.md` - Updated specification document
- `MONETIZATION-MODEL.md` - Complete monetization strategy
- `SESSION-NOTES.md` - This file

### Key Decisions Made

1. **CSS Approach:** Using CSS Modules (not Tailwind)
2. **Positioning:** "From prototype to production"
3. **Dual Audience:** Designers/PMs (prototyping) + Engineers (production)
4. **Monetization Model:** Freemium with three paid tiers
5. **Target Revenue (Month 3):** $2,000-5,000

### Next Steps

- [ ] Resolve GitHub SSH connection issue
- [ ] Push initial commit to GitHub
- [ ] Begin project setup with Vite + React + TypeScript
- [ ] Initialize Storybook and Vitest
- [ ] Start building first component: `AgentProgressTracker`

### Notes

- All specification documents are now properly formatted and consistent
- Project has clear technical and business strategy
- Ready to begin implementation phase

---

## Session Template (for future sessions)

```markdown
## Session X - [Date]

### Overview
Brief summary of what was accomplished

### Accomplishments
- ✅ Item completed
- ⚠️ Item attempted but needs follow-up
- ❌ Item blocked or failed

### Decisions Made
Key technical or strategic decisions

### Next Steps
- [ ] Action items for next session

### Notes
Any important context or observations
```

