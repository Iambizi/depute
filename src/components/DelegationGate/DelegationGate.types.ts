export interface DelegationGateProps {
  /** The root layout class name */
  className?: string;
  sourceAgent: string;
  proposedSubagent: {
    role: string;
    mandate: string;
    estimatedTokens: number;
    estimatedCost: string;
  };
  onApprove: () => void;
  onDeny: () => void;
}
