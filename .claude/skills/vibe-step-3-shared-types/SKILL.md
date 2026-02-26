---
name: vibe-step-3-shared-types
description: Create shared TypeScript types in src/types/common.ts
disable-model-invocation: true
allowed-tools: Read, Write
---

# Step 3: Shared Types

Define all shared TypeScript types that components will consume.

## Prerequisites

Read `docs/orchestration/progress.json` and verify:
- `step-1b-init-project` status is `completed`

If not, tell the user to run `/vibe-step-1b-init-project` first.

## Reference Docs

Read this for type definitions:
- `docs/orchestration/06-technical-specifications.md` — Shared types section

## Step 1: Write Common Types

Write `src/types/common.ts` with all shared types from `06-technical-specifications.md`:

```typescript
/** Status of an individual agent step */
export type AgentStepStatus = 'pending' | 'active' | 'completed' | 'failed';

/** Overall agent operational status */
export type AgentStatus = 'idle' | 'running' | 'completed' | 'failed' | 'waiting' | 'connecting';

/** Semantic confidence level derived from numeric score */
export type ConfidenceLevel = 'low' | 'medium' | 'high';

/** Status of a human approval gate */
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired';

/** Represents a single step in an agent workflow */
export interface AgentStep {
  id: string;
  status: AgentStepStatus;
  label: string;
  description?: string;
  confidence?: number; // 0-100
  timestamp?: Date;
  reasoning?: string;
  errorMessage?: string;
}

/** Utility: derive confidence level from numeric score */
export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 80) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}
```

## Step 2: Update Entry Point

Read `src/index.ts` and add type re-exports:

```typescript
export type { AgentStep, AgentStepStatus, AgentStatus, ConfidenceLevel, ApprovalStatus } from './types/common';
export { getConfidenceLevel } from './types/common';
```

## Step 3: Update Progress

Read `docs/orchestration/progress.json`, set `globalSteps.step-3-shared-types.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- `src/types/common.ts` exports all shared types: `AgentStepStatus`, `AgentStatus`, `ConfidenceLevel`, `ApprovalStatus`, `AgentStep`, `getConfidenceLevel`
- `src/index.ts` re-exports all types
- No `any` types used
- All types have JSDoc comments
- Progress updated
- Confirm to user: "Shared types created. If step 2 is also done, run `/vibe-step-4-component PlanCard` next."
