import React from 'react';
import styles from './SharedContextLedger.module.css';

export interface ContextLedgerEntry {
  id: string;
  scope: 'global' | 'branch' | 'agent-local';
  type: 'fact' | 'decision' | 'constraint' | 'artifact';
  key: string;
  value: string;
  provenance: {
    authorAgent: string;
    source?: string;
    timestamp: string;
  };
  conflict?: boolean;
}

export interface SharedContextLedgerProps {
  /** The root layout class name */
  className?: string;
  entries?: ContextLedgerEntry[];
  currentScope?: 'global' | 'branch' | 'agent-local';
  onFilterContext?: (scope: 'global' | 'branch' | 'agent-local') => void;
}

/**
 * SharedContextLedger is the read-only control surface for shared memory and data synchronization across the swarm.
 */
export const SharedContextLedger: React.FC<SharedContextLedgerProps> = ({
  className,
  entries = [],
  currentScope = 'global',
  onFilterContext,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <h3>Shared Context Ledger</h3>
        <div className={styles.scopeTabs}>
          <button 
            className={`${styles.tab} ${currentScope === 'global' ? styles.active : ''}`}
            onClick={() => onFilterContext?.('global')}
          >
            Global
          </button>
          <button 
            className={`${styles.tab} ${currentScope === 'branch' ? styles.active : ''}`}
            onClick={() => onFilterContext?.('branch')}
          >
            Branch
          </button>
          <button 
            className={`${styles.tab} ${currentScope === 'agent-local' ? styles.active : ''}`}
            onClick={() => onFilterContext?.('agent-local')}
          >
            Local
          </button>
        </div>
      </div>
      
      <div className={styles.list}>
        {entries.length === 0 ? (
          <div className={styles.empty}>No context entries found in this scope.</div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className={`${styles.entry} ${entry.conflict ? styles.conflict : ''}`}>
              <div className={styles.entryHeader}>
                <div className={styles.keyWrapper}>
                  <span className={`${styles.typeTag} ${styles[entry.type]}`}>{entry.type}</span>
                  <span className={styles.key}>{entry.key}</span>
                </div>
                {entry.conflict && <span className={styles.conflictBadge}>Conflict Detected</span>}
              </div>
              
              <div className={styles.valueBox}>
                <code>{entry.value}</code>
              </div>
              
              <div className={styles.provenance}>
                <span className={styles.provLabel}>Provenance:</span>
                <span className={styles.author}>{entry.provenance.authorAgent}</span>
                {entry.provenance.source && (
                  <>
                    <span className={styles.divider}>→</span>
                    <span className={styles.source}>{entry.provenance.source}</span>
                  </>
                )}
                <span className={styles.timestamp}>{entry.provenance.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
