---
name: vibe-step-5-mock-data
description: Create mock data generators and simulation utilities for a component
disable-model-invocation: true
allowed-tools: Read, Write, Edit
---

# Step 5: Mock Data

Create mock data generators and simulation utilities for a specific component.

**Usage:** `/vibe-step-5-mock-data [ComponentName]`

Valid component names: `AgentProgressTracker`, `ConfidenceScoreBadge`, `AgentStatusIndicator`, `BasicHumanApprovalGate`

## Prerequisites

Read `docs/vibe-coding/progress.json` and verify:
- `components.[ComponentName].step-4-component` status is `completed`

If not, tell the user to run `/vibe-step-4-component [ComponentName]` first.

## Reference Docs

Read these:
- `docs/vibe-coding/06-technical-specifications.md` — Mock data utility API section
- `docs/vibe-coding/05-interface-states.md` — All states that mock data should cover
- `src/types/common.ts` — Types to use

## Step 1: Read Existing Mock Data File

Read `src/utils/mockData.ts` to see what already exists. New utilities should be added to this file, not replace existing content.

## Step 2: Add Mock Utilities for Component

Add the mock data functions specified in doc 06 for this component. The utilities should:

### For AgentProgressTracker:
- `generateMockSteps(options?)` — generates array of `AgentStep[]`
- `simulateAgentProgress(options)` — auto-advances steps over time, returns `{ cancel }` handle
- `generateMockStep(overrides?)` — single step generator
- `MOCK_STEP_LABELS` — bank of realistic step labels
- `MOCK_REASONING_TEXTS` — bank of reasoning strings

### For ConfidenceScoreBadge:
- `generateRandomConfidence()` — returns 0-100
- `generateConfidenceSet(count)` — array of varied scores
- `simulateConfidenceChange(options)` — animates score changes over time

### For AgentStatusIndicator:
- `simulateStatusCycle(options)` — cycles through statuses over time
- `AGENT_STATUS_SEQUENCE` — typical status lifecycle array

### For BasicHumanApprovalGate:
- `generateMockApproval(overrides?)` — generates approval gate props
- `simulateApprovalTimeout(options)` — simulates countdown timer
- `MOCK_APPROVAL_SCENARIOS` — bank of realistic approval scenarios

## Step 3: Update Library Exports

Read `src/index.ts` and ensure mock utilities are exported:
```typescript
export { generateMockSteps, simulateAgentProgress, ... } from './utils/mockData';
```

## Step 4: Update Progress

Read `docs/vibe-coding/progress.json`, set `components.[ComponentName].step-5-mock-data.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- Mock data functions added to `src/utils/mockData.ts`
- Functions are fully typed (no `any`)
- Functions generate realistic data matching the component's interface
- Simulation functions return a cancel handle `{ cancel: () => void }`
- Exports added to `src/index.ts`
- Progress updated
- Confirm to user: "Mock data for [Name] created. Run `/vibe-step-6-stories [Name]` next."
