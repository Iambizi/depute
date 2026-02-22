import React from 'react';
import styles from './AgentRoster.module.css';
import type { AgentRosterItem, AgentRosterProps } from './AgentRoster.types';

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

const STATUS_DOT: Record<string, string> = {
  idle: styles.dotIdle,
  working: styles.dotWorking,
  blocked: styles.dotBlocked,
  failed: styles.dotFailed,
  completed: styles.dotCompleted,
};

const STATUS_TEXT: Record<string, string> = {
  idle: 'Idle',
  working: 'Working',
  blocked: 'Blocked',
  failed: 'Failed',
  completed: 'Done',
};

// ---------------------------------------------------------------------------
// AgentRow — individual row subcomponent
// ---------------------------------------------------------------------------

interface AgentRowProps {
  agent: AgentRosterItem;
  isSelected: boolean;
  onSelect?: (agent: AgentRosterItem) => void;
}

function AgentRow({ agent, isSelected, onSelect }: AgentRowProps) {
  const isClickable = !!onSelect;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(agent);
    }
  };

  return (
    <tr
      className={`${styles.row} ${isSelected ? styles.rowSelected : ''} ${
        isClickable ? styles.rowClickable : ''
      }`}
      onClick={isClickable ? () => onSelect?.(agent) : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? 'button' : 'row'}
      tabIndex={isClickable ? 0 : undefined}
      aria-selected={isClickable ? isSelected : undefined}
      aria-label={`${agent.name}, ${agent.role}, ${STATUS_TEXT[agent.status] ?? agent.status}`}
    >
      {/* Status */}
      <td className={styles.cellStatus}>
        <span
          className={`${styles.dot} ${STATUS_DOT[agent.status] ?? ''} ${
            agent.status === 'working' ? styles.dotPulsing : ''
          }`}
          aria-hidden="true"
        />
      </td>

      {/* Name + Role */}
      <td className={styles.cellName}>
        <span className={styles.agentName}>{agent.name}</span>
        <span className={styles.agentRole}>{agent.role}</span>
      </td>

      {/* Current task */}
      <td className={styles.cellTask}>
        {agent.currentTask ? (
          <span className={styles.taskText} title={agent.currentTask}>
            {agent.currentTask}
          </span>
        ) : (
          <span className={styles.taskEmpty}>—</span>
        )}
      </td>

      {/* Tokens */}
      <td className={styles.cellMeta}>
        {agent.tokensUsed != null ? (
          <span className={styles.metaValue}>{agent.tokensUsed.toLocaleString()}</span>
        ) : (
          <span className={styles.metaEmpty}>—</span>
        )}
      </td>

      {/* Last active */}
      <td className={styles.cellMeta}>
        <span className={styles.metaValue}>{agent.lastActive ?? '—'}</span>
      </td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// AgentRoster
// ---------------------------------------------------------------------------

/**
 * AgentRoster renders a dense table view for scanning status across many concurrent workers.
 * Designed for flat swarms (Figure 7) where you need operational overview rather than hierarchy.
 */
export const AgentRoster: React.FC<AgentRosterProps> = ({
  className,
  agents = [],
  onAgentSelect,
  selectedAgentId,
}) => {
  const counts = {
    idle: agents.filter((a) => a.status === 'idle').length,
    working: agents.filter((a) => a.status === 'working').length,
    blocked: agents.filter((a) => a.status === 'blocked').length,
    failed: agents.filter((a) => a.status === 'failed').length,
    completed: agents.filter((a) => a.status === 'completed').length,
  };

  return (
    <div
      className={`${styles.base} ${className || ''}`}
      role="region"
      aria-label="Agent Roster"
    >
      {/* Header + summary pills */}
      <div className={styles.header}>
        <span className={styles.title}>Agent Roster</span>
        <div className={styles.summary}>
          {counts.working > 0 && (
            <span className={`${styles.pill} ${styles.pillWorking}`}>{counts.working} working</span>
          )}
          {counts.blocked > 0 && (
            <span className={`${styles.pill} ${styles.pillBlocked}`}>{counts.blocked} blocked</span>
          )}
          {counts.failed > 0 && (
            <span className={`${styles.pill} ${styles.pillFailed}`}>{counts.failed} failed</span>
          )}
          {counts.idle > 0 && (
            <span className={`${styles.pill} ${styles.pillIdle}`}>{counts.idle} idle</span>
          )}
          {counts.completed > 0 && (
            <span className={`${styles.pill} ${styles.pillCompleted}`}>{counts.completed} done</span>
          )}
        </div>
      </div>

      {/* Table */}
      {agents.length === 0 ? (
        <div className={styles.empty}>No agents in roster.</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table} role="grid" aria-label="Agent list">
            <thead>
              <tr className={styles.headRow}>
                <th className={styles.headCell} scope="col" aria-label="Status"></th>
                <th className={styles.headCell} scope="col">Agent</th>
                <th className={styles.headCell} scope="col">Current Task</th>
                <th className={styles.headCell} scope="col">Tokens</th>
                <th className={styles.headCell} scope="col">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <AgentRow
                  key={agent.id}
                  agent={agent}
                  isSelected={agent.id === selectedAgentId}
                  onSelect={onAgentSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
