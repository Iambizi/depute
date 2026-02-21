# Stripe's Agentic Architecture — Insights for AX Components

**Type:** 🔬 Real-World Case Study
**Source:** Stripe (Agent Toolkit, Agentic Commerce Protocol)

---

## Why this doc exists

Stripe is one of the clearest real-world examples of "agent-ready" infrastructure in 2025–2026. They've built production systems for agents that handle money — one of the highest-trust domains possible.

They're not just adding a chatbox. They're treating agentic experiences as:
- **protocol + event stream** (structured API calls, not freeform prompts)
- **permissions + approvals** (scoped tokens, restricted keys, consent gates)
- **stateful flows that are replayable and auditable** (transaction logs, authorization chains)

This memo extracts the patterns that directly inform how we should design AX Components.

---

## 1) Stripe's Layered Architecture

Stripe's agentic system breaks into distinct layers, each with a clear responsibility:

| Layer | Responsibility | AX Parallel |
|-------|---------------|-------------|
| **Experience Layer** | Captures user intent ("Book a flight") | `IntentBar`, `PromptToSpec` |
| **Agent Layer** | Plans the transaction, calls tools, makes decisions | `PlanCard`, `StepList`, `ReasonPanel` |
| **Permission Layer** | Scoped tokens (SPTs), restricted API keys, spending limits | `PermissionScope`, `ApprovalGate`, `PolicyBanner` |
| **Execution Layer** | Completes the payment instruction | `RunControls`, `Checkpoint` |
| **Audit Layer** | Records transactions, handles reconciliation | `AuditLog`, `ToolTrace` |

**Takeaway:** Every layer maps to an AX primitive category. This validates our primitive catalog structure.

---

## 2) Shared Payment Tokens (SPTs) — The Trust Pattern

SPTs are Stripe's mechanism for agent-to-agent trust. They're the most reusable pattern for AX:

**How SPTs work:**
- An agent issues a token scoped to a specific seller, with spending limits and expiration
- The token does **not** contain raw credentials — it's a capability grant
- The seller validates the token via API before processing

**What this means for AX Components:**

| SPT Property | AX Equivalent |
|-------------|---------------|
| Scoped to a specific seller | Scope permissions per action/context |
| Has spending limits | Add resource/budget limits to approvals |
| Has expiration windows | Time-bound permissions, not permanent grants |
| No raw credentials exposed | Components should never expose underlying data/keys |
| Validated before execution | Always validate before side effects |

**Design principle:** Approvals should be **scoped, bounded, and revocable** — not binary yes/no.

This directly informs how `ApprovalGate` and `PermissionScope` should work:
- Not just "approve / reject" — but "approve with limits"
- Support time-bounded grants ("approve for next 10 minutes")
- Support resource-bounded grants ("up to $500")
- Show what's being granted, not just that something is being granted

---

## 3) Function Calling, Not Prompt-and-Pray

Stripe's Agent Toolkit exposes financial operations as **typed function calls**, not freeform prompts:

```typescript
// Stripe's pattern: explicit, scoped, declarative
configuration: {
  actions: {
    payment_links: { create: true },
    products: { create: true },
    prices: { create: true },
    // everything else is implicitly denied
  }
}
```

**Key design decisions:**
- **Allowlist, not blocklist** — only explicitly enabled actions are available
- **Per-action granularity** — not "full access" or "no access"
- **Non-deterministic behavior acknowledged** — Stripe recommends sandbox testing and evaluations because agent behavior is unpredictable

**What this means for AX Components:**

1. **Catalog-first** — our catalog should work like Stripe's configuration: explicit component types, strict schemas, no arbitrary rendering
2. **Policy flags** — `requiresApproval`, `writesState`, `externalAction` maps directly to Stripe's restricted key model
3. **Sandbox-awareness** — components should visually distinguish sandbox/test mode from production (Stripe uses test mode banners)

---

## 4) The Authorization Chain Pattern

Stripe doesn't approve an action once. It validates at multiple points:

```
Intent → Plan → Permission Check → Execution → Authorization → Settlement → Audit
```

Each stage can fail, pause, or request human input. This is a **state machine**, not a request-response cycle.

**What this means for AX Components:**

- `StepList` should support per-step status: pending, approved, executing, failed, completed
- `ApprovalGate` can appear at multiple points in a flow, not just once at the start
- `Checkpoint` should be the natural pause points in the chain
- `ErrorExplainer` should present failures as choices (retry, change scope, escalate)

**Pattern:** Agent flows are state machines with approval gates at trust boundaries.

---

## 5) Auditability as a Feature, Not an Afterthought

Every Stripe transaction produces:
- A full audit trail (who, what, when, with what permissions)
- Real-time authorization decisions (not just after-the-fact logs)
- Reconciliation data (matching intent to outcome)

**What this means for AX Components:**

- `AuditLog` should be a first-class primitive, not a debug tool
- `ToolTrace` should capture not just what happened, but **what permissions were active when it happened**
- Every event should be loggable by default (our event vocabulary should be designed for audit)
- Consider a `ReceiptCard` primitive — agent produces a "receipt" of what it did, like Stripe's payment receipts

---

## 6) How Stripe's Patterns Map to Our Primitives

| Stripe Pattern | AX Primitive | What We Should Learn |
|---------------|-------------|---------------------|
| Scoped payment tokens | `PermissionScope` | Permissions as capabilities, not binary switches |
| Restricted API keys | `PolicyBanner` | Allowlist model — only what's explicitly enabled |
| Authorization chain | `ApprovalGate` + `Checkpoint` | Multi-gate flows, not single-approval |
| Transaction audit trail | `AuditLog` + `ToolTrace` | Log permissions alongside actions |
| Spending limits | `ConfidenceMeter` / `ThrottleControl` | Resource bounds, not just yes/no |
| Test mode vs live mode | `StatusBanner` | Visual distinction for sandbox/production |
| Payment receipts | `ArtifactCard` / `ResultCard` | Structured output with provenance |
| Fraud detection layer | `RiskBadge` | Real-time risk assessment, visible to user |

---

## 7) Key Design Principles Extracted

### 7.1 Trust is engineered, not assumed
Stripe never assumes an agent should have access. Every capability is explicitly granted, scoped, and time-bounded. Our primitives should default to "no access" and require explicit grants.

### 7.2 Flows are state machines
Not request-response. Not prompt-and-pray. Agent work is a state machine with defined transitions, pause points, and rollback paths.

### 7.3 Receipts close the loop
Every agent action should produce a human-readable receipt. Stripe does this with payment confirmations. We should do it with `ResultCard` / `ArtifactCard`.

### 7.4 The approval model is nuanced
Not just approve/reject. Stripe supports:
- Approve with limits (spending cap)
- Approve for a time window (token expiration)
- Approve for a specific target (scoped to seller)
- Auto-approve under threshold (real-time authorization rules)

Our `ApprovalGate` should support all of these patterns.

---

## How to use this doc

This is **research material** meant to inform building later.
It should help us:
- avoid building "prompt-and-pray UI"
- design around **schemas + state machines** as the stable layer
- prioritize primitives that create trust: plan, approvals, diff, trace, permissions

When we start building, this memo becomes a reference for:
- the protocol layer (`@ax/protocol`)
- the run state machine (`@ax/core`)
- the first UI primitives (`@ax/ui`)