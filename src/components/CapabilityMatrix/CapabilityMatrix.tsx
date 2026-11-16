/**
 * CapabilityMatrix — Permission inspector / Agent Handshake.
 *
 * A matrix or permission inspector showing what an agent can and
 * cannot do in a given context. Makes tool contracts visible to
 * the human supervisor.
 *
 * v2 — Strict Compliance & Forensics
 * @see docs/internal/research/catalog-versions/CATALOG-v2.md (Primitive 3)
 */

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { IconCheck, IconCircle, IconDot, IconX } from '../../utils/icons';
import { VisuallyHidden } from '../../utils/a11y';
import { buildRevokeReceipt, isReceiptHash, type ApprovalReceipt, type RevokeMethod } from '../../utils/receipt';
import { downloadApprovalReceipt } from '../../utils/receiptDownload';
import type {
  CapabilityMatrixProps,
  Capability,
  LiveGrant,
  PermissionLevel,
  RevokeHostResult,
} from './CapabilityMatrix.types';
import styles from './CapabilityMatrix.module.css';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const PERMISSION_LABELS: Record<PermissionLevel, string> = {
  full: 'Full Access',
  read: 'Read Only',
  write: 'Write Only',
  none: 'Denied',
  conditional: 'Conditional',
};

const PERMISSION_SYMBOLS: Record<PermissionLevel, ReactNode> = {
  full: <IconCheck />,
  read: <IconCircle />,
  write: <IconDot />,
  none: <IconX />,
  conditional: <IconCircle />,
};

const PERMISSION_CLASSES: Record<PermissionLevel, string> = {
  full: styles.permFull,
  read: styles.permRead,
  write: styles.permWrite,
  none: styles.permNone,
  conditional: styles.permConditional,
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function groupCapabilities(
  capabilities: Capability[],
): Map<string, Capability[]> {
  const groups = new Map<string, Capability[]>();
  for (const cap of capabilities) {
    const category = cap.category ?? 'General';
    const existing = groups.get(category) ?? [];
    existing.push(cap);
    groups.set(category, existing);
  }
  return groups;
}

/* ------------------------------------------------------------------ */
/* Sub-component                                                       */
/* ------------------------------------------------------------------ */

type GrantPhase = 'live' | 'requested' | 'confirmed' | 'unknown';

function GrantRow({
  grant,
  onRevoke,
  onReceipt,
  revokeTimeoutMs,
  method,
  register,
}: {
  grant: LiveGrant;
  onRevoke?: (grant: LiveGrant) => void | Promise<RevokeHostResult | void>;
  onReceipt?: (receipt: ApprovalReceipt) => void;
  revokeTimeoutMs?: number;
  method: RevokeMethod;
  register: (id: string, run: () => void) => () => void;
}) {
  const [phase, setPhase] = useState<GrantPhase>('live');
  const [receipt, setReceipt] = useState<ApprovalReceipt | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const run = useCallback(async () => {
    if (!onRevoke) return;
    if (phaseRef.current === 'requested' || phaseRef.current === 'confirmed') return;
    phaseRef.current = 'requested';
    setPhase('requested');
    const requestedAtMs = Date.now();
    let settled = false;
    const finish = (state: 'requested' | 'confirmed' | 'unknown', confirmedAtMs?: number, reported?: RevokeMethod) => {
      if (settled) return;
      settled = true;
      phaseRef.current = state;
      setPhase(state);
      const next = buildRevokeReceipt({
        grantId: grant.id,
        scope: grant.scope,
        counterparty: grant.counterparty?.trim() || 'unknown',
        method: reported ?? method,
        state,
        requestedAtMs,
        confirmedAtMs,
        previousReceiptHash: grant.approvalReceiptHash && isReceiptHash(grant.approvalReceiptHash)
          ? grant.approvalReceiptHash
          : undefined,
      });
      setReceipt(next);
      onReceipt?.(next);
    };
    let timer: number | undefined;
    try {
      const pending = Promise.resolve(onRevoke(grant));
      const result = await new Promise<
        | { kind: 'result'; value: RevokeHostResult | void }
        | { kind: 'timeout' }
        | { kind: 'error' }
      >((resolve) => {
        if (revokeTimeoutMs !== undefined) {
          timer = window.setTimeout(() => resolve({ kind: 'timeout' }), revokeTimeoutMs);
        }
        pending.then(
          (value) => {
            if (timer !== undefined) window.clearTimeout(timer);
            resolve({ kind: 'result', value });
          },
          () => {
            if (timer !== undefined) window.clearTimeout(timer);
            resolve({ kind: 'error' });
          },
        );
      });
      if (result.kind === 'timeout' || result.kind === 'error') {
        finish('unknown');
        return;
      }
      if (result.value?.state === 'confirmed') {
        finish('confirmed', Date.now(), result.value.method);
        return;
      }
      if (result.value?.state === 'unknown') {
        finish('unknown', undefined, result.value.method);
        return;
      }
      finish('requested');
    } catch {
      if (timer !== undefined) window.clearTimeout(timer);
      finish('unknown');
    }
  }, [grant, method, onReceipt, onRevoke, revokeTimeoutMs]);

  useEffect(() => register(grant.id, () => { void run(); }), [grant.id, register, run]);

  const status = phase === 'requested'
    ? 'Revoke requested'
    : phase === 'confirmed'
      ? 'Revoked (confirmed by host)'
      : phase === 'unknown'
        ? 'Unknown'
        : null;

  return (
    <li className={styles.grant}>
      <p className={styles.grantTitle}>{grant.agentId}{grant.onBehalfOf ? ` for ${grant.onBehalfOf}` : ''}</p>
      <p>{grant.scope}{grant.limit ? ` · ${grant.limit}` : ''}</p>
      {grant.counterparty && <p>Counterparty {grant.counterparty}</p>}
      <p>{grant.expiresAt ? `Expires ${grant.expiresAt}` : 'No expiry'}</p>
      {grant.lastUsedAt && <p>Last used {grant.lastUsedAt}</p>}
      {status && <p role="status">{status}</p>}
      {phase === 'unknown' && (
        <p>The host did not confirm this revoke. Declared.</p>
      )}
      {onRevoke && phase !== 'confirmed' && phase !== 'requested' && (
        <button type="button" className={styles.revoke} onClick={() => { void run(); }}>
          {phase === 'unknown' ? 'Retry' : 'Revoke'}
        </button>
      )}
      {receipt && (
        <button type="button" className={styles.revoke} onClick={() => downloadApprovalReceipt(receipt)}>
          Export JSON
        </button>
      )}
    </li>
  );
}

function CapabilityRow({
  capability,
  highlightDenied,
  onClick,
}: {
  capability: Capability;
  highlightDenied: boolean;
  onClick?: (cap: Capability) => void;
}) {
  const isDenied = capability.permission === 'none';
  const rowClass = `${styles.row} ${isDenied && highlightDenied ? styles.rowDenied : ''}`;

  return (
    <div
      className={rowClass}
      role="row"
      onClick={onClick ? () => onClick(capability) : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(capability); } } : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <span className={`${styles.permBadge} ${PERMISSION_CLASSES[capability.permission]}`} role="cell">
        <span aria-hidden="true">{PERMISSION_SYMBOLS[capability.permission]}</span>
        <VisuallyHidden>{PERMISSION_LABELS[capability.permission]}</VisuallyHidden>
      </span>
      <span className={styles.capName} role="cell">{capability.name}</span>
      {capability.description && (
        <span className={styles.capDesc} role="cell">{capability.description}</span>
      )}
      {capability.permission === 'conditional' && capability.condition && (
        <span className={styles.capCondition} role="cell">if {capability.condition}</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export function CapabilityMatrix({
  title,
  description,
  capabilities,
  agentId,
  groupByCategory = true,
  highlightDenied = true,
  onCapabilityClick,
  grants,
  onRevoke,
  revokeMethod = 'other',
  revokeTimeoutMs,
  onReceipt,
  className,
}: CapabilityMatrixProps) {
  const grouped = useMemo(
    () => (groupByCategory ? groupCapabilities(capabilities) : null),
    [capabilities, groupByCategory],
  );

  const summary = useMemo(() => {
    const allowed = capabilities.filter((c) => c.permission !== 'none').length;
    const denied = capabilities.filter((c) => c.permission === 'none').length;
    return { allowed, denied, total: capabilities.length };
  }, [capabilities]);

  const runners = useRef(new Map<string, () => void>());
  const register = useCallback((id: string, run: () => void): (() => void) => {
    runners.current.set(id, run);
    return () => {
      if (runners.current.get(id) === run) runners.current.delete(id);
    };
  }, []);

  const ariaLabel = useMemo(
    () =>
      `${title}: ${summary.allowed} allowed, ${summary.denied} denied out of ${summary.total} capabilities`,
    [title, summary],
  );

  return (
    <div
      className={`${styles.capabilityMatrix} ax-card ${className ?? ''}`}
      data-ax=""
      role="region"
      aria-label={ariaLabel}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>{title}</h3>
          {agentId && (
            <span className={styles.agentId}>{agentId}</span>
          )}
        </div>
        <div className={styles.summaryBadges}>
          <span className={`${styles.summaryBadge} ax-badge ax-badge-success ax-numeric`}>
            {summary.allowed} allowed
          </span>
          <span className={`${styles.summaryBadge} ax-badge ax-badge-danger ax-numeric`}>
            {summary.denied} denied
          </span>
        </div>
      </div>

      {description && (
        <p className={styles.description}>{description}</p>
      )}

      {grants && grants.length > 0 && (
        <div className={styles.grantBlock}>
          {onRevoke && (
            <p className={styles.grantNote}>
              Declared by the host. A confirmed row is the host's report, not the counterparty's acceptance.
            </p>
          )}
          {onRevoke && grants.length > 1 && (
            <div className={styles.grantActions}>
              <button
                type="button"
                className={styles.revoke}
                onClick={() => {
                  runners.current.forEach((run) => run());
                }}
              >
                Revoke all
              </button>
            </div>
          )}
          <ul className={styles.grants} aria-label="Live grants">
            {grants.map((grant) => (
              <GrantRow
                key={grant.id}
                grant={grant}
                onRevoke={onRevoke}
                onReceipt={onReceipt}
                revokeTimeoutMs={revokeTimeoutMs}
                method={revokeMethod}
                register={register}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Matrix body */}
      <div className={styles.body} role="table" aria-label="Capability permissions">
        {grouped ? (
          Array.from(grouped.entries()).map(([category, caps]) => (
            <div key={category} className={styles.group} role="rowgroup">
              <div className={styles.groupLabel} role="row">
                <span role="columnheader">{category}</span>
              </div>
              {caps.map((cap) => (
                <CapabilityRow
                  key={cap.name}
                  capability={cap}
                  highlightDenied={highlightDenied}
                  onClick={onCapabilityClick}
                />
              ))}
            </div>
          ))
        ) : (
          capabilities.map((cap) => (
            <CapabilityRow
              key={cap.name}
              capability={cap}
              highlightDenied={highlightDenied}
              onClick={onCapabilityClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
