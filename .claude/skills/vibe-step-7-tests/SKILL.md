---
name: vibe-step-7-tests
description: Write Vitest tests covering all states and interactions for a component
disable-model-invocation: true
allowed-tools: Read, Write, Bash(npx vitest *)
---

# Step 7: Tests

Write Vitest tests for a specific component covering all states and interactions.

**Usage:** `/vibe-step-7-tests [ComponentName]`

Valid component names: `AgentProgressTracker`, `ConfidenceScoreBadge`, `AgentStatusIndicator`, `BasicHumanApprovalGate`

## Prerequisites

Read `docs/vibe-coding/progress.json` and verify:
- `components.[ComponentName].step-4-component` status is `completed`

If not, tell the user to run `/vibe-step-4-component [ComponentName]` first.

## Reference Docs

Read these:
- `docs/vibe-coding/07-universal-format-standards.md` — Test format template
- `docs/vibe-coding/05-interface-states.md` — All states to test
- `src/components/[ComponentName]/[ComponentName].types.ts` — Props to test
- `src/components/[ComponentName]/[ComponentName].tsx` — Implementation to test

## Step 1: Create Test File

Write `src/components/[ComponentName]/[ComponentName].test.tsx` following the format from doc 07.

## Step 2: Write Rendering Tests

```typescript
describe('rendering', () => {
  it('renders with required props', () => { });
  it('renders with all optional props', () => { });
  it('renders empty state', () => { });
  it('applies custom className', () => { });
});
```

## Step 3: Write State Tests

Test every state from the component's state matrix in doc 05:

```typescript
describe('states', () => {
  // Test each row from the state matrix
  it('displays [state] correctly', () => { });
});
```

## Step 4: Write Interaction Tests

```typescript
describe('interactions', () => {
  // Test click handlers, toggles, etc.
  it('calls [handler] when [action]', async () => { });
  it('handles keyboard [action]', async () => { });
});
```

## Step 5: Write Accessibility Tests

```typescript
describe('accessibility', () => {
  it('has correct ARIA labels', () => { });
  it('has correct ARIA roles', () => { });
  it('announces state changes via aria-live', () => { });
  it('is keyboard navigable', () => { });
});
```

## Step 6: Run Tests

```bash
npx vitest run src/components/[ComponentName]/[ComponentName].test.tsx
```

If tests fail, fix the issues in the test file or flag component bugs.

## Step 7: Update Progress

Read `docs/vibe-coding/progress.json`, set `components.[ComponentName].step-7-tests.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- Test file exists at `src/components/[ComponentName]/[ComponentName].test.tsx`
- Has rendering tests (at least 3)
- Has state tests covering all states from doc 05
- Has interaction tests (at least 2)
- Has accessibility tests (at least 3)
- All tests pass via `npx vitest run`
- No test IDs added to production component code
- Progress updated
- Confirm: "Tests for [Name] passing. Check remaining steps for this component."
