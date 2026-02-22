/**
 * AX Components — Library Entry Point
 *
 * @packageDocumentation
 */

// Styles (design tokens + animations)
import './styles/index.css';

// Shared types
export type {
  PlanStepStatus,
  RunState,
  ApprovalStatus,
  ConfidenceLevel,
  PlanStep,
  ToolCall,
  Artifact,
} from './types/common';

export { getConfidenceLevel } from './types/common';

// A11y utilities
export { VisuallyHidden, useAnnouncer, useFocusTrap } from './utils/a11y';
export type { VisuallyHiddenProps } from './utils/a11y';

// Components
export type { ToolTraceProps } from './components/ToolTrace';

export { ArtifactCard } from './components/ArtifactCard';
export type { ArtifactCardProps, ExportFormat } from './components/ArtifactCard';

// Mock data utilities
export {
  generateMockPlan,
  simulatePlanExecution,
  generateMockApproval,
  generateRandomConfidence,
  generateMockToolCalls,
  simulateToolStream,
  generateMockArtifact,
  buildRunMonitoringScenario,
  MOCK_STEP_LABELS,
  MOCK_TOOL_NAMES,
  MOCK_APPROVAL_SCENARIOS,
} from './utils/mockData';
export type {
  GenerateMockPlanOptions,
  MockPlan,
} from './utils/mockData';
