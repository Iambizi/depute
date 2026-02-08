---
name: vibe-step-1b-init-project
description: Scaffold Vite+React+TS project, install deps, configure Storybook and Vitest
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Bash(npm *), Bash(npx *), Bash(mkdir *), Bash(ls *)
---

# Step 1b: Initialize Project

Scaffold the React + TypeScript project with all tooling configured.

## Prerequisites

Read `docs/vibe-coding/progress.json` and verify:
- `step-1-ideation` status is `completed`

If not, tell the user to run `/vibe-step-1-ideation` first.

## Reference Docs

Read these for implementation details:
- `docs/vibe-coding/02-technical-architecture.md` — project structure, configs, scripts

## Step 1: Initialize Vite Project

```bash
npm create vite@latest . -- --template react-ts
```

If the project already has files, work around them. The goal is to have a working Vite + React + TS setup.

## Step 2: Install Dependencies

```bash
# Core (already from vite template)
npm install react react-dom

# Dev dependencies
npm install -D typescript @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react

# Storybook
npx storybook@latest init --type react --builder vite --yes

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## Step 3: Configure Vite for Library Mode

Create/update `vite.config.ts` following the config in `02-technical-architecture.md`:
- Library entry: `src/index.ts`
- Formats: ES + CJS
- External: react, react-dom
- CSS modules enabled (default in Vite)

## Step 4: Configure TypeScript

Update `tsconfig.json` following `02-technical-architecture.md`:
- Strict mode enabled
- Declaration output to `dist/types`
- JSX: react-jsx

## Step 5: Configure Vitest

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

Create `src/test-setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

## Step 6: Create Directory Structure

```bash
mkdir -p src/components
mkdir -p src/types
mkdir -p src/utils
mkdir -p stories
mkdir -p examples/prototype-setup
mkdir -p examples/production-setup
```

## Step 7: Create Entry Files

Create `src/index.ts` with placeholder exports:

```typescript
// AX Components for React
// Components will be exported here as they are built
```

Create `src/types/common.ts` as empty placeholder:

```typescript
// Shared types will be defined in step 3
```

Create `src/utils/mockData.ts` as empty placeholder:

```typescript
// Mock data utilities will be defined in step 5
```

## Step 8: Update package.json

Ensure package.json has the correct fields from `02-technical-architecture.md`:
- name: "ax-components-react"
- type: "module"
- main, module, types, exports, files fields
- peerDependencies for react
- All scripts (dev, build, test, storybook, etc.)

## Step 9: Verify Setup

Run these commands to verify everything works:

```bash
npm run type-check   # TypeScript compiles
npm run build        # Vite build succeeds
npm run storybook    # Storybook starts (can Ctrl+C after confirming)
```

## Step 10: Update Progress

Read `docs/vibe-coding/progress.json`, set `globalSteps.step-1b-init-project.status` to `"completed"`, set `completedAt` to current ISO timestamp, update `lastUpdated`, write back.

## Exit Criteria

- `package.json` exists with correct name, scripts, and dependencies
- `vite.config.ts` configured for library mode
- `tsconfig.json` with strict mode
- `vitest.config.ts` with jsdom environment
- `.storybook/` directory configured
- `src/` directory structure created
- `npm run build` succeeds
- Progress updated
- Confirm to user: "Project initialized. Run `/vibe-step-2-design-tokens` and/or `/vibe-step-3-shared-types` next (can run in parallel)."
