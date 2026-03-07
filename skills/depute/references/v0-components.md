# depute v0 — Core Primitives Reference

**Status:** Locked (Feb 15, 2026) · 6 components · Single-agent oversight

---

## The 6 Primitives

| # | Component | Role |
|---|-----------|------|
| 1 | `PlanCard` | "Here's what I'll do" — proposed plan with steps & assumptions |
| 2 | `ApprovalGate` | "Do you approve?" — scoped approve/reject/edit with staged mode |
| 3 | `ConfidenceMeter` | "How sure am I?" — confidence score + reasoning, meter or badge display |
| 4 | `RunControls` | "Pause / Resume / Stop" — execution steering |
| 5 | `ToolTrace` | "Here's what I'm doing" — live tool call timeline with input/output |
| 6 | `ArtifactCard` | "Here's what I made" — output with provenance, export, and metadata |

---

## Composition Flow

```
Agent proposes ──► PlanCard
                      │
          User reviews ──► ApprovalGate (mode: simple | staged)
                              │
                Agent runs ──► RunControls (pause/resume/stop)
                                  │
                                  ├──► ToolTrace (watch calls live)
                                  │
                                  ├──► ConfidenceMeter (per-step: display="meter" | "badge")
                                  │
                                  └──► ArtifactCard (output + export)
```

---

## Key Prop Patterns

### ApprovalGate

```tsx
<ApprovalGate
  title="Send email to customer"
  description="The agent will send a follow-up to 3 recipients."
  agentReasoning="Task requires notifying stakeholders of completed analysis."
  mode="simple"            // "simple" | "staged" (staged = Preview → Confirm → Execute)
  status="pending"         // "pending" | "approved" | "rejected"
  scope={{ target: 'Stripe API', resourceLimit: 100 }}  // optional scoped grant
  onApprove={() => agent.continue()}
  onReject={() => agent.stop()}
/>
```

**Important:** `ApprovalGate` supports scoped, time-bounded, and resource-capped grants — not just binary approve/reject. Use the `scope` prop for Stripe-style SPT patterns.

### ConfidenceMeter

```tsx
// Full meter (horizontal bar)
<ConfidenceMeter score={0.82} reasoning="Based on 3 verified sources" display="meter" />

// Compact inline badge
<ConfidenceMeter score={0.82} display="badge" size="sm" />
```

### RunControls

```tsx
<RunControls
  status="running"     // "idle" | "running" | "paused" | "stopped" | "error"
  onPause={agent.pause}
  onResume={agent.resume}
  onStop={agent.stop}
  onRetry={agent.retry}
/>
```

### ToolTrace

```tsx
<ToolTrace
  calls={agent.toolHistory}   // ToolCall[] from ax-common.ts
  streaming={true}             // enables auto-scroll for live streams
/>
```

### ArtifactCard

```tsx
<ArtifactCard
  output={agent.result}
  format="markdown"       // "markdown" | "json" | "csv" | "code"
  sourceStepId="step-3"   // provenance: which plan step produced this
  toolCallIds={["tc-12"]} // provenance: which tool calls produced this
/>
```

---

## Triage Decisions — What's Absorbed

Three research candidates were absorbed into v0 primitives rather than shipped separately:

| Candidate | Verdict | Where it lives now |
|-----------|---------|-------------------|
| `CommitGate` | Absorbed | `ApprovalGate` with `mode="staged"` (Preview → Confirm → Execute) |
| `UncertaintyBadge` | Absorbed | `ConfidenceMeter` with `display="badge"` |
| `EscapeHatchBar` | Deferred to v1 | Compose using `RunControls` + future `UndoStack` + `HumanTakeover` |

**Do not re-create these as separate components.**

---

## What's NOT in v0 (Deferred)

| Component | Why deferred | Target |
|-----------|-------------|--------|
| `IntentBar` | Generic input — AX value starts at PlanCard | v1 |
| `MemoryPanel` | "Session 2" concern — users need to see agent work first | v1 |
| `ThrottleControl` | Optimization for repeat users, not first-timers | v1 |
| `RiskBadge` | Can be a prop on `ApprovalGate` for now | v1 |
| `AdaptiveCanvas` | Too complex — needs its own epic | v2 |
| Financial Primitives (`MandateEditor`, `BudgetMeter`, etc.) | Vertical-specific — v0 is horizontal | v2 |

---

## Shared Types (ax-common.ts)

Key types installed automatically on first `npx ax-depute@latest add` run:

```ts
interface PlanStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  confidence?: number;
}

interface ToolCall {
  id: string;
  name: string;
  input: unknown;
  output?: unknown;
  status: 'running' | 'completed' | 'failed';
  policyFlags?: ('requiresApproval' | 'writesState' | 'externalAction')[];
}

interface Artifact {
  id: string;
  content: string;
  format: 'markdown' | 'json' | 'csv' | 'code';
  sourceStepId?: string;
  toolCallIds?: string[];
}
```
