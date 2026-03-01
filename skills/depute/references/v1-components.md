# depute v1 — Multi-Agent Orchestration Reference

**Status:** Shipped (v0.2.0) · 11 components · Multi-agent orchestration

**When to use v1:** When multiple agents are coordinating, delegating tasks to each other, or running in parallel. v1 targets the "Orchestrated Hierarchy" pattern (an Orchestrator spawning and managing specialist Workers).

**v1 wraps v0, it does not replace it.** When a user drills into any sub-agent node, the UI should reveal the v0 toolkit (PlanCard, ToolTrace, ApprovalGate) scoped to that agent.

---

## Architecture: Figure 7 vs Figure 8

| Pattern | Shape | Primary Components |
|---------|-------|--------------------|
| **Figure 7** — Flat swarm (4–5 independent agents, no orchestrator) | Flat list | `AgentRoster`, `SwarmMonitor`, `SwarmInbox` |
| **Figure 8** — Orchestrated hierarchy (Orchestrator + specialist Workers) | Tree | `OrchestratorView`, `SubagentCard`, `BranchControls`, all v1 |

If you're not sure which applies, ask: "Is there one agent managing the others?" If yes → Figure 8. If no → Figure 7.

---

## The 11 Primitives

### 1. `OrchestratorView` — Structural Overview

**Problem:** Users need to understand "who is managing whom" and where bottlenecks exist.

**Anatomy:** Tree/graph visualizing the primary Orchestrator and all spawned worker nodes. Nodes can expand/collapse. Blocked nodes (awaiting human approval) are highlighted.

```tsx
<OrchestratorView
  tree={orchestrator.agentTree}   // OrchestratorNode[] recursive tree
  onSelectNode={(nodeId) => setSelectedAgent(nodeId)}
/>
```

**Use alongside:** `AgentRoster` (for per-agent status scanning), `BranchControls` (per-branch steering).

---

### 2. `AgentRoster` — Status Dashboard

**Problem:** `OrchestratorView` shows hierarchy but is poor for scanning 20+ concurrent workers.

**Anatomy:** Dense table — columns: Agent Name/ID, Role/Specialty, Current Status (Idle / Working / Blocked / Failed), Uptime/Cost. Clicking a row opens a focused panel with that agent's `PlanCard` + `ToolTrace`.

```tsx
<AgentRoster
  agents={orchestrator.activeAgents}   // AgentStatus[]
  onSelectAgent={(agentId) => setFocusedAgent(agentId)}
/>
```

---

### 3. `SubagentCard` — Compact Node Component

**Problem:** The v0 `PlanCard` is too large to render 10+ times on a single screen.

**Anatomy:** Compact card for embedding inside `OrchestratorView` nodes or `AgentRoster` rows. Shows: current active step, miniature `ConfidenceMeter` (badge variant), pulsing status dot.

```tsx
<SubagentCard
  agentId="worker-3"
  currentStep={agent.activeStep}
  confidence={agent.confidence}
  status={agent.status}
/>
```

---

### 4. `TaskQueue` — Backlog / Upcoming Work

**Problem:** Orchestrators break goals into dozens of sub-tasks. Users need to see the backlog before it's delegated.

**Anatomy:** Kanban-style list of pending intents. Allows the human to reorder priority, inject manual tasks, or pause specific tasks before they're delegated to a worker.

```tsx
<TaskQueue
  tasks={orchestrator.pendingTasks}
  onReorder={orchestrator.reorderTasks}
  onPauseTask={orchestrator.pauseTask}
  onInjectTask={orchestrator.addManualTask}
/>
```

---

### 5. `HandoffProtocol` — Context Transfer UI

**Problem:** Context is constantly handed off between agents. Without a visible protocol, users lose trust in the transfer.

**Anatomy:** Structured "comprehension interface" (not a decision gate) showing: source agent, destination agent, assigned goal, attached payload. Emphasizes reading and understanding — defaults to informational, not blocking.

```tsx
<HandoffProtocol
  from={handoff.sourceAgent}
  to={handoff.destinationAgent}
  goal={handoff.goal}
  payload={handoff.contextPayload}
  onIntercept={handoff.intercept}   // optional: human can reroute
/>
```

---

### 6. `DelegationGate` — Agent Spawning Approval

**Problem:** Spawning a new agent commits resources and cost. Semantically different from `ApprovalGate` (approving an action) — this approves the *creation* of an autonomous entity.

**Anatomy:** Alert dialog showing: proposed agent's mandate, tool constraints, estimated token cost, lifespan. Human can authorize, adjust budget before spawning, or deny.

```tsx
<DelegationGate
  proposedAgent={spawn.manifest}
  estimatedCost={spawn.tokenEstimate}
  onApprove={spawn.authorize}
  onAdjust={spawn.adjustConstraints}
  onDeny={spawn.cancel}
/>
```

---

### 7. `SwarmMonitor` — Aggregate Health Grid

**Problem:** `AgentRoster` covers per-agent health but lacks aggregate swarm insight.

**Anatomy:** Dashboard header tracking: total cost accrued, tokens burned, active instances, error rate vs. estimated completion. Includes global kill switch and global pause.

```tsx
<SwarmMonitor
  agents={swarm.agents}
  throughput={swarm.metrics.throughput}
  tokenSpend={swarm.metrics.tokens}
  errorRate={swarm.metrics.errorRate}
  onPauseAll={swarm.pauseAll}
  onKillAll={swarm.kill}
/>
```

---

### 8. `EscalationRouter` — Error Propagation UI

**Problem:** When a leaf-node fails, the Orchestrator must decide whether to retry, reassign, or escalate to the human. The user needs to step in at this point.

**Anatomy:** Alert feed showing: failure trace, subagent involved, orchestrator recommendation, resolution options (Retry / Reassign / Cancel Branch).

```tsx
<EscalationRouter
  events={orchestrator.escalations}
  onRetry={escalation.retry}
  onReassign={escalation.reassign}
  onCancelBranch={escalation.cancelBranch}
/>
```

---

### 9. `SwarmInbox` — Attention Triage

**Problem:** Without a centralized inbox, users pinball between views and miss critical events or get notification spam.

**Anatomy:** Prioritized inbox above the graphs/tables. Aggregates: approval requests, escalations, policy violations, stalled tasks. Supports severity grouping and one-click actions ("open branch", "approve", "pause branch").

```tsx
<SwarmInbox
  messages={orchestrator.interAgentMessages}
  onApprove={inbox.approve}
  onDismiss={inbox.dismiss}
  onOpenBranch={inbox.openBranch}
/>
```

---

### 10. `BranchControls` — Scoped Steering

**Problem:** `RunControls` (v0) are global. In a tree, you need to isolate a single branch without freezing the whole swarm.

**Anatomy:** Compact control bar attached to specific nodes in `OrchestratorView`. Actions: Pause, Resume, Cancel, Quarantine (prevents further tool calls/spawns while allowing inspection), Throttle.

```tsx
<BranchControls
  branchId={selectedBranch.id}
  status={selectedBranch.status}
  onPause={swarm.pauseBranch}
  onResume={swarm.resumeBranch}
  onQuarantine={swarm.quarantineBranch}
  onCancel={swarm.cancelBranch}
/>
```

---

### 11. `SharedContextLedger` — Shared Memory Viewer

**Problem:** Multi-agent systems break when shared memory is invisible. It must be clear what agents believe is true and who wrote it.

**Anatomy:** Scoped read+provenance panel (Global / Branch / Agent-local). Shows typed entries (facts, decisions, constraints) with conflict signals. Read-only in v1 — full write-control deferred to v2.

```tsx
<SharedContextLedger
  entries={swarm.sharedContext}
  scope="branch"       // "global" | "branch" | "agent"
  agentId={selectedAgent.id}
/>
```

---

## v1 + v0 Integration Pattern

v1 wraps v0. When a user drills into a sub-agent from `OrchestratorView` or `AgentRoster`, render the v0 toolkit scoped to that agent:

```tsx
function AgentDetailPanel({ agentId }: { agentId: string }) {
  const agent = useAgent(agentId);
  return (
    <>
      <PlanCard steps={agent.plan} />
      <ToolTrace calls={agent.toolHistory} />
      {agent.pendingApproval && (
        <ApprovalGate
          title={agent.pendingApproval.label}
          agentReasoning={agent.pendingApproval.reasoning}
          onApprove={() => agent.approve()}
          onReject={() => agent.reject()}
        />
      )}
    </>
  );
}
```

---

## What's NOT in v1 (Deferred to v2)

| Component | Why deferred |
|-----------|-------------|
| `SharedContextLedger` write-mode | Full conflict resolution and commit UI is a v2 epic |
| `EscapeHatchBar` | Requires `UndoStack` + `HumanTakeover` primitives |
| Financial primitives | Vertical-specific (MandateEditor, BudgetMeter, etc.) |
| `AdaptiveCanvas` | Too complex — needs its own epic |
