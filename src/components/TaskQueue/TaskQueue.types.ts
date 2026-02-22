export interface TaskQueueItem {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTokens?: number;
}

export interface TaskQueueProps {
  /** The root layout class name */
  className?: string;
  /** List of pending tasks awaiting assignment */
  tasks?: TaskQueueItem[];
  /** Callback for when a task requires manual intervention/pausing */
  onTaskAction?: (id: string, action: 'pause' | 'promote' | 'cancel') => void;
}
