export interface EscalationRouterProps {
  /** The root layout class name */
  className?: string;
  failedAgent: string;
  errorSummary: string;
  recommendation?: string;
  onRetry: () => void;
  onReassign: () => void;
  onCancelBranch: () => void;
}
