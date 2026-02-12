# AX Primitives - Starter Reference

**Type:** 🧩 Primitive Catalog
**Scope:** 48+ primitives across 8 categories

> **Purpose:** UI building blocks for delegation, trust, and visibility — not "chat components."

This document catalogs foundational primitives for Agentic Experience (AX) design. These are the atomic building blocks that compose into complete agent interfaces.

---

## 1. Intent & Delegation Primitives

Help users move from "talking" to "committing work."

| Primitive | Description |
|-----------|-------------|
| `IntentBar` | Compact control for defining what you want to do (goal, scope, mode) |
| `PlanCard` | Displays a proposed plan with steps, assumptions, and expected outputs |
| `StepList` | Executable checklist with per-step status and logs |
| `CommandPalette` | Fast action launcher for tools, templates, and recent actions |
| `PromptToSpec` | Transforms natural language into structured spec with fields and defaults |
| `ConstraintChips` | Explicit constraints like "no Fridays", "don't touch prod", "budget <$X" |
| `ContextPicker` | Selects what context the agent can access (docs, projects, repos) |

---

## 2. Trust & Approval Primitives

The "relationship design" pieces: boundaries, consent, and confidence.

| Primitive | Description |
|-----------|-------------|
| `ApprovalGate` | Approve, reject, or edit before an action runs |
| `RiskBadge` | Labels actions by risk level (low/medium/high) with reasoning |
| `PermissionScope` | Defines what the agent can touch (files, APIs, accounts) |
| `ConfirmationModal` | Confirm with a diff/preview, not just "are you sure?" |
| `ConfidenceMeter` | Shows confidence score plus reasoning (signals, missing info, ambiguities) |
| `AssumptionList` | Explicit assumptions with confirm/correct toggles |
| `PolicyBanner` | Non-negotiable rules like "never email clients", "no deletion without approval" |

---

## 3. Transparency & Trace Primitives

Make the system legible while it's working.

| Primitive | Description |
|-----------|-------------|
| `ToolTrace` | Timeline of tool calls showing input, output, duration, and errors |
| `ReasonPanel` | Explains "why I'm doing this" and "what I'm optimizing for" |
| `EvidenceStack` | Shows sources used with snippets, doc links, and timestamps |
| `StateInspector` | Displays current internal state (selected goal, constraints, memory used) |
| `ProgressStream` | Streaming progress events (like build logs, but human-readable) |
| `ErrorExplainer` | Rewrites errors into user choices (retry, change scope, grant access) |

---

## 4. Memory Primitives

Memory should be visible and editable in the moment, not buried in settings.

| Primitive | Description |
|-----------|-------------|
| `MemoryPanel` | Shows what memory is being used right now |
| `MemoryChip` | Single memory item with edit/remove/disable controls |
| `MemoryConsentToggle` | Toggle between "this session only" vs "always remember" |
| `PreferenceTokens` | User formatting/tone/depth preferences (bullets, concise, technical level) |
| `RecencyControls` | Filters like "only use last 30 days" or "don't use personal context" |

---

## 5. Adaptive Canvas Primitives

The "canvas is for commitment" layer — where work gets finalized.

| Primitive | Description |
|-----------|-------------|
| `AdaptiveCanvas` | Container that morphs into doc/table/form/timeline as needed |
| `StructuredEditor` | Rich editor supporting agent insertions and locked regions |
| `TableCanvas` | Spreadsheet-like view with agent fill and validations |
| `FormCanvas` | Form generator with inline agent suggestions |
| `DiffViewer` | Shows edits to doc/code/config with accept/reject per hunk |
| `VersionRail` | Version history with snapshots and restore points |

---

## 6. Control & Steering Primitives

Let users steer an agent during execution without breaking flow.

| Primitive | Description |
|-----------|-------------|
| `RunControls` | Pause, resume, stop, and retry buttons |
| `ModeSwitch` | Toggle between brainstorm, draft, execute, and review modes |
| `ThrottleControl` | Slider from "ask before each step" to "run until checkpoint" |
| `Checkpoint` | Automatic stopping points (after plan, before send, before write) |
| `UndoStack` | Reversible actions with clear restore semantics |
| `HumanTakeover` | "I'll do this part" handoff with step export and payload copy |

---

## 7. Output Primitives

Make outputs shippable and easy to integrate.

| Primitive | Description |
|-----------|-------------|
| `ArtifactCard` | Output summary with export options (MD, JSON, CSV, PR) |
| `SnippetBlock` | Copyable chunks with provenance (where it came from) |
| `ValidationSummary` | Checks passed/failed (schema, lint, unit tests) |
| `NextActionBar` | Suggested next steps like ship, share, schedule, or open PR |

---

## 8. Social & Shared-Work Primitives

For team collaboration — design as extension points even if built later.

| Primitive | Description |
|-----------|-------------|
| `ShareContext` | Share a run with someone (what they see, what's redacted) |
| `CommentLayer` | Comments attached to steps, diffs, and decisions |
| `AuditLog` | Immutable history for teams |
| `RoleBadges` | Shows who approved what (owner/reviewer/agent) |

---

## Library Architecture

To package these as a proper primitives kit, structure in 3 layers:

### Layer 1: Headless Primitives (State Machines / Hooks)

```typescript
useRun()
useApprovalGate()
useTrace()
useMemory()
```

### Layer 2: Composable UI Primitives

The visual components listed above.

### Layer 3: Reference Recipes

Small demos combining primitives into flows:

- **Plan → Approve → Execute** — Basic delegation flow
- **Execute → Diff → Undo** — Reversible action pattern
- **Memory → Consent → Preferences** — Memory management flow

---

## 📋 Candidates from Research

*New primitive candidates discovered during research. These are NOT finalized — they'll be evaluated when we revise the catalog after the research phase is complete.*

| Candidate | Description | Source | Overlaps With | Priority |
|---|---|---|---|---|
| `TaskQueue` | Queue follow-up instructions for a running agent without interrupting | Cowork Analysis | — | 🟡 Medium |
| `TaskSuggestions` | Starter task cards — concrete proposals the user can pick to begin | Cowork Landing Page, AX Book Ch 6 | `CommandPalette`, `NextActionBar` (partial) | 🟡 Medium |
| `ModelBadge` | Display which AI model is running the current task | Cowork Analysis | Could be `IntentBar` prop | 🟢 Low |
| `CapabilityGlossary` | Browsable, searchable list of what the agent can do | AX Book Ch 6 | — | 🟡 Medium |
| `ContextViewer` | Read-only reference list showing what files/data the agent has loaded | Cowork Analysis | `ContextPicker` (read-only variant) | 🟢 Low |
| `WhyThisUI` | Explains why the interface is showing specific content ("because you're editing X") | AX Book Ch 6 | `ReasonPanel` (partial — explains agent reasoning, not UI choices) | 🟢 Low |

### Notes
- **`ModeSwitch` gap:** Our current `ModeSwitch` covers task phases (brainstorm/draft/execute/review). Chapter 6 implies an expertise axis (beginner → power user). May need a `ModeLadder` variant or an additional prop.
- **Inline reasoning:** Cowork mixes natural language reasoning inline with `ToolTrace` entries. Our `ReasonPanel` is separate. Consider a composite mode rather than a new primitive.
- **Stability Anchors:** Chapter 6's concept of guaranteeing "Export is always here, Undo is always here" is a design guideline, not a component.

*Last updated: Feb 12, 2026 — through AX Book Ch 6 + Cowork Analysis*