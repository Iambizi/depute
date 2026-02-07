# Project: AX Components for React - Initial Setup & First Component

## Project Context

You are building a React component library for Agentic Experience (AX) design - a new field focused on creating user interfaces that work seamlessly with AI agents performing autonomous, multi-step tasks.

### What is Agentic Experience (AX)?

AX is the design discipline for interfaces where AI agents act on behalf of users. Unlike traditional UX where humans click through interfaces, AX addresses challenges like:

- **Probabilistic outcomes**: Agent actions have confidence scores, not binary success/failure
- **Autonomous multi-step workflows**: Agents execute complex tasks without constant human input
- **Transparency requirements**: Users need to see what agents are doing and why
- **Human-in-the-loop patterns**: Critical decisions require human approval
- **Asynchronous operations**: Agent tasks may take seconds or minutes to complete

## Project Goals

- Build production-ready React components that solve core AX design patterns
- Provide TypeScript types for full type safety
- Create reusable, customizable components that work with any AI agent backend
- Document AX design principles each component addresses
- Enable developers to quickly build agent-first interfaces

## Technical Specifications

### Stack

- React 18+ with TypeScript
- Modern CSS (CSS Modules or Tailwind - you choose best approach)
- No external UI library dependencies (we're building primitives)
- Storybook for component documentation
- Vitest for testing

### Project Structure

```
ax-components-react/
├── src/
│   ├── components/
│   │   ├── AgentProgressTracker/
│   │   │   ├── AgentProgressTracker.tsx
│   │   │   ├── AgentProgressTracker.types.ts
│   │   │   ├── AgentProgressTracker.module.css
│   │   │   ├── AgentProgressTracker.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── types/
│   │   └── common.ts
│   └── index.ts
├── stories/
│   └── AgentProgressTracker.stories.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Code Quality Standards

- Fully typed TypeScript (no `any` types)
- Accessible components (ARIA labels, keyboard navigation)
- Responsive design
- Clean, commented code explaining AX-specific decisions
- Props should be intuitive for React developers

## First Component: AgentProgressTracker

### The AX Problem It Solves

Traditional progress indicators assume deterministic, linear workflows (e.g., "Step 2 of 5"). AI agents operate probabilistically with dynamic workflows where:

- Steps may be discovered during execution
- Each step has a confidence level
- The total number of steps may be unknown
- Some steps may fail and trigger alternate paths

### Component Requirements

#### Core Features

- Display current agent activity with reasoning/explanation
- Show completed steps with timestamps
- Indicate active step with dynamic status
- Display confidence scores (0-100%) for probabilistic steps
- Handle unknown total steps gracefully
- Support both determinate (known steps) and indeterminate (unknown) modes
- Show error states with recovery information

#### Component API (TypeScript Interface)

```typescript
interface AgentStep {
  id: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  label: string;
  description?: string;
  confidence?: number; // 0-100
  timestamp?: Date;
  reasoning?: string; // Why the agent took this action
  errorMessage?: string;
}

interface AgentProgressTrackerProps {
  steps: AgentStep[];
  mode?: 'determinate' | 'indeterminate';
  currentStepId?: string;
  totalSteps?: number;
  showConfidence?: boolean;
  showReasoning?: boolean;
  showTimestamps?: boolean;
  onStepClick?: (step: AgentStep) => void;
  className?: string;
}
```

#### Visual Design Guidelines

- Clean, modern appearance
- Completed steps: muted/subtle styling
- Active step: prominent with animated indicator
- Failed steps: clear error state, not alarming
- Confidence scores: visual indicator (progress bar, badge, or color gradient)
- Reasoning text: collapsible/expandable to avoid clutter

#### Accessibility

- Screen reader announces step changes
- Keyboard navigable if interactive
- Color is not the only indicator of status
- Proper ARIA roles and labels

## Implementation Tasks

1. **Setup project structure**
   - Initialize with Vite + React + TypeScript
   - Configure Storybook
   - Set up testing with Vitest

2. **Create TypeScript types**
   - Define all interfaces in `AgentProgressTracker.types.ts`
   - Create common types in `src/types/common.ts`

3. **Build component**
   - Implement `AgentProgressTracker.tsx` with all features
   - Create CSS modules for styling
   - Add proper TypeScript types and JSDoc comments

4. **Write Storybook stories**
   - Default state
   - With confidence scores
   - With reasoning text
   - Error state
   - Indeterminate mode
   - Real-time updates (simulated agent steps)

5. **Add tests**
   - Renders all states correctly
   - Handles step updates
   - Accessibility checks

6. **Documentation**
   - README with:
     - What AX problem this solves
     - Installation instructions
     - Usage examples
     - Props API documentation
     - Design rationale

## Example Usage (What Developers Should See)

```typescript
import { AgentProgressTracker } from 'ax-components-react';

function MyAgentInterface() {
  const [steps, setSteps] = useState<AgentStep[]>([
    {
      id: '1',
      status: 'completed',
      label: 'Analyzing request',
      confidence: 95,
      reasoning: 'Extracted key entities and intent from user query',
      timestamp: new Date('2025-02-07T10:00:00'),
    },
    {
      id: '2',
      status: 'active',
      label: 'Searching knowledge base',
      confidence: 87,
      description: 'Querying 3 data sources with relevance scoring',
    },
    {
      id: '3',
      status: 'pending',
      label: 'Synthesizing results',
    },
  ]);

  return (
    <AgentProgressTracker
      steps={steps}
      currentStepId="2"
      showConfidence
      showReasoning
      mode="determinate"
      totalSteps={3}
    />
  );
}
```

## Design Principles to Embed

- **Transparency First**: Always show what the agent is doing and why
- **Confidence Communication**: Make probabilistic nature visible but not overwhelming
- **Graceful Degradation**: Work well even with minimal information
- **Human Control**: Enable oversight without requiring constant attention
- **Familiar Patterns**: Build on React conventions developers know

## Getting Started

Please:

1. Set up the project with the specified tech stack
2. Implement the `AgentProgressTracker` component with all features
3. Create at least 5 Storybook stories showing different states
4. Write comprehensive README explaining the AX design rationale
5. Ensure code is production-ready with proper TypeScript types

Focus on making this feel like a professional component library that developers would trust to use in production applications.

## Key Questions to Address in Implementation

- How should confidence scores be visualized? (color gradient, badge, mini progress bar?)
- Should reasoning text be collapsed by default or always visible?
- How to handle real-time step updates smoothly (animations/transitions)?
- What's the best way to show indeterminate progress that still feels informative?

---

**Begin with project setup and the AgentProgressTracker component. Let me know when you're ready for the next component!**