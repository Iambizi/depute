# depute v0.4.0 Release Notes

**April 1, 2026**

The fourth release of **depute** brings significant stability to the `FumaDocs` native integration, officially documents the architectural taxonomy of the library, and introduces powerful asynchronous dispatch patterns for high-stakes agents.

## ✨ Taxonomy & Async Handoff

### Architecture Taxonomy
Every component is now strictly typed into one of four architectural classes to help developers understand where they fit in the application lifecycle:
- **Primitive (Blue):** Foundational, single-responsibility building blocks (e.g., `PlanCard`, `ApprovalGate`).
- **View (Indigo):** Compositional surfaces aggregating primitives (e.g., `OrchestratorView`).
- **Control (Zinc):** Interventions and steerage controls (e.g., `RunControls`, `EscalationRouter`).
- **Pattern (Amber):** Highly specialized wrappers enforcing a behavioral policy (e.g., `AutomationBiasAlert`).

### Async Approval Handoff (Dispatch Pattern)
- **`ApprovalGate`** now natively supports an `approvalHandoff` configuration.
- If an agent task requests approval and the local user is inactive for a set timeout, the `ApprovalGate` seamlessly drops its blocking modal trap and collapses into an ambient, dashboard-safe status card (`handoff_pending`).
- Developers can hook `onHandoff` to trigger mobile push, SMS, or Slack notifications to capture the approval out-of-band, synchronized with a backend TTL via `handoffDeadlineMs`.

## 📦 What's Included

- **Taxonomy Badges:** Injected colored taxonomy pills straight into the sidebar rendering layer (Requires Next.js Fast Refresh/Hard Reload).
- **FumaDocs Stability:** Addressed edge-case hydration mismatches and extended the `zod` frontmatter schemas to natively accept the `badge` property.
- **AI Skill Sync:** The internal `SKILL.md` (and `.claude` copies) have been deeply updated to teach agentic IDEs about the 4 architectural dimensions and the new dispatch APIs, ensuring auto-generated code aligns with v0.4.0 syntax.

---

# depute v0.3.0 Release Notes

The third release of **depute**, introducing 7 new "Strict Compliance & Forensics" primitives. As agents execute headless, reliable tool calls, UI requirements shift from visibility to provability. 

## ✨ 7 New Compliance Primitives

### Intent & Boundaries
- **`PolicyBanner`** — Persistent indicator distinguishing between sandbox, staging, and live production policies.
- **`CapabilityMatrix`** — Visual permission inspector (the "Agent Handshake") showing exact capability grants and denials.
- **`BudgetMeter`** — Visual gauge enforcing token, dollar, or API-call limits on autonomous sessions.

### Immutability & Forensics
- **`StateDiff`** — Human-readable, structured before/after translation of payload mutations.
- **`RollbackTimeline`** — Agentic undo-tree for reverting multi-step sequences with cascade awareness.
- **`BindingApproval`** — Heavy-duty cryptographic intent gate with explicit `isSigning` state and term acknowledgment.
- **`TransactionReceipt`** — Immutable audit log component securely linking human approval to an executed action.

## 📦 What's Included

- **359 tests passing** across 25 test files (zero regressions in v0/v1).
- **Full Storybook coverage** — 7 new interactive stories bridging Fintech, DevOps, and HR verticals.
- **Mock data generators** to be extended in future patches.
- **CLI Registry** updated to `ax-depute@0.3.0`.

---

# depute v0.2.0 Release Notes

**February 22, 2026**

The second release of **depute**, adding 11 new orchestration primitives for multi-agent swarm supervision. Where v0.1.0 solved the single-agent oversight problem, v0.2.0 addresses **Figures 7 & 8 of the Agentic Coding Levels framework** — coordinating networks of specialized agents working in parallel.

## ✨ 11 New Orchestration Primitives

### Visibility & Hierarchy
- **`OrchestratorView`** — Recursive tree visualization of orchestrator → subagent hierarchies with per-node status, depth-coded coloring, and expand/collapse.
- **`AgentRoster`** — Dense operational table for scanning 20+ agents simultaneously, with summary status pills and row-level actions.
- **`SubagentCard`** — Compact embeddable card showing a single agent's plan progress, token usage, and current task.
- **`SwarmMonitor`** — Macro-dashboard with KPI tiles (active instances, token burn, cost, error rate) and a global progress bar.

### Task & Work Management
- **`TaskQueue`** — Grouped task backlog (In Progress → Assigned → Pending) with priority chips and inline promote/assign/cancel actions.
- **`SwarmInbox`** — Attention-triage inbox for items requiring human review, with severity-tinted rows and a pulsing critical-item badge.

### Agent Coordination
- **`HandoffProtocol`** — Structured payload viewer for agent-to-agent handoffs, with Accept / Intercept / Cancel actions.
- **`DelegationGate`** — Alertdialog gate for authorizing new agent spawning, showing role, mandate, tool constraints, and cost estimate.
- **`BranchControls`** — Scoped steering panel for an individual agent branch with contextual action buttons.

### Observability & Context
- **`EscalationRouter`** — Red alertdialog for unrecoverable agent errors with collapsible error trace and 3-way resolution (Retry / Reassign / Cancel Branch).
- **`SharedContextLedger`** — Read-only scoped memory viewer showing key/value entries with type tags, provenance metadata, and conflict signals.

## 📦 What's Included

- **223 tests passing** across all 18 test files (11 v1 + 7 v0).
- **Full Storybook coverage** — each component has Default, state variants, interactive prototypes, and production examples.
- **Mock data generators** for all 11 new components in `src/utils/mockData.ts`.
- **`registry.json`** update incoming with v1 primitives (part of AXK CLI work).

---

# depute v0.1.0 Release Notes

**February 20, 2026**

The initial open-source release of **depute**, a library of production-ready React components designed specifically for building Agentic Experiences (AX).

This release solves the single-agent oversight problem (Figures 2, 4, and 5 of the Agentic Coding Levels framework), providing developers and designers with the necessary primitives to build trust-based, transparent agent interfaces that run seamlessly from prototype to production.

## ✨ 6 Core Primitives

This release introduces 6 foundational AX primitives across four design categories:

### Intent & Delegation
* **`PlanCard`**: Visualize an agent's multi-step plan, current task execution, and progress state.

### Trust & Approval
* **`ApprovalGate`**: Prevent unauthorized agent actions by injecting a Human-in-the-Loop boundary. Supports both standalone simple approvals and "staged" flows with resource/duration scopes.
* **`ConfidenceMeter`**: Communicate the probabilistic nature of AI outputs. Visualizes the confidence score of an action or output, with both a detailed "meter" view and a compact "badge" view.

### Transparency & Trace
* **`ToolTrace`**: Expose the agent's internal thought process. Renders an interactive, streaming event log of tool calls (with inputs, outputs, and JSON payloads), modeled after IDE-like terminal output.
* **`ArtifactCard`**: Display finalized agent outputs (Markdown, JSON, Code, CSV) clearly, complete with metadata arrays mapping the output back to its source step and tool trace.

### Control & Steering
* **`RunControls`**: A dedicated toolbar for steering an active agent run (Start, Pause, Resume, Stop) without breaking the user's flow.

## 📦 Features & Distribution

* **Headless Hooks + Copy-Paste UI**: Patterned after `shadcn/ui`, the UI layer is designed to be fully owned by the consumer.
* **100% Type Safe**: Built in TypeScript with comprehensive interfaces.
* **Mock Data Utilities**: Includes `generateMockPlan`, `simulateToolStream`, and `generateMockApproval` utilities out of the box so designers can build rich prototypes immediately without needing an actual backend API.
* **Accessibility Baked In**: All primitives ship with `aria-live` regions, `role` attributes, and focus traps for ARIA compliance.
* **Theming**: Powered by 35 CSS custom properties (`--ax-*`) ready to be mapped to your brand's design system.

## 🚀 Getting Started

Check out the included examples to see the library in action:
* `/examples/prototype-setup`: A fully clientside mocked dashboard using our generator utilities.
* `/examples/production-setup`: The exact same components wired to a simulated server streaming hook.
