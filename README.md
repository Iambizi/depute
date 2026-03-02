# Depute

> The React component library for Delegation UI

Software UI has gone through two eras. **Command Line:** you told the machine what to do, step by step. **Navigation:** you drove software through menus, flows, and screens. That paradigm held for thirty years — and it's the one that's dying.

**Delegation UI** is the third era. You describe an outcome and an agent pursues it. The interface is no longer a vehicle you drive — it's a cockpit you monitor. You're setting intent, reviewing decisions, and maintaining oversight.

Every component library on earth was built for navigation. Delegation UI has none of that. The vocabulary doesn't exist yet.

`depute` is building it — an open-source React component library for interfaces where the user **supervises** instead of operates.

👉 **[Interactive Component Catalog (Storybook)](https://iambizi.github.io/depute/)**

---

## Why This Exists

The more autonomous an agent becomes, the more the interface needs to compensate with visibility and control. Teams building on AI agents keep rebuilding the same surfaces:

- A component to show what the agent is **planning**
- A gate to let a human **approve** before an irreversible action runs
- A trace to show which tools were **called**, and why
- Controls to **pause**, steer, or cancel a running agent

These aren't hard to build once. They're hard to build **correctly** — with the right accessibility, trust signals, and interaction model for human oversight of autonomous systems.

`depute` solves this once, as a composable library you own.

---

## Install a component

```bash
npx ax-depute add approval-gate
npx ax-depute add orchestrator-view
npx ax-depute list
```

Components are **copied into your project** — not imported from `node_modules`. You own the source, customize freely, connect to any agent backend. No lock-in.

---

## Components

### v0 — Core Primitives

| Component | What it does |
|-----------|--------------|
| **`PlanCard`** | Shows the agent's proposed plan — steps, assumptions, expected output — before execution begins |
| **`ApprovalGate`** | Halts execution and surfaces a human approval request for high-risk or irreversible actions |
| **`ConfidenceMeter`** | Communicates the agent's confidence in its next action, with reasoning and signal breakdown |
| **`RunControls`** | Pause, resume, stop, and retry buttons for an active agent run |
| **`ToolTrace`** | Live, expandable timeline of every tool call — input, output, duration, errors |
| **`ArtifactCard`** | Renders the final output of a workflow (markdown, JSON, code) with export and provenance |

### v1 — Multi-Agent Orchestration

| Component | What it does |
|-----------|--------------|
| **`OrchestratorView`** | Collapsible tree visualizing a multi-agent hierarchy — who spawned whom, what each is doing |
| **`AgentRoster`** | Status dashboard for all active sub-agents: role, current task, live state |
| **`SubagentCard`** | Single-agent card showing identity, status, tool usage, and task context |
| **`BranchControls`** | Scoped pause / resume / quarantine controls for a specific branch of the agent tree |
| **`SwarmMonitor`** | High-level grid view of a running swarm — throughput, blocked agents, token spend |
| **`SwarmInbox`** | Inbox for messages passed between agents — review, approve, or redirect mid-run |
| **`TaskQueue`** | Ordered list of pending tasks assigned to an agent, with priority and status |
| **`DelegationGate`** | Approval surface for cross-agent delegation events — accepts, modifies, or blocks handoffs |
| **`HandoffProtocol`** | Visual card for structured agent handoffs, including context bundle and acceptance state |
| **`SharedContextLedger`** | Read-only log of the shared memory/context being passed between agents in a run |
| **`EscalationRouter`** | Displays escalation events from sub-agents, with routing recommendation and override controls |

---

## Quick Start

```bash
# Add a component to your project
npx ax-depute add approval-gate

# Files are written to src/components/ApprovalGate/
# Shared types are added once to src/types/ax-common.ts
```

Then use it directly:

```tsx
import { ApprovalGate } from '@/components/ApprovalGate';

export function AgentUI() {
  return (
    <ApprovalGate
      title="Send email to customer"
      description="The agent will send a follow-up email to 3 recipients."
      agentReasoning="Task requires notifying stakeholders of completed analysis."
      mode="simple"
      status="pending"
      onApprove={() => agent.continue()}
      onReject={() => agent.stop()}
    />
  );
}
```

**Prototyping?** Every component ships with built-in mock data generators:

```tsx
import { generateMockPlan, generateMockToolCalls } from '@/utils/mockData';

const plan = generateMockPlan(4);
const trace = generateMockToolCalls(3);
```

---

## Design Principles

**Human oversight, not human bottleneck.** Components surface the right information at the right moment — not a raw dump of agent internals.

**You own the code.** Distributed via CLI copy-paste (like [shadcn/ui](https://ui.shadcn.com/)). The component source lives in your repo. Customize it, delete it, extend it.

**Agent-agnostic.** Works with any AI backend — LangChain, OpenAI, Claude, AutoGen, or your own. Components accept typed props; you wire them to your event streams.

**Accessible by default.** WCAG 2.1 AA, keyboard navigation, ARIA roles throughout.

---

## Local Development

```bash
npm install
npm run storybook     # interactive component explorer at localhost:6006
npm test              # 219 tests across 17 components
```

---

## Distribution

```bash
# CLI: copy components into any React project
npx ax-depute list
npx ax-depute add <component-name>
```

CLI source: [packages/cli](./packages/cli) · npm: [ax-depute](https://www.npmjs.com/package/ax-depute)

---

## License

MIT © [Amir Bizimana](https://github.com/Iambizi)
