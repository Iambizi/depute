/**
 * BindingApproval — Cryptographic Intent Gate.
 *
 * A high-stakes approval gate that implements the `isSigning`
 * state for legally binding or irreversible actions. Unlike the
 * v0 ApprovalGate which handles day-to-day approvals, BindingApproval
 * requires explicit term acknowledgment and provides visual gravity
 * proportional to the action's severity.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 4)
 * @see https://github.com/Iambizi/depute/issues/3 (RFC: isSigning)
 */

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import type {
  BindingApprovalProps,
  BindingStatus,
  BindingTerm,
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
};

const STATUS_CLASSES: Record<BindingStatus, string> = {
  reviewing: styles.statusReviewing,
  signing: styles.statusSigning,
  signed: styles.statusSigned,
  rejected: styles.statusRejected,
  expired: styles.statusExpired,
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
  className,
}: BindingApprovalProps) {
  const [checkedTerms, setCheckedTerms] = useState<Set<string>>(
    () => new Set(terms.filter((t) => t.acknowledged).map((t) => t.id)),
  );
  const [timeRemaining, setTimeRemaining] = useState(timeoutSeconds ?? 0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine effective status — isSigning overrides to 'signing'
  const effectiveStatus = isSigning ? 'signing' : status;

  // All terms acknowledged check
  const allTermsAcknowledged = useMemo(() => {
    if (terms.length === 0) return true;
    return terms.every((t) => checkedTerms.has(t.id));
  }, [terms, checkedTerms]);

  const canSign =
    effectiveStatus === 'reviewing' &&
    (!requireAllTerms || allTermsAcknowledged);

  // Timeout timer
  useEffect(() => {
    if (!timeoutSeconds || effectiveStatus !== 'reviewing') return;

    setTimeRemaining(timeoutSeconds);
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeoutSeconds, effectiveStatus, onTimeout]);

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
        {timeoutSeconds != null && effectiveStatus === 'reviewing' && (
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
      {terms.length > 0 && !isTerminal && (
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

      {/* Signer identity */}
      {signerIdentity && (
        <div className={styles.signerRow}>
          <span className={styles.signerLabel}>Signing as</span>
          <span className={styles.signerValue}>{signerIdentity}</span>
        </div>
      )}

      {/* Actions */}
      {!isTerminal && (
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

      <VisuallyHidden>{ariaLabel}</VisuallyHidden>
    </div>
  );
}
