---
name: vibe-step-9-validate
description: Full audit of TypeScript, tests, Storybook, lint, exports, and accessibility
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(npm *), Bash(npx *)
---

# Step 9: Validate

Run a comprehensive audit of the entire project.

## Prerequisites

Read `docs/orchestration/progress.json` and verify:
- `step-8-docs` status is `completed`

If not, tell the user to run `/vibe-step-8-docs` first.

## Audit Checklist

### 1. TypeScript Compilation

```bash
npx tsc --noEmit
```

- Must compile with zero errors
- Report any issues found

### 2. Test Suite

```bash
npm test
```

- All tests must pass
- Report test count and any failures

### 3. Build

```bash
npm run build
```

- Must produce `dist/` output
- Verify `dist/ax-components.es.js` and `dist/ax-components.cjs.js` exist

### 4. Storybook Build

```bash
npm run build-storybook
```

- Must build without errors
- Verify `storybook-static/` output exists

### 5. Export Verification

Read `src/index.ts` and verify all 6 components and their types are exported:
- `PlanCard` + `PlanCardProps`
- `ApprovalGate` + `ApprovalGateProps`
- `ConfidenceMeter` + `ConfidenceMeterProps`
- `RunControls` + `RunControlsProps`
- `ToolTrace` + `ToolTraceProps`
- `ArtifactCard` + `ArtifactCardProps`
- All shared types from `types/common.ts`
- Mock data utilities

### 6. No `any` Types

```bash
# Search for `any` type usage in src/
```

Use Grep to search for `: any` or `as any` in `src/**/*.ts` and `src/**/*.tsx`. Report any found.

### 7. Accessibility Check

Use Grep to verify each component has:
- `aria-` attributes
- `role=` attributes
- Screen reader text (aria-label or aria-live)

### 8. CSS Token Usage

Use Grep to verify component CSS modules reference `--ax-` custom properties (not hardcoded colors/sizes).

### 9. File Structure

Use Glob to verify each component has all required files:
- `src/components/[Name]/[Name].tsx`
- `src/components/[Name]/[Name].types.ts`
- `src/components/[Name]/[Name].module.css`
- `src/components/[Name]/[Name].test.tsx`
- `src/components/[Name]/index.ts`
- `stories/[Name].stories.tsx`

### 10. Documentation

Verify these files exist and have content:
- `README.md`
- `examples/prototype-setup/README.md`
- `examples/prototype-setup/App.tsx`
- `examples/production-setup/README.md`
- `examples/production-setup/App.tsx`

## Results Report

Display a results table:

```
## Validation Results

| Check | Status | Notes |
|-------|--------|-------|
| TypeScript | PASS/FAIL | [details] |
| Tests | PASS/FAIL | [X tests, Y failures] |
| Build | PASS/FAIL | [details] |
| Storybook | PASS/FAIL | [details] |
| Exports | PASS/FAIL | [missing items] |
| No any types | PASS/FAIL | [count found] |
| Accessibility | PASS/FAIL | [missing items] |
| CSS tokens | PASS/FAIL | [hardcoded values] |
| File structure | PASS/FAIL | [missing files] |
| Documentation | PASS/FAIL | [missing files] |
```

## Update Progress

If ALL checks pass: Read `docs/orchestration/progress.json`, set `globalSteps.step-9-validate.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

If any checks fail: Keep status as `in_progress` and list what needs fixing.

## Exit Criteria

- All 10 checks pass
- Progress updated to completed
- Confirm: "All validation checks passed. The AX Components library is ready for release."
- If failures: "Validation found [N] issues. Fix them and run `/vibe-step-9-validate` again."
