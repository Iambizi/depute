---
name: vibe-step-4-component
description: Create component folder with .tsx, .types.ts, .module.css, and index.ts
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Bash(mkdir *)
---

# Step 4: Build Component

Create the component implementation files for a specific component.

**Usage:** `/vibe-step-4-component [ComponentName]`

Valid component names: `PlanCard`, `ApprovalGate`, `ConfidenceMeter`, `RunControls`, `ToolTrace`, `ArtifactCard`

## Prerequisites

Read `docs/orchestration/progress.json` and verify:
- `step-2-design-tokens` status is `completed`
- `step-3-shared-types` status is `completed`

If either is not done, tell the user which step to run first.

## Reference Docs

Read ALL of these before building:
- `docs/orchestration/05-interface-states.md` — State matrix for this component
- `docs/orchestration/06-technical-specifications.md` — TypeScript interface and implementation details
- `docs/orchestration/04-design-system.md` — Design tokens to consume
- `docs/orchestration/07-universal-format-standards.md` — File structure, naming, CSS conventions

## Step 1: Identify Component

Extract the component name from the user's command arguments. If no name provided, ask which component to build.

## Step 2: Create Component Directory

```bash
mkdir -p src/components/[ComponentName]
```

## Step 3: Create Types File

Write `src/components/[ComponentName]/[ComponentName].types.ts`:
- Import shared types from `../../types/common`
- Define the component's props interface from doc 06
- Export all types

## Step 4: Create CSS Module

Write `src/components/[ComponentName]/[ComponentName].module.css`:
- Use CSS custom properties from `src/styles/tokens.css` (reference doc 04)
- Follow CSS class naming from doc 07 (`.root`, `.pending`, `.active`, etc.)
- Implement all visual states from doc 05
- Include animation classes (pulse, slide-in) from tokens
- Include responsive styles
- Include `prefers-reduced-motion` overrides

## Step 5: Create Component Implementation

Write `src/components/[ComponentName]/[ComponentName].tsx`:
- Import types from the `.types.ts` file
- Import styles from the `.module.css` file
- Import shared types from `../../types/common` as needed
- Implement all states from doc 05's state matrix
- Apply all props from doc 06's interface
- Include ARIA attributes for accessibility
- Use `aria-live` regions for dynamic content
- Compose CSS module classes based on state
- Accept `className` prop for custom styling

Follow the component template from doc 07:
```typescript
import { ComponentNameProps } from './ComponentName.types';
import styles from './ComponentName.module.css';

export function ComponentName({ ...props }: ComponentNameProps) {
  // implementation
}
```

## Step 6: Create Barrel Export

Write `src/components/[ComponentName]/index.ts`:
```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

## Step 7: Update Library Entry Point

Read `src/index.ts` and add:
```typescript
export { ComponentName } from './components/ComponentName';
export type { ComponentNameProps } from './components/ComponentName';
```

## Step 8: Update Progress

Read `docs/orchestration/progress.json`, set `components.[ComponentName].step-4-component.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- `src/components/[ComponentName]/` directory exists with all 4 files
- `.types.ts` exports the props interface
- `.module.css` uses `--ax-` design tokens
- `.tsx` implements all states from doc 05
- `.tsx` includes proper ARIA attributes
- `index.ts` re-exports component and types
- `src/index.ts` updated with new export
- No `any` types
- Progress updated
- Confirm to user: "Component [Name] created. Run `/vibe-step-5-mock-data [Name]` and `/vibe-step-7-tests [Name]` next (can be parallel)."
