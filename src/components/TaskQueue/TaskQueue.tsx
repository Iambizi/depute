import React from 'react';
import styles from './TaskQueue.module.css';
import type { TaskQueueProps } from './TaskQueue.types';

/**
 * TaskQueue visualizes the backlog of pending intents waiting for worker capacity.
 */
export const TaskQueue: React.FC<TaskQueueProps> = ({
  className,
  tasks = [],
  onTaskAction,
}) => {
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.header}>
        <h3>Task Queue</h3>
        <span className={styles.badge}>{tasks.length} Pending</span>
      </div>
      
      <div className={styles.list}>
        {tasks.length === 0 ? (
          <div className={styles.empty}>The backlog is empty. Generative momentum is zero.</div>
        ) : (
          tasks.map((task, index) => (
            <div key={task.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.orderNumber}>{index + 1}</span>
                <span className={styles.taskTitle}>{task.title}</span>
              </div>
              
              <div className={styles.itemFooter}>
                <span className={`${styles.priorityBadge} ${styles[task.priority]}`}>
                  {task.priority} Priority
                </span>
                {task.estimatedTokens && (
                  <span className={styles.tokenEstimate}>
                    ~{task.estimatedTokens.toLocaleString()} tokens
                  </span>
                )}
                
                <div className={styles.actions}>
                  <button onClick={() => onTaskAction?.(task.id, 'promote')} title="Move to top">↑</button>
                  <button onClick={() => onTaskAction?.(task.id, 'pause')} title="Hold task">⏸</button>
                  <button onClick={() => onTaskAction?.(task.id, 'cancel')} title="Cancel task">×</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
