# AX Components for React — Builder Specification

## Project Context

You are building an open-source (MIT) React component library for Agentic Experience (AX) design — a new field focused on creating user interfaces for AI agents performing autonomous, multi-step tasks.

**Positioning:** Catalog-first AX design system. The same components designers use to prototype and engineers use to ship production features.

**Strategy:** Open source first. All primitives are MIT licensed. Revenue comes from expertise (consulting, workshops, content) once the library has traction. See `MONETIZATION-MODEL.md`.

### What is Agentic Experience (AX)?

AX is the design discipline for interfaces where AI agents act on behalf of users. Unlike traditional UX where humans click through interfaces, AX addresses:

- **Probabilistic outcomes**: Agent actions have confidence scores, not binary success/failure
- **Autonomous multi-step workflows**: Agents execute complex tasks without constant human input
- **Transparency requirements**: Users need to see what agents are doing and why
- **Human-in-the-loop patterns**: Critical decisions require human approval
- **Safe delegation**: Users need scoped, bounded, revocable control — not binary yes/no
- **State machine flows**: Agent work has defined transitions, pause points, and rollback paths

### Why This Library Exists

**The Problem:** Traditional UI components assume deterministic workflows. Figma prototypes can't handle AI's probabilistic nature. No existing library provides a complete AX design system.

**The Solution:** A catalog of 48+ production-ready React primitives organized by AX function — not by visual type. Use them to prototype, then deploy the same code to production.

---

## Primitive Catalog (48+ across 8 categories)

These are the building blocks. Not chat components — primitives for delegation, trust, and visibility.

### 1. Intent & Delegation
Help users move from "talking" to "committing work."

| Primitive | Description |
|-----------|-------------|
| `IntentBar` | Compact control for defining goal, scope, mode |
| `PlanCard` | Proposed plan with steps, assumptions, expected outputs |
| `StepList` | Executable checklist with per-step status and logs |
| `CommandPalette` | Fast action launcher for tools, templates, recent actions |
| `PromptToSpec` | Transforms natural language into structured spec |
| `ConstraintChips` | Explicit constraints like "no Fridays", "budget <$X" |
| `ContextPicker` | Select what context the agent can access |

### 2. Trust & Approval
Boundaries, consent, and confidence.

| Primitive | Description |
|-----------|-------------|
| `ApprovalGate` | Approve, reject, or edit before an action runs |
| `RiskBadge` | Labels actions by risk level with reasoning |
| `PermissionScope` | Defines what the agent can touch |
| `ConfirmationModal` | Confirm with diff/preview, not just "are you sure?" |
| `ConfidenceMeter` | Confidence score + reasoning |
| `AssumptionList` | Explicit assumptions with confirm/correct toggles |
| `PolicyBanner` | Non-negotiable rules |

> **Key design insight (from Stripe research):** Approvals should support scoped grants (approve with limits), time-bounded grants (approve for 10 minutes), and resource-bounded grants (up to $500) — not binary approve/reject.

### 3. Transparency & Trace
Make the system legible while it's working.

| Primitive | Description |
|-----------|-------------|
| `ToolTrace` | Timeline of tool calls with input, output, duration, errors |
| `ReasonPanel` | Explains "why I'm doing this" |
| `EvidenceStack` | Sources used with snippets and timestamps |
| `StateInspector` | Current internal state |
| `ProgressStream` | Streaming progress events |
| `ErrorExplainer` | Rewrites errors into user choices |

### 4. Memory
Visible and editable in the moment, not buried in settings.

| Primitive | Description |
|-----------|-------------|
| `MemoryPanel` | Shows what memory is being used right now |
| `MemoryChip` | Single memory item with edit/remove/disable |
| `MemoryConsentToggle` | "This session only" vs "always remember" |
| `PreferenceTokens` | Formatting/tone/depth preferences |
| `RecencyControls` | Filters like "only use last 30 days" |

### 5. Adaptive Canvas
Where work gets finalized.

| Primitive | Description |
|-----------|-------------|
| `AdaptiveCanvas` | Container that morphs into doc/table/form/timeline |
| `StructuredEditor` | Rich editor with agent insertions and locked regions |
| `TableCanvas` | Spreadsheet-like with agent fill and validations |
| `FormCanvas` | Form generator with inline agent suggestions |
| `DiffViewer` | Shows edits with accept/reject per hunk |
| `VersionRail` | Version history with snapshots and restore points |

### 6. Control & Steering
Steer an agent during execution without breaking flow.

| Primitive | Description |
|-----------|-------------|
| `RunControls` | Pause, resume, stop, retry |
| `ModeSwitch` | Toggle between brainstorm, draft, execute, review |
| `ThrottleControl` | "Ask before each step" to "run until checkpoint" |
| `Checkpoint` | Automatic stopping points |
| `UndoStack` | Reversible actions with clear restore semantics |
| `HumanTakeover` | "I'll do this part" handoff |

### 7. Output
Make outputs shippable and easy to integrate.

| Primitive | Description |
|-----------|-------------|
| `ArtifactCard` | Output summary with export options |
| `SnippetBlock` | Copyable chunks with provenance |
| `ValidationSummary` | Checks passed/failed |
| `NextActionBar` | Suggested next steps |

### 8. Social & Shared-Work
Team collaboration — design as extension points even if built later.

| Primitive | Description |
|-----------|-------------|
| `ShareContext` | Share a run with someone |
| `CommentLayer` | Comments on steps, diffs, decisions |
| `AuditLog` | Immutable history for teams |
| `RoleBadges` | Who approved what |

---

## Architecture: 3 Layers

### Layer A: Pure AX Primitives (State Machines / Hooks)
- Just React components + typed props
- No agent runtime assumptions
- Can be used in normal apps

```typescript
useRun()
useApprovalGate()
useTrace()
useMemory()
```

### Layer B: Catalog + Schemas
- JSON schema / Zod schema per primitive
- Event schemas for inter-component communication
- Policy flags: `requiresApproval`, `writesState`, `revealsMemory`, `externalAction`
- Versioned catalog export

### Layer C: Renderer + Adapter (optional)
- A2UI-compatible adapter (optional, not a hard dependency)
- Event bridge back to agent runtimes
- Validation + safety gates
- Adjacency-list diffing + message buffering

Layer A is always useful standalone. Layer C is optional. See `research/A2UI-Implications.md` for protocol details.

---

## Technical Specifications

### Stack

- React 18+ with TypeScript
- Modern CSS (CSS Modules — not Tailwind)
- No external UI library dependencies (building primitives)
- Storybook for component documentation and live examples
- Vitest for testing
- Vite for build tooling

### Project Structure

```
ax-components-react/
├── src/
│   ├── components/
│   │   └── [ComponentName]/
│   │       ├── [ComponentName].tsx
│   │       ├── [ComponentName].types.ts
│   │       ├── [ComponentName].module.css
│   │       ├── [ComponentName].test.tsx
│   │       └── index.ts
│   ├── types/
│   │   └── common.ts
│   ├── utils/
│   │   └── mockData.ts
│   └── index.ts
├── stories/
├── examples/
│   ├── prototype-setup/
│   └── production-setup/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Code Quality Standards

- Fully typed TypeScript (no `any` types)
- Accessible components (ARIA labels, keyboard navigation, WCAG 2.1 AA)
- Responsive design
- Clean, commented code explaining AX-specific decisions
- Props should be intuitive for React developers
- Components work with mock data (prototyping) and live data (production)

---

## Implementation Approach

### Catalog v0 (recommended starting set)

Pick primitives that are:
- Core to AX (trust/transparency/control)
- Naturally representable as schemas
- Useful in demos and reference flows

**Recommended v0 set (6-10 primitives):**
1. `ApprovalGate` — approve/reject/request-change with scoped grants
2. `MemoryPanel` — shows what the agent is using right now
3. `ToolTrace` — timeline of everything the agent called
4. `PlanCard` — proposed plan before execution
5. `ProgressStream` — streaming progress events
6. `RunControls` — pause, resume, stop, retry
7. `ConfidenceMeter` — confidence score + reasoning
8. `DiffViewer` — accept/reject per hunk

### Build Order

1. Define catalog v0 (primitives, props, events, policy flags)
2. Write schemas for each primitive (Zod + JSON Schema)
3. Define surface registry (`main`, `rightPanel`, `modal`, `tray`)
4. Scaffold library and Storybook
5. Build primitives with mock data utilities
6. Write stories and tests
7. Document AX problem each primitive solves

---

## Design Principles

- **Transparency First**: Always show what the agent is doing and why
- **Safe Delegation**: Scoped, bounded, revocable permissions
- **Confidence Communication**: Make probabilistic nature visible but not overwhelming
- **Graceful Degradation**: Work well even with minimal information
- **Human Control**: Enable oversight without requiring constant attention
- **Familiar Patterns**: Build on React conventions developers know
- **Catalog-First**: Primitives designed as schema-renderable contracts
- **State Machine Flows**: Agent work has defined transitions, pause points, and rollback paths

---

## Success Criteria

### A designer should be able to:
- Install the library and import primitives
- Have a working, interactive prototype in under 5 minutes
- Test different agent behaviors without backend setup

### An engineer should be able to:
- Use the same components in production
- Connect to real agent APIs with minimal code changes
- Trust the components to handle edge cases
- Ship to production with confidence

### The library should:
- Be useful without A2UI (Layer A standalone)
- Be compatible with A2UI when desired (Layer C adapter)
- Support any agent runtime (not tied to OpenAI, Anthropic, etc.)
- Have a clear catalog with versioned schemas

---

## Key Research References

- `research/A2UI-Implications.md` — Google A2UI protocol analysis and strategic positioning
- `research/AX-STRIPE-CHECKOUT-INSIGHTS.md` — Stripe's agentic patterns mapped to AX primitives
- `research/AX-Primitives-starter.md` — Full 48-primitive catalog definition