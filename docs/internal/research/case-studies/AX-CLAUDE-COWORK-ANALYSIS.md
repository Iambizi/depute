# Claude Cowork — AX Interface Analysis

**Type:** 🔬 Real-World Case Study
**Source:** Anthropic (Claude Cowork, research preview Feb 2026)

---

## Why this doc exists

Claude Cowork is Anthropic's agentic interface for non-developers — the same agent capabilities as Claude Code, wrapped in a UI designed for everyday users. It's one of the most mature examples of AX design in production today.

This analysis is based on live screenshots taken during a brand identity workshop (Feb 2026) and publicly available documentation. No in-depth UX case studies of Cowork have been published yet; this represents original analysis.

We analyze two states: the **landing page** (idle, pre-task) and the **active task view** (agent working).

---

## 1) Landing Page — Idle State

Before any task starts, Cowork presents a minimal onboarding surface:

### Layout
- **Left sidebar:** "New task", "Search", "Recents" (empty: "No sessions yet")
- **Center:** Hero text + task suggestions + input bar
- **Top bar:** Chat / **Cowork** / Code mode tabs

### Key Elements

**Hero text: "Let's knock something off your list"**
- Frames Cowork as task completion, not conversation
- Action-oriented ("knock something off"), not open-ended

**"Pick a task, any task" — Suggested task cards:**
- "Optimize my week"
- "Organize my screenshots"
- "Find insights in files"
- Each card has an icon and short label — no descriptions, no configuration

**"+ Customize with plugins"**
- Extensibility model surfaced at the top level
- Users can add specialized capabilities before starting

**Input bar:**
- "How can I help you today?" prompt
- "Work in a folder" — explicit access grant before work begins
- Model selector (Opus 4.6) — user chooses which model runs
- "Let's go →" button — deliberate commitment to start

### AX Patterns in the Landing Page

**Generative Momentum** (AX Book, Pattern 6): The suggested task cards are concrete starting points, not a blank prompt. The system doesn't wait for the user to figure out what to ask — it proposes work the user can steer. This maps exactly to the book's insight: *"the fastest way to clarify a thought is to see it half-written."*

**Intent Handshake** (AX Book, Pattern 1): The "Work in a folder" + model selector + suggested tasks collectively form a scoping exchange. The user defines boundaries (folder, model) and intent (task card or free text) before the agent acts.

**Trust-Once Access**: Folder access is granted once, upfront, at the landing page level — not per-action. This is a deliberate design choice: low friction to start, high autonomy during execution.

---

## 2) Active Task View — Interface Anatomy

Once a task is running, the interface shifts to a **3-panel layout**:

### Left Panel: Agent Activity Stream (main area)
- Streaming log of agent actions and reasoning
- Tool calls shown with "Script" badges
- Agent thinking displayed as inline text (conversational tone)
- Completed actions marked with ✅ "Done" checkmarks
- Loading state: "Sending message..." spinner
- Natural language reasoning between steps ("51 images — that's a rich collection")

### Right Panel: Three collapsible sections

**Progress (top)**
- Numbered step list (1-4) with descriptive labels
- Steps are pre-planned (agent created them upfront)
- Shows the full plan before execution starts
- No per-step status icons (just numbers) — simpler than our `StepList`

**References (middle)**
- Lists all files the agent is using
- Includes instruction file ("Instructions - CLAUDE.md")
- Shows individual assets (images, documents)
- Collapsible with count indicator

**Context (bottom)**
- Thumbnail previews of referenced files
- "Track tools and referenced files used in this task"
- Visual summary of what the agent has access to

### Top Bar
- Task title: "Develop visual language for brand identity"
- Mode tabs: Chat / **Cowork** / Code
- Navigation arrows

### Bottom Bar
- Model selector (Opus 4.6)
- "Queue" button for follow-up tasks
- Reply input

---

## 3) AX Patterns Identified

### From Active Task View

**Pattern 1: Plan-First Execution**
The agent creates a numbered plan (Progress panel) **before** starting work. The user can see the full trajectory before any action is taken.

**Our primitive:** `PlanCard` + `StepList`
**Gap check:** ✅ Covered.

**Pattern 2: Streaming Trace**
Every action is logged in real-time: tool calls, file reads, reasoning, completions. The main panel functions as a transparent execution log.

**Our primitive:** `ToolTrace` + `ProgressStream`
**Gap check:** ✅ Covered.

**Pattern 3: Conversational Reasoning**
The agent explains its thinking in natural language between tool calls ("51 images — that's a rich collection. Let me set up a todo list..."). This isn't a separate panel — it's inline in the activity stream.

**Our primitive:** `ReasonPanel`
**Gap check:** ⚠️ Partial. Our `ReasonPanel` is a dedicated component. Cowork embeds reasoning **inline** in the trace. We might need a mode where `ReasonPanel` content can be interleaved with `ToolTrace` entries rather than shown separately.

**Pattern 4: Resource Visibility**
The References and Context panels show exactly what files/data the agent has access to and is actively using.

**Our primitive:** `ContextPicker` + `EvidenceStack`
**Gap check:** ⚠️ Partial. Cowork has a **passive reference panel** that just lists what's loaded — more of a read-only `ContextViewer`. We may want a read-only variant of `ContextPicker`.

**Pattern 5: Task Framing**
The top bar shows the task as a persistent title ("Develop visual language for brand identity"), framing the entire session around a goal.

**Our primitive:** `IntentBar`
**Gap check:** ✅ Covered.

**Pattern 6: Mode Switching**
Chat / Cowork / Code tabs let users switch between interaction modes. Same underlying model, different interfaces for different tasks.

**Our primitive:** `ModeSwitch`
**Gap check:** ✅ Covered, though Cowork's mode switch changes the entire interface layout, not just agent behavior.

**Pattern 7: Sandboxed Access**
Cowork requires explicit folder access grants. The agent can only touch what's been shared.

**Our primitive:** `PermissionScope`
**Gap check:** ✅ Covered.

**Pattern 8: Queue / Async Follow-up**
The "Queue" button suggests a task queuing model — send follow-up instructions without waiting for the current task to finish.

**Our primitive:** None directly
**Gap check:** ❌ **Gap found.** We don't have a `TaskQueue` or `FollowUpBar` primitive.

### From Landing Page

**Pattern 9: Generative Momentum (AX Book Pattern 6)**
Suggested task cards ("Optimize my week", "Organize my screenshots") propose concrete starting points. The user doesn't have to invent a prompt from scratch — the system offers drafts they can pick and steer.

**Our primitive:** `CommandPalette` (partially), `NextActionBar` (partially)
**Gap check:** ⚠️ Partial. Our `CommandPalette` is a launcher for tools/actions. Cowork's suggestions are more like **starter templates** — pre-scoped task proposals. This is closer to a `TaskSuggestions` or `StarterCards` primitive.

**Pattern 10: Plugin Extensibility**
"+ Customize with plugins" lets users extend agent capabilities before starting. This is a meta-capability — the user shapes what the agent *can do*, not just what it *will do*.

**Our primitive:** Not directly covered
**Gap check:** ⚠️ Out of scope for v0, but worth noting for later. Plugin/extension management is a platform concern.

**Pattern 11: Model Transparency**
The model selector (Opus 4.6) is visible at all times, giving users awareness of which AI is running their task.

**Our primitive:** Not directly covered
**Gap check:** ⚠️ Minor gap. Could be a simple `ModelBadge` or a prop on `IntentBar`.

---

## 4) What Cowork Does That We Don't (Yet)

| Cowork Feature | Our Coverage | Action Needed |
|---------------|-------------|---------------|
| Inline reasoning (mixed with trace) | `ReasonPanel` is separate | Consider `ToolTrace` + inline reasoning mode |
| Read-only reference list | `ContextPicker` is interactive | Add read-only `ContextViewer` variant |
| Task queuing ("Queue" button) | ❌ Not covered | Consider `TaskQueue` primitive |
| Suggested starter tasks | `CommandPalette` / `NextActionBar` (partial) | Consider `TaskSuggestions` / `StarterCards` |
| Collapsible tool call details | `ToolTrace` shows all | Add expand/collapse per trace entry |
| Thumbnail previews in context | Not specified | Visual context preview in `EvidenceStack` |
| Plugin extensibility | Not in scope | Platform concern, note for later |
| Model indicator | Not covered | Consider `ModelBadge` or `IntentBar` prop |

---

## 5) What We Have That Cowork Doesn't

| Our Primitive | What It Adds |
|--------------|-------------|
| `ApprovalGate` | Cowork asks for confirmation but has no structured approve/reject/edit UI with scoped grants |
| `RiskBadge` | No risk level labeling visible in Cowork |
| `ConfidenceMeter` | No confidence scores shown per step |
| `PolicyBanner` | No visible policy constraints |
| `DiffViewer` | No visible diff/review interface for file changes |
| `ThrottleControl` | No visible user control over agent autonomy level |
| `UndoStack` | No visible undo/rollback mechanism |
| `AuditLog` | No formal audit trail (just the activity stream) |

**Key insight:** Cowork optimizes for **simplicity** — it hides complexity to feel like "leaving messages for a coworker." Our primitives add the **trust and control layer** that power users and enterprise teams need.

---

## 6) Design Decisions Worth Noting

### 6.1 Two-phase interface
Cowork has distinct idle and active states. The landing page is minimal and action-oriented; the task view is dense and information-rich. The interface **thickens as stakes rise** — exactly the Adaptive Canvas pattern from the AX book (Pattern 3).

### 6.2 Conversational tone over structured UI
Cowork's agent speaks in first person ("I'm getting a good start", "Let me continue"). This makes it feel collaborative rather than robotic. Our components should support this tone without requiring it.

### 6.3 Plan shown before execution
The Progress panel pre-populates the full plan. This is a `PlanCard` pattern — show the trajectory, then execute. Users can see where they're going before anything happens.

### 6.4 Minimal interruptions
Cowork doesn't ask for approval at every step. It requests folder access once, then runs autonomously. This is a **trust-once, run-many** pattern.

**Implication for us:** Our `ThrottleControl` (slider from "ask before each step" to "run until checkpoint") is the right abstraction. Different use cases need different autonomy levels.

### 6.5 Three distinct surfaces
The active view separates **doing** (activity stream), **planning** (progress), and **knowing** (references/context). This maps to our library layers — but Cowork makes them all visible simultaneously.

### 6.6 Generative Momentum in onboarding
The landing page doesn't present an empty text box — it offers concrete task suggestions. This lowers the barrier to starting and helps users discover what the agent can do. Maps directly to Pattern 6 from the AX book.

---

## 7) How This Maps to Our Primitives

| Cowork UI Element | AX Primitive | Coverage |
|-------------------|-------------|----------|
| Suggested task cards | `CommandPalette` / `NextActionBar` | ⚠️ Need `TaskSuggestions` |
| "Work in a folder" grant | `PermissionScope` | ✅ |
| Model selector | ❌ Not covered | `ModelBadge` or `IntentBar` prop |
| Progress panel (numbered steps) | `StepList` / `PlanCard` | ✅ |
| Activity stream (tool calls + reasoning) | `ToolTrace` + `ProgressStream` + `ReasonPanel` | ⚠️ Need inline mode |
| References panel | `EvidenceStack` / `ContextPicker` | ⚠️ Need read-only variant |
| Context panel (thumbnails) | `StateInspector` | ✅ |
| Task title bar | `IntentBar` | ✅ |
| Chat/Cowork/Code tabs | `ModeSwitch` | ✅ |
| "Done" checkmarks | `StepList` step status | ✅ |
| "Script" tool badges | `ToolTrace` tool type | ✅ |
| Queue button | ❌ Not covered | 🆕 Consider `TaskQueue` |

---

## 8) Key Takeaways for AX Components

1. **Our catalog covers ~80-85% of Cowork's patterns.** Gaps: task queuing, inline reasoning, starter suggestions, model indicator.

2. **Cowork optimizes for simplicity; we optimize for control.** Both are valid — different audiences. Our strength is the trust/approval/audit layer that Cowork intentionally hides.

3. **Inline reasoning is worth exploring.** Cowork's conversational trace (mixing tool calls with natural language) feels more natural than a separate ReasonPanel. Consider a `trace + reasoning` composite mode.

4. **Consider a `TaskQueue` primitive.** Long-running agents need a way to receive follow-up instructions without interrupting current work.

5. **The plan-first pattern validates our approach.** Cowork shows the plan before executing — exactly what `PlanCard` + `StepList` do.

6. **Generative Momentum works for onboarding.** Cowork's starter task cards validate the AX book's Pattern 6 — proposing concrete first drafts instead of a blank prompt. Consider `TaskSuggestions` for our catalog.

7. **Two-phase UI is smart.** The transition from minimal landing page to dense active view demonstrates the Adaptive Canvas principle: **the UI thickens as stakes rise.**

---

## 9) Connection to AX Book Patterns

| AX Book Pattern | Cowork Implementation | Our Primitives |
|----------------|----------------------|---------------|
| 1. Intent Handshake | "Work in a folder" + task cards + model selector | `IntentBar`, `PermissionScope`, `ConstraintChips` |
| 2. Confidence Cues | Not visible (Cowork hides confidence) | `ConfidenceMeter`, `ReasonPanel`, `EvidenceStack` |
| 3. Adaptive Canvas | Two-phase UI (landing → active), 3-panel layout | `AdaptiveCanvas` |
| 4. Escape Hatch | Not prominently visible | `RunControls`, `UndoStack`, `HumanTakeover` |
| 5. Memory in Motion | Not visible in these screenshots | `MemoryPanel`, `MemoryChip`, `MemoryConsentToggle` |
| 6. Generative Momentum | Starter task cards, plan-first execution | `PlanCard`, `NextActionBar`, (need `TaskSuggestions`) |
