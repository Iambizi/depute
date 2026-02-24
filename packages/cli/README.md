# ax-depute

> CLI for [AX Components](https://github.com/Iambizi/depute) — copy-paste React primitives for agentic experiences.

```bash
npx ax-depute add approval-gate
npx ax-depute add orchestrator-view
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
npx ax-depute add plan-card
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
```

### Custom output directory

```bash
npx ax-depute add plan-card --dir components/ax
```

## Available Components

### v0 — Single Agent (6 primitives)

| Component | Description |
|---|---|
| `plan-card` | Proposed plan with steps, assumptions, progress |
| `approval-gate` | Human-in-the-loop approval with scoped grants |
| `confidence-meter` | Confidence score + reasoning signals |
| `run-controls` | Pause, resume, stop, retry toolbar |
| `tool-trace` | Streaming timeline of agent tool calls |
| `artifact-card` | Final output card with export options |

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

1. `npx ax-depute add <component>` fetches `registry.json` from this repo
2. Each file in the component's `files[]` list is fetched from GitHub raw
3. Files are written to your project — no installation, no lock-in
4. Shared types (`ax-common.ts`) and utilities are added once

## Requirements

- Node 18+
- A React project with TypeScript and CSS Modules support
