---
name: vibe-step-6-stories
description: Create Storybook stories for prototyping, production, and shared use cases
disable-model-invocation: true
allowed-tools: Read, Write
---

# Step 6: Storybook Stories

Create Storybook stories for a specific component covering prototyping, production, and shared use cases.

**Usage:** `/vibe-step-6-stories [ComponentName]`

Valid component names: `AgentProgressTracker`, `ConfidenceScoreBadge`, `AgentStatusIndicator`, `BasicHumanApprovalGate`

## Prerequisites

Read `docs/vibe-coding/progress.json` and verify:
- `components.[ComponentName].step-5-mock-data` status is `completed`

If not, tell the user to run `/vibe-step-5-mock-data [ComponentName]` first.

## Reference Docs

Read these:
- `docs/vibe-coding/07-universal-format-standards.md` — Story format and categories
- `docs/vibe-coding/05-interface-states.md` — All states to demonstrate
- `docs/vibe-coding/03-ux-design.md` — Interaction patterns to showcase
- `src/components/[ComponentName]/[ComponentName].types.ts` — Props to configure
- `src/utils/mockData.ts` — Mock utilities to use in prototyping stories

## Step 1: Create Story File

Write `stories/[ComponentName].stories.tsx` following the format from doc 07.

## Step 2: Configure Meta

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src/components/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'AX Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Configure controls for each prop
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;
```

## Step 3: Create Shared Stories

Required shared stories:
- `Default` — minimal required props
- `AllFeatures` — all optional props enabled
- Each major state from doc 05 (e.g., `Pending`, `Active`, `Completed`, `Failed`)

## Step 4: Create Prototyping Stories

Required prototyping stories (use mock data utilities):
- `PrototypeQuickStart` — name: "Quick Start: Prototype [Feature] Flow"
  - Uses `simulateAgentProgress` or equivalent to auto-advance
  - Requires a render function with `useState` + `useEffect`
- `TestVariations` — name: "Test Different [Variations]"
  - Interactive Storybook controls for key props
- `SimulateRealTimeUpdates` — name: "Simulate Real-Time Updates"
  - Live state changes using mock simulation utilities

## Step 5: Create Production Stories

Required production stories:
- `BasicUsage` — name: "Basic Usage"
  - Minimal static data, shows simplest integration
- `WithRealAPIData` — name: "With Real API Data"
  - Shows the expected data shape from a real agent
- `ErrorHandling` — name: "Error Handling"
  - Error states, failed steps, edge cases

## Step 6: Update Progress

Read `docs/vibe-coding/progress.json`, set `components.[ComponentName].step-6-stories.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- `stories/[ComponentName].stories.tsx` exists
- Has meta configuration with autodocs tag
- Contains at least 3 shared stories
- Contains at least 3 prototyping stories (using mock data utils)
- Contains at least 3 production stories
- All stories render without errors
- Progress updated
- Confirm: "Stories for [Name] created. Check all component steps — if all 4 components are done, run `/vibe-step-8-docs`."
