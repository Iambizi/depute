import styles from './DecisionRecord.module.css';

/**
 * Program fields are caller-supplied. This component displays them.
 * It does not hash the program or decide that the dispatch was allowed.
 * A visible receipt does not make the action safe.
 */
export interface ProgramReceiptDisplay {
  text?: string;
  hash?: string;
  bindings?: string[];
  declaredEffects?: { kind: 'read' | 'write' | 'move'; target?: string; detail?: string }[];
  logs?: string[];
  dispatches?: { binding: string; detail?: string }[];
}

export interface DecisionRecordProps {
  /** The final human decision */
  decision: 'approved' | 'rejected' | 'modified';
  /** The human who made the decision */
  approver: {
    name: string;
    role?: string;
    timestamp: Date | string;
  };
  /** The agent context at the time of the decision */
  agentContext: {
    intent: string;
    policyInvoked?: string;
  };
  /** Optional human reasoning for the decision */
  humanReasoning?: string;
  /**
   * Program receipt. When set, the dispatched-effects list is always shown.
   * Logs alone are not the record of what ran.
   */
  program?: ProgramReceiptDisplay;
  /** Optional CSS class name */
  className?: string;
}

export function DecisionRecord({
  decision,
  approver,
  agentContext,
  humanReasoning,
  program,
  className = '',
}: DecisionRecordProps) {
  const formattedDate =
    typeof approver.timestamp === 'string'
      ? new Date(approver.timestamp).toLocaleString()
      : approver.timestamp.toLocaleString();

  return (
    <div className={`${styles.container} ax-card ${className}`} data-ax="" data-testid="ax-decision-record">
      <div className={styles.header}>
        <div className={styles.title}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          Decision Record
        </div>
        <div className={`${styles.badge} ${styles[decision]}`}>
          {decision}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <span className={styles.label}>Approver</span>
            <span className={styles.value}>
              {approver.name} {approver.role && <span style={{ color: 'var(--ax-text-tertiary)' }}>({approver.role})</span>}
            </span>
          </div>
          <div className={styles.section}>
            <span className={styles.label}>Timestamp</span>
            <span className={styles.valueMono} suppressHydrationWarning>{formattedDate}</span>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>Agent Intent</span>
          <span className={styles.value}>{agentContext.intent}</span>
        </div>

        {agentContext.policyInvoked && (
          <div className={styles.section}>
            <span className={styles.label}>Policy Invoked</span>
            <span className={styles.valueMono}>{agentContext.policyInvoked}</span>
          </div>
        )}

        {humanReasoning && (
          <div className={styles.section}>
            <span className={styles.label}>Stated Reasoning</span>
            <div className={styles.reasoning}>{humanReasoning}</div>
          </div>
        )}

        {program && (
          <div className={styles.section} data-testid="ax-program-receipt">
            <span className={styles.label}>Program</span>
            {program.hash && <span className={styles.valueMono}>{program.hash}</span>}
            {program.text && <pre className={styles.programText}>{program.text}</pre>}
            {program.bindings && program.bindings.length > 0 && (
              <span className={styles.value}>Bindings: {program.bindings.join(', ')}</span>
            )}
            {program.declaredEffects && program.declaredEffects.length > 0 && (
              <span className={styles.value}>
                Declared: {program.declaredEffects
                  .map((effect) => effect.target ? `${effect.kind} ${effect.target}` : effect.kind)
                  .join(', ')}
              </span>
            )}
            <span className={styles.label}>Dispatched effects</span>
            {program.dispatches && program.dispatches.length > 0 ? (
              <ul className={styles.list}>
                {program.dispatches.map((dispatch, index) => (
                  <li key={`${dispatch.binding}-${index}`}>
                    {dispatch.detail ? `${dispatch.binding} — ${dispatch.detail}` : dispatch.binding}
                  </li>
                ))}
              </ul>
            ) : (
              <span className={styles.value}>None recorded</span>
            )}
            {program.logs && program.logs.length > 0 && (
              <>
                <span className={styles.label}>Logs</span>
                <ul className={styles.list}>
                  {program.logs.map((line, index) => (
                    <li key={`${index}-${line}`}>{line}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
