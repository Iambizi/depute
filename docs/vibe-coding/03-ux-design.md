# 03 - UX Design

## Core UX Philosophy

AX components bridge the gap between traditional deterministic UIs and the probabilistic nature of AI agents. Every design decision must account for uncertainty, transparency, and human oversight.

## Dual-Audience UX Patterns

### Prototyping Audience (Designers/PMs)

| Need | Pattern |
|------|---------|
| Quick setup | One-function mock data generators |
| Realistic feel | Auto-advancing simulations with timing delays |
| Variation testing | Interactive Storybook controls for all states |
| No backend required | Self-contained mock utilities |
| Shareable demos | Storybook deploys as static site |

### Production Audience (Engineers)

| Need | Pattern |
|------|---------|
| Real data integration | Props accept any data conforming to interfaces |
| Edge case handling | All error/empty/loading states built in |
| Performance | Minimal re-renders, CSS animations over JS |
| Accessibility | WCAG 2.1 AA compliance |
| Customization | className prop + CSS custom properties |

## Interaction Patterns

### 1. Progressive Disclosure

Agent reasoning and detailed information should be available but not overwhelming:

- **Default view**: Show status, label, and confidence at a glance
- **Expanded view**: Reveal reasoning, timestamps, detailed descriptions
- **Pattern**: Click/tap to expand, or `showReasoning` prop for always-visible

### 2. Confidence Communication

Confidence scores (0-100%) must be communicated without causing anxiety:

- **High confidence (80-100%)**: Subtle positive indicator, no special attention needed
- **Medium confidence (50-79%)**: Visible but not alarming, invites review
- **Low confidence (0-49%)**: Clear warning, suggests human review needed
- **Visual encoding**: Color gradient + numeric value + optional progress bar
- **Never hide confidence**: Transparency is a core principle

### 3. Status Transitions

Agent status changes should feel smooth and informative:

- **Pending to Active**: Subtle animation drawing attention to the step
- **Active state**: Pulsing/spinning indicator showing ongoing work
- **Active to Completed**: Satisfying completion animation (checkmark, color shift)
- **Active to Failed**: Clear but not alarming error state, with recovery info
- **New step appearing**: Slide-in animation for dynamically discovered steps

### 4. Human-in-the-Loop Gates

Approval gates must be unmissable but not obstructive:

- **Visual break**: Clear separation from automated steps
- **Action required indicator**: Prominent but not panic-inducing
- **Context provided**: Show what the agent wants to do and why
- **Binary action**: Clear Approve/Reject with optional comment
- **Timeout handling**: Visual countdown if time-limited

### 5. Indeterminate Progress

When total steps are unknown:

- **Communicate uncertainty honestly**: "Working..." not fake progress bars
- **Show completed work**: Stack of completed steps provides progress feel
- **Active indicator**: Current step shows the agent is working
- **No fake progress**: Never show a percentage when total is unknown

## Animation Principles

### Timing

| Animation Type | Duration | Easing |
|---------------|----------|--------|
| Status change | 300ms | ease-in-out |
| Expand/collapse | 250ms | ease-out |
| Pulse/spin (active) | 1500ms | linear (loop) |
| Slide-in (new step) | 400ms | ease-out |
| Fade (confidence change) | 200ms | ease |
| Error shake | 400ms | ease-in-out |

### Rules

1. **Purposeful only**: Every animation communicates a state change
2. **Respect prefers-reduced-motion**: Disable animations when user prefers
3. **CSS-only**: Use CSS animations/transitions, not JavaScript animation libraries
4. **No blocking**: Animations never prevent interaction
5. **Consistent**: Same type of change = same animation everywhere

## Layout Patterns

### Vertical Step List (AgentProgressTracker)

```
┌─────────────────────────────────┐
│ [icon] Step Label        85% ✓  │
│         Description text        │
│         > Show reasoning        │
├─────────────────────────────────┤
│ [spin] Active Step       72%    │
│         Currently working...    │
│         Reasoning visible       │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤
│ [○] Pending Step                │
│         Waiting...              │
└─────────────────────────────────┘
```

### Inline Badge (ConfidenceScoreBadge)

```
[████████░░] 82%     ← progress bar variant
[High: 92%]          ← label variant
[●] 67%              ← minimal variant
```

### Status Dot (AgentStatusIndicator)

```
● Idle          (gray, static)
● Running       (blue, pulsing)
● Completed     (green, static)
● Failed        (red, static)
● Waiting       (amber, pulsing)
```

### Approval Gate (BasicHumanApprovalGate)

```
┌─────────────────────────────────┐
│ ⚠ Approval Required            │
│                                 │
│ Agent wants to: [action desc]   │
│ Reason: [agent reasoning]       │
│ Confidence: [badge]             │
│                                 │
│    [Reject]     [Approve]       │
└─────────────────────────────────┘
```

## Responsive Behavior

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>768px) | Full layout with side-by-side elements |
| Tablet (481-768px) | Stacked layout, full-width steps |
| Mobile (<480px) | Compact view, confidence as small badge, collapsed reasoning |

## Color Usage Rules

1. **Status colors are semantic**: green=success, red=error, blue=active, amber=warning, gray=pending
2. **Color is never the only indicator**: Always pair with icons, text, or patterns
3. **Dark mode ready**: Use CSS custom properties for all colors
4. **Confidence gradient**: Maps 0-100% to a red-amber-green spectrum
5. **Sufficient contrast**: All text meets WCAG AA contrast ratios (4.5:1 normal, 3:1 large)

## Error State UX

### Principles

- **Never alarming**: Errors are expected in agentic workflows
- **Always actionable**: Show what went wrong and what can be done
- **Recovery-focused**: Emphasize retry/alternative paths over failure
- **Context preserved**: Don't lose completed work when showing errors

### Error Display Pattern

```
┌─────────────────────────────────┐
│ [!] Step Failed                 │
│     "Could not access document" │
│                                 │
│     Attempted: 2 times          │
│     [Retry]  [Skip]  [Details]  │
└─────────────────────────────────┘
```
