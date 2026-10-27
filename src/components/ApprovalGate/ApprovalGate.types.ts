/**
 * ApprovalGate — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 2)
 */

import type React from 'react';
import type { ApprovalStatus } from '../../types/common';

export type ExtendedApprovalStatus = ApprovalStatus | 'handoff_pending' | 'handoff_expired' | 'handoff_denied';

export interface ApprovalHandoff {
  timeoutMs: number;
  fallbackBehavior: 'block' | 'abort' | 'deny';
  requireSigning?: boolean;
}

export interface HandoffContext {
  approvalId: string;
  action: string;
  riskScore?: number;
  confidence?: number;
  deadline: number;
  timestamp: number;
}

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
  status?: ExtendedApprovalStatus;

  /** Approval mode — simple (approve/reject) or staged (preview → confirm → execute) */
  mode?: 'simple' | 'staged';

  /** Confidence score (0-100) for this action */
  confidence?: number;

  /** Optional timeout in seconds */
  timeoutSeconds?: number;

  /**
   * Frozen clock, in unix milliseconds. When set, the countdown does not tick.
   * Stories pass this so two loads show the same remaining time.
   */
  now?: number;

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

  /** Async delegation configuration */
  approvalHandoff?: ApprovalHandoff;

  /** Fired when gate cannot find a present human */
  onHandoff?: (ctx: HandoffContext) => Promise<void>;

  /** Fired when an async approval response arrives */
  onHandoffResolved?: (decision: 'approved' | 'denied', ctx: HandoffContext) => void;

  /** Fired when the handoff deadline passes before a response */
  onHandoffExpired?: (ctx: HandoffContext) => void;

  /** Rehydrate a gate waiting for a response */
  pendingApprovalId?: string;

  /** Absolute unix timestamp for handoff TTL expiration (useful for resuming state) */
  handoffDeadlineMs?: number;

  /**
   * Program to approve before a sandbox runs it. Optional.
   * The component displays this. It does not hash the program or run it.
   * Display does not make the program safe.
   */
  program?: ProgramPreview;

  /** Additional CSS class */
  className?: string;
}

/** What the human reviews when the action is a program rather than one tool call. */
export interface ProgramPreview {
  text?: string;
  summary?: string;
  bindings?: string[];
  declaredEffects?: { kind: 'read' | 'write' | 'move'; target?: string; detail?: string }[];
  budget?: { durationSeconds?: number; spend?: string; scope?: string };
}
