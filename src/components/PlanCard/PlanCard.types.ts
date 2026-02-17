/**
 * PlanCard — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 1)
 */

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
