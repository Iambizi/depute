# ax-depute

> CLI for [AX Components](https://github.com/Iambizi/depute) — copy-paste React primitives for agentic experiences.

```bash
npx ax-depute@latest add approval-gate
npx ax-depute@latest add orchestrator-view
npx ax-depute list
```

## What is this?

ax-depute follows the [shadcn/ui](https://ui.shadcn.com/) distribution model. Instead of importing from `node_modules`, components are **copied directly into your project** — you own the code, you control the customization.

## Quick Start

### List available components

```bash
npx ax-depute list
```

### Add a single component

```bash
npx ax-depute@latest add plan-card
```

Files are written to `src/components/<Component>/` by default:

```
src/
  components/
    PlanCard/
      PlanCard.tsx
      PlanCard.module.css
      PlanCard.types.ts
      index.ts
  types/
    ax-common.ts     ← shared types (added once)
  utils/
    ax-a11y.tsx      ← accessibility utilities (added once)
  styles/
    depute.css       ← tokens + motion (import once)
    tokens.css
    animations.css
```

Import the tokens once. When `src/index.css` exists, the CLI adds this line:

```css
@import "./styles/depute.css";
```

### Custom output directory

```bash
npx ax-depute@latest add run-controls --dir components/ax
```

Shared files move with the directory: `components/types`, `components/utils`, and `components/styles`. Component imports are rewritten to those paths.

### Prototyping generators

```bash
npx ax-depute add mock-data
```

## Available Components

### v0 — Single Agent (7 primitives)

| Component | Description |
|---|---|
| `plan-card` | Proposed plan with steps, assumptions, progress |
| `approval-gate` | Human-in-the-loop approval with scoped grants |
| `confidence-meter` | Confidence score + reasoning signals |
| `run-controls` | Pause, resume, stop, retry toolbar |
| `tool-trace` | Streaming timeline of agent tool calls |
| `artifact-card` | Final output card with export options |
| `automation-bias-alert` | Friction when approvals start to look automatic |

### v1 — Multi-Agent Orchestration (11 primitives)

| Component | Description |
|---|---|
| `orchestrator-view` | Recursive tree of orchestrator → subagent hierarchy |
| `agent-roster` | Dense table for scanning 20+ agents simultaneously |
| `subagent-card` | Single agent's plan progress and token usage |
| `task-queue` | Grouped backlog with priority chips and actions |
| `handoff-protocol` | Agent-to-agent handoff payload viewer |
| `delegation-gate` | Gate for authorizing new agent spawning |
| `swarm-monitor` | KPI dashboard: instances, tokens, cost, errors |
| `escalation-router` | Error alertdialog with 3-way resolution |
| `swarm-inbox` | Attention-triage inbox for human review items |
| `branch-controls` | Scoped steering panel for an agent branch |
| `shared-context-ledger` | Read-only scoped memory viewer |

## How it works

1. `npx ax-depute@latest add <component>` reads the registry for that CLI version
2. Each file is checked against the sha256 manifest shipped with the package
3. Files are written into your project — no runtime dependency, no lock-in
4. Shared types, a11y helpers, and design tokens are added once

## Requirements

- Node 18+
- A React project with TypeScript and CSS Modules support
