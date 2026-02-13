# 05 - Interface States

## Shared Types

All components use the `AgentStatus` type for status tracking:

```typescript
type AgentStatus = 'pending' | 'active' | 'completed' | 'failed';
```

Confidence is always a number from 0-100, with these semantic levels:

```typescript
type ConfidenceLevel = 'low' | 'medium' | 'high';
// low: 0-39, medium: 40-79, high: 80-100
```

---

## Component 1: AgentProgressTracker

### State Matrix

| State | Steps Data | Mode | Visual | Screen Reader |
|-------|-----------|------|--------|---------------|
| Empty | `[]` | either | Empty container with "No steps" message | "Agent progress: no steps" |
| Single pending | 1 pending step | determinate | Step with gray indicator | "Step 1 of 1: [label], pending" |
| Single active | 1 active step | determinate | Step with blue pulse indicator | "Step 1 of 1: [label], in progress" |
| Multiple mixed | Active + pending + completed | determinate | Full step list with timeline | Announces each step status |
| All completed | All steps completed | determinate | All green checkmarks | "Agent progress complete: [n] steps completed" |
| Has failure | One step failed | determinate | Red indicator on failed step | "[label] failed: [errorMessage]" |
| Indeterminate | Steps present, total unknown | indeterminate | No total count shown, "..." indicator | "Agent progress: [n] steps completed, more expected" |
| With confidence | Steps have confidence scores | either | Confidence badges on each step | "[label]: [confidence]% confidence" |
| With reasoning | Steps have reasoning text | either | Expandable reasoning sections | Reasoning text readable on expand |
| With timestamps | Steps have timestamp data | either | Relative time display | "Completed [time] ago" |
| Real-time update | New step added to array | either | Slide-in animation for new step | "New step: [label]" announced |

### Step Status Lifecycle

```
pending ──> active ──> completed
                   └──> failed
```

### Props Interaction Matrix

| Prop | Effect when true/set | Effect when false/unset |
|------|---------------------|------------------------|
| `showConfidence` | Confidence badges visible on steps that have scores | Confidence hidden |
| `showReasoning` | Reasoning text shown (expanded or collapsible) | Reasoning hidden |
| `showTimestamps` | Timestamps displayed per step | Timestamps hidden |
| `mode="indeterminate"` | No total count, "more steps possible" indicator | Shows "Step X of Y" |
| `currentStepId` | Overrides which step appears active | First step with `status: 'active'` used |
| `onStepClick` | Steps are clickable, cursor pointer | Steps are not interactive |

---

## Component 2: ConfidenceScoreBadge

### State Matrix

| State | Confidence Value | Visual | Screen Reader |
|-------|-----------------|--------|---------------|
| High confidence | 80-100 | Green badge/bar | "[value]% confidence, high" |
| Medium confidence | 40-79 | Amber badge/bar | "[value]% confidence, medium" |
| Low confidence | 0-39 | Red badge/bar | "[value]% confidence, low" |
| Zero confidence | 0 | Red badge, empty bar | "0% confidence, low" |
| Full confidence | 100 | Green badge, full bar | "100% confidence, high" |
| No value | `undefined` | "N/A" or hidden (configurable) | "Confidence not available" |
| Animating | Value changing | Smooth transition between states | New value announced |

### Variants

| Variant | Visual Description |
|---------|-------------------|
| `badge` | Pill-shaped label with colored background: `[High: 92%]` |
| `bar` | Horizontal progress bar with percentage label |
| `minimal` | Dot + percentage only: `● 67%` |
| `ring` | Circular progress ring (small, icon-sized) |

### Size Options

| Size | Font Size | Height | Use Case |
|------|-----------|--------|----------|
| `sm` | 12px | 20px | Inline with text, table cells |
| `md` | 14px | 28px | Default, step items |
| `lg` | 16px | 36px | Standalone, hero displays |

---

## Component 3: AgentStatusIndicator

### State Matrix

| State | Status Value | Visual | Animation | Screen Reader |
|-------|-------------|--------|-----------|---------------|
| Idle | `'idle'` | Gray dot | None | "Agent idle" |
| Running | `'running'` | Blue dot | Pulsing | "Agent running" (live region) |
| Completed | `'completed'` | Green dot | None | "Agent completed" |
| Failed | `'failed'` | Red dot | None | "Agent failed" |
| Waiting | `'waiting'` | Amber dot | Pulsing | "Agent waiting for input" |
| Connecting | `'connecting'` | Blue dot | Spinning | "Agent connecting" |

### Variants

| Variant | Visual Description |
|---------|-------------------|
| `dot` | Simple colored circle (default) |
| `dot-label` | Colored dot + text label: `● Running` |
| `banner` | Full-width status bar with icon, label, description |
| `chip` | Compact pill: `[● Running]` |

### Size Options

| Size | Dot Diameter | Use Case |
|------|-------------|----------|
| `sm` | 8px | Inline text, lists |
| `md` | 12px | Default |
| `lg` | 16px | Headers, prominent display |

### With Optional Fields

| Optional Prop | Effect |
|---------------|--------|
| `label` | Custom label text (overrides default status text) |
| `description` | Additional context shown in banner variant |
| `showLabel` | Show/hide the text label (dot variant) |
| `pulse` | Override auto-pulse behavior |

---

## Component 4: BasicHumanApprovalGate

### State Matrix

| State | Status | Visual | Interaction | Screen Reader |
|-------|--------|--------|-------------|---------------|
| Pending | `'pending'` | Highlighted card with action buttons | Approve/Reject enabled | "Approval required: [title]" (alert) |
| Approved | `'approved'` | Green confirmation state, buttons disabled | Read-only | "Approved: [title]" |
| Rejected | `'rejected'` | Red rejection state, buttons disabled | Read-only | "Rejected: [title]" |
| Expired | `'expired'` | Gray expired state, buttons disabled | Read-only | "Expired: [title]" |
| Loading | Submitting decision | Buttons show loading spinner | Buttons disabled | "Submitting decision..." |

### Props Interaction Matrix

| Prop | Effect when set |
|------|----------------|
| `title` | Header text for the approval gate |
| `description` | Detailed context about what needs approval |
| `agentReasoning` | Why the agent is requesting this approval |
| `confidence` | Confidence badge shown on the gate |
| `onApprove` | Callback when user clicks Approve |
| `onReject` | Callback when user clicks Reject |
| `approveLabel` | Custom text for approve button (default: "Approve") |
| `rejectLabel` | Custom text for reject button (default: "Reject") |
| `timeout` | Seconds until auto-expire (shows countdown) |
| `metadata` | Key-value pairs displayed as context |
| `status` | Controls which state the gate displays |

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
```

---

## Cross-Component State Interactions

When components are used together in a typical agent workflow:

```
AgentStatusIndicator: idle → running → waiting → running → completed
                                         │
AgentProgressTracker: step1(active) → step2(active) → approval(active) → step3(active) → done
                                                          │
BasicHumanApprovalGate:                              pending → approved
                                                          │
ConfidenceScoreBadge:                    shown on each step + on approval gate
```

## Loading / Skeleton States

All components support a `loading` state that shows a skeleton placeholder:

| Component | Skeleton Visual |
|-----------|----------------|
| AgentProgressTracker | 3 gray placeholder step bars |
| ConfidenceScoreBadge | Gray pill/bar placeholder |
| AgentStatusIndicator | Gray dot (same as idle) |
| BasicHumanApprovalGate | Gray card placeholder with disabled buttons |
