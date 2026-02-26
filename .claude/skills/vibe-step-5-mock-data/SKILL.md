---
name: vibe-step-5-mock-data
description: Create mock data generators and simulation utilities for a component
disable-model-invocation: true
allowed-tools: Read, Write, Edit
---

# Step 5: Mock Data

Create mock data generators and simulation utilities for a specific component.

**Usage:** `/vibe-step-5-mock-data [ComponentName]`

Valid component names: `PlanCard`, `ApprovalGate`, `ConfidenceMeter`, `RunControls`, `ToolTrace`, `ArtifactCard`

## Prerequisites

Read `docs/orchestration/progress.json` and verify:
- `components.[ComponentName].step-4-component` status is `completed`

If not, tell the user to run `/vibe-step-4-component [ComponentName]` first.

## Reference Docs

Read these:
- `docs/orchestration/06-technical-specifications.md` — Mock data utility API section
- `docs/orchestration/05-interface-states.md` — All states that mock data should cover
- `src/types/common.ts` — Types to use

## Step 1: Read Existing Mock Data File

Read `src/utils/mockData.ts` to see what already exists. New utilities should be added to this file, not replace existing content.

## Step 2: Add Mock Utilities for Component

Add the mock data functions specified in doc 06 for this component. The utilities should:

### For PlanCard:
- `generateMockPlan(overrides?)` — generates a plan with steps, assumptions, and outputs
- `generateMockSteps(options?)` — generates array of plan steps
- `simulatePlanExecution(options)` — auto-advances steps over time, returns `{ cancel }` handle

### For ApprovalGate:
- `generateMockApproval(overrides?)` — generates approval gate props with context
- `simulateApprovalTimeout(options)` — simulates countdown timer
- `MOCK_APPROVAL_SCENARIOS` — bank of realistic approval scenarios (simple + staged modes)

### For ConfidenceMeter:
- `generateRandomConfidence()` — returns 0-100
- `generateConfidenceSet(count)` — array of varied scores with reasoning
- `simulateConfidenceChange(options)` — animates score changes over time

### For RunControls:
- `simulateRunLifecycle(options)` — cycles through idle → running → paused → complete
- `RUN_STATE_SEQUENCE` — typical run lifecycle array

### For ToolTrace:
- `generateMockToolCalls(count?)` — generates tool call entries with input/output/duration
- `simulateToolStream(options)` — streams tool calls over time
- `MOCK_TOOL_NAMES` — bank of realistic tool names

### For ArtifactCard:
- `generateMockArtifact(overrides?)` — generates artifact with content and export options
- `MOCK_ARTIFACT_TYPES` — bank of output types (markdown, JSON, CSV, code)

## Step 3: Update Library Exports

Read `src/index.ts` and ensure mock utilities are exported:
```typescript
export { generateMockSteps, simulateAgentProgress, ... } from './utils/mockData';
```

## Step 4: Update Progress

Read `docs/orchestration/progress.json`, set `components.[ComponentName].step-5-mock-data.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- Mock data functions added to `src/utils/mockData.ts`
- Functions are fully typed (no `any`)
- Functions generate realistic data matching the component's interface
- Simulation functions return a cancel handle `{ cancel: () => void }`
- Exports added to `src/index.ts`
- Progress updated
- Confirm to user: "Mock data for [Name] created. Run `/vibe-step-6-stories [Name]` next."
