# 06 - Technical Specifications

## Shared Types (`src/types/common.ts`)

```typescript
/** Status of an individual agent step */
export type AgentStepStatus = 'pending' | 'active' | 'completed' | 'failed';

/** Overall agent operational status */
export type AgentStatus = 'idle' | 'running' | 'completed' | 'failed' | 'waiting' | 'connecting';

/** Semantic confidence level derived from numeric score */
export type ConfidenceLevel = 'low' | 'medium' | 'high';

/** Status of a human approval gate */
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired';

/** Represents a single step in an agent workflow */
export interface AgentStep {
  id: string;
  status: AgentStepStatus;
  label: string;
  description?: string;
  confidence?: number; // 0-100
  timestamp?: Date;
  reasoning?: string;
  errorMessage?: string;
}

/** Utility: derive confidence level from numeric score */
export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 80) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}
```

---

## Component 1: AgentProgressTracker

### TypeScript Interface

```typescript
// AgentProgressTracker.types.ts

import { AgentStep } from '../../types/common';

export interface AgentProgressTrackerProps {
  /** Array of agent steps to display */
  steps: AgentStep[];

  /** Whether total steps are known */
  mode?: 'determinate' | 'indeterminate';

  /** Override which step appears active (by step ID) */
  currentStepId?: string;

  /** Total expected steps (determinate mode) */
  totalSteps?: number;

  /** Show confidence score badges on steps */
  showConfidence?: boolean;

  /** Show agent reasoning text */
  showReasoning?: boolean;

  /** Show timestamps on steps */
  showTimestamps?: boolean;

  /** Callback when a step is clicked */
  onStepClick?: (step: AgentStep) => void;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Renders a vertical timeline of steps
- Active step has a pulsing indicator via CSS animation
- New steps animate in with `ax-slide-in` keyframe
- Reasoning text is collapsible (click to toggle)
- Confidence scores rendered via `ConfidenceScoreBadge` internally
- Uses `aria-live="polite"` region for step status announcements
- `role="list"` with `role="listitem"` for each step

---

## Component 2: ConfidenceScoreBadge

### TypeScript Interface

```typescript
// ConfidenceScoreBadge.types.ts

import { ConfidenceLevel } from '../../types/common';

export type ConfidenceBadgeVariant = 'badge' | 'bar' | 'minimal' | 'ring';
export type ConfidenceBadgeSize = 'sm' | 'md' | 'lg';

export interface ConfidenceScoreBadgeProps {
  /** Confidence score from 0-100 */
  value?: number;

  /** Visual variant */
  variant?: ConfidenceBadgeVariant;

  /** Size of the badge */
  size?: ConfidenceBadgeSize;

  /** Show numeric percentage */
  showValue?: boolean;

  /** Show confidence level label (Low/Medium/High) */
  showLabel?: boolean;

  /** Animate value changes */
  animate?: boolean;

  /** Text to show when value is undefined */
  emptyText?: string;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Pure presentational component (no internal state)
- Color derived from value using `getConfidenceLevel()`
- `badge` variant: pill-shaped with colored background
- `bar` variant: horizontal progress bar with fill
- `minimal` variant: colored dot + number
- `ring` variant: SVG circular progress
- CSS transition on width/color for animated value changes
- `aria-label` describes confidence level and value

---

## Component 3: AgentStatusIndicator

### TypeScript Interface

```typescript
// AgentStatusIndicator.types.ts

import { AgentStatus } from '../../types/common';

export type StatusIndicatorVariant = 'dot' | 'dot-label' | 'banner' | 'chip';
export type StatusIndicatorSize = 'sm' | 'md' | 'lg';

export interface AgentStatusIndicatorProps {
  /** Current agent status */
  status: AgentStatus;

  /** Visual variant */
  variant?: StatusIndicatorVariant;

  /** Size of the indicator */
  size?: StatusIndicatorSize;

  /** Custom label text (overrides default status label) */
  label?: string;

  /** Additional description (shown in banner variant) */
  description?: string;

  /** Show text label alongside dot */
  showLabel?: boolean;

  /** Override default pulse behavior */
  pulse?: boolean;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- `dot` variant is the default (colored circle)
- Pulse animation auto-enabled for `running` and `waiting` statuses
- Banner variant shows icon + label + description in a full-width bar
- Status text defaults: idle="Idle", running="Running", completed="Completed", failed="Failed", waiting="Waiting for input", connecting="Connecting"
- Uses `aria-live="polite"` for status changes
- `role="status"` on the component root

---

## Component 4: BasicHumanApprovalGate

### TypeScript Interface

```typescript
// BasicHumanApprovalGate.types.ts

import { ApprovalStatus } from '../../types/common';

export interface ApprovalMetadata {
  [key: string]: string;
}

export interface BasicHumanApprovalGateProps {
  /** Title of the approval request */
  title: string;

  /** Detailed description of what needs approval */
  description?: string;

  /** Agent's reasoning for this request */
  agentReasoning?: string;

  /** Confidence score for this action (0-100) */
  confidence?: number;

  /** Current approval status */
  status?: ApprovalStatus;

  /** Callback when approved */
  onApprove?: () => void;

  /** Callback when rejected */
  onReject?: () => void;

  /** Custom approve button text */
  approveLabel?: string;

  /** Custom reject button text */
  rejectLabel?: string;

  /** Timeout in seconds (0 = no timeout) */
  timeout?: number;

  /** Key-value metadata to display as context */
  metadata?: ApprovalMetadata;

  /** Show loading state on buttons */
  loading?: boolean;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Renders as a card with prominent visual break
- Buttons disabled when `status` is not `'pending'` or when `loading` is true
- Timeout countdown managed via `useEffect` + `setInterval`
- Expired state triggered when countdown reaches 0
- `ConfidenceScoreBadge` shown when `confidence` prop provided
- Metadata rendered as a key-value table
- Uses `role="alertdialog"` for screen reader urgency
- Focus trapped within gate when pending (keyboard accessible)

---

## Mock Data Utilities (`src/utils/mockData.ts`)

### API

```typescript
/** Generate an array of mock agent steps */
export function generateMockSteps(options?: {
  count?: number;           // Default: 4
  includeConfidence?: boolean; // Default: true
  includeReasoning?: boolean;  // Default: false
  failAtStep?: number;       // Step index to fail at (optional)
}): AgentStep[];

/** Simulate agent progress over time */
export function simulateAgentProgress(options: {
  totalSteps?: number;       // Default: 4
  onUpdate: (steps: AgentStep[]) => void;
  delayMs?: number;          // Default: 2000
  includeConfidence?: boolean;
  includeReasoning?: boolean;
  failAtStep?: number;
  onComplete?: () => void;
}): { cancel: () => void };

/** Generate a single mock step */
export function generateMockStep(overrides?: Partial<AgentStep>): AgentStep;

/** Generate mock approval gate data */
export function generateMockApproval(overrides?: {
  title?: string;
  description?: string;
  confidence?: number;
  timeout?: number;
}): BasicHumanApprovalGateProps;

/** Realistic step label bank */
export const MOCK_STEP_LABELS: string[];

/** Realistic reasoning text bank */
export const MOCK_REASONING_TEXTS: string[];
```

### Mock Step Labels (realistic agent actions)

```typescript
const MOCK_STEP_LABELS = [
  'Analyzing document structure',
  'Extracting key information',
  'Cross-referencing data sources',
  'Generating summary report',
  'Validating output accuracy',
  'Formatting response',
  'Searching knowledge base',
  'Processing natural language query',
  'Evaluating confidence scores',
  'Preparing final output',
];
```

### Mock Reasoning Texts

```typescript
const MOCK_REASONING_TEXTS = [
  'Multiple data sources confirm this approach has the highest accuracy.',
  'Previous similar queries showed best results with this method.',
  'Document structure suggests a hierarchical extraction strategy.',
  'Confidence score below threshold; flagging for human review.',
  'Cross-referencing with 3 independent sources for verification.',
];
```
