/**
 * BindingApproval — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * High-stakes intent gate. The component displays a signature and hash
 * supplied by the caller's backend. It does not sign or hash anything.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 4)
 * @see https://github.com/Iambizi/depute/issues/3 (RFC: isSigning)
 */

import type { ApprovalHandoff, HandoffContext, PresentedPayload } from '../../types/core';
import type { ApprovalReceipt, ReceiptAppSigner, ReceiptPasskeySigner } from '../../utils/receipt';

/** Binding approval status */
export type BindingStatus =
  | 'reviewing'
  | 'signing'
  | 'signed'
  | 'rejected'
  | 'expired'
  | 'handoff_pending'
  | 'handoff_expired'
  | 'handoff_denied';

/** A term/clause in the binding agreement */
export interface BindingTerm {
  /** Unique identifier */
  id: string;

  /** Human-readable term description */
  text: string;

  /** Whether this term has been acknowledged */
  acknowledged: boolean;
}

export interface BindingApprovalProps {
  /** Title of the binding action (e.g. "Wire Transfer Authorization") */
  title: string;

  /** Detailed description of the binding action */
  description: string;

  /** The choice the agent recommends. Recorded on the receipt when the person signs or rejects. */
  agentRecommendation?: 'approved' | 'rejected';

  /** Hide the recommendation until the person chooses. Off unless the host sets it. */
  blind?: boolean;

  /** Current status */
  status?: BindingStatus;

  /** Terms that must be acknowledged before signing */
  terms?: BindingTerm[];

  /**
   * Extra term stating that the person is the actor for this action.
   * Shown with the other terms. Its acknowledgement id is `liability-notice`.
   */
  liabilityNotice?: string;

  /** Require all terms to be acknowledged before enabling sign button */
  requireAllTerms?: boolean;

  /** Whether the signing process is active (visual indicator) */
  isSigning?: boolean;

  /** Signer identity (e.g. email, wallet address) */
  signerIdentity?: string;

  /** Estimated impact description (e.g. "$5,000 will be transferred") */
  impactStatement?: string;

  /** Timeout in seconds for the signing window */
  timeoutSeconds?: number;

  /** Called when user approves / signs */
  onSign?: () => void;

  /** Called when user rejects */
  onReject?: (reason?: string) => void;

  /** Called when timeout expires */
  onTimeout?: () => void;

  /**
   * Signature produced by the caller's backend. Display only.
   * This component does not create signatures.
   */
  signature?: string;

  /** Hash produced by the caller's backend. Display only. */
  hash?: string;

  /** App-supplied check for the displayed signature and hash. */
  onVerify?: (proof: { signature?: string; hash?: string }) => void;

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

  /** Absolute unix timestamp for handoff TTL expiration */
  handoffDeadlineMs?: number;

  /** Stable id stored on the approval receipt. Falls back to the handoff id. */
  receiptId?: string;

  /** Instruction stored on the receipt. Falls back to the title. */
  instruction?: string;

  /** Exact payload the human was shown. Falls back to the gate's own fields. */
  presentedPayload?: PresentedPayload;

  /** Person recorded on the receipt when they sign or reject. */
  approver?: { id: string; name?: string };

  /** Unix milliseconds when the payload was first shown. */
  presentedAt?: number;

  /** Why the person signed. A payment trigger asks them to write it here. */
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
   * Recorded on the receipt. When this is set and `passkey` is set, a
   * signature or rejection asks for that passkey before the receipt is emitted.
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
