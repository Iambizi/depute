# 06 - Technical Specifications

## AX-CN Distribution Notes

- UI primitives are copied into the consumer repo via CLI (no npm package for UI).
- Headless hooks may be published separately, but are optional for v0.
- All interfaces below are stable contracts for copy-paste components.

## Shared Types (`src/types/common.ts`)

```typescript
/** Status of an individual plan step */
export type PlanStepStatus = 'pending' | 'active' | 'completed' | 'failed';

/** Execution state for RunControls */
export type RunState = 'idle' | 'running' | 'paused' | 'completed' | 'failed';

/** Approval gate status */
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired';

/** Confidence level thresholds */
export type ConfidenceLevel = 'high' | 'medium' | 'low';

/** A single step in a plan */
export interface PlanStep {
  id: string;
  label: string;
  description?: string;
  status: PlanStepStatus;
  confidence?: number;
  reasoning?: string;
  timestamp?: string;
}

/** A single tool call entry */
export interface ToolCall {
  id: string;
  name: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  error?: string;
  timestamp: string;
  /** Policy flags declared by the tool (v1 — A2UI compatibility) */
  policyFlags?: {
    requiresApproval?: boolean;
    writesState?: boolean;
    externalAction?: boolean;
  };
}

/** An artifact produced by agent execution */
export interface Artifact {
  id: string;
  title: string;
  type: 'markdown' | 'json' | 'csv' | 'code' | 'other';
  content: string;
  metadata?: Record<string, string>;
  timestamp: string;
  /** ID of the plan step that produced this artifact (provenance) */
  sourceStepId?: string;
  /** IDs of tool calls involved in producing this artifact (provenance) */
  toolCallIds?: string[];
}

/** Utility: map a confidence score to a level */
export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 80) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}
```

---

## Component 1: PlanCard

### TypeScript Interface

```typescript
// PlanCard.types.ts

import { PlanStep } from '../../types/common';

export interface PlanCardProps {
  /** Title of the plan */
  title: string;

  /** Array of plan steps to display */
  steps: PlanStep[];

  /** Plan mode — determinate (known total) or indeterminate */
  mode?: 'determinate' | 'indeterminate';

  /** Assumptions the agent made */
  assumptions?: string[];

  /** Agent's overall reasoning for this plan */
  reasoning?: string;

  /** Override which step appears active (by step ID) */
  activeStepId?: string;

  /** Called when a step is clicked */
  onStepClick?: (step: PlanStep) => void;

  /** Show confidence per step */
  showConfidence?: boolean;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Steps render as a vertical list with status icons
- Active step has expand/collapse for reasoning
- Indeterminate mode shows "..." after last step
- Uses `aria-label` on step list for screen reader context

---

## Component 2: ApprovalGate

### TypeScript Interface

```typescript
// ApprovalGate.types.ts

import { ApprovalStatus, ConfidenceLevel } from '../../types/common';

export interface ApprovalGateProps {
  /** Title of the approval request */
  title: string;

  /** Detailed description of what needs approval */
  description?: string;

  /** Agent's reasoning for this request */
  agentReasoning?: string;

  /** Current approval status */
  status?: ApprovalStatus;

  /** Approval mode — simple (approve/reject) or staged (preview → confirm → execute) */
  mode?: 'simple' | 'staged';

  /** Confidence score (0-100) for this action */
  confidence?: number;

  /** Optional timeout in seconds */
  timeoutSeconds?: number;

  /** Scoped constraints for the approval (per Stripe's SPT pattern) */
  scope?: {
    /** Resource/spend limit (e.g. "$500", "10 API calls") */
    resourceLimit?: string;
    /** Time-bounded grant duration in seconds */
    durationSeconds?: number;
    /** What specifically is being granted */
    target?: string;
  };

  /** Additional metadata to display */
  metadata?: Record<string, string>;

  /** Called on approval */
  onApprove?: () => void;

  /** Called on rejection */
  onReject?: (reason?: string) => void;

  /** Called on timeout */
  onTimeout?: () => void;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Uses `role="alertdialog"` for screen reader urgency
- Focus trapped within gate when pending (keyboard accessible)
- Staged mode renders a step indicator (Preview → Confirm → Execute)
- Metadata rendered as a key-value table
- Countdown timer uses `aria-live="polite"` for accessibility
- When `scope` is provided, render a "Grant Details" section showing resource limits, time window, and target

---

## Component 3: ConfidenceMeter

### TypeScript Interface

```typescript
// ConfidenceMeter.types.ts

import { ConfidenceLevel } from '../../types/common';

export type ConfidenceDisplay = 'meter' | 'badge';
export type ConfidenceMeterSize = 'sm' | 'md' | 'lg';

export interface ConfidenceMeterProps {
  /** Confidence score from 0-100 */
  value?: number;

  /** Display variant — meter (bar) or badge (compact inline) */
  display?: ConfidenceDisplay;

  /** Size of the component */
  size?: ConfidenceMeterSize;

  /** Show numeric percentage */
  showValue?: boolean;

  /** Show label (High/Medium/Low) */
  showLabel?: boolean;

  /** Reasoning for the confidence score */
  reasoning?: string;

  /** Whether to animate value changes */
  animate?: boolean;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Color maps to confidence level: green (high), amber (medium), red (low)
- Badge display is compact for inline use
- Meter display shows a horizontal bar with fill percentage
- Animated transitions on value change (respects `prefers-reduced-motion`)

---

## Component 4: RunControls

### TypeScript Interface

```typescript
// RunControls.types.ts

import { RunState } from '../../types/common';

export interface RunControlsProps {
  /** Current execution state */
  state: RunState;

  /** Called when user clicks start/resume */
  onStart?: () => void;

  /** Called when user clicks pause */
  onPause?: () => void;

  /** Called when user clicks stop */
  onStop?: () => void;

  /** Called when user clicks retry (after failure) */
  onRetry?: () => void;

  /** Whether to show a status label */
  showLabel?: boolean;

  /** Slot for additional action buttons */
  actions?: React.ReactNode;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Button visibility changes based on `state`
- Running state shows pulsing indicator
- `actions` slot enables extensibility (for v1 features like EscapeHatchBar)
- Buttons use `aria-label` for accessibility

---

## Component 5: ToolTrace

### TypeScript Interface

```typescript
// ToolTrace.types.ts

import { ToolCall } from '../../types/common';

export interface ToolTraceProps {
  /** Array of tool calls to display */
  calls: ToolCall[];

  /** Whether to auto-scroll to latest entry */
  autoScroll?: boolean;

  /** Maximum height before scrolling */
  maxHeight?: string;

  /** Called when a tool call entry is clicked */
  onEntryClick?: (call: ToolCall) => void;

  /** Whether entries are expandable to show input/output */
  expandable?: boolean;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Renders as a vertical timeline
- Each entry shows: tool name, status icon, duration
- Expandable entries reveal input/output JSON
- Auto-scroll keeps latest entry visible during streaming
- Uses `aria-live="polite"` for new entries

---

## Component 6: ArtifactCard

### TypeScript Interface

```typescript
// ArtifactCard.types.ts

import { Artifact } from '../../types/common';

export type ExportFormat = 'markdown' | 'json' | 'csv' | 'pr';

export interface ArtifactCardProps {
  /** The artifact to display */
  artifact: Artifact;

  /** Available export formats */
  exportFormats?: ExportFormat[];

  /** Called when an export button is clicked */
  onExport?: (format: ExportFormat) => void;

  /** Whether to show a content preview */
  showPreview?: boolean;

  /** Maximum preview height before truncation */
  maxPreviewHeight?: string;

  /** Additional CSS class */
  className?: string;
}
```

### Key Implementation Details

- Content preview truncated with "Show more" expand
- Export buttons show format-specific icons
- Loading state on export button during export
- Uses semantic HTML (`<article>`) for the card

---

## Mock Data Utilities (`src/utils/mockData.ts`)

### API

```typescript
/** Generate a mock plan with steps */
export function generateMockPlan(options?: {
  title?: string;
  stepCount?: number;
  includeConfidence?: boolean;
  includeReasoning?: boolean;
}): { title: string; steps: PlanStep[]; assumptions: string[] };

/** Simulate plan execution (auto-advances steps) */
export function simulatePlanExecution(options: {
  steps: PlanStep[];
  onUpdate: (steps: PlanStep[]) => void;
  intervalMs?: number;
}): { cancel: () => void };

/** Generate mock approval scenario */
export function generateMockApproval(overrides?: Partial<ApprovalGateProps>): ApprovalGateProps;

/** Generate a random confidence score */
export function generateRandomConfidence(): number;

/** Generate mock tool calls */
export function generateMockToolCalls(count?: number): ToolCall[];

/** Simulate streaming tool calls */
export function simulateToolStream(options: {
  onCall: (call: ToolCall) => void;
  count?: number;
  intervalMs?: number;
}): { cancel: () => void };

/** Generate a mock artifact */
export function generateMockArtifact(overrides?: Partial<Artifact>): Artifact;

/** Realistic plan step label bank */
export const MOCK_STEP_LABELS: string[];

/** Realistic tool name bank */
export const MOCK_TOOL_NAMES: string[];

/** Realistic approval scenario bank */
export const MOCK_APPROVAL_SCENARIOS: Array<{ title: string; description: string }>;
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
  'Applying business rules',
  'Running compliance checks',
  'Preparing final output',
];
```
