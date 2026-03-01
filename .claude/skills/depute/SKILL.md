---
name: depute
description: React component library for Agentic Experience (AX) design — purpose-built UI primitives for AI agent supervision and human oversight. Use when building interfaces for AI agents, autonomous workflows, or multi-agent systems. Triggers on: "agent UI", "approval gate", "confidence score", "tool trace", "agent plan", "pause agent", "human oversight", "AX component", "delegation interface", "agent audit", "orchestrator view", "swarm monitor", "handoff", "agent inbox", "escalation", "run controls", "npx ax-depute". Do NOT use for general React UI, standard CRUD interfaces, or non-agent applications.
license: MIT
compatibility: React 18+, TypeScript, CSS Modules. Agent-agnostic — works with any AI backend (OpenAI, Anthropic, LangChain, AutoGen, or custom).
metadata:
  author: Iambizi
  version: 0.2.0
  documentation: https://github.com/Iambizi/depute
  category: ui-components
  tags: [agentic-ui, react, human-in-the-loop, agent-oversight, multi-agent]
---

# depute

React primitives for the human side of agentic AI. When an AI agent runs in your product, users need to see what's happening — not raw logs, but purpose-built UI for human oversight of autonomous systems.

## Instructions

### Step 1: Determine agent complexity

**Single agent acting on behalf of a user?** → Use v0 Core Primitives
**Multiple agents coordinating, delegating, or running in parallel?** → Use v1 Multi-Agent Orchestration

When in doubt, start with v0. v1 wraps v0 — drilling into any v1 node should reveal the familiar v0 toolkit (PlanCard, ToolTrace, ApprovalGate) scoped to that sub-agent.

### Step 2: Select the right component

**v0 — Single Agent**

| Need | Component | Install |
|------|-----------|---------|
| Show the agent's proposed plan before it runs | `PlanCard` | `npx ax-depute add plan-card` |
| Block execution and ask the user to approve a risky action | `ApprovalGate` | `npx ax-depute add approval-gate` |
| Show how confident the agent is in its next step | `ConfidenceMeter` | `npx ax-depute add confidence-meter` |
| Let user pause, resume, stop, or retry a running agent | `RunControls` | `npx ax-depute add run-controls` |
| Show a live timeline of every tool call (input, output, errors) | `ToolTrace` | `npx ax-depute add tool-trace` |
| Render the final output of a workflow with export and provenance | `ArtifactCard` | `npx ax-depute add artifact-card` |

**v1 — Multi-Agent Orchestration**

| Need | Component | Install |
|------|-----------|---------|
| Visualize the full agent hierarchy as a collapsible tree | `OrchestratorView` | `npx ax-depute add orchestrator-view` |
| Status dashboard for all active sub-agents | `AgentRoster` | `npx ax-depute add agent-roster` |
| Single-agent card: identity, status, tool usage, task context | `SubagentCard` | `npx ax-depute add subagent-card` |
| Scoped pause/resume/quarantine for one branch of the tree | `BranchControls` | `npx ax-depute add branch-controls` |
| High-level grid: throughput, blocked agents, token spend | `SwarmMonitor` | `npx ax-depute add swarm-monitor` |
| Inbox for inter-agent messages — review, approve, or redirect | `SwarmInbox` | `npx ax-depute add swarm-inbox` |
| Ordered task queue for a single agent, with priority and status | `TaskQueue` | `npx ax-depute add task-queue` |
| Approval surface for cross-agent delegation / agent spawning | `DelegationGate` | `npx ax-depute add delegation-gate` |
| Visual card for structured handoffs between agents | `HandoffProtocol` | `npx ax-depute add handoff-protocol` |
| Read-only log of shared memory/context passed between agents | `SharedContextLedger` | `npx ax-depute add shared-context-ledger` |
| Display escalation events from sub-agents with routing overrides | `EscalationRouter` | `npx ax-depute add escalation-router` |

For deep component details, prop shapes, composition flows, and triage decisions, see:
- `references/v0-components.md`
- `references/v1-components.md`

### Step 3: Install the component

```bash
# List all available components
npx ax-depute list

# Copy component source into your project (you own the code)
npx ax-depute add approval-gate
```

Components are written to `src/components/<ComponentName>/`. Shared types land once in `src/types/ax-common.ts`. No lock-in — customize freely.

### Step 4: Wire it to your agent's state

Components accept typed props — map your agent's event stream to the prop interfaces. If you don't have a backend yet, use the built-in mock data generators:

```tsx
import { generateMockPlan, generateMockToolCalls } from '@/utils/mockData';

const plan = generateMockPlan(4);       // 4-step agent plan
const trace = generateMockToolCalls(3); // 3 tool call entries
```

The mock generators show the exact shape each component expects.

---

## Common Patterns

### Pattern: Plan → Approval → Trace

The most common AX flow — show the plan, gate high-risk actions, then display what happened:

```tsx
// 1. Before the agent runs
<PlanCard steps={agent.proposedPlan} assumptions={agent.assumptions} />

// 2. Before a destructive action
<ApprovalGate
  title={action.label}
  agentReasoning={action.reasoning}
  onApprove={agent.continue}
  onReject={agent.abort}
/>

// 3. After the run
<ToolTrace calls={agent.toolHistory} />
<ArtifactCard output={agent.result} format="markdown" />
```

### Pattern: Multi-Agent Supervision Dashboard

```tsx
// Top-level overview
<OrchestratorView tree={orchestrator.agentTree} />

// Status panel for all agents
<AgentRoster agents={orchestrator.activeAgents} />

// Catch escalations and inter-agent messages
<EscalationRouter events={orchestrator.escalations} />
<SwarmInbox messages={orchestrator.interAgentMessages} />
```

### Pattern: Swarm Monitoring

```tsx
// High-level health grid
<SwarmMonitor
  agents={swarm.agents}
  throughput={swarm.metrics.throughput}
  tokenSpend={swarm.metrics.tokens}
/>

// Scoped control for a troubled branch
<BranchControls
  branchId={selectedBranch.id}
  onPause={swarm.pauseBranch}
  onQuarantine={swarm.quarantineBranch}
/>
```

---

## Design Principles

**Human oversight, not human bottleneck.** Surface the right information at the right moment — not a raw dump of agent internals.

**You own the code.** Distributed via CLI copy-paste, like shadcn/ui. The source lives in your repo.

**Agent-agnostic.** Works with any AI backend. Components accept typed props; you wire them to your event streams.

**Accessible by default.** WCAG 2.1 AA, keyboard navigation, ARIA roles throughout.

---

## Troubleshooting

**Component not found after `npx ax-depute add`**
Run `npx ax-depute list` to see exact component slugs. Use kebab-case (e.g., `approval-gate` not `ApprovalGate`).

**TypeScript errors on shared types**
Check that `src/types/ax-common.ts` exists — it's created on first install. If missing, re-run any `add` command.

**Customizing styles**
Components are copied into your project. Edit the CSS module directly — there's no upstream to conflict with.

**Wiring to a real agent backend**
Map your agent's event stream to the prop interfaces defined in `ax-common.ts`. The mock data generators in `src/utils/mockData.ts` show the expected shape of each prop.

---

## Resources

- GitHub: https://github.com/Iambizi/depute
- Storybook (live components): https://iambizi.github.io/depute/
- npm: https://www.npmjs.com/package/ax-depute
