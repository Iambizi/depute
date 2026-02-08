# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AX Components for React** is a React component library for Agentic Experience (AX) design - building user interfaces that work seamlessly with AI agents performing autonomous, multi-step tasks.

**Key Positioning:** "From prototype to production" - The same components designers use to build functional prototypes that engineers use to ship production features.

## What is Agentic Experience (AX)?

AX is the design discipline for interfaces where AI agents act on behalf of users. Key challenges addressed:

- **Probabilistic outcomes**: Agent actions have confidence scores, not binary success/failure
- **Autonomous multi-step workflows**: Agents execute complex tasks without constant human input
- **Transparency requirements**: Users need to see what agents are doing and why
- **Human-in-the-loop patterns**: Critical decisions require human approval
- **Asynchronous operations**: Agent tasks may take seconds or minutes to complete

## Tech Stack

- React 18+ with TypeScript
- Modern CSS (CSS Modules - NOT Tailwind)
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

Every component must serve TWO distinct audiences:

1. **Designers/PMs (Prototyping)**: Need functional prototypes with mock data that respond, fail gracefully, and show probabilistic behavior
2. **Engineers (Production)**: Need production-ready components that handle real agent APIs, edge cases, and performance

The same code must work in both contexts with minimal changes.

### Code Quality Requirements

- **Fully typed TypeScript** - No `any` types allowed
- **Accessible components** - ARIA labels, keyboard navigation, screen reader support
- **Responsive design** - Works across device sizes
- **Props should be intuitive** for React developers
- **Components work with mock data AND live data**
- **Clean, commented code** explaining AX-specific design decisions

### Design Principles

- **Transparency First**: Always show what the agent is doing and why
- **Confidence Communication**: Make probabilistic nature visible but not overwhelming
- **Graceful Degradation**: Work well even with minimal information
- **Human Control**: Enable oversight without requiring constant attention
- **Familiar Patterns**: Build on React conventions developers know
- **Prototype-to-Production Path**: Components work identically in both contexts

### Anti-Patterns to Avoid

- Do NOT over-engineer solutions
- Do NOT add features beyond what's specified
- Do NOT add error handling for scenarios that can't happen
- Do NOT create abstractions for one-time operations
- Do NOT use Tailwind CSS (use CSS Modules)
- Do NOT make components dependent on specific AI backends

## Component Development Checklist

When building a new component:

1. **TypeScript Types** - Define all interfaces in `[Component].types.ts`
2. **Component Implementation** - Build in `[Component].tsx` with full features
3. **Styling** - Create CSS modules in `[Component].module.css`
4. **Mock Data Utilities** - Add helpers in `src/utils/mockData.ts`
5. **Tests** - Write Vitest tests in `[Component].test.tsx`
6. **Storybook Stories** - Create stories serving BOTH audiences:
   - Prototyping Stories (auto-advancing mock data, interactive controls)
   - Production Stories (real API data shape, error handling)
   - Shared Stories (default states, variations)
7. **Documentation** - Include AX problem solved and usage examples

## Storybook Story Requirements

Stories must demonstrate both prototyping and production use cases:

**Prototyping Stories:**
- "Quick Start: Prototype [Feature] Flow" with auto-advancing mock data
- "Test Different [Variations]" with interactive controls
- "Simulate Real-Time Updates" with live state changes

**Production Stories:**
- "Basic Usage" with minimal integration example
- "With Real API Data" showing expected data shape
- "Error Handling" demonstrating edge cases

**Shared Stories:**
- Default state
- All major feature variations
- Accessibility demonstrations

## Mock Data Philosophy

Mock data utilities (`src/utils/mockData.ts`) are critical for prototyping:

- Generate realistic agent steps with confidence scores
- Simulate timing delays and async behavior
- Include error state generators
- Provide auto-animation helpers
- Must be simple to use (ideally one function call)

Example pattern:
```typescript
simulateAgentProgress({
  totalSteps: 4,
  onUpdate: setSteps,
  delayMs: 2000,
});
```

## First Component: AgentProgressTracker

The initial component solves a core AX problem: Traditional progress indicators assume deterministic workflows, but AI agents operate probabilistically with dynamic workflows where steps may be discovered during execution, each with confidence levels.

Key features:
- Display current agent activity with reasoning
- Show completed steps with timestamps
- Indicate active step with dynamic status
- Display confidence scores (0-100%)
- Handle unknown total steps gracefully
- Support determinate and indeterminate modes
- Show error states with recovery information

## Monetization Model

This is a freemium product with paid tiers:

- **Free Tier**: 3-4 core AX components (open source, MIT)
- **Prototype Pack** ($29): Templates, mock data library, rapid setup guides
- **Production Pack** ($79): 8 advanced components, integration guides, testing utilities
- **Complete Bundle** ($99): Everything plus templates, handbook, office hours

Keep paid components separate from free tier. Advanced features stay in paid packages.

## Accessibility Standards

All components must meet WCAG 2.1 AA standards:

- Screen reader announces step changes and state updates
- Keyboard navigable for all interactive elements
- Color is never the only indicator of status
- Proper ARIA roles and labels
- Focus management for dynamic content
- Sufficient color contrast ratios

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

  // Callbacks
  onEvent?: (item: DataType) => void;

  // Styling
  className?: string;
}
```

### Agent Step Pattern
```typescript
interface AgentStep {
  id: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  label: string;
  description?: string;
  confidence?: number; // 0-100
  timestamp?: Date;
  reasoning?: string; // Why the agent took this action
  errorMessage?: string;
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

- `BUILDER-SPEC.md` - Complete technical specification for implementation
- `MONETIZATION-MODEL.md` - Business model and tier structure
- `SESSION-NOTES.md` - Development session history and decisions
- `README.md` - User-facing documentation (to be created)

## Vibe Coding Orchestration System

This project uses a step-based orchestration system via slash commands. PRD documentation lives in `docs/vibe-coding/` and progress is tracked in `docs/vibe-coding/progress.json`.

### Available Commands

**Status:**
- `/vibe-status` — Dashboard showing what's done, current, and next

**Foundation (run once, in order):**
1. `/vibe-step-1-ideation` — Creates 7 PRD docs + progress.json
2. `/vibe-step-1b-init-project` — Scaffolds Vite+React+TS, Storybook, Vitest
3. `/vibe-step-2-design-tokens` — CSS custom properties (can parallel with step 3)
4. `/vibe-step-3-shared-types` — Shared TypeScript types (can parallel with step 2)

**Per-component (run for each of the 4 components):**
5. `/vibe-step-4-component [Name]` — Component folder: .tsx, .types.ts, .module.css, index.ts
6. `/vibe-step-5-mock-data [Name]` — Mock data generators (depends on step 4)
7. `/vibe-step-6-stories [Name]` — Storybook stories (depends on step 5)
8. `/vibe-step-7-tests [Name]` — Vitest tests (depends on step 4, parallel with step 5)

**Finish (after all components):**
9. `/vibe-step-8-docs` — README.md, examples/, quick starts
10. `/vibe-step-9-validate` — Full audit: TS, tests, build, exports, a11y

**Utilities:**
- `/vibe-validate-step [step]` — Run targeted checks after a step completes (catches issues early)
- `/vibe-clean` — Reset progress.json (optionally per-component)
- `/vibe-skip-to [step]` — Mark prior steps as complete (for testing)

### Component Names (for per-component steps)
- `AgentProgressTracker`
- `ConfidenceScoreBadge`
- `AgentStatusIndicator`
- `BasicHumanApprovalGate`

### PRD Documentation
The 7 numbered docs in `docs/vibe-coding/` contain the full specification:
- `01-project-specification.md` — Goals, audiences, roadmap
- `02-technical-architecture.md` — Stack, configs, structure
- `03-ux-design.md` — Interaction patterns, animations
- `04-design-system.md` — CSS tokens, colors, typography
- `05-interface-states.md` — State matrices per component
- `06-technical-specifications.md` — TypeScript APIs, mock data APIs
- `07-universal-format-standards.md` — Code style, naming, test format

## Important Context

- CSS Modules are preferred over Tailwind to avoid external dependencies
- Components should never be tied to specific AI backends (OpenAI, Anthropic, etc.)
- The "prototype to production" positioning is core to the value proposition
- Mock data utilities are just as important as the components themselves
- Every component should solve a specific AX design problem (document which one)
