# 08 - v1 Catalog Draft (Multi-Agent Orchestration)

> **Status:** Draft (Planning Phase)
> **Trigger:** Agentic Coding Levels Research (Figure 8 - Orchestrated Hierarchy)

## The v1 Objective

v0 solved the "Single-Agent Oversight" problem (Figures 2, 4, and 5 of the Agentic Coding Levels framework). It provides the primitives necessary for a human to supervise and control a single autonomous process.

v1 solves the **"Multi-Agent Orchestration"** problem. As agents move from single-threaded loops to parallel, hierarchical swarms managed by an "Orchestrator," the UI must scale to visualize tree structures, concurrent workers, and delegated tasks without overwhelming the user.

***A Note on Figure 7 vs Figure 8:***
While v1's ultimate target is the hierarchical tree (Figure 8 - Orchestrated Hierarchy), the primitives also support intermediate complexity flat swarms (Figure 7 - 4-5 independent, un-orchestrated agents). However, components like `OrchestratorView` are specifically engineered for the structural depth of Figure 8; developers building flat Figure 7 swarms will primarily rely on `AgentRoster`.

## Proposed v1 Primitives

These 11 primitives form the foundation of the v1 catalog.

### 1. `OrchestratorView` (Structural)
The macro-level visualization of the agent hierarchy.
* **Problem:** In a multi-agent system, the user needs to understand "who is managing whom" and where bottlenecks exist in the delegation tree.
* **Anatomy:** A graph or tree component visualizing the primary Orchestrator and its spawned worker nodes (`SubagentCard`s). 
* **States:** Shows active branches, collapsed/idle branches, and highlights nodes that are currently blocked on human approval.

### 2. `AgentRoster` (Table/List)
The "resource management" view of the swarm.
* **Problem:** `OrchestratorView` is good for hierarchy, but poor for status scanning across 20+ concurrent workers.
* **Anatomy:** A dense, table-based or flex-list view. Columns/Data: Agent Name/ID, Role/Specialty, Current Status (Idle, Working, Blocked, Failed), and Uptime/Cost.
* **Interaction:** Clicking an agent in the roster opens a focused panel showing that specific agent's `PlanCard` and `ToolTrace`.

### 3. `SubagentCard` (Node Component)
A condensed, miniaturized version of the v0 `PlanCard`.
* **Problem:** The v0 `PlanCard` is too large and detailed to render 10 times concurrently on a single screen.
* **Anatomy:** A compact card designed to be embedded *inside* an `OrchestratorView` node or an `AgentRoster` row.
* **Data:** Displays only the current active step, a miniature `ConfidenceMeter` (badge variant), and a pulsing status indicator.

### 4. `TaskQueue` (Backlog)
The representation of "Generative Momentum."
* **Problem:** Orchestrators break large goals into dozens of sub-tasks. The user needs to see the backlog of upcoming work that has not yet been assigned to a worker node.
* **Anatomy:** A Kanban-like list or scrolling queue of pending intents.
* **Interaction:** Allows the human to reorder priority, inject new manual tasks, or pause specific tasks before they are delegated to a worker.

### 5. `HandoffProtocol` (Transition & Comprehension)
The standardized UI for passing context between entities.
* **Problem:** In a multi-agent swarm, context is constantly handed off (Orchestrator → Specialist, or Agent → Human). Without a visible protocol, the user loses trust in the transfer.
* **Anatomy:** A structured "comprehension interface" (not a decision gate) showing the source, destination, assigned goal, and attached payload. It emphasizes reading and understanding the state change.
* **Interaction:** Allows a human to intercept a handoff, review the payload, or optionally forcefully route to a different agent/human, but defaults to informational.

### 6. `DelegationGate` (Spawning)
The decision point where an Orchestrator commits to spinning up a new autonomous worker.
* **Problem:** Spawning an agent commits resources, creates scope, and racks up cost. It is semantically different from `ApprovalGate` (approving an action) because it approves the *creation* of an autonomous entity.
* **Anatomy:** An intercept UI showing the proposed agent's mandate, constraints, estimated token cost, and lifespan.
* **Interaction:** Human can authorize the spawn, adjust budget constraints before spawning, or deny creation.

### 7. `SwarmMonitor` (Aggregate Health)
The macro-level metrics view of parallel agentic swarms.
* **Problem:** `AgentRoster` is great for per-agent health, but lacks aggregate insight. A user needs a global view of costs, token burn, error rates, and time estimates across the swarm.
* **Anatomy:** A dashboard header unit tracking total accrued cost, tokens burned, active instances, and swarm error rate vs. estimated completion time.
* **Interaction:** Includes a global kill switch for the swarm and global pause capabilities.

### 8. `EscalationRouter` (Error Propagation)
The UI pattern for handling when an agent fails and the error bubbles up.
* **Problem:** When a leaf-node agent fails, the Orchestrator has to decide whether to retry, reassign, or escalate to the human.
* **Anatomy:** An alert feed summarizing the failure trace, the subagent involved, the orchestrator's recommendation, and options for resolution.
* **Interaction:** Allows the human to step in, adjust context and hit "Retry," reassign the task, or cancel the branch.

### 9. `SwarmInbox` (Attention Triage)
The global aggregation layer for events that require human attention.
* **Problem:** Without a centralized inbox, users will pinball between `OrchestratorView`, `AgentRoster`, and individual traces, leading to notification spam or silent drift.
* **Anatomy:** A prioritized inbox sitting above the graphs/tables. Aggregates approval requests, escalations, policy violations, and stalled tasks.
* **Interaction:** Supports severity grouping (by branch/agent/task) and one-click actions ("open branch", "approve", "pause branch").

### 10. `BranchControls` (Scoped Steering)
Steering mechanisms isolated to a specific branch of the agent tree.
* **Problem:** `RunControls` from v0 are global. In a tree, you need to isolate, pause, or quarantine a branch without freezing the entire swarm.
* **Anatomy:** A compact control bar attached to specific nodes in the `OrchestratorView`.
* **Interaction:** Allows pausing, resuming, canceling, quarantining (prevents further tool calls/spawns while allowing inspection), or throttling a specific branch.

### 11. `SharedContextLedger` (ReadOnly State & Provenance)
The control surface for shared memory and data synchronization across the swarm.
* **Problem:** Multi-agent systems break when shared memory is invisible. It must be clear what the agents currently believe is true, and who wrote it.
* **Anatomy:** A scoped read+provenance panel (Global / Branch / Agent-local). Shows typed entries (facts, decisions, constraints) and conflict signals.
* **Interaction:** A read-only UI for v1. Focuses on provenance ("written by agent X based on source Y"). Full write-control and commit resolving is deferred to v2.

## Integration with v0

The v1 primitives do not replace v0; they *wrap* them. 

When a user drills down into a specific `SubagentCard` from the `OrchestratorView`, the UI should expand to reveal the familiar v0 toolkit specifically scoped to that sub-agent:
- its specific `PlanCard`
- its specific `ToolTrace`
- any `ApprovalGate` it triggers

## Next Steps for v1 Definition

1. **Write the `AX-SKILL-SPEC.md`**: Define how these primitives (and v0) will be packaged for AI consumption.
2. **Design Mocks / ASCII architectures**: Create visual structures for how `OrchestratorView` and `AgentRoster` will look before writing code.
3. **Draft TypeScript Interfaces**: Define the state shape required for a multi-agent tree.
