# A2UI Notes — Implications for AX Components (React)

**Type:** 🏗️ Architecture & Protocol Analysis
**Source:** Google (A2UI v0.8, Apache 2.0)
**Status:** Research notes (not a commitment)  
**Goal:** Extract what A2UI implies for how AX Components should be designed: schemas, catalogs, renderer boundaries, and event/state contracts.

---

## 1) Why A2UI matters to AX Components

A2UI is a spec for **agent-driven interfaces** where an agent can “speak UI” to a client using **declarative messages** (data, not code).

This is directly relevant to AX Components because:

- **AX needs safe delegation**  
  If an agent is able to construct/update UI, we need strong boundaries. A2UI’s design pushes toward a **pre-approved component catalog** rendered by the client, not arbitrary UI code from the agent.

- **AX needs stateful, auditable flows**  
  A2UI is built around UI “surfaces” and update streams. That maps cleanly to agent workflows where UI changes over time, with progress, approvals, and logs.

- **AX primitives should be more than visuals**  
  A2UI implies primitives should have **strict schemas** and **event contracts** so they can be rendered deterministically from agent messages.

**Takeaway:** Even if we never adopt A2UI directly, it’s a strong forcing function for how we design AX Components: **catalog-first, schema-first, event-first**.

---

## 2) Core concepts (only what we need)

### 2.1 Surface model
A2UI treats UI as "surfaces" — explicitly managed lifecycle objects that are created, updated, and deleted via messages (`surfaceUpdate`, `deleteSurface`). Surfaces are not just layout slots; they are top-level containers with their own creation/destruction lifecycle.

For us: a "surface" maps naturally to things like:
- Main canvas
- Side panel (Memory Panel, Trace Viewer)
- Modal approval dialogs
- Sticky task tray

### 2.2 Declarative UI messages (no arbitrary code)
The agent emits structured messages describing:
- what UI should exist
- where it should appear
- what state/data it should bind to
- what events it can produce

A2UI uses an **adjacency list model** for component hierarchies — flat lists instead of nested trees. This makes incremental updates simpler and streaming more efficient.

For us: treat each primitive as **serializable** and **renderable from JSON**.

### 2.3 Data model updates separate from UI structure
A2UI uses four message types: `surfaceUpdate` (UI structure), `dataModelUpdate` (state), `beginRendering` (render signal), and `deleteSurface` (cleanup).

The key separation:
- **UI layout / structure** updates (`surfaceUpdate`)
- **data model** updates (`dataModelUpdate`) — bound via **JSON Pointer paths** (`$ref`-style)

For us: design primitives with a clear split between:
- stable “shape” props (layout/labels)
- bound state props (values, status, results)

The JSON Pointer binding pattern validates our instinct to separate structure from state.

### 2.4 Progressive / Streaming Rendering
A2UI treats streaming as foundational, not optional. Agents stream UI updates incrementally — users see the interface building in real-time. This is core to the protocol, not a nice-to-have.

For us: primitives must handle partial/streaming data gracefully from the start.

### 2.5 Eventing
UI components emit events back to the agent (e.g., button clicked, input changed, approval given).

For us: define a **minimal event vocabulary** that supports safe delegation:
- approve / reject / request-change
- select / filter / search
- open / close
- undo / redo
- export / copy

---

## 3) Implications for AX Components architecture

### 3.1 Build a Component Catalog (not a grab-bag of components)
AX Components should ship with a **catalog definition**:

- `componentType` (string enum)
- `propsSchema` (strict; validate)
- `eventSchema` (strict; validate)
- `policyFlags` (safety/permissions needs)

This catalog becomes the “approved set” that any agent-driven renderer can use.

**Design principle:** If it can’t be represented as a stable schema, it’s not v0.

---

### 3.2 Design primitives as “renderable contracts”
Each primitive should have:

1) **Deterministic props**
- No implicit side effects.
- No hidden external dependencies.
- No “run code” props.

2) **Explicit state binding points**
- Inputs (what data can flow in)
- Outputs (what events can flow out)

3) **Policy-aware capabilities**
Some primitives should declare they require special handling:
- e.g. anything that triggers real actions (payments, deletes, sends)
- anything that reveals memory
- anything that displays tool outputs and logs

**Pattern:** `policyFlags: ["requiresApproval", "writesState", "revealsMemory", "externalAction"]`

---

### 3.3 Split library into 3 layers

**Layer A: Pure AX primitives**
- Just React components + typed props
- No agent runtime assumptions
- Can be used in normal apps

**Layer B: Catalog + schemas**
- JSON schema / Zod schema per primitive
- event schemas
- policy flags
- versioned catalog export

**Layer C: Renderer + adapter**
- A2UI-like renderer that takes messages and renders surfaces
- Event bridge back to the agent runtime
- Validation + safety gates
- Should implement adjacency-list diffing + message buffering because A2UI updates are incremental

This keeps the OSS library useful even for teams not using A2UI.

---

## 4) Catalog v0 recommendation (tight set)

Pick primitives that are both:
- core to AX (trust/transparency/control)
- naturally representable as schemas
- useful in demo apps and “receipts” for content

### Recommended v0 primitives
1) **MemoryPanel**
- shows: “what the agent is using right now”
- controls: edit/remove/manage

2) **ApprovalGate**
- approve/reject/request-change
- supports “requiresApproval” policy flag

3) **ToolTraceViewer**
- chronological tool calls, inputs/outputs, statuses
- supports transparency and debugging

4) **ProgressTimeline**
- task steps, current stage, ETA/unknown
- handles “long-running agent work” well

5) **ResultCard**
- structured outputs with confidence, citations/links, actions (copy/export)

6) **DiffPreview + Undo**
- show changes the agent proposes (before/after)
- allow undo/rollback or “apply change”

7) **PermissionRequest**
- agent asks for permission scope escalation
- user grants/denies/time-bounds

8) **StatusBanner**
- “Agent is waiting for input”
- “Paused for approval”
- “Action failed, needs review”

**Rule:** v0 ships with fewer primitives, but each is deeply specified and composable.

---

## 5) How A2UI maps to AX Components (conceptual)

Even if we don’t adopt A2UI, we can adopt the mapping.

### 5.1 “Surface” mapping
- `surface: "rightPanel"` → render MemoryPanel / TraceViewer
- `surface: "main"` → render ResultCards / Timelines
- `surface: "modal"` → render ApprovalGate / PermissionRequest

### 5.2 “Structure vs Data”
- `surfaceUpdate` equivalent → layout tree (what components exist)
- `dataModelUpdate` equivalent → values/progress/results update

### 5.3 “Events”
- UI emits standardized events back to agent runtime:
  - `approval.granted`
  - `approval.denied`
  - `memory.remove`
  - `undo.requested`
  - `permission.granted`

---

## 6) Constraints / Safety posture we should adopt

If we want this library to be a serious AX reference, we should enforce:

- **Validation first**  
  Any message-driven rendering must validate against the catalog schemas.

- **Policy gates**  
  Components with `requiresApproval` must not execute side effects without an explicit approval event.

- **No hidden execution**  
  Component props should never include executable code from the agent.

- **Auditability**  
  All events and updates should be loggable (for debugging and trust).

---

## 7) Decisions this doc suggests (not commitments)

### 7.1 Adopt “catalog-first” as the north star
Even if we never integrate A2UI directly, we design like we could.

### 7.2 Define the event vocabulary early
AX is mostly: **control, visibility, approval, undo**.  
Events are the glue.

### 7.3 Add a tiny renderer demo later
A minimal “A2UI-like” demo app can become a perfect receipt:
- agent emits JSON
- UI renders in surfaces
- approvals + trace + undo work end-to-end

---

## 8) Next steps (research → specs)

1) Choose **Catalog v0 primitives** (6–10)
2) For each primitive, write:
   - props schema (Zod)
   - event schema (Zod)
   - policy flags
   - examples (JSON + rendered screenshot)
3) Define:
   - surface registry (`main`, `rightPanel`, `modal`, `tray`)
   - event bus shape
4) Only then: scaffold the library and storybook.

---

## Strategic Opportunity: Where AX Components Fits

### Renderer Landscape (as of Feb 2026)

| Renderer | Status | Source |
|----------|--------|--------|
| Lit (Web Components) | ✅ Stable | Google |
| Angular | ✅ Stable | Google |
| Flutter (GenUI SDK) | ✅ Stable | Google |
| **React** | **🟡 In progress (roadmap: Q1 2026)** | Google |
| Svelte/Kit | 🔵 Community interest | Community |
| SwiftUI / Jetpack Compose | 📋 Planned Q2 2026 | Google |

Google's own React renderer is planned with `useA2UI` hook, TypeScript support, theming, and custom components. **We are not racing to build what Google is already building.**

### Our Actual Wedge

A2UI's React renderer will handle the plumbing: parsing messages, rendering surfaces, data binding. What it **won't** ship is:

| What Google ships (renderer) | What we ship (AX layer) |
|------------------------------|-------------------------|
| Generic component mapping | **AX-native catalog**: trust, approval, trace, control primitives |
| Basic event handling | **Safety patterns**: policy flags, approval gates, audit logging |
| Theming support | **Opinionated UX**: designed for delegation, not just rendering |
| Message parsing | **Composable recipes**: reference flows for common agent patterns |

**The wedge is not the renderer — it's the catalog, the safety layer, and the AX design opinion on top.**

Think of it like this:
- A2UI React renderer = **UIKit** (generic rendering engine)
- AX Components = **a design system built on top** (opinionated, domain-specific)

### Relationship to A2UI

We should be **spec-aligned and compatible**, not competing:

1. **Layer A** (pure AX primitives) — works standalone, no A2UI dependency
2. **Layer B** (catalog + schemas) — export A2UI-compatible component catalog so our primitives can be rendered by any A2UI renderer
3. **Layer C** (adapter) — thin adapter that bridges AX Components with Google's React renderer once it ships

### Ecosystem Alignment

- **Google** — builds the protocol + renderers (infrastructure)
- **CopilotKit** — builds the agent UI toolkit layer (AG-UI alignment)
- **AX Components** — builds the **AX design system** (domain-specific)

We complement, not compete. Potential collaboration through ecosystem alignment, not a direct pipeline.

> **Decision needed (not now):** Should we (a) stay spec-aligned and ship an A2UI-compatible catalog/adapter, or (b) actively track Google's React renderer and focus on AX primitives + safety patterns as our differentiator? (Leaning toward b.)

### Timing

Monitor, don't commit yet. Wait until:
- Google's React renderer lands (Q1 2026) or slips
- We've defined Catalog v0 and event vocabulary (our actual compounding asset)
- A2UI stabilizes toward v1.0 (roadmap: Q4 2026)

---

### Dependency Independence

A2UI is a **compatibility target**, not a dependency. Our only real dependency is React.

```
┌─────────────────────────────────────────┐
│  A2UI Protocol (optional transport)     │
│  ┌───────────────────────────────────┐  │
│  │  AX Components (your library)    │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  React (the actual dep)     │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

Like a CSS library being "Bootstrap-compatible" without importing Bootstrap.

**What A2UI research gives us (design insights, not dependencies):**

| Hard problem Google solved | What it validates for us |
|----------------------------|-------------------------|
| How do you represent agent UI as data? | Schema-first approach |
| How do you separate structure from state? | Shape props vs bound props split |
| How do you handle streaming? | Primitives must handle partial data |
| How do you keep things safe? | Policy flags pattern |

We'd arrive at similar patterns without A2UI — they confirmed the direction.

**Bottom line:** Build primitives, catalog, safety patterns. If A2UI dominates, a thin adapter makes us compatible. If it doesn't, we've lost nothing. Our compounding asset is the **AX design opinion** — not any transport layer.

---

## Appendix: Open questions

- Do we want to align naming with A2UI conventions (`surfaceUpdate`, `dataModelUpdate`) or keep our own internal naming and just remain compatible in concept?
- How do we version the catalog so apps can safely support multiple versions?
- What's the minimal "agent runtime" adapter we want to support first (custom, LangGraph, Claude agent SDK, etc.)?
- Should we engage with the A2UI GitHub repo early (issues, discussions) to signal intent?
- Once Google's React renderer ships, how thin should our Layer C adapter be?

---