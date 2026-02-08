---
name: vibe-status
description: Show vibe-coding progress dashboard - what's done, current, and next
disable-model-invocation: true
allowed-tools: Read, Glob
---

# Vibe Status Dashboard

Display the current state of the vibe-coding orchestration system.

## Step 1: Read Progress File

Read `docs/vibe-coding/progress.json` to get the current state of all steps.

## Step 2: Check Filesystem State

Verify actual filesystem state to cross-reference against progress.json:

- Check if `docs/vibe-coding/` exists and which docs are present
- Check if `package.json` exists (project initialized)
- Check if `src/styles/tokens.css` exists (design tokens)
- Check if `src/types/common.ts` exists (shared types)
- Use `Glob` to check for component directories: `src/components/*/index.ts`
- Check if `stories/*.stories.tsx` files exist
- Check if `README.md` exists

## Step 3: Display Dashboard

Format and display a dashboard with this structure:

```
## Vibe Coding Status

### Foundation Steps
| Step | Command | Status |
|------|---------|--------|
| 1. PRD Docs | /vibe-step-1-ideation | [status] |
| 1b. Init Project | /vibe-step-1b-init-project | [status] |
| 2. Design Tokens | /vibe-step-2-design-tokens | [status] |
| 3. Shared Types | /vibe-step-3-shared-types | [status] |

### Component Steps
| Component | Step 4 | Step 5 | Step 6 | Step 7 |
|-----------|--------|--------|--------|--------|
| AgentProgressTracker | [s4] | [s5] | [s6] | [s7] |
| ConfidenceScoreBadge | [s4] | [s5] | [s6] | [s7] |
| AgentStatusIndicator | [s4] | [s5] | [s6] | [s7] |
| BasicHumanApprovalGate | [s4] | [s5] | [s6] | [s7] |

### Finish Steps
| Step | Command | Status |
|------|---------|--------|
| 8. Documentation | /vibe-step-8-docs | [status] |
| 9. Validation | /vibe-step-9-validate | [status] |

### Next Action
> Run `/[next-command]` to continue.
```

Use these status indicators:
- `not_started` → display as blank or `--`
- `in_progress` → display as `IN PROGRESS`
- `completed` → display as `DONE`

## Step 4: Suggest Next Step

Based on the dependency graph, identify and recommend the next step to run:

1. If step-1 is not done → `/vibe-step-1-ideation`
2. If step-1b is not done → `/vibe-step-1b-init-project`
3. If step-2 or step-3 not done → whichever is not done (can be parallel)
4. If any component step-4 not done → `/vibe-step-4-component [Name]`
5. If component has step-4 done but not step-5/step-7 → those (parallel OK)
6. If component has step-5 done but not step-6 → `/vibe-step-6-stories [Name]`
7. If all components done → `/vibe-step-8-docs`
8. If step-8 done → `/vibe-step-9-validate`

## Important

- This is a READ-ONLY command. Do not modify any files.
- If progress.json doesn't exist, tell the user to run `/vibe-step-1-ideation` first.
- If filesystem state doesn't match progress.json, note the discrepancy.
