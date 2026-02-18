/**
 * RunControls — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 4)
 */

import type { RunState } from '../../types/common';

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
