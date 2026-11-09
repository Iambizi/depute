/**
 * AutomationBiasAlert — Type Definitions
 */

import type React from 'react';

export interface AutomationBiasThresholds {
  /** Trigger after N consecutive approvals without rejection */
  consecutiveApprovals?: number;
  /** Trigger if approval time (ms) is below this threshold */
  minApprovalTimeMs?: number;
  /** Trigger if approval rate (approvals/total) exceeds this ceiling in a session */
  approvalRateCeiling?: number;
  /** Alert when agreement with the recommendation is strictly over this rate. Default 0.8. */
  agreementRateCeiling?: number;
  /** Agreement is not an alert until at least this many compared decisions. Default 5. */
  minimumAgreementDecisions?: number;
}

export interface ApprovalEvent {
  timestamp: number;
  action: 'approved' | 'rejected';
  durationMs: number;
}

export type AutomationBiasCause = 'streak' | 'speed' | 'approval-rate' | 'agreement';

export interface AutomationBiasAlertProps {
  /** The thresholds that trigger the alert */
  thresholds?: AutomationBiasThresholds;
  /** Unique identifier for the agent/session to track history */
  sessionId?: string;
  /** Current pending action name/description */
  actionName?: string;
  /** Which check opened the alert. The agreement copy is used only for that cause. */
  cause?: AutomationBiasCause | null;
  /** Callback when the alert is triggered and user acknowledges */
  onAcknowledge?: () => void;
  /** Children (usually the ApprovalGate or the content being monitored) */
  children: React.ReactNode;
  /** Whether the alert is active (intercepting) */
  isActive?: boolean;
  /** Additional CSS class */
  className?: string;
}
