# AX Primitives - Starter Reference

**Type:** 🧩 Primitive Catalog
**Scope:** 50+ primitives across 9 categories
**v0 Status:** 6 primitives locked for build (Feb 15, 2026) — see `catalog-versions/CATALOG-v0.md`
**v1 Status:** 5 orchestration primitives locked (Feb 21, 2026) — see `catalog-versions/CATALOG-v1.md`

> **Purpose:** UI building blocks for delegation, trust, and visibility — not "chat components."

This document catalogs foundational primitives for Agentic Experience (AX) design. These are the atomic building blocks that compose into complete agent interfaces.

### v0 Implementation Key

| Icon | Meaning |
|---|---|
| 🔨 **v0** | Locked for current build |
| 🔀 **Absorbed** | Merged into a v0 primitive as a mode/variant |
| ⏳ v1 | Deferred to v1 |
| ⏳ v2 | Deferred to v2 |
| — | Not yet scheduled |

---

## 1. Intent & Delegation Primitives

Help users move from "talking" to "committing work."

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `IntentBar` | Compact control for defining what you want to do (goal, scope, mode) | ⏳ v1 |
| `PlanCard` | Displays a proposed plan with steps, assumptions, and expected outputs | 🔨 **v0** |
| `StepList` | Executable checklist with per-step status and logs | — |
| `CommandPalette` | Fast action launcher for tools, templates, and recent actions | — |
| `PromptToSpec` | Transforms natural language into structured spec with fields and defaults | — |
| `ConstraintChips` | Explicit constraints like "no Fridays", "don't touch prod", "budget <$X" | — |
| `ContextPicker` | Selects what context the agent can access (docs, projects, repos) | — |

---

## 2. Trust & Approval Primitives

The "relationship design" pieces: boundaries, consent, and confidence.

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `ApprovalGate` | Approve, reject, or edit before an action runs | 🔨 **v0** |
| `RiskBadge` | Labels actions by risk level (low/medium/high) with reasoning | ⏳ v1 |
| `PermissionScope` | Defines what the agent can touch (files, APIs, accounts) | — |
| `ConfirmationModal` | Confirm with a diff/preview, not just "are you sure?" | — |
| `ConfidenceMeter` | Shows confidence score plus reasoning (signals, missing info, ambiguities) | 🔨 **v0** |
| `AssumptionList` | Explicit assumptions with confirm/correct toggles | — |
| `PolicyBanner` | Non-negotiable rules like "never email clients", "no deletion without approval" | — |

---

## 3. Transparency & Trace Primitives

Make the system legible while it's working.

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `ToolTrace` | Timeline of tool calls showing input, output, duration, and errors | 🔨 **v0** |
| `ReasonPanel` | Explains "why I'm doing this" and "what I'm optimizing for" | — |
| `EvidenceStack` | Shows sources used with snippets, doc links, and timestamps | — |
| `StateInspector` | Displays current internal state (selected goal, constraints, memory used) | — |
| `ProgressStream` | Streaming progress events (like build logs, but human-readable) | — |
| `ErrorExplainer` | Rewrites errors into user choices (retry, change scope, grant access) | — |

---

## 4. Memory Primitives

Memory should be visible and editable in the moment, not buried in settings.

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `MemoryPanel` | Shows what memory is being used right now | ⏳ v1 |
| `MemoryChip` | Single memory item with edit/remove/disable controls | — |
| `MemoryConsentToggle` | Toggle between "this session only" vs "always remember" | — |
| `PreferenceTokens` | User formatting/tone/depth preferences (bullets, concise, technical level) | — |
| `RecencyControls` | Filters like "only use last 30 days" or "don't use personal context" | — |

---

## 5. Adaptive Canvas Primitives

The "canvas is for commitment" layer — where work gets finalized.

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `AdaptiveCanvas` | Container that morphs into doc/table/form/timeline as needed | ⏳ v2 |
| `StructuredEditor` | Rich editor supporting agent insertions and locked regions | — |
| `TableCanvas` | Spreadsheet-like view with agent fill and validations | — |
| `FormCanvas` | Form generator with inline agent suggestions | — |
| `DiffViewer` | Shows edits to doc/code/config with accept/reject per hunk | — |
| `VersionRail` | Version history with snapshots and restore points | — |

---

## 6. Control & Steering Primitives

Let users steer an agent during execution without breaking flow.

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `RunControls` | Pause, resume, stop, and retry buttons | 🔨 **v0** |
| `ModeSwitch` | Toggle between brainstorm, draft, execute, and review modes | — |
| `ThrottleControl` | Slider from "ask before each step" to "run until checkpoint" | ⏳ v1 |
| `Checkpoint` | Automatic stopping points (after plan, before send, before write) | — |
| `UndoStack` | Reversible actions with clear restore semantics | — |
| `HumanTakeover` | "I'll do this part" handoff with step export and payload copy | — |

---

## 7. Output Primitives

Make outputs shippable and easy to integrate.

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `ArtifactCard` | Output summary with export options (MD, JSON, CSV, PR) | 🔨 **v0** |
| `SnippetBlock` | Copyable chunks with provenance (where it came from) | — |
| `ValidationSummary` | Checks passed/failed (schema, lint, unit tests) | — |
| `NextActionBar` | Suggested next steps like ship, share, schedule, or open PR | — |

---

## 8. Social & Shared-Work Primitives

For team collaboration — design as extension points even if built later.

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `ShareContext` | Share a run with someone (what they see, what's redacted) | — |
| `CommentLayer` | Comments attached to steps, diffs, and decisions | — |
| `AuditLog` | Immutable history for teams | — |
| `RoleBadges` | Shows who approved what (owner/reviewer/agent) | — |

---

## 9. Multi-Agent Orchestration Primitives

Scale from single-threaded loops to parallel, hierarchical swarms managed by an Orchestrator.

| Primitive | Description | v0 Status |
|-----------|-------------|:---------:|
| `OrchestratorView` | Macro-level visualization of the agent command-and-control hierarchy | ⏳ v1 |
| `AgentRoster` | Resource management view of concurrent workers and their states | ⏳ v1 |
| `SubagentCard` | Condensed node component showing an individual worker's status | ⏳ v1 |
| `TaskQueue` | Backlog of pending jobs/requests waiting for available worker capacity | ⏳ v1 |
| `HandoffProtocol` | Standardized UI for passing context from Orchestrator → Specialist → Human | ⏳ v1 |

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
| `TaskSuggestions` | Starter task cards — concrete proposals the user can pick to begin | Cowork Landing Page, AX Book Ch 6 | `CommandPalette`, `NextActionBar` (partial) | 🟡 Medium |
| `ModelBadge` | Display which AI model is running the current task | Cowork Analysis | Could be `IntentBar` prop | 🟢 Low |
| `CapabilityGlossary` | Browsable, searchable list of what the agent can do | AX Book Ch 6 | — | 🟡 Medium |
| `ContextViewer` | Read-only reference list showing what files/data the agent has loaded | Cowork Analysis | `ContextPicker` (read-only variant) | 🟢 Low |
| `WhyThisUI` | Explains why the interface is showing specific content ("because you're editing X") | AX Book Ch 6 | `ReasonPanel` (partial — explains agent reasoning, not UI choices) | 🟢 Low |
| `AmbientNudge` | Proactive, contextual notification from agent (with snooze + dismiss) | AX Book Ch 7 | — | 🟡 Medium |
| `ExceptionInbox` | Curated list of only the items that require human judgment | AX Book Ch 7 | — | 🟡 Medium |
| `QuietMode` | User controls frequency + channels of agent interruptions (attention budget) | AX Book Ch 7 | — | 🟡 Medium |
| `TransparencyDial` | Brief ↔ detailed slider for agent verbosity (remembered per user + task type) | AX Book Ch 8 | — | 🟡 Medium |
| `TrustMeter` | Relationship trust level indicator (functional → contextual → judgment → advocacy) | AX Book Ch 8 | `ConfidenceMeter` (different — per-action vs relationship) | 🟢 Low |
| `PushbackCard` | Agent's tactful alternative recommendation ("I can do X, but I'd recommend Z") | AX Book Ch 8 | — | 🟡 Medium |
| `TeamPanel` | Multi-agent visibility — who's involved, responsibilities, handoffs | AX Book Ch 8 | — | 🟡 Medium |
| `PreferenceDefaults` | Stored user preferences for pace, format, tone, definitions | AX Book Ch 8 | `MemoryPanel` (adjacent but distinct — preferences vs memories) | 🟢 Low |
| `RelationshipCard` | Agent role + boundaries disclosure — "What I am / What I'm not / What I can do / When I hand off" | AX Book Ch 9 | `CapabilityGlossary` (adjacent — skills vs role/boundaries) | 🟡 Medium |
| `EscapeHatchBar` | Unified safety controls bar (Pause · Undo · Reset · Export · Manual · Human). Auto-surfaces when stakes rise | AX Book Ch 9 | `UndoStack` + `HumanTakeover` + `ThrottleControl` (parts exist, bar is new) | 🟡 Medium |
| `OveruseNudge` | Detect unhealthy usage patterns and nudge breaks without shaming | AX Book Ch 9 | — | 🟢 Low |
| `RelationshipHealth` | Dashboard of "what the system thinks it knows" + "what it's optimizing for" | AX Book Ch 10 | — | 🟡 Medium |
| `LearningChangelog` | "What changed/learned since last session" (distinct from action log) | AX Book Ch 10 | `AuditLog` (actions vs learning) | 🟡 Medium |
| `IncentiveDisclosure` | Card showing "what I'm optimizing for" and why (alignment transparency) | AX Book Ch 10 | — | 🟢 Low |
| `BehaviorContract` | UI for explicit promises, prohibited behaviors, and boundary definitions | AX Book Ch 10 | — | 🟡 Medium |
| `WorkflowTemplate` | "Run this playbook again" — user-saved agent sequence templates | AX Book Ch 10 | — | 🟡 Medium |
| `AgentWallet` | Visual component showing agent's balance, address, and recent spend | Coinbase Report | — | 🟢 Low (but high for fintech) |
| `MandateEditor` | Configuration UI for "Spend up to $X, max $Y/tx" (Policy creation) | Coinbase Deep Dive | — | 🟡 Medium |
| `BudgetMeter` | Visual gauge of remaining session budget vs cap | Coinbase Deep Dive | `ThrottleControl` (financial variant) | 🟡 Medium |
| `TransactionReceipt` | Rich receipt card linking payment ↔ task reason | Coinbase Deep Dive | — | 🟡 Medium |
| `SpendApprovalInbox` | Queue for transactions exceeding auto-limits | Coinbase Deep Dive | `ApprovalGate` list view | 🟡 Medium |
| `CommitGate` | Explicit "Preview → Confirm → Execute" state machine for high-stakes actions | AX Book Ch 11 | `ApprovalGate` (stateful variant) | 🟡 Medium |
| `PermissionBroker` | Manages scopes, time limits, and spend caps for agents | AX Book Ch 11 | `ThrottleControl` (backend logic) | 🟡 Medium |
| `TrustProfile` | Dashboard showing "what the system knows about me" and "what it's allowed to do" | AX Book Ch 11 | `RelationshipHealth` + `MemoryPanel` | 🟡 Medium |
| `TrustScoreboard` | Admin view of signals over time: reversals, corrections, escalations | AX Book Ch 12 | — | 🟢 Low |
| `UncertaintyBadge` | Distinct component for "I'm guessing here" vs "I know this" | AX Book Ch 12 | `ConfidenceMeter` (inverse) | 🟡 Medium |
| `RecoveryFlow` | Standardized pattern for "Admit Mistake → Fix → Verify" | AX Book Ch 12 | — | 🟡 Medium |
| `MaturityChecklist` | Design-time artifact: "Are we ready to ship this autonomy?" | AX Book Ch 12 | — | 🟢 Low |

### Notes
- **`ModeSwitch` gap:** Our current `ModeSwitch` covers task phases (brainstorm/draft/execute/review). Chapter 6 implies an expertise axis (beginner → power user). May need a `ModeLadder` variant or an additional prop.
- **Inline reasoning:** Cowork mixes natural language reasoning inline with `ToolTrace` entries. Our `ReasonPanel` is separate. Consider a composite mode rather than a new primitive.
- **Stability Anchors:** Chapter 6's concept of guaranteeing "Export is always here, Undo is always here" is a design guideline, not a component.
- **Confidence Threshold Router (Ch 7):** The auto → confirm → escalate routing maps to `ThrottleControl` + `ConfidenceMeter` combined — not a new primitive, but a useful composite pattern to document.
- **Autopilot with Guardrails (Ch 7):** Covered by `ThrottleControl` (max autonomy) + `PolicyBanner` + `UndoStack` — a recipe, not a new primitive.
- **`HumanTakeover` expansion (Ch 8/9):** Principle 6 ("Loop In Other Experts") implies extending `HumanTakeover` to also route to sub-agents and external APIs. Ch 9 adds "what will be shared + why" as a required prop.
- **`RiskBadge` expansion (Ch 8):** Principle 4 ("Pushback Is Professional") implies a richer version — not just a badge but a full callout with reasoning and alternative. `PushbackCard` may be a separate primitive or a `RiskBadge` variant.
- **Ch 8 validated ~12 existing primitives** — strongest confirmation yet that the catalog was well-designed.
- **3I Lens (Ch 9):** Industry × Intent × Individual is a calibration framework, not a primitive — should inform our props/config system (e.g., `strictness` prop on safety primitives).
- **Ethics Rubric (Ch 9):** 9-point design review checklist — not a primitive but a useful design guideline to include in docs.
- **Relationship Moat (Ch 10):** Trust is the only moat that compounds. Primitives should emphasize *cumulative* value (learning logs, behavior contracts) over just task completion.
- **Financial Autonomy (Val):** Coinbase report validates the need for strict, specialized throttles (`BudgetCap`, `TransactionGate`) — matching our "Trust & Safety" category perfectly.
- **Safe Autonomy Wedge:** User analysis identifies "Safe Autonomy" (Mandate + Guardrails) as the killer use case. Financial primitives should be prioritized as a "Spend Controls Kit."

*Last updated: Feb 21, 2026 — v1 status added; multi-agent orchestration category introduced*