import React from 'react';
import styles from './HandoffProtocol.module.css';
import type { HandoffProtocolProps } from './HandoffProtocol.types';

/**
 * HandoffProtocol is a "comprehension UI" — not a gate, but a structured viewer
 * for understanding context being transferred between agents or to a human.
 * The human reads, understands, and optionally intercepts if something seems wrong.
 */
export const HandoffProtocol: React.FC<HandoffProtocolProps> = ({
  className,
  sourceAgent,
  destinationAgent,
  goal,
  summary,
  payload = [],
  nextRequest,
  canIntercept = true,
  onAccept,
  onIntercept,
  onCancel,
}) => {
  return (
    <div
      className={`${styles.base} ${className || ''}`}
      role="dialog"
      aria-modal="false"
      aria-label={`Handoff from ${sourceAgent} to ${destinationAgent}`}
    >
      {/* Context packet header */}
      <div className={styles.header}>
        <div className={styles.route}>
          <span className={styles.agent}>{sourceAgent}</span>
          <span className={styles.arrow} aria-hidden="true">→</span>
          <span className={styles.agent}>{destinationAgent}</span>
        </div>
        <span className={styles.badge}>Context Packet</span>
      </div>

      {/* Goal */}
      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>Goal</h4>
        <p className={styles.goalText}>{goal}</p>
      </section>

      {/* What changed / summary */}
      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>What happened</h4>
        <p className={styles.summaryText}>{summary}</p>
      </section>

      {/* Structured payload */}
      {payload.length > 0 && (
        <section className={styles.section}>
          <h4 className={styles.sectionTitle}>Context Payload</h4>
          <dl className={styles.payloadList}>
            {payload.map((item, i) => (
              <div key={i} className={styles.payloadRow}>
                <dt className={styles.payloadLabel}>{item.label}</dt>
                <dd className={styles.payloadValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Next request */}
      {nextRequest && (
        <section className={styles.section}>
          <h4 className={styles.sectionTitle}>What I need from you</h4>
          <p className={styles.nextRequestText}>{nextRequest}</p>
        </section>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {onAccept && (
          <button className={styles.btnAccept} onClick={onAccept}>
            Accept Handoff
          </button>
        )}
        {canIntercept && onIntercept && (
          <button className={styles.btnIntercept} onClick={onIntercept}>
            Intercept &amp; Override
          </button>
        )}
        {onCancel && (
          <button className={styles.btnCancel} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
