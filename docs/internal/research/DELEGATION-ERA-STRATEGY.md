# Delegation Era Strategy — AX Library Positioning

**Type:** 🧭 Strategic / Market Validation
**Status:** ✅ Reviewed — Confirms current path. Revisit when building reference app.
**Trigger:** OpenClaw joining OpenAI (Feb 2026) — signal that agent delegation infrastructure is a durable, high-value builder lane.

---

## Core Insight

> The opportunity isn't "no more apps." It's: **less UI for navigation, more UI for supervision.**

Agents compress workflows into intent, but users and companies still need interfaces to supervise what the agent is doing — visibility, control, safety, accountability.

---

## Where the Money Is

### 1. Agent Control Plane (B2B budget)
Permissions, tool-scoping, approval flows, audit logs, replay, traceability, policy checks.
→ **Our `ApprovalGate` is this lane.**

### 2. Observability + Reliability
Run traces, step-by-step execution logs, error recovery, evals.
→ **Our `ToolTrace`, `RunControls` are this lane.**

### 3. UX Primitives That Become Default
"The shadcn/ui of agent supervision." PlanCard, ConfirmCard, DiffReview, SourcePanel, confidence cues.
→ **AX library is primarily lane 3, with hooks into 1 and 2.**

---

## What Makes AX a Real Business (Not Just Cool)

Must become a **standard**, not just components. That requires:

- [ ] **Shared event model** — what every agent run emits
- [ ] **State machine vocabulary** — `planned → running → needs-approval → done → failed → recovered`
- [ ] **Small set of repeated control surface primitives** (already have 6)
- [ ] **Reference app(s)** that prove the primitives in real workflows

---

## Risks to Avoid

| Risk | Mitigation |
|---|---|
| Model/platform churn | Framework-agnostic React, no vendor tie-in ✅ |
| Too UI-only (gets cloned) | Shared event schema + state machine vocabulary (post-v0) |
| Too generic | Wedge: "approval + audit UI for tool-calling agents" ✅ |

---

## Sequencing Implications

| What | When |
|---|---|
| Stories → tests | Now (step 6/7) |
| Reference app / demo | After tests — proves primitives in a real workflow |
| Formal event schema | Derived from reference app, not written top-down |
| Block 01 + CLI | After event schema exists |

---

## When to Revisit

**Before building the reference app** — use this as the brief for what the app must demonstrate. The event model gap identified here is the primary thing the reference app needs to resolve.
