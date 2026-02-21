# AX Components v0.1.0 Release Notes

**February 20, 2026**

The initial open-source release of **AX Components for React**, a library of production-ready React components designed specifically for building Agentic Experiences (AX).

This release solves the single-agent oversight problem (Figures 2, 4, and 5 of the Agentic Coding Levels framework), providing developers and designers with the necessary primitives to build trust-based, transparent agent interfaces that run seamlessly from prototype to production.

## ✨ 6 Core Primitives

This release introduces 6 foundational AX primitives across four design categories:

### Intent & Delegation
* **`PlanCard`**: Visualize an agent's multi-step plan, current task execution, and progress state.

### Trust & Approval
* **`ApprovalGate`**: Prevent unauthorized agent actions by injecting a Human-in-the-Loop boundary. Supports both standalone simple approvals and "staged" flows with resource/duration scopes.
* **`ConfidenceMeter`**: Communicate the probabilistic nature of AI outputs. Visualizes the confidence score of an action or output, with both a detailed "meter" view and a compact "badge" view.

### Transparency & Trace
* **`ToolTrace`**: Expose the agent's internal thought process. Renders an interactive, streaming event log of tool calls (with inputs, outputs, and JSON payloads), modeled after IDE-like terminal output.
* **`ArtifactCard`**: Display finalized agent outputs (Markdown, JSON, Code, CSV) clearly, complete with metadata arrays mapping the output back to its source step and tool trace.

### Control & Steering
* **`RunControls`**: A dedicated toolbar for steering an active agent run (Start, Pause, Resume, Stop) without breaking the user's flow.

## 📦 Features & Distribution

* **Headless Hooks + Copy-Paste UI**: Patterned after `shadcn/ui`, the UI layer is designed to be fully owned by the consumer.
* **100% Type Safe**: Built in TypeScript with comprehensive interfaces.
* **Mock Data Utilities**: Includes `generateMockPlan`, `simulateToolStream`, and `generateMockApproval` utilities out of the box so designers can build rich prototypes immediately without needing an actual backend API.
* **Accessibility Baked In**: All primitives ship with `aria-live` regions, `role` attributes, and focus traps for ARIA compliance.
* **Theming**: Powered by 35 CSS custom properties (`--ax-*`) ready to be mapped to your brand's design system.

## 🚀 Getting Started

Check out the included examples to see the library in action:
* `/examples/prototype-setup`: A fully clientside mocked dashboard using our generator utilities.
* `/examples/production-setup`: The exact same components wired to a simulated server streaming hook.
