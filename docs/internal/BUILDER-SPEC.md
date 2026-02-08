# Updated Spec: AX Components for React - Prototype to Production

## Project Context

You are building a React component library for Agentic Experience (AX) design - a new field focused on creating user interfaces that work seamlessly with AI agents performing autonomous, multi-step tasks.

**Positioning:** "From prototype to production" - The same components designers use to build functional prototypes and engineers use to ship production features.

### What is Agentic Experience (AX)?

AX is the design discipline for interfaces where AI agents act on behalf of users. Unlike traditional UX where humans click through interfaces, AX addresses challenges like:

- **Probabilistic outcomes**: Agent actions have confidence scores, not binary success/failure
- **Autonomous multi-step workflows**: Agents execute complex tasks without constant human input
- **Transparency requirements**: Users need to see what agents are doing and why
- **Human-in-the-loop patterns**: Critical decisions require human approval
- **Asynchronous operations**: Agent tasks may take seconds or minutes to complete

### Why This Library Exists

**The Problem:** Traditional UI components assume deterministic workflows. Figma prototypes can't handle AI's probabilistic nature. Teams need functional prototypes that can respond to real agent behavior, then ship those same components to production.

**The Solution:** Production-ready React components specifically designed for agentic interactions. Use them to prototype agent experiences, then deploy the same code to production. No translation layer, no rebuild.

## Project Goals

- Build production-ready React components that solve core AX design patterns
- Serve both prototyping workflows (designers building functional prototypes) and production engineering
- Provide TypeScript types for full type safety
- Create reusable, customizable components that work with any AI agent backend
- Document AX design principles each component addresses
- Enable rapid prototyping AND production deployment

## Technical Specifications

### Stack

- React 18+ with TypeScript
- Modern CSS (CSS Modules)
- No external UI library dependencies (we're building primitives)
- Storybook for component documentation and live examples
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
│   ├── utils/
│   │   └── mockData.ts  // Mock agent data for prototyping
│   └── index.ts
├── stories/
│   └── AgentProgressTracker.stories.tsx
├── examples/
│   ├── prototype-setup/     // Quick start for prototyping
│   └── production-setup/    // Integration guide for production
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
- Components work with mock data (prototyping) and live data (production)

## First Component: AgentProgressTracker

### The AX Problem It Solves

Traditional progress indicators assume deterministic, linear workflows (e.g., "Step 2 of 5"). AI agents operate probabilistically with dynamic workflows where:

- Steps may be discovered during execution
- Each step has a confidence level
- The total number of steps may be unknown
- Some steps may fail and trigger alternate paths

**Prototyping Use Case:** Designers need to test how agent progress feels with different confidence levels, error states, and dynamic step additions without building backend logic.

**Production Use Case:** Engineers need a component that can handle real agent outputs, unknown workflow lengths, and graceful error handling.

### Component Requirements

#### Core Features

- Display current agent activity with reasoning/explanation
- Show completed steps with timestamps
- Indicate active step with dynamic status
- Display confidence scores (0-100%) for probabilistic steps
- Handle unknown total steps gracefully
- Support both determinate (known steps) and indeterminate (unknown) modes
- Show error states with recovery information
- Include mock data utilities for rapid prototyping

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
- Smooth animations for step transitions (important for prototyping feel)

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
   - Create `examples/` folder for both use cases

2. **Create TypeScript types**
   - Define all interfaces in `AgentProgressTracker.types.ts`
   - Create common types in `src/types/common.ts`

3. **Build component**
   - Implement `AgentProgressTracker.tsx` with all features
   - Create CSS modules for styling
   - Add proper TypeScript types and JSDoc comments

4. **Create mock data utilities** (in `src/utils/mockData.ts`)
   - `generateMockSteps()` - creates realistic agent steps
   - `simulateAgentProgress()` - animates through steps over time
   - These help designers prototype quickly

5. **Write Storybook stories** (serve BOTH audiences)
   
   **Prototyping Stories:**
   - "Quick Start: Prototype Agent Flow" - with auto-advancing mock data
   - "Test Different Confidence Levels" - interactive controls
   - "Simulate Real-Time Updates" - live step additions
   
   **Production Stories:**
   - "Basic Usage" - minimal integration example
   - "With Real API Data" - shows data shape from actual agent
   - "Error Handling" - edge cases and failures
   
   **Shared Stories:**
   - Default state
   - With confidence scores
   - With reasoning text
   - Indeterminate mode

6. **Add tests**
   - Renders all states correctly
   - Handles step updates
   - Accessibility checks
   - Mock data utilities work correctly

7. **Documentation** (dual-audience README)
   - Overview: What AX problem this solves
   - Quick Start: Prototyping (5-minute setup with mock data)
   - Quick Start: Production (integration with real agents)
   - Installation instructions
   - Component API documentation
   - Design rationale
   - Migration path from prototype to production

## Example Usage - Two Paths

### Path 1: Prototyping (Designers/PMs)

```typescript
import { AgentProgressTracker } from 'ax-components-react';
import { simulateAgentProgress } from 'ax-components-react/utils';

function AgentPrototype() {
  const [steps, setSteps] = useState<AgentStep[]>([]);

  useEffect(() => {
    // Automatically simulates an agent workflow
    simulateAgentProgress({
      totalSteps: 4,
      onUpdate: setSteps,
      delayMs: 2000,
    });
  }, []);

  return (
    <AgentProgressTracker
      steps={steps}
      showConfidence
      showReasoning
      mode="determinate"
    />
  );
}
```

### Path 2: Production (Engineers)

```typescript
import { AgentProgressTracker } from 'ax-components-react';
import { useAgentWorkflow } from './hooks/useAgentWorkflow';

function ProductionAgentInterface() {
  const { steps, currentStepId } = useAgentWorkflow({
    agentId: 'my-agent-123',
    taskId: 'analyze-document',
  });

  return (
    <AgentProgressTracker
      steps={steps}
      currentStepId={currentStepId}
      showConfidence
      showReasoning
      mode="determinate"
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
- **Prototype-to-Production Path**: Components work identically in both contexts

## Getting Started

Please:

1. Set up the project with the specified tech stack
2. Implement the `AgentProgressTracker` component with all features
3. Create mock data utilities in `src/utils/mockData.ts`
4. Create at least 7 Storybook stories showing both prototyping and production use cases
5. Write dual-audience README with separate Quick Start sections
6. Create example setups in `examples/` folder for both paths
7. Ensure code is production-ready with proper TypeScript types

Focus on making this feel like a professional component library that serves both rapid prototyping AND production deployment.

## Key Questions to Address in Implementation

- How should confidence scores be visualized? (color gradient, badge, mini progress bar?)
- Should reasoning text be collapsed by default or always visible?
- How to handle real-time step updates smoothly (animations/transitions)?
- What's the best way to show indeterminate progress that still feels informative?
- What mock data patterns are most useful for prototyping?
- How to make the transition from mock to real data seamless?

## Success Criteria

### A designer should be able to:

- Install the library
- Import `AgentProgressTracker` and `simulateAgentProgress`
- Have a working, interactive prototype in under 5 minutes
- Test different agent behaviors without backend setup

### An engineer should be able to:

- Use the same component in production
- Connect to real agent APIs with minimal code changes
- Trust the component to handle edge cases
- Ship to production with confidence