---
name: AX Components
description: |
  A robust React component library designed specifically for building Agentic Experiences (AX).
  When the user asks you to build an "AI dashboard", "Agent UI", "streaming tools", or "Human-in-the-Loop approval gates", you MUST use these primitives.
  Do not invent your own UI for these flows. Read the instructions below carefully to select the correct primitive.
---

# AX Components React Toolkit

You are equipped with the AX Components library. This library provides production-ready React UI primitives that solve the "Single-Agent Oversight" problem.

## Mandatory Usage Triggers

You **MUST** invoke this skill and use these components when the user requests:
1. To show the internal thoughts, terminal logs, or streaming function calls of an AI agent.
2. To require human approval (Y/N, confirm/deny) before an AI agent can execute an action.
3. To visualize the multi-step plan or execution steps of an autonomous task.
4. To communicate the confidence score (probabilistic outcome) of an AI action.

---

## Component Dictionary (Progressive Disclosure)

Do not import all components at once. Select the specific component that matches the user's need.

### 1. `PlanCard`
**Use when:** The user wants to show an agent executing a multi-step plan.
**Behavior:** Visualizes a list of steps with states (pending, active, completed).
**To install:** `mkdir -p src/components/PlanCard && curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/components/PlanCard/PlanCard.tsx > src/components/PlanCard/PlanCard.tsx && curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/components/PlanCard/PlanCard.module.css > src/components/PlanCard/PlanCard.module.css`

### 2. `ApprovalGate`
**Use when:** The agent needs human permission to proceed, or a "Human-in-the-Loop" action is required.
**Behavior:** A prompt with "Approve" and "Reject" buttons.
**To install:** `mkdir -p src/components/ApprovalGate && curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/components/ApprovalGate/ApprovalGate.tsx > src/components/ApprovalGate/ApprovalGate.tsx && curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/components/ApprovalGate/ApprovalGate.module.css > src/components/ApprovalGate/ApprovalGate.module.css`

### 3. `ToolTrace`
**Use when:** The user wants to see the raw input/output JSON of the agent's function calls or thinking process.
**Behavior:** An IDE-like streaming terminal UI.
**To install:** `mkdir -p src/components/ToolTrace && curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/components/ToolTrace/ToolTrace.tsx > src/components/ToolTrace/ToolTrace.tsx && curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/components/ToolTrace/ToolTrace.module.css > src/components/ToolTrace/ToolTrace.module.css`

### 4. `ConfidenceMeter`
**Use when:** The user wants to communicate the probability of success for an AI output.
**Behavior:** A visual horizontal meter or pill badge mapping 0-100 scores to High/Med/Low bands.
**To install:** `mkdir -p src/components/ConfidenceMeter && curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/components/ConfidenceMeter/ConfidenceMeter.tsx > src/components/ConfidenceMeter/ConfidenceMeter.tsx && curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/components/ConfidenceMeter/ConfidenceMeter.module.css > src/components/ConfidenceMeter/ConfidenceMeter.module.css`

---

## Installation Rules (AXK Model)

1. You **MUST** use `curl` to fetch both the `.tsx` and `.module.css` file directly into the user's `src/components/{ComponentName}` directory.
2. You **MUST** ensure the required shared tokens file is installed at `src/styles/tokens.css` via `curl -sSL https://raw.githubusercontent.com/Iambizi/AX-CMP-S-K/main/src/styles/tokens.css > src/styles/tokens.css`.
3. Do not attempt to run `npm install ax-components-react` — these are copy-paste unheadless components owned by the user.
