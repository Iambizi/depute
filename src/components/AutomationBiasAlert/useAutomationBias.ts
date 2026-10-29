import { useState, useCallback, useMemo, useRef } from 'react';
import { agreementRate } from '../../utils/agreement';
import type { AgreementChoice, AgreementDecision } from '../../utils/agreement';
import type { ApprovalEvent, AutomationBiasCause, AutomationBiasThresholds } from './AutomationBiasAlert.types';

const DEFAULT_THRESHOLDS: Required<AutomationBiasThresholds> = {
  consecutiveApprovals: 5,
  minApprovalTimeMs: 1500, // 1.5s is fast for manual review
  approvalRateCeiling: 0.9, // 90% approval rate
  agreementRateCeiling: 0.8,
  minimumAgreementDecisions: 5,
};

export function useAutomationBias(
  thresholds: Partial<AutomationBiasThresholds> = {}
) {
  const [history, setHistory] = useState<ApprovalEvent[]>([]);
  const historyRef = useRef<ApprovalEvent[]>([]);
  const agreementRef = useRef<AgreementDecision[]>([]);
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);
  const [cause, setCause] = useState<AutomationBiasCause | null>(null);
  const [startTime, setStartTime] = useState(() => Date.now());

  const mergedThresholds = useMemo(() => ({
    ...DEFAULT_THRESHOLDS,
    ...thresholds
  }), [thresholds]);

  // Reset timer when a new action starts (or hook mounts)
  const resetTimer = useCallback(() => {
    setStartTime(Date.now());
  }, []);

  const recordAction = useCallback((
    action: 'approved' | 'rejected',
    agentRecommendation?: AgreementChoice,
  ) => {
    const now = Date.now();
    const durationMs = now - startTime;
    const event: ApprovalEvent = { timestamp: now, action, durationMs };

    const newHistory = [...historyRef.current, event].slice(-20);
    historyRef.current = newHistory;
    setHistory(newHistory);

    let triggered = false;
    let nextCause: AutomationBiasCause | null = null;

    const lastN = newHistory.slice(-mergedThresholds.consecutiveApprovals);
    if (
      lastN.length >= mergedThresholds.consecutiveApprovals &&
      lastN.every((e) => e.action === 'approved')
    ) {
      triggered = true;
      nextCause = 'streak';
    }

    if (action === 'approved' && durationMs < mergedThresholds.minApprovalTimeMs) {
      triggered = true;
      nextCause = 'speed';
    }

    if (newHistory.length >= 10) {
      const approvals = newHistory.filter((e) => e.action === 'approved').length;
      if (approvals / newHistory.length > mergedThresholds.approvalRateCeiling) {
        triggered = true;
        nextCause = 'approval-rate';
      }
    }

    if (agentRecommendation) {
      const decisions = [...agreementRef.current, { agentRecommendation, humanChoice: action }].slice(-20);
      agreementRef.current = decisions;
      const rate = agreementRate({
        decisions,
        agreementThreshold: mergedThresholds.agreementRateCeiling,
        minimumDecisions: mergedThresholds.minimumAgreementDecisions,
      });
      if (rate.alert) {
        triggered = true;
        nextCause = 'agreement';
      }
    }

    if (triggered) {
      setIsAlertTriggered(true);
      setCause(nextCause);
    }

    const endNow = Date.now();
    return endNow - startTime;
  }, [mergedThresholds, startTime]);

  const dismissAlert = useCallback(() => {
    setIsAlertTriggered(false);
    setCause(null);
    resetTimer(); // Reset timer after alert to allow review
  }, [resetTimer]);

  return {
    isAlertTriggered,
    cause,
    recordAction,
    dismissAlert,
    resetTimer,
    history,
  };
}
