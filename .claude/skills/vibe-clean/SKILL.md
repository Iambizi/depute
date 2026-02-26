---
name: vibe-clean
description: Reset progress.json - optionally for a specific component or all steps
disable-model-invocation: true
allowed-tools: Read, Write
---

# Vibe Clean

Reset progress tracking in `progress.json`.

**Usage:**
- `/vibe-clean` — Reset everything to `not_started`
- `/vibe-clean [ComponentName]` — Reset only that component's steps
- `/vibe-clean global` — Reset only global steps (not component steps)

## Step 1: Read Current Progress

Read `docs/orchestration/progress.json`.

If the file doesn't exist, tell the user to run `/vibe-step-1-ideation` first.

## Step 2: Determine Scope

Parse the command argument:

- **No argument or `all`**: Reset ALL steps (global + all components) to `not_started` with `completedAt: null`
- **`global`**: Reset only `globalSteps` entries
- **Component name** (e.g., `PlanCard`): Reset only that component's 4 steps

Valid component names: `PlanCard`, `ApprovalGate`, `ConfidenceMeter`, `RunControls`, `ToolTrace`, `ArtifactCard`

## Step 3: Reset

For each step in scope:
- Set `status` to `"not_started"`
- Set `completedAt` to `null`

Update `lastUpdated` to current ISO timestamp.

## Step 4: Write Back

Write the updated `docs/orchestration/progress.json`.

## Step 5: Confirm

Display what was reset:

- "Reset all progress (global + 4 components) to not_started."
- "Reset [ComponentName] steps to not_started."
- "Reset global steps to not_started."

Then suggest: "Run `/vibe-status` to see the current state."

## Important

- This does NOT delete any generated code or files — only resets the tracking
- If the user wants to also delete generated files, they need to do that manually
