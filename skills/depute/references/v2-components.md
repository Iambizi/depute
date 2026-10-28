# v2 — Strict Compliance & Forensics Components

Reference guide for the 9 Compliance and Forensics components designed for high-stakes or irreversible agent interactions. Signatures and hashes are supplied by the caller's backend. Term definitions live in `references/lexicon.md`. Quote those; do not paraphrase them.

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
- `transactions` and `nowMs` add one warning for a run of small auto-approved payments. The rule is in `references/design-rationale.md`.
- **When to use:** Embedded into `RunControls` or displayed stat-bar style for the active session.

## 6. Binding Approval (`<BindingApproval />`)
**Problem:** Native `ApprovalGate` is too frictionless for truly irreversible actions (money, core system destruction).
**Usage:** The heaviest friction boundary. Multi-phase state machine that displays a signature while it is in flight.
- `isSigning`: Replaces the `pending` state with a deterministic lock-out while a signature flows.
- `terms`: Requires explicit visual acknowledgment.
- `BindingApproval` does not sign, hash, or talk to a ledger. Pass `signature` and `hash` when your backend has already produced them. The component only displays those values.
- **When to use:** Replaces `ApprovalGate` ONLY for critical, legally binding, or destructive terminal actions.

## 7. Transaction Receipt (`<TransactionReceipt />`)
**Problem:** The supervisor needs a per-action record of what the machine did.
**Usage:** What the machine did, with a verification hash. Question it answers: "What actually happened?"
- `hash`: Display value supplied by the caller's backend. The component does not compute it.
- `lineItems`: What actually executed.
- **When to use:** The machine side of the Audit Triad. Output of an `OrchestratorView` or terminal step replacing `ArtifactCard` for financial events.

## 8. Decision Record (`<DecisionRecord />`)
**Problem:** Users approve actions assuming the machine is accountable.
**Usage:** Immutable visual receipt of a human approval decision to counteract Responsibility Diffusion. Scope: per-approval. Records who approved, why, and under what policy. Question it answers: "Who authorized this?" It is an immutable visual receipt. It displays the decision. Enforcement is the caller's backend.
- `decision`: `'approved' | 'rejected' | 'modified'`
- `approver`: name, role, timestamp
- `agentContext`: intent, and the policy invoked when one applies
- `humanReasoning`
- **When to use:** The human side of the Audit Triad, at the end of an approval.

## 9. Session Overview (`<SessionOverview />`)
**Problem:** Users lose track of the total "blast radius" of a massive agent session.
**Usage:** Semantic rollup of a high-velocity agent session to prevent execution amnesia and cognitive load. Scope: per-session. Records a semantic rollup of everything the agent touched. Question it answers: "What was the total blast radius?"
- `sessionSummary`, `duration`, `surfacesTouched`, `keyDecisions`
- **When to use:** The session side of the Audit Triad, at the end of a high-velocity run.
