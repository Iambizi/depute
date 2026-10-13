/**
 * BindingApproval — High-stakes intent gate.
 *
 * A high-stakes approval gate that implements the `isSigning`
 * state for irreversible actions. Unlike ApprovalGate, BindingApproval
 * requires explicit term acknowledgment. A signature or hash shown here
 * is supplied by the caller's backend. This component does not sign.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 4)
 * @see https://github.com/Iambizi/depute/issues/3 (RFC: isSigning)
 */

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import type { HandoffContext } from '../ApprovalGate/ApprovalGate.types';
import type {
  BindingApprovalProps,
  BindingStatus,
} from './BindingApproval.types';
import styles from './BindingApproval.module.css';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const STATUS_LABELS: Record<BindingStatus, string> = {
  reviewing: 'Under Review',
  signing: 'Signing…',
  signed: 'Signed',
  rejected: 'Rejected',
  expired: 'Expired',
  handoff_pending: 'Awaiting Remote Signature...',
  handoff_expired: 'Handoff Expired',
  handoff_denied: 'Remote Signature Denied',
};

const STATUS_CLASSES: Record<BindingStatus, string> = {
  reviewing: styles.statusReviewing,
  signing: styles.statusSigning,
  signed: styles.statusSigned,
  rejected: styles.statusRejected,
  expired: styles.statusExpired,
  handoff_pending: `${styles.statusReviewing} ${styles.handoffPending}`,
  handoff_expired: styles.statusExpired,
  handoff_denied: styles.statusRejected,
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function BindingApproval({
  title,
  description,
  status = 'reviewing',
  terms = [],
  requireAllTerms = true,
  isSigning = false,
  signerIdentity,
  impactStatement,
  timeoutSeconds,
  onSign,
  onReject,
  onTimeout,
  approvalHandoff,
  onHandoff,
  onHandoffResolved,
  onHandoffExpired,
  pendingApprovalId,
  handoffDeadlineMs,
  signature,
  hash,
  onVerify,
  className,
}: BindingApprovalProps) {
  const [checkedTerms, setCheckedTerms] = useState<Set<string>>(
    () => new Set(terms.filter((t) => t.acknowledged).map((t) => t.id)),
  );
  const [timeRemaining, setTimeRemaining] = useState<number | null>(timeoutSeconds ?? null);

  // Determine effective status — isSigning overrides to 'signing'
  const effectiveStatus = isSigning ? 'signing' : status;
  const isHandoffPending = effectiveStatus === 'handoff_pending';

  const [handoffInitiated, setHandoffInitiated] = useState(false);
  const handoffContextRef = useRef<HandoffContext | null>(null);
  const prevStatusRef = useRef(effectiveStatus);
  const countdownKeyRef = useRef('');
  const deadlineAtRef = useRef<number | null>(null);
  const expiryFiredRef = useRef(false);

  const fallbackContext = useCallback((deadline: number): HandoffContext => {
    return handoffContextRef.current ?? {
      approvalId: pendingApprovalId || 'unknown',
      action: title,
      deadline,
      timestamp: Date.now(),
    };
  }, [pendingApprovalId, title]);

  useEffect(() => {
    if (effectiveStatus !== 'reviewing' || !approvalHandoff || handoffInitiated) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      const deadline = handoffDeadlineMs ?? Date.now() + 24 * 60 * 60 * 1000;
      const ctx: HandoffContext = {
        approvalId: pendingApprovalId || crypto.randomUUID(),
        action: title,
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
  }, [effectiveStatus, approvalHandoff, handoffInitiated, handoffDeadlineMs, pendingApprovalId, title, onHandoff]);

  useEffect(() => {
    const previous = prevStatusRef.current;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      prevStatusRef.current = effectiveStatus;
      if (previous !== 'handoff_pending') return;
      const ctx = fallbackContext(handoffDeadlineMs ?? Date.now());
      if (effectiveStatus === 'signed') onHandoffResolved?.('approved', ctx);
      if (effectiveStatus === 'rejected' || effectiveStatus === 'handoff_denied') {
        onHandoffResolved?.('denied', ctx);
      }
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [effectiveStatus, handoffDeadlineMs, onHandoffResolved, fallbackContext]);

  // All terms acknowledged check
  const allTermsAcknowledged = useMemo(() => {
    if (terms.length === 0) return true;
    return terms.every((t) => checkedTerms.has(t.id));
  }, [terms, checkedTerms]);

  const canSign =
    effectiveStatus === 'reviewing' &&
    (!requireAllTerms || allTermsAcknowledged);

  const clockActive = effectiveStatus === 'reviewing' || isHandoffPending;
  useEffect(() => {
    const seconds = isHandoffPending && handoffDeadlineMs != null
      ? Math.max(0, Math.floor((handoffDeadlineMs - Date.now()) / 1000))
      : timeoutSeconds;
    if (!clockActive || seconds == null) return;

    const key = `${isHandoffPending ? 'handoff' : 'sync'}:${handoffDeadlineMs ?? ''}:${timeoutSeconds ?? ''}`;
    if (countdownKeyRef.current !== key) {
      countdownKeyRef.current = key;
      deadlineAtRef.current = isHandoffPending && handoffDeadlineMs != null
        ? handoffDeadlineMs
        : Date.now() + seconds * 1000;
      expiryFiredRef.current = false;
    }
    const deadlineAt = deadlineAtRef.current;
    if (deadlineAt == null) return;

    let cancelled = false;
    const expire = () => {
      if (cancelled || expiryFiredRef.current) return;
      expiryFiredRef.current = true;
      if (isHandoffPending) {
        onHandoffExpired?.(fallbackContext(deadlineAt));
        if (approvalHandoff?.fallbackBehavior === 'deny') {
          onReject?.('Handoff expired (fallback: deny)');
        }
      } else {
        onTimeout?.();
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
    clockActive,
    isHandoffPending,
    timeoutSeconds,
    handoffDeadlineMs,
    onTimeout,
    onHandoffExpired,
    onReject,
    approvalHandoff,
    fallbackContext,
  ]);

  const handleTermToggle = useCallback((termId: string) => {
    setCheckedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(termId)) {
        next.delete(termId);
      } else {
        next.add(termId);
      }
      return next;
    });
  }, []);

  const ariaLabel = useMemo(
    () =>
      `Binding approval: ${title}. Status: ${STATUS_LABELS[effectiveStatus]}.`,
    [title, effectiveStatus],
  );

  const isTerminal = effectiveStatus === 'signed' || effectiveStatus === 'rejected' || effectiveStatus === 'expired';

  return (
    <div
      className={`${styles.bindingApproval} ${STATUS_CLASSES[effectiveStatus]} ${className ?? ''}`}
      role="alertdialog"
      aria-label={ariaLabel}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={`${styles.statusIcon} ${STATUS_CLASSES[effectiveStatus]}`} aria-hidden="true">
            {effectiveStatus === 'signing' ? '🔐' : effectiveStatus === 'signed' ? '✓' : effectiveStatus === 'rejected' ? '✕' : '⚠'}
          </span>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <span className={`${styles.statusBadge} ${STATUS_CLASSES[effectiveStatus]}`}>
              {STATUS_LABELS[effectiveStatus]}
            </span>
          </div>
        </div>
        {(timeoutSeconds != null || isHandoffPending) && (effectiveStatus === 'reviewing' || isHandoffPending) && timeRemaining != null && timeRemaining > 0 && (
          <span className={styles.timer}>
            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Impact statement */}
      {impactStatement && (
        <div className={styles.impactBox} role="alert">
          <span className={styles.impactLabel}>Impact</span>
          <span className={styles.impactText}>{impactStatement}</span>
        </div>
      )}

      {/* Terms */}
      {terms.length > 0 && !isTerminal && !isHandoffPending && (
        <div className={styles.termsSection}>
          <span className={styles.termsLabel}>
            Terms ({checkedTerms.size}/{terms.length} acknowledged)
          </span>
          <div className={styles.termsList} role="group" aria-label="Binding terms">
            {terms.map((term) => (
              <label key={term.id} className={styles.termRow}>
                <input
                  type="checkbox"
                  checked={checkedTerms.has(term.id)}
                  onChange={() => handleTermToggle(term.id)}
                  className={styles.termCheckbox}
                  aria-label={`Acknowledge: ${term.text}`}
                />
                <span className={styles.termText}>{term.text}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Handoff Message */}
      {isHandoffPending && (
        <div className={styles.handoffSection}>
          <div className={styles.handoffMessage}>
             Remote Signature Request Dispatched
          </div>
          <span className={styles.handoffSubtext}>
             The signature request was sent to the authorized device. This screen displays that request. It does not create the signature.
          </span>
        </div>
      )}

      {(signature || hash) && (
        <div className={styles.proofRow}>
          {signature && (
            <div className={styles.signerRow}>
              <span className={styles.signerLabel}>Signature</span>
              <span className={styles.signerValue}>{signature}</span>
            </div>
          )}
          {hash && (
            <div className={styles.signerRow}>
              <span className={styles.signerLabel}>Hash</span>
              <span className={styles.signerValue}>{hash}</span>
            </div>
          )}
          {onVerify && (
            <button
              type="button"
              className={styles.verifyBtn}
              onClick={() => onVerify({ signature, hash })}
            >
              Verify proof
            </button>
          )}
        </div>
      )}

      {/* Signer identity */}
      {signerIdentity && (
        <div className={styles.signerRow}>
          <span className={styles.signerLabel}>Signing as</span>
          <span className={styles.signerValue}>{signerIdentity}</span>
        </div>
      )}

      {/* Actions */}
      {!isTerminal && !isHandoffPending && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.signBtn}
            onClick={onSign}
            disabled={!canSign}
            aria-label="Sign and approve"
          >
            {effectiveStatus === 'signing' ? 'Signing…' : 'Sign & Approve'}
          </button>
          <button
            type="button"
            className={styles.rejectBtn}
            onClick={() => onReject?.()}
            disabled={effectiveStatus === 'signing'}
            aria-label="Reject"
          >
            Reject
          </button>
        </div>
      )}
      {isHandoffPending && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.rejectBtn}
            onClick={() => onReject?.()}
            aria-label="Cancel signature request"
            style={{ marginLeft: 'auto' }}
          >
            Cancel Request
          </button>
        </div>
      )}

      <VisuallyHidden>{ariaLabel}</VisuallyHidden>
    </div>
  );
}
