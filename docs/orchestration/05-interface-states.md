# 05 - Interface States

## Shared Types

All components use the `RunState` type for execution tracking:

```typescript
type RunState = 'idle' | 'running' | 'paused' | 'completed' | 'failed';
```

And `ConfidenceLevel` for confidence thresholds:

```typescript
type ConfidenceLevel = 'high' | 'medium' | 'low';
```

---

## Component 1: PlanCard

### State Matrix

| State | Condition | Visual | Screen Reader |
|-------|-----------|--------|---------------|
| Empty | No steps provided | Empty card with "No plan" message | "No plan available" |
| Pending | Steps present, none active | All steps gray/pending | "Plan: [title], [n] steps pending" |
| In Progress | One step active | Active step highlighted, prior steps completed | "Plan: [title], step [n] of [total] in progress" |
| Completed | All steps completed | All steps green/checked | "Plan: [title], all [n] steps completed" |
| Failed | Active step failed | Failed step in red with error, prior steps intact | "Plan: [title], step [n] failed: [reason]" |
| Indeterminate | Steps present, total unknown | No total count shown, "..." indicator | "Plan: [n] steps completed, more expected" |

### Props Interaction Matrix

| Feature | Props Required | Visual Impact |
|---------|---------------|---------------|
| With assumptions | `assumptions` array | Expandable assumptions section |
| With reasoning | `reasoning` string | Expandable reasoning panel |
| With confidence | `confidence` per step | Confidence badges on each step |
| Clickable steps | `onStepClick` handler | Steps are interactive, cursor pointer |

---

## Component 2: ApprovalGate

### State Matrix

| State | Status | Visual | Interaction | Screen Reader |
|-------|--------|--------|-------------|---------------|
| Pending | `'pending'` | Highlighted card with action buttons | Approve/Reject enabled | "Approval required: [title]" (alert) |
| Approved | `'approved'` | Green confirmation state | Read-only | "Approved: [title]" |
| Rejected | `'rejected'` | Red rejection state | Read-only | "Rejected: [title]" |
| Expired | `'expired'` | Gray card with "expired" label | Read-only | "Approval expired: [title]" |

### Mode Variants

| Mode | Description | Extra Visual |
|------|-------------|-------------|
| `simple` | Single approve/reject decision | Standard two-button layout |
| `staged` | Preview → Confirm → Execute flow | Stage indicator, back button, confirm-and-execute CTA |

### Timeout Behavior

| Time Remaining | Visual |
|---------------|--------|
| >60s | No countdown shown |
| 10-60s | Amber countdown badge visible |
| <10s | Red countdown, urgent styling |
| 0s | Auto-transitions to expired state |

### Action Flow

```
pending ──> approved  (user clicks Approve)
        ├──> rejected  (user clicks Reject)
        └──> expired   (timeout reached)

staged mode:
pending ──> previewing ──> confirming ──> approved
                       └──> back to previewing
```

---

## Component 3: ConfidenceMeter

### State Matrix

| State | Confidence Value | Visual | Screen Reader |
|-------|-----------------|--------|---------------|
| High confidence | 80-100 | Green bar/badge | "[value]% confidence, high" |
| Medium confidence | 40-79 | Amber bar/badge | "[value]% confidence, medium" |
| Low confidence | 0-39 | Red bar/badge | "[value]% confidence, low" |
| No value | `undefined` | Gray placeholder | "Confidence: not available" |
| Animating | Value changing | Smooth color/width transition | Live region updates value |

### Display Variants

| Display | Visual | Best For |
|---------|--------|----------|
| `meter` | Horizontal bar with percentage | Detailed view, dashboards |
| `badge` | Compact inline pill | Inline annotations, lists |

### Props Interaction

| Feature | Props | Visual Impact |
|---------|-------|---------------|
| Show label | `showLabel` | "High/Medium/Low" text label |
| Show value | `showValue` | Numeric percentage |
| With reasoning | `reasoning` | Expandable reasoning text |

---

## Component 4: RunControls

### State Matrix

| State | RunState | Available Actions | Visual |
|-------|----------|------------------|--------|
| Idle | `'idle'` | Start | Play button enabled |
| Running | `'running'` | Pause, Stop | Pause/Stop buttons, pulsing indicator |
| Paused | `'paused'` | Resume, Stop | Resume/Stop buttons, amber indicator |
| Completed | `'completed'` | Restart (optional) | Green check, all buttons disabled |
| Failed | `'failed'` | Retry, Stop | Red indicator, retry button |

### Action Flow

```
idle ──> running ──> completed
              ├──> paused ──> running (resume)
              │          └──> idle (stop)
              ├──> failed ──> running (retry)
              └──> idle (stop)
```

---

## Component 5: ToolTrace

### State Matrix

| State | Condition | Visual |
|-------|-----------|--------|
| Empty | No tool calls | "No tool calls yet" message |
| Streaming | Calls arriving in real-time | Timeline with latest call highlighted, auto-scroll |
| Complete | All calls finished | Full timeline, all entries static |
| Error entry | Individual call failed | Red entry with error message and duration |
| Expanded entry | User clicked an entry | Shows input/output details |

### Entry States

| Entry State | Visual | Screen Reader |
|-------------|--------|---------------|
| Pending | Gray, spinner | "Tool call [name]: pending" |
| Running | Blue, active indicator | "Tool call [name]: running" (live) |
| Completed | Green, checkmark | "Tool call [name]: completed in [duration]" |
| Failed | Red, error icon | "Tool call [name]: failed: [error]" |

---

## Component 6: ArtifactCard

### State Matrix

| State | Condition | Visual |
|-------|-----------|--------|
| Preview | Content generated, not exported | Card with content preview, export buttons enabled |
| Exporting | Export in progress | Loading indicator on export button |
| Exported | Successfully exported | Green confirmation with format label |
| Error | Export failed | Red error, retry button |

### Export Options

| Format | Button Label | Icon |
|--------|-------------|------|
| Markdown | "Copy MD" | 📋 |
| JSON | "Copy JSON" | { } |
| CSV | "Download CSV" | 📊 |
| Pull Request | "Open PR" | 🔀 |

---

## Cross-Component State Interactions

When components are used together in a typical agent workflow:

| Agent Phase | PlanCard | ApprovalGate | ConfidenceMeter | RunControls | ToolTrace | ArtifactCard |
|-------------|----------|-------------|-----------------|-------------|-----------|-------------|
| Planning | Active (steps populating) | — | — | Idle | — | — |
| Approval | Frozen | Pending | Shows plan confidence | Idle | — | — |
| Execution | Steps advancing | Approved | Updates per-step | Running | Streaming | — |
| Complete | All done | — | Final score | Completed | Complete | Preview |

### Loading / Skeleton States

| Component | Skeleton |
|-----------|----------|
| PlanCard | 3 gray placeholder step bars |
| ApprovalGate | Gray card placeholder with disabled buttons |
| ConfidenceMeter | Gray pill/bar placeholder |
| RunControls | Disabled buttons with gray indicator |
| ToolTrace | Empty timeline with "waiting..." |
| ArtifactCard | Gray card placeholder |
