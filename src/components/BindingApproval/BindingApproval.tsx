/**
 * BindingApproval — High-stakes intent gate.
 *
 * A high-stakes approval gate that implements the `isSigning`
 * state for irreversible actions. Unlike ApprovalGate, BindingApproval
 * requires explicit term acknowledgment. A signature or hash shown here
 * is supplied by the caller's backend. An approval receipt is signed only
 * when the host passes a signer.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 4)
 * @see https://github.com/Iambizi/depute/issues/3 (RFC: isSigning)
 */

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { VisuallyHidden } from '../../utils/a11y';
import { IconAlert, IconCheck, IconLock, IconX } from '../../utils/icons';
import type { HandoffContext } from '../../types/core';
import { buildDecisionReceipt, buildSignedDecisionReceipt } from '../../utils/receipt';
import type { ReceiptMethod, ReceiptOutcome } from '../../utils/receipt';
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
}: BindingApprovalProps) {
  const [checkedTerms, setCheckedTerms] = useState<Set<string>>(
    () => new Set(terms.filter((t) => t.acknowledged).map((t) => t.id)),
  );
  const [timeRemaining, setTimeRemaining] = useState<number | null>(timeoutSeconds ?? null);

  // Determine effective status — isSigning overrides to 'signing'
  const effectiveStatus = isSigning ? 'signing' : status;
  const isHandoffPending = effectiveStatus === 'handoff_pending';

  const shownAtRef = useRef(presentedAt ?? Date.now());
  const emitReceiptRef = useRef<(outcome: ReceiptOutcome, method: ReceiptMethod) => void | Promise<void>>(() => {});
  const [signingReceipt, setSigningReceipt] = useState(false);
  const signingRef = useRef(false);
  const [signError, setSignError] = useState<string | null>(null);
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
    if (!clockActive) return;
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
    clockActive,
    isHandoffPending,
    timeoutSeconds,
    handoffDeadlineMs,
    handoffInitiated,
    onTimeout,
    onHandoffExpired,
    onReject,
    approvalHandoff,
    fallbackContext,
  ]);

  const emitReceipt = useCallback((outcome: ReceiptOutcome, method: ReceiptMethod): void | Promise<void> => {
    if (!onReceipt) return undefined;
    const input = {
      id: receiptId,
      instruction,
      payload: presentedPayload,
      title,
      description,
      justification,
      approver,
      outcome,
      method,
      presentedAtMs: presentedAt ?? shownAtRef.current,
      decidedAtMs: Date.now(),
      acknowledgedTermIds: [...checkedTerms],
      triggers,
      provenance: presentedPayload?.provenance,
      highStakes,
      previousReceiptHash,
      fallbackId: pendingApprovalId || signerIdentity || 'local',
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
    justification,
    approver,
    presentedAt,
    checkedTerms,
    triggers,
    highStakes,
    previousReceiptHash,
    pendingApprovalId,
    signerIdentity,
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
    setSigningReceipt(true);
    try {
      await emitReceipt(outcome, method);
      after();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The signature could not be completed.';
      setSignError(message);
    } finally {
      signingRef.current = false;
      setSigningReceipt(false);
    }
  }, [emitReceipt]);

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
      className={`${styles.bindingApproval} ax-card ax-gate ${STATUS_CLASSES[effectiveStatus]} ${className ?? ''}`}
      data-ax=""
      role="alertdialog"
      aria-label={ariaLabel}
      aria-busy={signingReceipt || undefined}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={`${styles.statusIcon} ${STATUS_CLASSES[effectiveStatus]}`} aria-hidden="true">
            {effectiveStatus === 'signing' ? <IconLock /> : effectiveStatus === 'signed' ? <IconCheck /> : effectiveStatus === 'rejected' ? <IconX /> : <IconAlert />}
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
            className={`${styles.signBtn} ax-btn ax-btn-primary ax-btn-lg`}
            onClick={() => {
              void decide('approved', 'click', () => {
                onSign?.();
              });
            }}
            disabled={!canSign || signingReceipt}
            aria-label="Sign and approve"
          >
            {effectiveStatus === 'signing' || signingReceipt ? 'Signing…' : 'Sign and approve'}
            {effectiveStatus !== 'signing' && !signingReceipt && <IconCheck />}
          </button>
          <button
            type="button"
            className={styles.rejectBtn}
            onClick={() => {
              void decide('rejected', 'click', () => {
                onReject?.();
              });
            }}
            disabled={effectiveStatus === 'signing' || signingReceipt}
            aria-label="Reject"
          >
            Reject
          </button>
          {signingReceipt && <p className={styles.signWait} role="status">Waiting for a signature</p>}
          {signError && <p className={styles.signError} role="alert">{signError}</p>}
        </div>
      )}
      {isHandoffPending && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.rejectBtn}
                onClick={() => {
                  void decide('rejected', 'handoff', () => {
                    onReject?.();
                  });
                }}
                disabled={signingReceipt}
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
