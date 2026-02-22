export type EscalationResolution = 'retry' | 'reassign' | 'cancel';

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
}
