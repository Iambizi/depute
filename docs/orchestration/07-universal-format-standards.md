# 07 - Universal Format Standards

## AX-CN Distribution Conventions

- UI primitives are shipped as source via CLI into user repos (no `node_modules` UI package).
- Each primitive must be self-contained and readable by code assistants.
- Registry entries map component names to source files and dependencies.

## Code Style

### TypeScript

- **Strict mode** enabled in `tsconfig.json`
- **No `any` types** - use `unknown` when type is truly unknown
- **Explicit return types** on exported functions
- **Interface over type** for object shapes (use `type` for unions/intersections)
- **Named exports** only (no default exports)
- **Const assertions** for literal arrays/objects where applicable

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `PlanCard` |
| Props interfaces | PascalCase + "Props" | `PlanCardProps` |
| Type interfaces | PascalCase | `PlanStep` |
| Type aliases | PascalCase | `RunState` |
| Functions | camelCase | `generateMockPlan` |
| Variables | camelCase | `currentStep` |
| Constants | UPPER_SNAKE_CASE | `MOCK_TOOL_NAMES` |
| CSS classes | camelCase (CSS Modules) | `.stepActive` |
| CSS custom properties | kebab-case with `ax-` prefix | `--ax-color-blue-500` |
| Files: components | PascalCase | `PlanCard.tsx` |
| Files: types | PascalCase + `.types` | `PlanCard.types.ts` |
| Files: styles | PascalCase + `.module.css` | `PlanCard.module.css` |
| Files: tests | PascalCase + `.test` | `PlanCard.test.tsx` |
| Files: stories | PascalCase + `.stories` | `PlanCard.stories.tsx` |
| Directories | PascalCase (components) | `PlanCard/` |

## File Structure Per Component

```
src/components/[ComponentName]/
├── [ComponentName].tsx           # Component implementation
├── [ComponentName].types.ts      # TypeScript interfaces (props + internal types)
├── [ComponentName].module.css    # CSS Module styles
├── [ComponentName].test.tsx      # Vitest tests
└── index.ts                      # Barrel export
```

### index.ts Template

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

### Component File Template

```typescript
import { ComponentNameProps } from './ComponentName.types';
import styles from './ComponentName.module.css';

export function ComponentName({ prop1, prop2, className }: ComponentNameProps) {
  return (
    <div className={`${styles.root} ${className ?? ''}`}>
      {/* implementation */}
    </div>
  );
}
```

## Test Format

### File: `[Component].test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Rendering tests
  describe('rendering', () => {
    it('renders with required props', () => { /* ... */ });
    it('renders with all optional props', () => { /* ... */ });
    it('renders empty state', () => { /* ... */ });
  });

  // State tests
  describe('states', () => {
    it('displays pending state correctly', () => { /* ... */ });
    it('displays active state correctly', () => { /* ... */ });
    it('displays completed state correctly', () => { /* ... */ });
    it('displays failed state correctly', () => { /* ... */ });
  });

  // Interaction tests
  describe('interactions', () => {
    it('calls onClick handler', async () => { /* ... */ });
    it('handles keyboard navigation', async () => { /* ... */ });
  });

  // Accessibility tests
  describe('accessibility', () => {
    it('has correct ARIA labels', () => { /* ... */ });
    it('announces state changes', () => { /* ... */ });
    it('is keyboard navigable', () => { /* ... */ });
  });
});
```

### Test Naming

- Use descriptive `it()` names that read as sentences
- Group by concern: rendering, states, interactions, accessibility
- No test IDs in production code; use `role`, `text`, or `label` queries

## Storybook Story Format

### File: `stories/[Component].stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src/components/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'AX Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define controls
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

// === SHARED STORIES ===

export const Default: Story = {
  args: { /* minimal required props */ },
};

export const AllFeatures: Story = {
  args: { /* all props enabled */ },
};

// === PROTOTYPING STORIES ===

export const PrototypeQuickStart: Story = {
  name: 'Quick Start: Prototype [Feature] Flow',
  render: () => { /* auto-advancing mock data */ },
};

export const TestVariations: Story = {
  name: 'Test Different [Variations]',
  args: { /* interactive controls */ },
};

// === PRODUCTION STORIES ===

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: { /* minimal integration */ },
};

export const ErrorHandling: Story = {
  name: 'Error Handling',
  args: { /* error states */ },
};
```

### Story Categories

Every component's stories must include:

| Category | Required Stories | Purpose |
|----------|----------------|---------|
| Shared | Default, AllFeatures | Core demonstrations |
| Prototyping | QuickStart, TestVariations, SimulateUpdates | Designer/PM workflow |
| Production | BasicUsage, RealAPIData, ErrorHandling | Engineer workflow |

## CSS Module Conventions

### Class Naming

```css
/* Root element */
.root { }

/* State modifiers */
.pending { }
.active { }
.completed { }
.failed { }

/* Sub-elements */
.header { }
.content { }
.footer { }

/* Feature toggles */
.withConfidence { }
.withReasoning { }

/* Size variants */
.sizeSm { }
.sizeMd { }
.sizeLg { }
```

### Composition Pattern

```css
/* Base styles on root */
.root {
  font-family: var(--ax-font-family);
  /* ... */
}

/* Compose state via multiple classes in JSX */
/* <div className={`${styles.step} ${styles[status]}`}> */
.step { }
.step.active { }
.step.completed { }
```

## Commit Message Format

```
<type>: <short description>

<optional body explaining "why">

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types

| Type | When |
|------|------|
| `feat` | New component, feature, or utility |
| `fix` | Bug fix |
| `refactor` | Code restructure without behavior change |
| `style` | CSS/formatting changes only |
| `test` | Adding or updating tests |
| `docs` | Documentation changes |
| `chore` | Build, config, tooling changes |

### Examples

```
feat: add ConfidenceMeter component with meter and badge displays

fix: resolve pulse animation not respecting prefers-reduced-motion

test: add accessibility tests for ApprovalGate

docs: add prototyping quick-start guide to README
```

## Import Order

```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. External libraries (if any)

// 3. Internal types
import { PlanStep } from '../../types/common';

// 4. Internal components
import { ConfidenceMeter } from '../ConfidenceMeter';

// 5. Local types
import { ComponentNameProps } from './ComponentName.types';

// 6. Local styles
import styles from './ComponentName.module.css';
```

## Comments

- Only add comments where logic isn't self-evident
- Use `/** JSDoc */` for exported functions and interfaces
- Use `// AX Pattern:` prefix for AX-specific design decision comments
- No TODO comments in committed code (use issues)
