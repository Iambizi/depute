/**
 * ApprovalGate — Human-in-the-loop approval surface.
 *
 * The most a11y-intensive v0 primitive. Implements:
 * - Focus trap when pending (via useFocusTrap)
 * - aria-live announcements for state changes (via useAnnouncer)
 * - role="alertdialog" for screen reader urgency
 * - Countdown timer with escalating visual urgency
 * - Scoped approvals (Stripe SPT pattern)
 * - Simple and staged (preview, confirm, execute) modes
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 2)
 * @see docs/orchestration/05-interface-states.md (ApprovalGate state matrix)
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type React from 'react';
import { getConfidenceLevel } from '../../types/common';
import { IconArrowLeft, IconArrowRight } from '../../utils/icons';
import { useAnnouncer, useFocusTrap, VisuallyHidden } from '../../utils/a11y';
import { buildDecisionReceipt, buildSignedDecisionReceipt } from '../../utils/receipt';
import type { ReceiptMethod, ReceiptOutcome } from '../../utils/receipt';
import type { ApprovalGateProps, HandoffContext, StagedStep } from './ApprovalGate.types';
import styles from './ApprovalGate.module.css';

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconHourglass = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22h14"></path>
    <path d="M5 2h14"></path>
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
  </svg>
);

const STATUS_ICONS: Record<string, React.ReactNode | null> = {
  pending: null,
  approved: <IconCheck />,
  rejected: <IconX />,
  expired: <IconHourglass />,
  handoff_pending: <IconHourglass />,
  handoff_expired: <IconHourglass />,
  handoff_denied: <IconX />,
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Approval Required',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired',
  handoff_pending: 'Awaiting Async Approval',
  handoff_expired: 'Handoff Expired',
  handoff_denied: 'Remote Denied',
};

function getContainerClass(status: string): string {
  switch (status) {
    case 'pending': return styles.approvalGatePending;
    case 'approved': return styles.approvalGateApproved;
    case 'rejected': return styles.approvalGateRejected;
    case 'expired': return styles.approvalGateExpired;
    case 'handoff_pending': return `${styles.approvalGatePending} ${styles.handoffPending}`;
    case 'handoff_expired': return styles.approvalGateExpired;
    case 'handoff_denied': return styles.approvalGateRejected;
    default: return '';
  }
}

function getDotClass(status: string): string {
  switch (status) {
    case 'approved': return styles.statusDotApproved;
    case 'rejected':
    case 'handoff_denied': return styles.statusDotRejected;
    case 'expired':
    case 'handoff_expired': return styles.statusDotExpired;
    default: return '';
  }
}

function getIconClass(status: string): string {
  switch (status) {
    case 'pending': return styles.statusIconPending;
    case 'approved': return styles.statusIconApproved;
    case 'rejected': return styles.statusIconRejected;
    case 'expired': return styles.statusIconExpired;
    case 'handoff_pending': return styles.statusIconPending;
    case 'handoff_expired': return styles.statusIconExpired;
    case 'handoff_denied': return styles.statusIconRejected;
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
  icon,
  title,
  description,
  agentReasoning,
  status = 'pending',
  mode = 'simple',
  confidence,
  timeoutSeconds,
  now,
  scope,
  metadata,
  onApprove,
  onReject,
  onTimeout,
  approvalHandoff,
  onHandoff,
  onHandoffResolved,
  onHandoffExpired,
  pendingApprovalId,
  handoffDeadlineMs,
  receiptId,
  instruction,
  presentedPayload,
  approver,
  presentedAt,
  justification,
  triggers,
  previousReceiptHash,
  highStakes,
  onReceipt,
  appSigner,
  passkey,
  className,
}: ApprovalGateProps) {
  const isPending = status === 'pending';
  const isHandoffPending = status === 'handoff_pending';
  const isResolved = status === 'approved' || status === 'rejected' || status === 'expired' || status === 'handoff_expired' || status === 'handoff_denied';

  // Focus trap — active only when pending synchronously
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
    } else if (isHandoffPending) {
      announce(`Handoff pending for: ${title}`);
    } else if (status === 'approved') {
      announce(`Approved: ${title}`);
    } else if (status === 'rejected' || status === 'handoff_denied') {
      announce(`Rejected: ${title}`);
    } else if (status === 'expired' || status === 'handoff_expired') {
      announce(`Approval expired: ${title}`);
    }
  }, [status, title, announce, isPending, isHandoffPending]);

  const shownAtRef = useRef(presentedAt ?? now ?? Date.now());
  const emitReceiptRef = useRef<(outcome: ReceiptOutcome, method: ReceiptMethod) => void | Promise<void>>(() => {});
  const [signing, setSigning] = useState(false);
  const signingRef = useRef(false);
  const [signError, setSignError] = useState<string | null>(null);
  const [handoffInitiated, setHandoffInitiated] = useState(false);
  const handoffContextRef = useRef<HandoffContext | null>(null);
  const prevStatusRef = useRef(status);
  const countdownKeyRef = useRef('');
  const deadlineAtRef = useRef<number | null>(null);
  const expiryFiredRef = useRef(false);

  const fallbackContext = useCallback((deadline: number): HandoffContext => {
    return handoffContextRef.current ?? {
      approvalId: pendingApprovalId || 'unknown',
      action: title,
      confidence,
      deadline,
      timestamp: Date.now(),
    };
  }, [pendingApprovalId, title, confidence]);

  // Start an async handoff once. The timer is cleared on cleanup so StrictMode
  // does not dispatch twice, and the payload uses handoffDeadlineMs when set.
  useEffect(() => {
    if (!isPending || !approvalHandoff || handoffInitiated) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      const deadline = handoffDeadlineMs ?? Date.now() + 24 * 60 * 60 * 1000;
      const ctx: HandoffContext = {
        approvalId: pendingApprovalId || crypto.randomUUID(),
        action: title,
        confidence,
        deadline,
        timestamp: Date.now(),
      };
      handoffContextRef.current = ctx;
      setHandoffInitiated(true);
      onHandoff?.(ctx);
    }, approvalHandoff.timeoutMs);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isPending, approvalHandoff, handoffInitiated, handoffDeadlineMs, pendingApprovalId, title, confidence, onHandoff]);

  // Fire onHandoffResolved once when a waiting handoff reaches a terminal status.
  useEffect(() => {
    const previous = prevStatusRef.current;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      prevStatusRef.current = status;
      if (previous !== 'handoff_pending') return;
      const ctx = fallbackContext(handoffDeadlineMs ?? Date.now());
      if (status === 'approved') onHandoffResolved?.('approved', ctx);
      if (status === 'rejected' || status === 'handoff_denied') onHandoffResolved?.('denied', ctx);
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [status, handoffDeadlineMs, onHandoffResolved, fallbackContext]);

  // One interval keyed on the deadline. A handoff counts down to the deadline
  // sent in onHandoff (handoffDeadlineMs, or 24h when that prop is omitted),
  // not to timeoutSeconds. Callbacks run from the timer, not from a state updater.
  useEffect(() => {
    const active = isPending || isHandoffPending;
    if (now != null) {
      if (active && timeoutSeconds != null) setTimeRemaining(timeoutSeconds);
      return;
    }
    if (!active) return;
    const knownHandoffDeadline = isHandoffPending
      ? (handoffDeadlineMs ?? handoffContextRef.current?.deadline ?? null)
      : null;
    if (!isHandoffPending && timeoutSeconds == null) return;

    const key = isHandoffPending
      ? `handoff:${knownHandoffDeadline ?? '24h'}`
      : `sync:${timeoutSeconds}`;
    if (countdownKeyRef.current !== key) {
      countdownKeyRef.current = key;
      deadlineAtRef.current = isHandoffPending
        ? (knownHandoffDeadline ?? Date.now() + 24 * 60 * 60 * 1000)
        : Date.now() + (timeoutSeconds ?? 0) * 1000;
      expiryFiredRef.current = false;
    }
    const deadlineAt = deadlineAtRef.current;
    if (deadlineAt == null) return;

    let cancelled = false;
    const expire = () => {
      if (cancelled || expiryFiredRef.current) return;
      expiryFiredRef.current = true;
      const finish = (outcome: ReceiptOutcome, method: ReceiptMethod, after: () => void) => {
        const pending = emitReceiptRef.current(outcome, method);
        if (!pending) {
          after();
          return;
        }
        void Promise.resolve(pending).then(after, after);
      };
      if (isHandoffPending) {
        onHandoffExpired?.(fallbackContext(deadlineAt));
        const denied = approvalHandoff?.fallbackBehavior === 'deny';
        void finish(denied ? 'denied' : 'expired', 'handoff', () => {
          if (denied) onReject?.('Handoff expired (fallback: deny)');
        });
      } else {
        void finish('expired', 'click', () => {
          onTimeout?.();
        });
      }
    };

    const tick = () => {
      const left = Math.max(0, Math.ceil((deadlineAt - Date.now()) / 1000));
      setTimeRemaining(left);
      if (left <= 0) expire();
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [
    isPending,
    isHandoffPending,
    now,
    timeoutSeconds,
    handoffDeadlineMs,
    handoffInitiated,
    onTimeout,
    onHandoffExpired,
    onReject,
    approvalHandoff,
    fallbackContext,
  ]);

  // Countdown urgency level
  const countdownClass = useMemo(() => {
    if (timeRemaining == null) return '';
    if (timeRemaining <= 10) return styles.countdownUrgent;
    if (timeRemaining <= 60) return styles.countdownWarning;
    return styles.countdownNormal;
  }, [timeRemaining]);

  const emitReceipt = useCallback((outcome: ReceiptOutcome, method: ReceiptMethod): void | Promise<void> => {
    if (!onReceipt) return undefined;
    const input = {
      id: receiptId,
      instruction,
      payload: presentedPayload,
      title,
      description,
      agentReasoning,
      scope,
      justification,
      approver,
      outcome,
      method,
      presentedAtMs: presentedAt ?? shownAtRef.current,
      decidedAtMs: now ?? Date.now(),
      triggers,
      provenance: presentedPayload?.provenance,
      highStakes,
      previousReceiptHash,
      fallbackId: pendingApprovalId || 'local',
    };
    if (!appSigner && !passkey) {
      onReceipt(buildDecisionReceipt(input));
      return undefined;
    }
    return buildSignedDecisionReceipt(input, { app: appSigner, passkey }).then(onReceipt);
  }, [
    onReceipt,
    receiptId,
    instruction,
    presentedPayload,
    title,
    description,
    agentReasoning,
    scope,
    justification,
    approver,
    presentedAt,
    now,
    triggers,
    highStakes,
    previousReceiptHash,
    pendingApprovalId,
    appSigner,
    passkey,
  ]);
  emitReceiptRef.current = emitReceipt;

  const decide = useCallback(async (
    outcome: ReceiptOutcome,
    method: ReceiptMethod,
    after: () => void,
  ) => {
    if (signingRef.current) return;
    signingRef.current = true;
    setSignError(null);
    setSigning(true);
    try {
      await emitReceipt(outcome, method);
      after();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The signature could not be completed.';
      setSignError(message);
      announce(message);
    } finally {
      signingRef.current = false;
      setSigning(false);
    }
  }, [emitReceipt, announce]);

  // Handlers
  const handleApprove = useCallback(() => {
    if (mode === 'staged' && stagedStep === 'previewing') {
      setStagedStep('confirming');
      announce('Confirm to proceed with approval');
      return;
    }
    void decide('approved', 'click', () => {
      onApprove?.();
    });
  }, [mode, stagedStep, onApprove, announce, decide]);

  const handleReject = useCallback(() => {
    void decide('rejected', isHandoffPending ? 'handoff' : 'click', () => {
      onReject?.();
    });
  }, [onReject, decide, isHandoffPending]);

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
      className={`${styles.approvalGate} ax-card ax-gate ${getContainerClass(status)} ${className ?? ''}`}
      data-ax=""
      role={isPending ? 'alertdialog' : 'region'}
      aria-label={ariaLabel}
      aria-modal={isPending ? true : undefined}
      aria-busy={signing || undefined}
      data-floating={isHandoffPending ? 'true' : 'false'}
    >
      {/* Header */}
      <div className={styles.header}>
        {icon && (
          <span
            className={`${styles.statusIcon} ${getIconClass(status)}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <div className={styles.headerContent}>
          <p className={`${styles.statusLabel} ax-eyebrow`}>
            <span className={`${styles.statusDot} ${getDotClass(status)}`} aria-hidden="true" />
            {STATUS_LABELS[status]}
          </p>
          <h3 className={`${styles.title} ax-title`}>{title}</h3>
        </div>

        <div className={styles.trailing}>
          {confidence != null && (
            <span
              className={`${styles.confidenceBadge} ax-badge ${confidenceClass}`}
              aria-label={`Confidence: ${confidence}%`}
            >
              {confidence}% confidence
            </span>
          )}
          {(isPending || isHandoffPending) && timeRemaining != null && timeRemaining > 0 && (
            <span
              className={`${styles.countdown} ax-numeric ${countdownClass}`}
              aria-live="polite"
            >
              {formatTime(timeRemaining)}
            </span>
          )}
        </div>
      </div>

      {/* Staged mode indicator */}
      {mode === 'staged' && isPending && !isHandoffPending && (
        <div className={styles.stageIndicator} aria-label="Approval stages">
          <span className={`${styles.stage} ${stagedStep === 'previewing' ? styles.stageActive : styles.stageCompleted}`}>
            {stagedStep === 'confirming' ? <IconCheck /> : '1.'} Preview
          </span>
          <span className={styles.stageSeparator} aria-hidden="true" />
          <span className={`${styles.stage} ${stagedStep === 'confirming' ? styles.stageActive : ''}`}>
            2. Confirm
          </span>
          <span className={styles.stageSeparator} aria-hidden="true" />
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

        {/* Scope — Grant Details */}
        {scope && (scope.resourceLimit || scope.durationSeconds || scope.target) && (
          <div className={styles.scope}>
            <div className={styles.scopeTitle}>Grant Details</div>
            <div className={styles.scopeItems}>
              {scope.resourceLimit && (
                <span className={`${styles.scopeBadge} ax-badge`}>
                  Up to {scope.resourceLimit}
                </span>
              )}
              {scope.durationSeconds && (
                <span className={`${styles.scopeBadge} ax-badge ax-numeric`}>
                  Valid for {formatTime(scope.durationSeconds)}
                </span>
              )}
              {scope.target && (
                <span className={`${styles.scopeBadge} ax-badge`}>
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
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={handleBack}
              type="button"
              disabled={signing}
            >
              <IconArrowLeft /> Back
            </button>
          )}

          <button
            className={`${styles.btn} ${styles.btnReject}`}
            onClick={handleReject}
            type="button"
            disabled={signing}
          >
            Reject
          </button>

          <span className={styles.actionsSpacerRight} />

          <button
            className={`${styles.btn} ${styles.btnApprove}`}
            onClick={handleApprove}
            type="button"
            disabled={signing}
          >
            {mode === 'staged' && stagedStep === 'previewing'
              ? <>Preview and continue <IconArrowRight /></>
              : mode === 'staged' && stagedStep === 'confirming'
                ? <>Confirm and execute <IconCheck /></>
                : 'Approve'}
            </button>
          {signing && <p className={styles.signWait} role="status">Waiting for a signature</p>}
          {signError && <p className={styles.signError} role="alert">{signError}</p>}
        </div>
      )}

      {/* Handoff Non-Blocking UI */}
      {isHandoffPending && (
        <div className={styles.actions}>
          <div className={styles.handoffMessage}>
            Request sent to mobile device
          </div>
          <span className={styles.actionsSpacerRight} />
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={handleReject}
            type="button"
            title="Cancel request"
            disabled={signing}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Resolved state banner */}
      {isResolved && (
        <div
          className={`ax-resolution ${styles.resolvedBanner} ${
            status === 'approved'
              ? styles.resolvedApproved
              : (status === 'rejected' || status === 'handoff_denied')
                ? styles.resolvedRejected
                : styles.resolvedExpired
          }`}
        >
          {(icon || STATUS_ICONS[status]) && <span>{icon || STATUS_ICONS[status]}</span>} {STATUS_LABELS[status]}
        </div>
      )}

      <VisuallyHidden>
        <AnnouncerRegion />
      </VisuallyHidden>
    </div>
  );
}
