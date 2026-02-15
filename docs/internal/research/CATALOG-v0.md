# AX Catalog v0 — Locked

**Status:** ✅ Locked (Feb 15, 2026)
**Primitives:** 6
**Categories:** 4 of 8

---

## The v0 Primitives

| # | Primitive | Role | Headless Hook |
|---|---|---|---|
| 1 | `PlanCard` | "Here's what I'll do" — proposed plan with steps & assumptions | `usePlan()` |
| 2 | `ApprovalGate` | "Do you approve?" — scoped approve/reject/edit | `useApprovalGate()` |
| 3 | `ConfidenceMeter` | "How sure am I?" — confidence score + reasoning | `useConfidence()` |
| 4 | `RunControls` | "Pause / Resume / Stop" — execution steering | `useRun()` |
| 5 | `ToolTrace` | "Here's what I'm doing" — tool call timeline | `useTrace()` |
| 6 | `ArtifactCard` | "Here's what I made" — output with export options | — |

---

## Composition Flow

```
Agent proposes ──► PlanCard
                      │
          User reviews ──► ApprovalGate (mode: simple | staged)
                              │
                Agent runs ──► RunControls (pause/resume/stop)
                                  │
                                  ├──► ToolTrace (watch calls)
                                  │
                                  ├──► ConfidenceMeter (per-step, display: meter | badge)
                                  │
                                  └──► ArtifactCard (output + export)
```

---

## Triage Decisions (Candidates Resolved)

Three research candidates overlapped with v0. Resolved as follows:

| Candidate | Source | Verdict | Resolution |
|---|---|---|---|
| `CommitGate` | AX Book Ch 11 | **Absorbed** | `ApprovalGate` gains `mode="staged"` (Preview → Confirm → Execute) |
| `UncertaintyBadge` | AX Book Ch 12 | **Absorbed** | `ConfidenceMeter` gains `display="badge"` (compact inline variant) |
| `EscapeHatchBar` | AX Book Ch 9 | **Deferred** | v1 recipe composing `RunControls` + `UndoStack` + `HumanTakeover`. v0 `RunControls` stays minimal but extensible via `actions` slot. |

---

## What's NOT in v0

| Deferred | Why | Target |
|---|---|---|
| `IntentBar` | Generic input — AX value starts at PlanCard | v1 |
| `MemoryPanel` | "Session 2" concern — users need to see agent work first | v1 |
| `ThrottleControl` | Optimization for repeat users, not first-timers | v1 |
| `RiskBadge` | Can be a prop on ApprovalGate for now | v1 |
| `AdaptiveCanvas` | Too complex — needs its own epic | v2 |
| Financial Primitives | Vertical-specific — v0 is horizontal | v2 |

---

## Build Order

1. `PlanCard` — no dependencies
2. `ApprovalGate` — can reference PlanCard in stories
3. `ConfidenceMeter` — standalone signal
4. `RunControls` — standalone controls
5. `ToolTrace` — uses RunControls state
6. `ArtifactCard` — references ToolTrace output

---

## Next Steps

1. ~~Define v0 primitives~~ ✅
2. ~~Triage overlapping candidates~~ ✅
3. Update PRD docs (01-07) to reflect v0 + AX-CN model
4. Reset `progress.json` to match v0
5. Run `/vibe-step-1b-init-project` to scaffold
