# v2 — Strict Compliance & Forensics Components

Reference guide for the 7 Compliance and Forensics primitives designed for high-stakes, irreversible, or cryptographically bound agent interactions.

## 1. State Diff (`<StateDiff />`)
**Problem:** A human cannot blindly approve a raw JSON payload mutation in an `ApprovalGate`. They need to see a human-readable "before and after".
**Usage:** Visualizes field-level additions, removals, and modifications between two states.
- `entries`: Array of `{ path, type: 'added' | 'removed' | 'modified', before, after }`
- Automatically groups and formats values.
- **When to use:** Placed inside a `ToolTrace` call body or right before a `BindingApproval`.

## 2. Policy Banner (`<PolicyBanner />`)
**Problem:** Oversight panels look identical whether the agent is connected to a production database or a sandbox.
**Usage:** Persistent environment labeling to prevent "live fire" mistakes.
- `mode`: `'sandbox' | 'staging' | 'production' | 'simulation'` (determines visual severity).
- `constraints`: Read-only list of the active policies the agent is constrained by.
- **When to use:** Pin to the top of the supervision viewport.

## 3. Capability Matrix (`<CapabilityMatrix />`)
**Problem:** Tool contracts between the application and the agent (e.g. MCP tools) are invisible to the human assigning the work.
**Usage:** Exposes the EXACT permissions an agent currently holds in this context.
- `capabilities`: Array of `{ name, description, permission: 'full' | 'read' | 'write' | 'conditional' | 'none' }`.
- **When to use:** Often embedded inside a `DelegationGate` before spawning a sub-agent.

## 4. Rollback Timeline (`<RollbackTimeline />`)
**Problem:** An agent executes 15 distinct steps, 14 of which are reversible, but 1 is not. How does the user undo back to step 5?
**Usage:** Undo-tree explicitly designed for the complexities of agentic sequences.
- `points`: Array marking execution steps. Crucially supports `reversible: boolean` flags.
- Reverts visually block past an irreversible point.
- **When to use:** Deep orchestration where multi-step workflows have well-defined inverse tools.

## 5. Budget Meter (`<BudgetMeter />`)
**Problem:** Agents are handed unbounded capabilities or limitless API budgets leading to runaway costs.
**Usage:** Visual governor on resource limits.
- `spent`, `limit`, `unit`, `burnRate`.
- Auto-calculates `elevated` vs `critical` severities as the budget drains.
- **When to use:** Embedded into `RunControls` or displayed stat-bar style for the active session.

## 6. Binding Approval (`<BindingApproval />`)
**Problem:** Native `ApprovalGate` is too frictionless for truly irreversible actions (money, core system destruction).
**Usage:** The heaviest friction boundary. Multi-phase state machine that maps to protocol-level signing.
- `isSigning`: Replaces the `pending` state with a deterministic lock-out while a signature flows.
- `terms`: Requires explicit visual acknowledgment.
- **When to use:** Replaces `ApprovalGate` ONLY for critical, legally binding, or destructive terminal actions.

## 7. Transaction Receipt (`<TransactionReceipt />`)
**Problem:** After an agent completes an irreversible action, the system offers no immutable proof logging that the human explicitly authorized *that specific* outcome.
**Usage:** Read-only immutable audit block.
- `hash`: Proof of verification (cryptographic trace hash).
- `lineItems`: What actually executed.
- **When to use:** Output of an `OrchestratorView` or terminal step replacing `ArtifactCard` for financial events.
