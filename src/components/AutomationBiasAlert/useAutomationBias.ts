import { useState, useCallback, useMemo, useRef } from 'react';
import type { ApprovalEvent, AutomationBiasThresholds } from './AutomationBiasAlert.types';

const DEFAULT_THRESHOLDS: Required<AutomationBiasThresholds> = {
  consecutiveApprovals: 5,
  minApprovalTimeMs: 1500, // 1.5s is fast for manual review
  approvalRateCeiling: 0.9, // 90% approval rate
};

export function useAutomationBias(
  thresholds: Partial<AutomationBiasThresholds> = {}
) {
  const [history, setHistory] = useState<ApprovalEvent[]>([]);
  const historyRef = useRef<ApprovalEvent[]>([]);
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);
  const [startTime, setStartTime] = useState(() => Date.now());

  const mergedThresholds = useMemo(() => ({
    ...DEFAULT_THRESHOLDS,
    ...thresholds
  }), [thresholds]);

  // Reset timer when a new action starts (or hook mounts)
  const resetTimer = useCallback(() => {
    setStartTime(Date.now());
  }, []);

  const recordAction = useCallback((action: 'approved' | 'rejected') => {
    const now = Date.now();
    const durationMs = now - startTime;
    const event: ApprovalEvent = { timestamp: now, action, durationMs };

    const newHistory = [...historyRef.current, event].slice(-20);
    historyRef.current = newHistory;
    setHistory(newHistory);

    let triggered = false;

    const lastN = newHistory.slice(-mergedThresholds.consecutiveApprovals);
    if (
      lastN.length >= mergedThresholds.consecutiveApprovals &&
      lastN.every((e) => e.action === 'approved')
    ) {
      triggered = true;
    }

    if (action === 'approved' && durationMs < mergedThresholds.minApprovalTimeMs) {
      triggered = true;
    }

    if (newHistory.length >= 10) {
      const approvals = newHistory.filter((e) => e.action === 'approved').length;
      if (approvals / newHistory.length > mergedThresholds.approvalRateCeiling) {
        triggered = true;
      }
    }

    if (triggered) {
      setIsAlertTriggered(true);
    }

    const endNow = Date.now();
    return endNow - startTime;
  }, [mergedThresholds, startTime]);

  const dismissAlert = useCallback(() => {
    setIsAlertTriggered(false);
    resetTimer(); // Reset timer after alert to allow review
  }, [resetTimer]);

  return {
    isAlertTriggered,
    recordAction,
    dismissAlert,
    resetTimer,
    history,
  };
}
