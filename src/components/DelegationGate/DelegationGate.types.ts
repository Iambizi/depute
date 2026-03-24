export type DelegationStatus = 'pending' | 'approved' | 'denied' | 'expired';

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
  /** Current status of the gate (defaults to pending) */
  status?: DelegationStatus;
  /** Timeout in seconds */
  timeoutSeconds?: number;
  /** Called when user approves the spawn */
  onApprove?: () => void;
  /** Called when user denies the spawn */
  onDeny?: () => void;
  /** Called when the request times out */
  onTimeout?: () => void;
}
