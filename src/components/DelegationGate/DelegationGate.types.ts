export interface DelegationGateProps {
  /** The root layout class name */
  className?: string;
  /** The agent requesting to spawn a new sub-agent */
  requestingAgent: string;
  /** Details about the sub-agent being proposed */
  proposedSubagent: {
    role: string;
    mandate: string;
    allowedTools?: string[];
    maxDepth?: number;
    estimatedTokens: number;
    estimatedCost: string;
  };
  /** Called when user approves the spawn */
  onApprove: () => void;
  /** Called when user denies the spawn */
  onDeny: () => void;
}
