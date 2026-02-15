# 02 - Technical Architecture

## Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| React | UI framework | 18+ |
| TypeScript | Type safety | 5.x |
| Vite | Build tooling + dev server | 6.x |
| CSS Modules | Component styling (NOT Tailwind) | Native |
| Storybook | Component documentation + live examples | 8.x |
| Vitest | Unit + component testing | 2.x |
| @testing-library/react | Component test utilities | 16.x |
| AX-CN CLI | Copy-paste distribution | Node 20+ |
| Registry JSON | Component source index | N/A |

## Key Constraints

- **No external UI library dependencies** - we are building primitives
- **No Tailwind CSS** - use CSS Modules for zero-dependency styling
- **No AI backend coupling** - components work with any agent backend
- **React 18+** - leverage concurrent features where appropriate
- **AX-CN distribution** - UI components are copied into user repos, not imported from `node_modules`

## Project Structure (Repository)

```
ax-components-react/
├── registry/                         # Component registry (AX-CN)
│   ├── registry.json
│   └── components/                   # Source of copy-paste primitives
├── src/
│   ├── components/                    # All React components
│   │   ├── PlanCard/
│   │   │   ├── PlanCard.tsx
│   │   │   ├── PlanCard.types.ts
│   │   │   ├── PlanCard.module.css
│   │   │   ├── PlanCard.test.tsx
│   │   │   └── index.ts
│   │   ├── ApprovalGate/
│   │   │   └── ... (same pattern)
│   │   ├── ConfidenceMeter/
│   │   │   └── ... (same pattern)
│   │   ├── RunControls/
│   │   │   └── ... (same pattern)
│   │   ├── ToolTrace/
│   │   │   └── ... (same pattern)
│   │   ├── ArtifactCard/
│   │   │   └── ... (same pattern)
│   │   └── index.ts                   # Barrel export
│   ├── types/
│   │   └── common.ts                  # Shared TypeScript types
│   ├── utils/
│   │   └── mockData.ts                # Mock data generators for prototyping
│   └── index.ts                       # Library entry point
├── packages/
│   └── headless/                      # Optional headless hooks package
├── stories/
│   ├── PlanCard.stories.tsx
│   ├── ApprovalGate.stories.tsx
│   ├── ConfidenceMeter.stories.tsx
│   ├── RunControls.stories.tsx
│   ├── ToolTrace.stories.tsx
│   └── ArtifactCard.stories.tsx
├── examples/
│   ├── prototype-setup/               # Quick start for prototyping
│   └── production-setup/              # Integration guide for production
├── docs/
│   └── orchestration/                   # PRD docs (this directory)
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── .storybook/
│   ├── main.ts
│   └── preview.ts
└── README.md
```

## Build Configuration

### Headless Hooks (Library Mode)

Only the **headless hooks** are packaged. UI primitives are copy-paste and stay as source in the user's repo.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AXComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `ax-components.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### TypeScript Configuration

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationDir": "./dist/types",
    "outDir": "./dist",
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.tsx", "**/*.stories.tsx"]
}
```

### Package.json Key Fields

```jsonc
{
  "name": "ax-components-react",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/ax-components.cjs.js",
  "module": "./dist/ax-components.es.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/ax-components.es.js",
      "require": "./dist/ax-components.cjs.js",
      "types": "./dist/types/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils.es.js",
      "require": "./dist/utils.cjs.js",
      "types": "./dist/types/utils/mockData.d.ts"
    }
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

## Development Scripts

```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit"
  }
}
```

## Component File Pattern

Every component follows this exact structure:

```
[ComponentName]/
├── [ComponentName].tsx          # Component implementation
├── [ComponentName].types.ts     # TypeScript interfaces
├── [ComponentName].module.css   # CSS Module styles
├── [ComponentName].test.tsx     # Vitest tests
└── index.ts                     # Re-export: export { ComponentName } from './ComponentName';
```

## Export Strategy

```typescript
// src/index.ts - Library entry point
export { PlanCard } from './components/PlanCard';
export { ApprovalGate } from './components/ApprovalGate';
export { ConfidenceMeter } from './components/ConfidenceMeter';
export { RunControls } from './components/RunControls';
export { ToolTrace } from './components/ToolTrace';
export { ArtifactCard } from './components/ArtifactCard';

// Re-export types
export type { PlanStep, RunState, ConfidenceLevel } from './types/common';
export type { PlanCardProps } from './components/PlanCard';
export type { ApprovalGateProps } from './components/ApprovalGate';
export type { ConfidenceMeterProps } from './components/ConfidenceMeter';
export type { RunControlsProps } from './components/RunControls';
export type { ToolTraceProps } from './components/ToolTrace';
export type { ArtifactCardProps } from './components/ArtifactCard';

// Mock data utilities (also available via 'ax-components-react/utils')
export { generateMockPlan, simulatePlanExecution } from './utils/mockData';
```

## CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run type-check
      - run: npm test
      - run: npm run build
      - run: npm run build-storybook
```
