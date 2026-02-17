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
