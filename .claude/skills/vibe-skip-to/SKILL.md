---
name: vibe-skip-to
description: Mark all steps before a target step as complete (for testing specific steps)
disable-model-invocation: true
allowed-tools: Read, Write
---

# Vibe Skip To

Mark all steps before a target step as completed, useful for testing a specific step without running everything before it.

**Usage:** `/vibe-skip-to [step-number]`

Examples:
- `/vibe-skip-to 4` — Mark steps 1, 1b, 2, 3 as completed
- `/vibe-skip-to 5` — Mark steps 1, 1b, 2, 3, and step-4 for all components as completed
- `/vibe-skip-to 8` — Mark all global and component steps through step-7 as completed
- `/vibe-skip-to 9` — Mark everything through step-8 as completed

## Step Dependency Order

```
1 → 1b → 2 (parallel with 3) → 3 (parallel with 2)
                ↓
4 (per component) → 5 (parallel with 7) → 6
                  → 7 (parallel with 5)
                ↓
8 → 9
```

## Step 1: Read Progress

Read `docs/vibe-coding/progress.json`.

If the file doesn't exist, tell the user to run `/vibe-step-1-ideation` first.

## Step 2: Parse Target

Extract the step number from the argument. Valid values: `1b`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`

## Step 3: Mark Previous Steps as Completed

Based on the target step, mark all prerequisite steps as `completed` with `completedAt` set to current ISO timestamp:

| Target | Steps marked completed |
|--------|----------------------|
| `1b` | step-1-ideation |
| `2` | step-1-ideation, step-1b-init-project |
| `3` | step-1-ideation, step-1b-init-project |
| `4` | step-1-ideation, step-1b-init-project, step-2, step-3 |
| `5` | All above + step-4 for all components |
| `6` | All above + step-4, step-5 for all components |
| `7` | All above + step-4 for all components |
| `8` | All global + all component steps (4, 5, 6, 7) for all components |
| `9` | Everything through step-8 |

Update `lastUpdated` to current ISO timestamp.

## Step 4: Write Back

Write updated `docs/vibe-coding/progress.json`.

## Step 5: Confirm

Display:
```
Marked [N] steps as completed. Progress now:
- Global: [X/6] completed
- Components: [Y/16] completed
- Ready to run: /vibe-step-[target]-[name]
```

## Important

- This is for TESTING and DEVELOPMENT convenience only
- It does NOT create any actual files or code — it just marks steps as done in the tracker
- The actual step will still check for prerequisite files when it runs
- If prerequisite files don't exist, the step may fail even though progress.json says they're done
