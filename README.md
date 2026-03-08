<p align="center">
  <img src=".github/logo.png" width="400" alt="Depute Logo" />
</p>

# Depute

[![npm](https://img.shields.io/npm/v/ax-depute?style=flat-square&color=black)](https://www.npmjs.com/package/ax-depute) [![docs](https://img.shields.io/badge/docs-depute.dev-blue?style=flat-square)](https://www-one-rho-67.vercel.app)

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
npx ax-depute@latest add approval-gate
npx ax-depute@latest add orchestrator-view
npx ax-depute list
```

Components are **copied into your project** — not imported from `node_modules`. You own the source, customize freely, connect to any agent backend. No lock-in.

---

## Components

### v0 — Core Primitives

| Component | What it does |
|-----------|--------------|
| **Plan Card** | Shows the agent's proposed plan — steps, assumptions, expected output — before execution begins |
| **Approval Gate** | Halts execution and surfaces a human approval request for high-risk or irreversible actions |
| **Confidence Meter** | Communicates the agent's confidence in its next action, with reasoning and signal breakdown |
| **Run Controls** | Pause, resume, stop, and retry buttons for an active agent run |
| **Tool Trace** | Live, expandable timeline of every tool call — input, output, duration, errors |
| **Artifact Card** | Renders the final output of a workflow (markdown, JSON, code) with export and provenance |

### v1 — Multi-Agent Orchestration

| Component | What it does |
|-----------|--------------|
| **Orchestrator View** | Collapsible tree visualizing a multi-agent hierarchy — who spawned whom, what each is doing |
| **Agent Roster** | Status dashboard for all active sub-agents: role, current task, live state |
| **Subagent Card** | Single-agent card showing identity, status, tool usage, and task context |
| **Branch Controls** | Scoped pause / resume / quarantine controls for a specific branch of the agent tree |
| **Swarm Monitor** | High-level grid view of a running swarm — throughput, blocked agents, token spend |
| **Swarm Inbox** | Inbox for messages passed between agents — review, approve, or redirect mid-run |
| **Task Queue** | Ordered list of pending tasks assigned to an agent, with priority and status |
| **Delegation Gate** | Approval surface for cross-agent delegation events — accepts, modifies, or blocks handoffs |
| **Handoff Protocol** | Visual card for structured agent handoffs, including context bundle and acceptance state |
| **Escalation Router** | Displays escalation events from sub-agents, with routing recommendation and override controls |

### v2 — Roadmap (Strict Compliance & Forensics)

*Drafting phase. Triggered by the maturation of WebMCP and Mastercard's "Verifiable Intent" protocol.*

As agents gain the ability to execute completely headless, reliable tool calls, the UI requirements shift from *visibility* to *provability*. In high-stakes environments (Fintech, Healthcare, DevOps), an approval isn't just a UI state change — it's a cryptographically binding signature. 

**Upcoming v2 primitives focus on:**
- **Mutation & Regression:** `<StateDiff />` (visual payload translation) and `<RollbackTimeline />`.
- **The Agent Handshake:** `<CapabilityMatrix />` (making tool contracts visible) and `<PolicyBanner />`.
- **Cryptographic Intent:** `<BindingApproval />` (friction-first, protocol-level signature capture) and `<TransactionReceipt />` (immutable audit log). 

*See the [RFC for the `isSigning` state](https://github.com/Iambizi/depute/issues/3).*

---

## Quick Start

```bash
# Add a component to your project
npx ax-depute@latest add approval-gate

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
npx ax-depute@latest add <component-name>
```

CLI source: [packages/cli](./packages/cli) · npm: [ax-depute](https://www.npmjs.com/package/ax-depute)

---

## License

MIT © [Amir Bizimana](https://github.com/Iambizi)
