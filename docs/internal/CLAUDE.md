# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AX Components for React** is an open-source (MIT) React component library for Agentic Experience (AX) design — building user interfaces for AI agents performing autonomous, multi-step tasks.

**Key Positioning:** A catalog-first AX design system. Not a chat widget library — a complete set of primitives for delegation, trust, transparency, and control.

**Strategy:** Open source first, monetize through expertise once established. All 48+ primitives are MIT licensed. See `MONETIZATION-MODEL.md` for details.

## What is Agentic Experience (AX)?

AX is the design discipline for interfaces where AI agents act on behalf of users. Key challenges addressed:

- **Probabilistic outcomes**: Agent actions have confidence scores, not binary success/failure
- **Autonomous multi-step workflows**: Agents execute complex tasks without constant human input
- **Transparency requirements**: Users need to see what agents are doing and why
- **Human-in-the-loop patterns**: Critical decisions require human approval
- **Asynchronous operations**: Agent tasks may take seconds or minutes to complete
- **Safe delegation**: Users need scoped, bounded, revocable control over what agents can do

## Primitive Catalog (48+ across 8 categories)

The library provides primitives organized into 8 functional categories:

| Category | Examples | Purpose |
|----------|----------|---------|
| **Intent & Delegation** | `IntentBar`, `PlanCard`, `StepList` | Move from talking to committing work |
| **Trust & Approval** | `ApprovalGate`, `RiskBadge`, `PermissionScope` | Boundaries, consent, confidence |
| **Transparency & Trace** | `ToolTrace`, `ReasonPanel`, `ProgressStream` | Make the system legible |
| **Memory** | `MemoryPanel`, `MemoryChip`, `MemoryConsentToggle` | Visible, editable memory |
| **Adaptive Canvas** | `AdaptiveCanvas`, `DiffViewer`, `VersionRail` | Where work gets finalized |
| **Control & Steering** | `RunControls`, `ThrottleControl`, `Checkpoint` | Steer without breaking flow |
| **Output** | `ArtifactCard`, `ValidationSummary`, `NextActionBar` | Shippable, integrated outputs |
| **Social & Shared-Work** | `ShareContext`, `AuditLog`, `RoleBadges` | Team collaboration |

Full catalog: `docs/internal/research/AX-Primitives-starter.md`

## Architecture: 3 Layers

The library is structured as 3 independent layers:

**Layer A: Pure AX Primitives**
- Just React components + typed props
- No agent runtime assumptions
- Can be used in normal (non-agent) apps

**Layer B: Catalog + Schemas**
- JSON schema / Zod schema per primitive
- Event schemas and policy flags (`requiresApproval`, `writesState`, `externalAction`)
- Versioned catalog export

**Layer C: Renderer + Adapter (optional)**
- Adapter for A2UI protocol compatibility (optional, not a dependency)
- Event bridge back to agent runtimes
- Validation + safety gates

Layer A is always useful standalone. Layer C is optional.

## A2UI Protocol Relationship

Google's A2UI is a **compatibility target**, not a dependency. Our only real dependency is React. The project is spec-aligned with A2UI but does not require it. See `docs/internal/research/A2UI-Implications.md` for full analysis.

## Tech Stack

- React 18+ with TypeScript
- Modern CSS (CSS Modules — NOT Tailwind)
- Storybook for component documentation and live examples
- Vitest for testing
- Vite for build tooling
- No external UI library dependencies (building primitives)

## Project Structure

```
ax-components-react/
├── src/
│   ├── components/          # All React components
│   │   └── [ComponentName]/
│   │       ├── [ComponentName].tsx
│   │       ├── [ComponentName].types.ts
│   │       ├── [ComponentName].module.css
│   │       ├── [ComponentName].test.tsx
│   │       └── index.ts
│   ├── types/              # Shared TypeScript types
│   │   └── common.ts
│   ├── utils/              # Utilities and mock data generators
│   │   └── mockData.ts
│   └── index.ts
├── stories/                # Storybook stories
├── examples/               # Example setups
│   ├── prototype-setup/   # Quick start for prototyping
│   └── production-setup/  # Integration guide for production
```

## Development Philosophy

### Dual-Audience Approach

Every component serves TWO audiences:

1. **Designers/PMs (Prototyping)**: Functional prototypes with mock data that respond, fail gracefully, and show probabilistic behavior
2. **Engineers (Production)**: Production-ready components for real agent APIs, edge cases, and performance

The same code works in both contexts with minimal changes.

### Design Principles

- **Transparency First**: Always show what the agent is doing and why
- **Safe Delegation**: Scoped, bounded, revocable permissions — not binary approve/reject
- **Confidence Communication**: Make probabilistic nature visible but not overwhelming
- **Graceful Degradation**: Work well even with minimal information
- **Human Control**: Enable oversight without requiring constant attention
- **Familiar Patterns**: Build on React conventions developers know
- **Prototype-to-Production Path**: Components work identically in both contexts
- **Catalog-First**: Primitives designed as schema-renderable contracts

### Code Quality Requirements

- **Fully typed TypeScript** — No `any` types allowed
- **Accessible components** — ARIA labels, keyboard navigation, screen reader support (WCAG 2.1 AA)
- **Responsive design** — Works across device sizes
- **Props should be intuitive** for React developers
- **Components work with mock data AND live data**
- **Clean, commented code** explaining AX-specific design decisions

### Anti-Patterns to Avoid

- Do NOT over-engineer solutions
- Do NOT add features beyond what's specified
- Do NOT use Tailwind CSS (use CSS Modules)
- Do NOT make components dependent on specific AI backends
- Do NOT treat approvals as binary yes/no — support scoped, bounded grants

## Component Development Checklist

When building a new component:

1. **TypeScript Types** — Define all interfaces in `[Component].types.ts`
2. **Component Implementation** — Build in `[Component].tsx` with full features
3. **Styling** — Create CSS modules in `[Component].module.css`
4. **Mock Data Utilities** — Add helpers in `src/utils/mockData.ts`
5. **Tests** — Write Vitest tests in `[Component].test.tsx`
6. **Storybook Stories** — Create stories serving BOTH audiences:
   - Prototyping Stories (auto-advancing mock data, interactive controls)
   - Production Stories (real API data shape, error handling)
   - Shared Stories (default states, variations)
7. **Documentation** — Include AX problem solved and usage examples

## TypeScript Patterns

### Component Props Interface Pattern
```typescript
interface ComponentProps {
  // Required props first
  data: DataType[];

  // Optional configuration
  mode?: 'determinate' | 'indeterminate';

  // Feature flags (default false)
  showFeature?: boolean;

  // Policy flags
  policyFlags?: ('requiresApproval' | 'writesState' | 'externalAction')[];

  // Callbacks
  onEvent?: (item: DataType) => void;

  // Styling
  className?: string;
}
```

## Common Development Tasks

### Setup (when project is initialized)
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run storybook    # Run Storybook
npm test             # Run tests
npm run build        # Build for production
```

### Testing
```bash
npm test                    # Run all tests
npm test -- --watch        # Run tests in watch mode
npm test -- ComponentName  # Run specific test
```

## Key Files Reference

- `BUILDER-SPEC.md` — Technical specification and implementation guide
- `MONETIZATION-MODEL.md` — Open-source-first business strategy
- `SESSION-NOTES.md` — Development session history and decisions
- `VC-ORCHESTRATION.md` — Vibe Coding orchestration system plan
- `research/` — AX research: A2UI analysis, Stripe patterns, primitive catalog

## Vibe Coding Orchestration System

This project uses a step-based orchestration system via slash commands. PRD documentation lives in `docs/orchestration/` and progress is tracked in `docs/orchestration/progress.json`.

### Available Commands

**Status:**
- `/vibe-status` — Dashboard showing what's done, current, and next

**Foundation (run once, in order):**
1. `/vibe-step-1-ideation` — Creates 7 PRD docs + progress.json
2. `/vibe-step-1b-init-project` — Scaffolds Vite+React+TS, Storybook, Vitest
3. `/vibe-step-2-design-tokens` — CSS custom properties (can parallel with step 3)
4. `/vibe-step-3-shared-types` — Shared TypeScript types (can parallel with step 2)

**Per-component (run for each component):**
5. `/vibe-step-4-component [Name]` — Component folder: .tsx, .types.ts, .module.css, index.ts
6. `/vibe-step-5-mock-data [Name]` — Mock data generators (depends on step 4)
7. `/vibe-step-6-stories [Name]` — Storybook stories (depends on step 5)
8. `/vibe-step-7-tests [Name]` — Vitest tests (depends on step 4, parallel with step 5)

**Finish (after all components):**
9. `/vibe-step-8-docs` — README.md, examples/, quick starts
10. `/vibe-step-9-validate` — Full audit: TS, tests, build, exports, a11y

**Utilities:**
- `/vibe-validate-step [step]` — Run targeted checks after a step completes
- `/vibe-clean` — Reset progress.json (optionally per-component)
- `/vibe-skip-to [step]` — Mark prior steps as complete (for testing)

### PRD Documentation
The 7 numbered docs in `docs/orchestration/` contain the full specification:
- `01-project-specification.md` — Goals, audiences, roadmap
- `02-technical-architecture.md` — Stack, configs, structure
- `03-ux-design.md` — Interaction patterns, animations
- `04-design-system.md` — CSS tokens, colors, typography
- `05-interface-states.md` — State matrices per component
- `06-technical-specifications.md` — TypeScript APIs, mock data APIs
- `07-universal-format-standards.md` — Code style, naming, test format

## Important Context

- CSS Modules preferred over Tailwind to avoid external dependencies
- Components should never be tied to specific AI backends (OpenAI, Anthropic, etc.)
- The "prototype to production" positioning is core to the value proposition
- Mock data utilities are just as important as the components themselves
- Every component should solve a specific AX design problem (document which one)
- Approvals should be scoped, bounded, and revocable — not binary yes/no (see Stripe research)
- Agent flows are state machines with approval gates at trust boundaries
