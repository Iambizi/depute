import React from 'react';
import styles from './AgentRoster.module.css';
import type { AgentRosterProps } from './AgentRoster.types';

/**
 * AgentRoster provides a dense, table-based resource management view of concurrent workers.
 */
export const AgentRoster: React.FC<AgentRosterProps> = ({
  className,
  agents = [],
  onAgentSelect,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <h3>Agent Roster</h3>
        <span className={styles.badge}>{agents.length} Active</span>
      </div>
      
      {agents.length === 0 ? (
        <div className={styles.empty}>No agents currently active in the roster.</div>
      ) : (
        <div className={styles.tableRef}>
          <div className={styles.tableHeader}>
            <span className={styles.colName}>Agent Name</span>
            <span className={styles.colRole}>Role / Specialty</span>
            <span className={styles.colStatus}>Status</span>
          </div>
          <div className={styles.tableBody}>
            {agents.map((agent) => (
              <button 
                key={agent.id} 
                className={styles.row}
                onClick={() => onAgentSelect?.(agent.id)}
              >
                <div className={styles.colName}>{agent.name}</div>
                <div className={styles.colRole}>{agent.role}</div>
                <div className={styles.colStatus}>
                  <span className={`${styles.statusBadge} ${styles[agent.status]}`}>
                    {agent.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
