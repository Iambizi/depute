/**
 * ApprovalGate — Human-in-the-loop approval surface.
 *
 * The most a11y-intensive v0 primitive. Implements:
 * - Focus trap when pending (via useFocusTrap)
 * - aria-live announcements for state changes (via useAnnouncer)
 * - role="alertdialog" for screen reader urgency
 * - Countdown timer with escalating visual urgency
 * - Scoped approvals (Stripe SPT pattern)
 * - Simple and staged (preview → confirm → execute) modes
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 2)
 * @see docs/orchestration/05-interface-states.md (ApprovalGate state matrix)
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getConfidenceLevel } from '../../types/common';
import { useAnnouncer, useFocusTrap, VisuallyHidden } from '../../utils/a11y';
import type { ApprovalGateProps, StagedStep } from './ApprovalGate.types';
import styles from './ApprovalGate.module.css';

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const STATUS_ICONS: Record<string, string> = {
  pending: '⏳',
  approved: '✓',
  rejected: '✕',
  expired: '⌛',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Approval Required',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired',
};

function getContainerClass(status: string): string {
  switch (status) {
    case 'pending': return styles.approvalGatePending;
    case 'approved': return styles.approvalGateApproved;
    case 'rejected': return styles.approvalGateRejected;
    case 'expired': return styles.approvalGateExpired;
    default: return '';
  }
}

function getIconClass(status: string): string {
  switch (status) {
    case 'pending': return styles.statusIconPending;
    case 'approved': return styles.statusIconApproved;
    case 'rejected': return styles.statusIconRejected;
    case 'expired': return styles.statusIconExpired;
    default: return '';
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}s`;
}

// ---------------------------------------------------------------------------
// ApprovalGate Component
// ---------------------------------------------------------------------------

export function ApprovalGate({
  title,
  description,
  agentReasoning,
  status = 'pending',
  mode = 'simple',
  confidence,
  timeoutSeconds,
  scope,
  metadata,
  onApprove,
  onReject,
  onTimeout,
  className,
}: ApprovalGateProps) {
  const isPending = status === 'pending';
  const isResolved = status === 'approved' || status === 'rejected' || status === 'expired';

  // Focus trap — active only when pending
  const trapRef = useFocusTrap<HTMLDivElement>(isPending);

  // Announcer — for async state changes
  const [announce, AnnouncerRegion] = useAnnouncer('assertive');

  // Staged mode state
  const [stagedStep, setStagedStep] = useState<StagedStep>('previewing');

  // Countdown timer
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    timeoutSeconds ?? null
  );

  // Announce status changes
  useEffect(() => {
    if (isPending) {
      announce(`Approval required: ${title}`);
    } else if (status === 'approved') {
      announce(`Approved: ${title}`);
    } else if (status === 'rejected') {
      announce(`Rejected: ${title}`);
    } else if (status === 'expired') {
      announce(`Approval expired: ${title}`);
    }
  }, [status, title, announce, isPending]);

  // Countdown logic
  useEffect(() => {
    if (!isPending || timeRemaining == null || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev == null || prev <= 1) {
          clearInterval(interval);
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPending, timeRemaining, onTimeout]);

  // Countdown urgency level
  const countdownClass = useMemo(() => {
    if (timeRemaining == null) return '';
    if (timeRemaining <= 10) return styles.countdownUrgent;
    if (timeRemaining <= 60) return styles.countdownWarning;
    return styles.countdownNormal;
  }, [timeRemaining]);

  // Handlers
  const handleApprove = useCallback(() => {
    if (mode === 'staged' && stagedStep === 'previewing') {
      setStagedStep('confirming');
      announce('Confirm to proceed with approval');
      return;
    }
    onApprove?.();
  }, [mode, stagedStep, onApprove, announce]);

  const handleReject = useCallback(() => {
    onReject?.();
  }, [onReject]);

  const handleBack = useCallback(() => {
    setStagedStep('previewing');
  }, []);

  // Confidence level
  const confidenceLevel = confidence != null ? getConfidenceLevel(confidence) : null;
  const confidenceClass = confidenceLevel
    ? { high: styles.confidenceHigh, medium: styles.confidenceMedium, low: styles.confidenceLow }[confidenceLevel]
    : '';

  // Aria label for the gate
  const ariaLabel = useMemo(() => {
    if (isPending) return `Approval required: ${title}`;
    return `${STATUS_LABELS[status]}: ${title}`;
  }, [isPending, status, title]);

  return (
    <div
      ref={trapRef}
      className={`${styles.approvalGate} ${getContainerClass(status)} ${className ?? ''}`}
      role={isPending ? 'alertdialog' : 'region'}
      aria-label={ariaLabel}
      aria-modal={isPending ? true : undefined}
    >
      {/* Header */}
      <div className={styles.header}>
        <span
          className={`${styles.statusIcon} ${getIconClass(status)}`}
          aria-hidden="true"
        >
          {STATUS_ICONS[status]}
        </span>
        <div className={styles.headerContent}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.statusLabel}>{STATUS_LABELS[status]}</div>
        </div>

        {/* Countdown badge */}
        {isPending && timeRemaining != null && timeRemaining > 0 && (
          <span
            className={`${styles.countdown} ${countdownClass}`}
            aria-live="polite"
          >
            {formatTime(timeRemaining)}
          </span>
        )}
      </div>

      {/* Staged mode indicator */}
      {mode === 'staged' && isPending && (
        <div className={styles.stageIndicator} aria-label="Approval stages">
          <span className={`${styles.stage} ${stagedStep === 'previewing' ? styles.stageActive : styles.stageCompleted}`}>
            {stagedStep === 'confirming' ? '✓' : '1.'} Preview
          </span>
          <span className={styles.stageSeparator} aria-hidden="true">→</span>
          <span className={`${styles.stage} ${stagedStep === 'confirming' ? styles.stageActive : ''}`}>
            2. Confirm
          </span>
          <span className={styles.stageSeparator} aria-hidden="true">→</span>
          <span className={styles.stage}>3. Execute</span>
        </div>
      )}

      {/* Body */}
      <div className={styles.body}>
        {/* Description */}
        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {/* Agent reasoning */}
        {agentReasoning && (
          <div className={styles.reasoning}>
            <div className={styles.reasoningLabel}>Agent Reasoning</div>
            {agentReasoning}
          </div>
        )}

        {/* Confidence badge */}
        {confidence != null && (
          <span
            className={`${styles.confidenceBadge} ${confidenceClass}`}
            aria-label={`Confidence: ${confidence}%`}
          >
            {confidence}% confidence
          </span>
        )}

        {/* Scope — Grant Details */}
        {scope && (scope.resourceLimit || scope.durationSeconds || scope.target) && (
          <div className={styles.scope}>
            <div className={styles.scopeTitle}>Grant Details</div>
            <div className={styles.scopeItems}>
              {scope.resourceLimit && (
                <span className={styles.scopeBadge}>
                  Up to {scope.resourceLimit}
                </span>
              )}
              {scope.durationSeconds && (
                <span className={styles.scopeBadge}>
                  Valid for {formatTime(scope.durationSeconds)}
                </span>
              )}
              {scope.target && (
                <span className={styles.scopeBadge}>
                  {scope.target}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Metadata table */}
        {metadata && Object.keys(metadata).length > 0 && (
          <div className={styles.metadata}>
            <table className={styles.metadataTable}>
              <tbody>
                {Object.entries(metadata).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Actions — only visible when pending */}
      {isPending && (
        <div className={styles.actions}>
          {/* Staged: back button when confirming */}
          {mode === 'staged' && stagedStep === 'confirming' && (
            <button
              className={styles.btnSecondary}
              onClick={handleBack}
              type="button"
            >
              ← Back
            </button>
          )}

          <button
            className={styles.btnReject}
            onClick={handleReject}
            type="button"
          >
            Reject
          </button>

          <span className={styles.actionsSpacerRight} />

          <button
            className={styles.btnApprove}
            onClick={handleApprove}
            type="button"
          >
            {mode === 'staged' && stagedStep === 'previewing'
              ? 'Preview & Continue →'
              : mode === 'staged' && stagedStep === 'confirming'
                ? 'Confirm & Execute ✓'
                : 'Approve'}
          </button>
        </div>
      )}

      {/* Resolved state banner */}
      {isResolved && (
        <div
          className={`${styles.resolvedBanner} ${
            status === 'approved'
              ? styles.resolvedApproved
              : status === 'rejected'
                ? styles.resolvedRejected
                : styles.resolvedExpired
          }`}
        >
          {STATUS_ICONS[status]} {STATUS_LABELS[status]}
        </div>
      )}

      <VisuallyHidden>
        <AnnouncerRegion />
      </VisuallyHidden>
    </div>
  );
}
