/**
 * ApprovalGate — Type Definitions
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 2)
 */

import type React from 'react';
import type { ApprovalStatus } from '../../types/common';
import type { ApprovalHandoff, HandoffContext, PresentedPayload, PresentedProvenance } from '../../types/core';
import type { ApprovalChannel } from '../../utils/channel';
import type { ChangeRequest } from '../../utils/triggers';
import type { ApprovalReceipt, ApprovalRequirement, DeclaredLimit, ReceiptActor, ReceiptAppSigner, ReceiptPasskeySigner } from '../../utils/receipt';

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

  /** The choice the agent recommends. Recorded on the receipt when the person approves or rejects. */
  agentRecommendation?: 'approved' | 'rejected';

  /** Hide the recommendation until the person chooses. Off unless the host sets it. */
  blind?: boolean;

  /** Current approval status */
  status?: ExtendedApprovalStatus;

  /** Approval mode — simple (approve/reject) or staged (preview → confirm → execute) */
  mode?: 'simple' | 'staged';

  /**
   * Staged payment mode waits this long, in milliseconds, after the payee and
   * the amount paint before Confirm enables. Defaults to 1500. Zero means
   * those fields only need to have painted. Simple mode ignores it.
   */
  minReviewMs?: number;

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

  /**
   * Where the instruction came from. Untrusted trust shows a warning and
   * keeps the gate in staged mode. The presented payload's provenance wins
   * when both are set. Stored on the receipt.
   */
  provenance?: PresentedProvenance;

  /** Person recorded on the receipt when they approve or reject. */
  approver?: { id: string; name?: string };

  /** Unix milliseconds when the payload was first shown. A payment receipt starts when the payee and the amount paint. */
  presentedAt?: number;

  /** Unix milliseconds the approval was issued. Defaults to `presentedAt`. */
  issuedAt?: number;

  /**
   * Unix milliseconds the approval display expires. Defaults to 10 minutes
   * after it was issued. The backend enforces the deadline. This clock is
   * not `timeoutSeconds`.
   */
  expiresAt?: number;

  /** Why the person approved. A payment trigger asks them to write it in the gate. */
  justification?: string;

  /**
   * Minimum why length. When omitted, a payment trigger requires 100 characters
   * and any other gate leaves the why optional. Zero turns the field off.
   */
  minJustificationLength?: number;

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

  /**
   * Integrator-declared approval channel. Stored on the receipt.
   * Reachability is not verified. A high-stakes decision cannot complete
   * when the integrator says the agent can read the channel, or has not said.
   */
  approvalChannel?: ApprovalChannel;

  /**
   * Limit or permission change the person is looking at.
   * An agent-initiated change is high-stakes and shows the from and to values.
   * There is no cooling period.
   */
  changeRequest?: ChangeRequest;

  /** Limits to snapshot on the receipt. Enforcement is declared, not checked. */
  limits?: DeclaredLimit[];

  /** Who is acting, and whether they use the person's own login. No agent registry. */
  actor?: ReceiptActor;

  /**
   * What the agent treated as known. Assumed or unknown items need
   * "I checked these" before Approve. Stored beside the why.
   */
  requirements?: ApprovalRequirement[];

  /** Fired with a hashed receipt when the person decides or the gate expires. */
  onReceipt?: (receipt: ApprovalReceipt) => void;

  /** Additional CSS class */
  className?: string;
}
