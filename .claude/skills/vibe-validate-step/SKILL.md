---
name: vibe-validate-step
description: Run lightweight checks after a step completes to catch issues early
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(npx tsc *), Bash(npm test *), Bash(npm run build*)
---

# Validate Step

Run targeted checks for a specific step to catch issues immediately rather than waiting for `/vibe-step-9-validate`.

**Usage:** `/vibe-validate-step [step]`

Valid steps: `1`, `1b`, `2`, `3`, `4 [ComponentName]`, `5 [ComponentName]`, `6 [ComponentName]`, `7 [ComponentName]`, `8`

## Step 1: Parse Arguments

Extract the step number (and component name if applicable) from the user's command arguments. If no step provided, read `docs/orchestration/progress.json` and find the most recently completed step (latest `completedAt` timestamp) and validate that one. Tell the user which step you're validating.

## Step 2: Run Checks for That Step

### Step 1 — Ideation

Verify all 7 PRD docs exist and are non-empty:

```
docs/orchestration/01-project-specification.md
docs/orchestration/02-technical-architecture.md
docs/orchestration/03-ux-design.md
docs/orchestration/04-design-system.md
docs/orchestration/05-interface-states.md
docs/orchestration/06-technical-specifications.md
docs/orchestration/07-universal-format-standards.md
docs/orchestration/progress.json
```

---

### Step 1b — Init Project

1. Verify these config files exist: `package.json`, `tsconfig.json`, `vite.config.ts`
2. Verify `node_modules/` exists (deps installed)
3. Run `npx tsc --noEmit` — must exit 0
4. Verify Storybook config exists: `.storybook/main.ts` or `.storybook/main.js`
5. Verify Vitest config exists in `vite.config.ts` or `vitest.config.ts`

---

### Step 2 — Design Tokens

1. Verify these files exist:
   - `src/styles/tokens.css`
   - `src/styles/animations.css`
   - `src/styles/index.css`
2. Use Grep to confirm `--ax-` prefix is used in `src/styles/tokens.css` (at least 10 occurrences)
3. Use Grep to confirm `prefers-reduced-motion` exists in `src/styles/tokens.css`
4. Use Grep to confirm `src/index.ts` imports `./styles/index.css`

---

### Step 3 — Shared Types

1. Verify `src/types/common.ts` exists
2. Use Grep to check for `: any` or `as any` in `src/types/common.ts` — must find none
3. Run `npx tsc --noEmit` — must exit 0

---

### Step 4 — Component `[Name]`

Requires a component name argument.

1. Verify all 4 files exist:
   - `src/components/[Name]/[Name].tsx`
   - `src/components/[Name]/[Name].types.ts`
   - `src/components/[Name]/[Name].module.css`
   - `src/components/[Name]/index.ts`
2. Use Grep to check for `: any` or `as any` in `src/components/[Name]/` — must find none
3. Use Grep to confirm `--ax-` tokens are used in `src/components/[Name]/[Name].module.css`
4. Use Grep to confirm `aria-` attributes exist in `src/components/[Name]/[Name].tsx`
5. Use Grep to confirm `src/index.ts` exports `[Name]`
6. Run `npx tsc --noEmit` — must exit 0

---

### Step 5 — Mock Data `[Name]`

Requires a component name argument.

1. Verify `src/utils/mockData.ts` exists
2. Use Grep to confirm the component name appears in `src/utils/mockData.ts` (generator function exists)
3. Use Grep to check for `: any` or `as any` in `src/utils/mockData.ts` — must find none
4. Run `npx tsc --noEmit` — must exit 0

---

### Step 6 — Stories `[Name]`

Requires a component name argument.

1. Verify `stories/[Name].stories.tsx` exists
2. Use Grep to confirm the story file imports from the component
3. Use Grep to check for `: any` or `as any` in the story file — must find none
4. Run `npx tsc --noEmit` — must exit 0

---

### Step 7 — Tests `[Name]`

Requires a component name argument.

1. Verify `src/components/[Name]/[Name].test.tsx` exists
2. Run `npm test -- --run [Name]` — must exit 0
3. Use Grep to check for `: any` or `as any` in the test file — must find none

---

### Step 8 — Docs

1. Verify these files exist and are non-empty:
   - `README.md`
   - `examples/prototype-setup/README.md`
   - `examples/prototype-setup/App.tsx`
   - `examples/production-setup/README.md`
   - `examples/production-setup/App.tsx`
2. Run `npx tsc --noEmit` — must exit 0

## Step 3: Report Results

Display a compact results table:

```
## Validate: Step [N] [ComponentName?]

| Check | Result |
|-------|--------|
| [check name] | PASS / FAIL: [reason] |
| ... | ... |

[Summary: X/Y checks passed]
```

If all checks pass: "All checks passed. Safe to continue to the next step."

If any checks fail: "Found [N] issue(s). Fix them before continuing." List each failure with a brief fix suggestion.

## Important

- This command does NOT update `progress.json` — that is each step's own responsibility.
- This is a diagnostic tool only. It validates what a step produced, not whether the step ran.
- If the project hasn't been initialized yet (no `package.json`), skip any checks that require `npx` or `npm` and note that the project isn't scaffolded yet.
