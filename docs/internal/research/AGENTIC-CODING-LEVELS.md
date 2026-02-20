# Levels of Agentic Coding: Framework Analysis

*Date:* February 20, 2026
*Context:* Synthesis of the "Levels of Agentic Coding" framework (8 figures) and its implications for the AX Components catalog.

## The Framework

The framework visualizes the evolution of agentic coding interfaces across 8 distinct models, split between UI-centric and CLI-centric approaches.

### Top Row: UI/Chat Interfaces
* **Fig 1 (Manual):** Pure IDE/editor. Human writes code, no agent presence.
* **Fig 2 (Supervised Agent):** Chat interface with a **Y/N prompt**. The agent asks permission before taking significant actions (Human-in-the-Loop).
* **Fig 3 (Autonomous Agent):** "YOLO Mode". The agent operates autonomously via chat without requesting permission or showing execution details.
* **Fig 4 (Autonomous + Oversight UI):** YOLO Mode elevated with a rich dashboard panel. The agent acts autonomously, but the user has visibility to monitor and intervene.

### Bottom Row: CLI/Terminal Interfaces
* **Fig 5 (Single CLI Agent):** A single agent process (e.g., `claude code`) running in the terminal.
* **Fig 6 (Parallel Subagents):** Ad-hoc concurrent execution. A primary terminal spawning multiple distinct agent windows. 
* **Fig 7 (Agent Swarm):** Unstructured mesh of many agents operating as a decentralized peer cluster.
* **Fig 8 (Orchestrated Hierarchy):** Structured command-and-control. A dedicated "Orchestrator" node managing a formalized tree of worker agents.

---

## Strategic Assessment: Canonical vs. Transitional Levels

Not all 8 levels are permanent targets for UI library design. Several are transitional "growing pains."

### Transitional Levels (Disregard for AX Design)
* **Fig 1:** Pre-agentic baseline. Irrelevant.
* **Fig 3 (Blind YOLO):** An immature state before the dashboard (Fig 4) is built. Blind autonomy is poor AX.
* **Fig 6 & 7 (Ad-hoc Swarms):** Chaotic multi-agent states that emerge before orchestration patterns mature.

### Canonical Levels (Design Targets)
* **Fig 2 (Supervised):** A permanent UX pattern requiring explicit trust gates.
* **Fig 4 (Oversight UI):** The mature single-agent autonomous form.
* **Fig 5 (Single CLI):** The baseline headless dev-tool mode.
* **Fig 8 (Orchestrated):** The mature, scalable multi-agent architecture.

---

## AX Components Mapping

How the AX library currently supports these canonical levels:

### v0 Coverage (Single-Agent Focus)
The v0 library is heavily optimized for **Figures 2, 4, and 5**. 
* **Fig 2 (Supervised):** Fully solved by `ApprovalGate`.
* **Fig 4 (Oversight UI):** Fully solved by the combination of `PlanCard`, `RunControls`, `ConfidenceMeter`, `ToolTrace`, and `ArtifactCard`.
* **Fig 5 (Single CLI):** Serves as the headless backend that powers a Fig 4 UI wrapper.

**The Mental Model:** v0 is designed for *one agent working on one task with one human watching.*

### The v1 Gap (Multi-Agent Orchestration)
The library completely lacks primitives for **Figure 8 (Orchestrated Hierarchy)**. As agent patterns evolve from single-threaded to parallel/hierarchical, the UI layer must adapt.

**New Primitive Candidates required for Fig 8:**
1. **`AgentRoster`:** A panel tracking *N* concurrent agents, their roles, and specialized states.
2. **`OrchestratorView`:** A tree or graph component visualizing the delegation hierarchy and inter-agent dependencies.
3. **`SubagentCard`:** A miniaturized status unit for individual worker nodes (like a compact `PlanCard`).
4. **`TaskQueue` / `TaskSuggestions`:** To manage the backlog of pending sub-tasks waiting for worker capacity.

### Next Steps
* Add multi-agent orchestration primitives to the v1 candidate tracker.
* Reference Figure 8 structural requirements when designing the v1 architecture.
