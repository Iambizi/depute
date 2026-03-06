/**
 * ApprovalGate — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 2)
 */

import type { ApprovalStatus } from '../../types/common';

/** Staged mode sub-states */
export type StagedStep = 'previewing' | 'confirming';

export interface ApprovalGateProps {
  /** Optional custom icon to display in the header (overrides defaults and removes pending clock icon logic) */
  icon?: React.ReactNode;

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
