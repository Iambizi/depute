# 08 - v1 Catalog Draft (Multi-Agent Orchestration)

> **Status:** Draft (Planning Phase)
> **Trigger:** Agentic Coding Levels Research (Figure 8 - Orchestrated Hierarchy)

## The v1 Objective

v0 solved the "Single-Agent Oversight" problem (Figures 2, 4, and 5 of the Agentic Coding Levels framework). It provides the primitives necessary for a human to supervise and control a single autonomous process.

v1 solves the **"Multi-Agent Orchestration"** problem (Figure 8). As agents move from single-threaded loops to parallel, hierarchical swarms managed by an "Orchestrator," the UI must scale to visualize tree structures, concurrent workers, and delegated tasks without overwhelming the user.

## Proposed v1 Primitives

These 4 primitives form the foundation of the v1 catalog.

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
