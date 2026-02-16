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
