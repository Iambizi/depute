/**
 * BindingApproval — Type Definitions
 *
 * v2 Compliance & Forensics primitive.
 * Cryptographic intent — a high-stakes approval gate with
 * isSigning state for legally binding or irreversible actions.
 *
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 4)
 * @see https://github.com/Iambizi/depute/issues/3 (RFC: isSigning)
 */

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

  /** Current status */
  status?: BindingStatus;

  /** Terms that must be acknowledged before signing */
  terms?: BindingTerm[];

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

  /** Async delegation configuration */
  approvalHandoff?: import('../ApprovalGate/ApprovalGate.types').ApprovalHandoff;

  /** Fired when gate cannot find a present human */
  onHandoff?: (ctx: import('../ApprovalGate/ApprovalGate.types').HandoffContext) => Promise<void>;

  /** Fired when an async approval response arrives */
  onHandoffResolved?: (decision: 'approved' | 'denied', ctx: import('../ApprovalGate/ApprovalGate.types').HandoffContext) => void;

  /** Fired when the handoff deadline passes before a response */
  onHandoffExpired?: (ctx: import('../ApprovalGate/ApprovalGate.types').HandoffContext) => void;

  /** Rehydrate a gate waiting for a response */
  pendingApprovalId?: string;

  /** Absolute unix timestamp for handoff TTL expiration */
  handoffDeadlineMs?: number;

  /** Additional CSS class */
  className?: string;
}
