/**
 * ApprovalGate — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 2)
 */

import type React from 'react';
import type { ApprovalStatus } from '../../types/common';
import type { ApprovalHandoff, HandoffContext, PresentedPayload } from '../../types/core';
import type { ApprovalReceipt, ReceiptAppSigner, ReceiptPasskeySigner } from '../../utils/receipt';

export type { ApprovalHandoff, HandoffContext };

export type ExtendedApprovalStatus = ApprovalStatus | 'handoff_pending' | 'handoff_expired' | 'handoff_denied';

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

  /** Stable id stored on the approval receipt. Falls back to the handoff id. */
  receiptId?: string;

  /** Instruction stored on the receipt. Falls back to the title. */
  instruction?: string;

  /** Exact payload the human was shown. Falls back to the gate's own fields. */
  presentedPayload?: PresentedPayload;

  /** Person recorded on the receipt when they approve or reject. */
  approver?: { id: string; name?: string };

  /** Unix milliseconds when the payload was first shown. */
  presentedAt?: number;

  /** Why the person approved. Optional until a later rule requires it. */
  justification?: string;

  /** Policy reasons that opened the gate. */
  triggers?: string[];

  /** Hash of the previous receipt in this session, when the host has one. */
  previousReceiptHash?: string;

  /**
   * Recorded on the receipt. When this is set and `passkey` is set, an
   * approval or rejection asks for that passkey before the receipt is emitted.
   */
  highStakes?: boolean;

  /** Ed25519 app signer. When set, it signs every receipt this gate emits. */
  appSigner?: ReceiptAppSigner;

  /** User passkey. Used only when `highStakes` is set and the person decides. */
  passkey?: ReceiptPasskeySigner;

  /** Fired with a hashed receipt when the person decides or the gate expires. */
  onReceipt?: (receipt: ApprovalReceipt) => void;

  /** Additional CSS class */
  className?: string;
}
