---
name: depute
description: React component library for Agentic Experience (AX) design — purpose-built UI primitives for AI agent supervision and human oversight. Use when building interfaces for AI agents, autonomous workflows, or multi-agent systems. Triggers on: "agent UI", "approval gate", "confidence score", "tool trace", "agent plan", "pause agent", "human oversight", "AX component", "delegation interface", "agent audit", "orchestrator view", "swarm monitor", "handoff", "agent inbox", "escalation", "run controls", "npx ax-depute", "ax audit", "oversight review", "audit agent code", "what AX components am I missing". Do NOT use for general React UI, standard CRUD interfaces, or non-agent applications.
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

When in doubt, start with v0. v1 wraps v0 — drilling into any v1 node should reveal the familiar v0 toolkit (Plan Card, Tool Trace, Approval Gate) scoped to that sub-agent.

### Step 2: Select the right component

**v0 — Single Agent**

| Need | Component | Install |
|------|-----------|---------|
| Show the agent's proposed plan before it runs | `Plan Card` | `npx ax-depute add plan-card` |
| Block execution and ask the user to approve a risky action | `Approval Gate` | `npx ax-depute add approval-gate` |
| Show how confident the agent is in its next step | `Confidence Meter` | `npx ax-depute add confidence-meter` |
| Let user pause, resume, stop, or retry a running agent | `Run Controls` | `npx ax-depute add run-controls` |
| Show a live timeline of every tool call (input, output, errors) | `Tool Trace` | `npx ax-depute add tool-trace` |
| Render the final output of a workflow with export and provenance | `Artifact Card` | `npx ax-depute add artifact-card` |

**v1 — Multi-Agent Orchestration**

| Need | Component | Install |
|------|-----------|---------|
| Visualize the full agent hierarchy as a collapsible tree | `Orchestrator View` | `npx ax-depute add orchestrator-view` |
| Status dashboard for all active sub-agents | `Agent Roster` | `npx ax-depute add agent-roster` |
| Single-agent card: identity, status, tool usage, task context | `Subagent Card` | `npx ax-depute add subagent-card` |
| Scoped pause/resume/quarantine for one branch of the tree | `Branch Controls` | `npx ax-depute add branch-controls` |
| High-level grid: throughput, blocked agents, token spend | `Swarm Monitor` | `npx ax-depute add swarm-monitor` |
| Inbox for inter-agent messages — review, approve, or redirect | `Swarm Inbox` | `npx ax-depute add swarm-inbox` |
| Ordered task queue for a single agent, with priority and status | `Task Queue` | `npx ax-depute add task-queue` |
| Approval surface for cross-agent delegation / agent spawning | `Delegation Gate` | `npx ax-depute add delegation-gate` |
| Visual card for structured handoffs between agents | `Handoff Protocol` | `npx ax-depute add handoff-protocol` |
| Read-only log of shared memory/context passed between agents | `Shared Context Ledger` | `npx ax-depute add shared-context-ledger` |
| Display escalation events from sub-agents with routing overrides | `Escalation Router` | `npx ax-depute add escalation-router` |

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

## Audit Mode — Codebase Oversight Review

**When to enter audit mode:**
- The user asks to "audit" their agent code, "review for oversight gaps", or "what AX components am I missing"
- You notice agentic patterns in the codebase (LLM calls, tool use, multi-step execution) without corresponding oversight UI
- The user says `npx ax-depute audit` (alias for asking you to run this review)

### How to Run an Audit

1. **Identify the agent boundary.** Find where the codebase makes LLM calls, executes tools, spawns agents, or runs autonomous workflows. Scan for: API calls to OpenAI/Anthropic/LangChain/AutoGen, tool-calling patterns, agent loop constructs, queue/task delegation logic.

2. **Apply the 8 AX heuristics.** For each agent boundary found, check whether the following oversight surfaces exist:

| # | Heuristic | What to look for | Missing component | Severity |
|---|-----------|-------------------|-------------------|----------|
| H1 | **Irreversible actions ungated** | The agent writes to a database, sends emails, calls external APIs, or deletes resources — with no human approval step before execution | `Approval Gate` | 🔴 Critical |
| H2 | **Confidence not surfaced** | The agent makes probabilistic decisions (classification, recommendation, triage) but the UI never shows how confident it is | `Confidence Meter` | 🟡 Warning |
| H3 | **No pause/stop controls** | An agent run can last more than a few seconds but the user has no way to pause, cancel, or retry it | `Run Controls` | 🔴 Critical |
| H4 | **Tool calls invisible** | The agent calls tools/APIs but the user never sees what was called, with what input, or what came back | `Tool Trace` | 🟡 Warning |
| H5 | **Plan not disclosed** | The agent executes a multi-step plan but the user doesn't see the steps before or during execution | `Plan Card` | 🟡 Warning |
| H6 | **Output without provenance** | The agent produces a final artifact (report, code, summary) but there's no trace of which steps/tools produced it | `Artifact Card` | 🟢 Info |
| H7 | **Multi-agent coordination opaque** | Multiple agents coordinate, delegate, or run in parallel but there's no hierarchy view or status dashboard | `Orchestrator View` + `Agent Roster` | 🔴 Critical |
| H8 | **Agent spawning ungated** | The system spawns new agents or delegates tasks to sub-agents without human approval of the delegation | `Delegation Gate` | 🟡 Warning |

3. **Produce the audit report.** Use this format:

```
## AX Oversight Audit Report

**Codebase:** [project name]
**Scanned:** [date]
**Agent boundaries found:** [count]

### Findings

| # | Severity | File | Line(s) | Gap | Recommendation | Install |
|---|----------|------|---------|-----|----------------|----------|
| 1 | 🔴 Critical | src/agent/run.ts | 42-58 | Sends email without approval | Add `ApprovalGate` before `sendEmail()` | `npx ax-depute add approval-gate` |
| 2 | 🟡 Warning | src/agent/classify.ts | 91 | Classification score not shown to user | Surface with `ConfidenceMeter` | `npx ax-depute add confidence-meter` |
| ... | | | | | | |

### Summary
- 🔴 Critical: [n] findings
- 🟡 Warning: [n] findings
- 🟢 Info: [n] findings

### Quick Fix
Run these commands to install all missing components:
[list the unique npx ax-depute add commands]
```

4. **Offer to install.** After presenting the report, ask: "Want me to install any of these components and wire them into your code?"

---

## Design Principles

**Human oversight, not human bottleneck.** Surface the right information at the right moment — not a raw dump of agent internals.

**You own the code.** Distributed via CLI copy-paste, like shadcn/ui. The source lives in your repo.

**Agent-agnostic.** Works with any AI backend. Components accept typed props; you wire them to your event streams.

**Accessible by default.** WCAG 2.1 AA, keyboard navigation, ARIA roles throughout.

---

## Troubleshooting

**Component not found after `npx ax-depute add`**
Run `npx ax-depute list` to see exact component slugs. Use kebab-case (e.g., `approval-gate` not `Approval Gate`).

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
