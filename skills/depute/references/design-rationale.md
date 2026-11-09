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

---

## Why an approval keeps a portable record

The dispute after an agent payment is what the person was shown, what they approved, and whether that was the action that ran. Institutions increasingly leave the person as the actor of record for an agent they did not drive step by step. A vendor-only log answers that for the vendor. The person needs the payload and the decision in a form a third party can check.

The specification is that pattern. Public reporting from 26–28 October 2026 illustrated it: consumer-bank terms for agents, a payee or purpose that changed after a grant, an untrusted instruction on a payment, and supervision notes on agent payments. An illustration can be revised. An unconfirmed report is not a requirement. The human-facing writeup is `apps/www/content/docs/approval-record.mdx`.

Apply it as follows:

- Emit an `ApprovalReceipt` when the host passes `onReceipt`. The host stores the JSON. Do not add a receipt log component.
- Call `requiresApproval` before showing a gate. A new payee always gates. Identity is rail plus identifier. The same purpose inside the granted limit and duration does not re-gate. An untrusted source gates again and is high-stakes.
- When one of those payment triggers fired, leave Approve disabled until the why reaches 100 characters, unless the host set `minJustificationLength`. Reject stays immediate. Gates with no payment trigger stay one click.
- Sign with the host's Ed25519 app key when the host supplies one. Ask for a passkey only when the decision is high-stakes: new payee, purpose change, untrusted source, irreversible flag, or an amount above the host's cutoff. There is no universal dollar cutoff. The passkey prompt asks for user verification. Reject the assertion when the user-verified flag is unset. Do not copy a parsed flag into the receipt hash.
- Pass auto-approved payments to Budget Meter with `nowMs`. `smallPaymentBurst` warns when more than five payments under 5, in the last ten minutes, are not all the same payee and purpose. Show one row. Do not open a second gate. The same payee and purpose can repeat without that row.
- When the host passes the agent's recommendation to `recordAction`, record whether the person followed it. Alert when agreement is over 80% across at least 5 decisions. Leave blind mode off unless the host sets `blind` on the gate. Keep the streak, speed, and approval-rate checks.
- In staged mode, when the payload has a payee and an amount, keep Confirm off until `minReviewMs` (default 1500) after those fields paint. Leave Preview and Reject available. Leave simple mode instant. Start the receipt review duration when those fields paint, so Confirm cannot record a longer look than they were on screen. Do not start a passkey before Confirm.
- Show provenance, with source, optional url, and trust, on the approval gate and on each tool-trace step. When trust is untrusted, show a warning and force staged mode even if the host asked for simple mode. Let the presented payload's provenance win when both are set, and store that value on the receipt. A shared-context entry can carry the same trust on the provenance it already has.
- When the host sets `liabilityNotice` on Binding Approval, render it as a term and keep Sign off until it is checked. Leave Reject available. Record `liability-notice` on the receipt, and include the sentence that was shown. Use Policy Banner `mode="disclosure"` for the same fact in the viewport. It is neutral. Its default sentence is that the person is the actor of record for what the agent does. The host's `description` replaces that sentence.
- When the host passes `approvalChannel`, store `kind`, `agentReachable`, and `declaredBy: 'integrator'` on the receipt. Do not describe that declaration as checked. Keep Sign or Approve off for a high-stakes decision when `agentReachable` is `yes` or `unknown`. Leave Reject available. For `otp-email`, `otp-sms`, `chat`, and `in-agent-ui`, show "This approval code could be read by the agent." A code the caller holds does not satisfy the approval. The pattern is in `apps/www/content/docs/approval-channels.mdx`. A 6 November 2026 research review of an emailed one-time code is an illustration, not the requirement.
- When the host passes a `changeRequest` whose initiator is `agent`, open the gate and mark it high-stakes even if the amount is small. Show "Requested by the agent" with the from and to values. Store the initiator and both values on the receipt. Apply the channel rule for every limit or permission change, including one the person started. Do not add a cooling period, and do not add a switch that permits or forbids the raise.
- When the host passes `limits`, show each one's `enforcement` in words and say the claim is declared. Use protected styling only when enforcement is `server`. Snapshot the list on the approval receipt. Do not claim the limit is actually enforced.
- When the host passes `actor`, store the agent id, credential mode, and who they act for. Show "Acting as you (shared login)" when the mode is `shared-user-credentials` or `unknown`. Do not build an agent registry.
- When the host passes `expectedIntervalMs`, `lastRunAt`, and `nowMs` to Tool Trace, show "No sweep since" the last run once that age passes the interval, and call `onStale`. Do not invent a receipt for the silence.
- List standing grants on Capability Matrix with agent, scope, limit, expiry, and last use. Say "No expiry" when `expiresAt` is missing. `onRevoke` only notifies the host. Keep Delegation Gate as the approve or deny step. Do not add a new component.
- When the host passes `requirements`, list the items whose status is `assumed` or `unknown` under "The agent assumed:". Keep Approve off until the person checks "I checked these". Store every item and its status on the receipt, beside the why. A 5 November 2026 shopping benchmark is an illustration, not the requirement.

When you add the next control, update this section in the same change. State the pattern it answers. Date any report you cite and treat it as an illustration. Leave an unconfirmed report out of the requirement. The component page states the same pattern in a few sentences and links to `apps/www/content/docs/approval-record.mdx`.
