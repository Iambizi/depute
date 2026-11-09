import type { ApprovalReceipt, ReceiptPasskeySigner } from '../../utils/receipt';

export type EscalationResolution = 'retry' | 'reassign' | 'cancel';

export type StopState = 'armed' | 'stopping' | 'stopped' | 'failed' | 'unknown';

export interface EscalationRouterProps {
  /** The root layout class name */
  className?: string;
  /** The agent that failed */
  failedAgent: string;
  /** The branch this agent belongs to */
  branchId?: string;
  /** Human-readable summary of the error */
  errorSummary: string;
  /** Partial stack trace or tool output that led to failure */
  errorTrace?: string;
  /** System recommendation for how to resolve */
  recommendation?: EscalationResolution;
  onRetry: () => void;
  onReassign: () => void;
  onCancelBranch: () => void;

  /**
   * Asks the host to stop. Stopped is shown only when the promise confirms.
   * Anything else is unknown. Stopping does not ask for a passkey.
   */
  onStop?: () => Promise<{ confirmed: boolean } | void>;

  /** High-stakes resume. Requires `passkey`. */
  onResume?: () => void;

  /** User passkey. Used for resume only. */
  passkey?: ReceiptPasskeySigner;

  /** Stop receipt, or the high-stakes resume receipt. */
  onReceipt?: (receipt: ApprovalReceipt) => void;
}
