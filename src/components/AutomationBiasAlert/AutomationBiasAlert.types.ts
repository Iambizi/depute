/**
 * AutomationBiasAlert — Type Definitions
 */

export interface AutomationBiasThresholds {
  /** Trigger after N consecutive approvals without rejection */
  consecutiveApprovals?: number;
  /** Trigger if approval time (ms) is below this threshold */
  minApprovalTimeMs?: number;
  /** Trigger if approval rate (approvals/total) exceeds this ceiling in a session */
  approvalRateCeiling?: number;
}

export interface ApprovalEvent {
  timestamp: number;
  action: 'approved' | 'rejected';
  durationMs: number;
}

export interface AutomationBiasAlertProps {
  /** The thresholds that trigger the alert */
  thresholds?: AutomationBiasThresholds;
  /** Unique identifier for the agent/session to track history */
  sessionId?: string;
  /** Current pending action name/description */
  actionName?: string;
  /** Callback when the alert is triggered and user acknowledges */
  onAcknowledge?: () => void;
  /** Children (usually the ApprovalGate or the content being monitored) */
  children: React.ReactNode;
  /** Whether the alert is active (intercepting) */
  isActive?: boolean;
  /** Additional CSS class */
  className?: string;
}
