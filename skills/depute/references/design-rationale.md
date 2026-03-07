# depute — Design Rationale

This file explains the *why* behind key design decisions. Use it when you need to understand why a component API works a certain way, why a feature exists, or why something was deliberately left out.

Research sources: Stripe Agent Toolkit, Claude Cowork (Anthropic), Coinbase Agentic Wallets.

---

## Why `ApprovalGate` has a `scope` prop (not just approve/reject)

**Source:** Stripe SPT (Shared Payment Token) pattern.

Stripe never approves an action with a binary yes/no. They issue capability grants that are:
- **Scoped** to a specific target (e.g., only this API, only this seller)
- **Resource-bounded** (e.g., up to $500)
- **Time-bounded** (e.g., expires in 10 minutes)
- **Revocable** at any time

Binary approve/reject is the wrong mental model for agents. A user approving "send emails" shouldn't be approving "send unlimited emails forever."

**In practice:**
```tsx
// Wrong — binary
<ApprovalGate onApprove={go} onReject={stop} />

// Right — scoped grant
<ApprovalGate
  scope={{ target: 'Stripe API', resourceLimit: 100, durationSeconds: 600 }}
  onApprove={go}
  onReject={stop}
/>
```

---

## Why `ApprovalGate` has `mode="staged"` (Preview → Confirm → Execute)

**Source:** Stripe's Authorization Chain pattern.

Stripe validates at multiple points in a transaction flow, not just once. Agent flows are **state machines**, not request-response cycles:

```
Intent → Plan → Permission Check → Execution → Authorization → Audit
```

Each stage can fail, pause, or request human input. `mode="staged"` lets `ApprovalGate` function as a multi-step gate rather than a single popup. This replaced `CommitGate` (a candidate primitive that was absorbed because staged mode covers the use case).

---

## Why `ToolTrace` has `policyFlags` on each call

**Source:** Stripe's restricted API key model.

Stripe's allowlist model makes permissions per-action explicit:
- `requiresApproval` — this call touches external systems
- `writesState` — this call mutates something
- `externalAction` — this call leaves the system boundary

An agent that calls `send_email` and `read_file` should surface that the first one is an `externalAction` and the second is not. `ToolTrace` uses `policyFlags` so the UI can visually distinguish routine calls from trust-boundary-crossing ones.

---

## Why `ArtifactCard` has `sourceStepId` and `toolCallIds` (provenance)

**Source:** Stripe's audit trail philosophy + Coinbase's "Receipts UI" pattern.

Stripe produces a full receipt for every transaction: who, what, when, with what permissions. Coinbase's agentic wallet research confirmed that once agents act autonomously, **auditability becomes the trust backbone** — especially when onchain actions can't be undone.

`ArtifactCard` is the agent's "receipt." The `sourceStepId` and `toolCallIds` props trace the output back to the exact plan step and tool calls that produced it. Without this, outputs feel like magic; with it, users can verify the chain.

---

## Why `PlanCard` shows the plan *before* execution, not after

**Source:** Claude Cowork (Anthropic) analysis.

Cowork's interface shows the full plan in a "Progress" panel *before* any action is taken. This validates the plan-first pattern: **show the trajectory, then execute.** Users can see where they're going before anything happens — lowering fear and increasing informed consent.

Cowork calls this "Generative Momentum" (AX Book Pattern 6): proposing concrete work rather than waiting for the user to figure out what to ask.

---

## Why `RunControls` is intentionally minimal (no undo, no escalation)

**Source:** Catalog triage decisions + EscapeHatchBar deferral.

`RunControls` was kept minimal on purpose. A candidate primitive called `EscapeHatchBar` (from AX Book Ch. 9) would compose `RunControls` + `UndoStack` + `HumanTakeover` into a full escape surface.

That's deferred to v1. For v0, users need pause/resume/stop. Anything more complex requires `UndoStack` and `HumanTakeover` primitives that don't exist yet. The `actions` slot on `RunControls` is the extension point for when those ship.

---

## Why `ConfidenceMeter` has `display="badge"` (compact variant)

**Source:** Catalog triage — `UncertaintyBadge` absorbed.

A research candidate called `UncertaintyBadge` (AX Book Ch. 12) was a compact inline confidence indicator. Rather than shipping two separate components, `ConfidenceMeter` gained `display="badge"` to serve both use cases:
- `display="meter"` — full horizontal bar for primary confidence signal
- `display="badge"` — compact pill for embedding inside `SubagentCard`, table rows, etc.

---

## Why v1 has `DelegationGate` separate from `ApprovalGate`

**Source:** Coinbase Agentic Wallets + v1 catalog design.

`ApprovalGate` approves an **action**. `DelegationGate` approves the **creation of an autonomous entity**.

Spawning an agent is semantically different from approving a single tool call:
- It commits resources for an unknown duration
- It creates scope and mandate for future independent decisions
- It has a cost that compounds over the agent's lifespan

Coinbase's "Mandate + Guardrails" pattern (set a budget, define constraints, then authorize) maps directly to `DelegationGate`. You're not just saying yes — you're issuing a mandate with guardrails.

---

## Why depute optimizes for control, not simplicity (vs. Cowork)

**Source:** Claude Cowork comparative analysis.

Cowork optimizes for simplicity — it hides complexity to feel like "leaving messages for a coworker." Our components add the **trust and control layer** that Cowork intentionally omits:

| Feature | Cowork | depute |
|---------|--------|--------|
| Approval UI | Conversational | `ApprovalGate` with scoped grants |
| Confidence | Hidden | `ConfidenceMeter` per step |
| Risk signals | None visible | `policyFlags` on `ToolTrace` |
| Audit trail | Activity stream only | `ToolTrace` + `ArtifactCard` provenance |
| Autonomy control | Trust-once | `RunControls` + `ThrottleControl` (v1) |

Both are valid — different audiences. depute targets power users and enterprise teams who need the trust layer. Cowork targets everyday users who want to delegate and walk away.

---

## Why financial primitives (MandateEditor, BudgetMeter, etc.) are deferred to v2

**Source:** Coinbase research + catalog scope decisions.

The Coinbase analysis identified strong candidates for spend-control primitives (`MandateEditor`, `BudgetMeter`, `TransactionReceipt`, `SpendApprovalInbox`). These are high-value, but they're **vertical-specific** — they only apply to financial agent use cases.

v0 and v1 are horizontal — they work across any agent domain. Vertical kits (finance, legal, healthcare) are a v2 concern. Introducing financial primitives in v0/v1 would narrow the library's audience before establishing broad adoption.

---

## Why the distribution model is CLI copy-paste, not npm install

**Source:** shadcn/ui distribution strategy research.

Agents (and the developers building with them) need to **read and edit the UI code**. A black-box npm package breaks that:
- The agent can't inspect what `ApprovalGate` does internally
- Developers can't customize it for their domain without forking
- Updates become breaking changes, not choices

The copy-paste model (like shadcn/ui) means the source lives in your repo. You own it. The agent can read it. You can modify it. The CLI (`npx ax-depute@latest add`) delivers it, but you keep it.
