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
export { PlanCard } from './components/PlanCard';
export type { PlanCardProps } from './components/PlanCard';

export { ApprovalGate } from './components/ApprovalGate';
export type { ApprovalGateProps, StagedStep } from './components/ApprovalGate';

export { ConfidenceMeter } from './components/ConfidenceMeter';
export type { ConfidenceMeterProps, ConfidenceDisplay, ConfidenceMeterSize } from './components/ConfidenceMeter';

export { RunControls } from './components/RunControls';
export type { RunControlsProps } from './components/RunControls';

export { ToolTrace } from './components/ToolTrace';
export type { ToolTraceProps } from './components/ToolTrace';

export { ArtifactCard } from './components/ArtifactCard';
export type { ArtifactCardProps, ExportFormat } from './components/ArtifactCard';
