---
name: vibe-step-8-docs
description: Create README.md, examples/, and dual-audience quick-start guides
disable-model-invocation: true
allowed-tools: Read, Write, Bash(mkdir *)
---

# Step 8: Documentation

Create the user-facing README, example setups, and quick-start guides.

## Prerequisites

Read `docs/orchestration/progress.json` and verify:
- ALL four components have `step-4-component`, `step-5-mock-data`, `step-6-stories`, `step-7-tests` status `completed`

If any component steps are incomplete, tell the user which steps to complete first.

## Reference Docs

Read these:
- `docs/orchestration/01-project-specification.md` — Project identity, goals, audiences
- `docs/orchestration/06-technical-specifications.md` — Component APIs for documentation
- `docs/orchestration/02-technical-architecture.md` — Installation, scripts
- `src/index.ts` — Actual exports to document

## Step 1: Create README.md

Write `README.md` in the project root with:

### Sections:
1. **Header** — Project name, tagline ("From prototype to production"), badges
2. **What is AX?** — Brief explanation of Agentic Experience
3. **Components** — Table of 4 components with descriptions
4. **Installation** — `npm install ax-components-react`
5. **Quick Start: Prototyping** — 5-minute setup with mock data
   - Import component + mock utilities
   - `simulateAgentProgress` example
   - "Have a working prototype in under 5 minutes"
6. **Quick Start: Production** — Integration with real agent APIs
   - Same component, real data
   - Show how minimal the change is
7. **API Reference** — Link to Storybook or brief props table per component
8. **Storybook** — How to run `npm run storybook`
9. **Contributing** — Basic contribution guidelines
10. **License** — MIT

## Step 2: Create Prototype Setup Example

Write `examples/prototype-setup/README.md`:
- Step-by-step guide to prototyping with AX Components
- Complete code example using mock data
- "Copy this into a new React app" approach

Write `examples/prototype-setup/App.tsx`:
- Working React component using all 4 AX components
- Uses mock data utilities for all components
- Auto-advancing simulation

## Step 3: Create Production Setup Example

Write `examples/production-setup/README.md`:
- Step-by-step guide to production integration
- How to connect to a real agent API
- State management patterns

Write `examples/production-setup/App.tsx`:
- Working React component using all 4 AX components
- Shows how to wire to real data (typed, no implementation)
- Demonstrates the prototype-to-production migration

## Step 4: Update Progress

Read `docs/orchestration/progress.json`, set `globalSteps.step-8-docs.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- `README.md` exists with all 10 sections
- `examples/prototype-setup/` has README.md and App.tsx
- `examples/production-setup/` has README.md and App.tsx
- Prototyping quick start demonstrates mock data usage
- Production quick start shows real API integration pattern
- Both examples use the same components (demonstrating the value prop)
- Progress updated
- Confirm: "Documentation complete. Run `/vibe-step-9-validate` for final audit."
