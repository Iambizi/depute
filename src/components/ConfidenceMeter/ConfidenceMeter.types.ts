/**
 * ConfidenceMeter — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 3)
 */

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
