export interface SwarmMonitorProps {
  /** The root layout class name */
  className?: string;
  metrics: {
    activeInstances: number;
    idleInstances: number;
    totalCost: string;
    tokensBurned: number;
    errorRate: number; // percentage 0–100
    taskCompletionRate?: number; // percentage 0–100
    estimatedTimeRemaining?: string;
  };
  onGlobalPause?: () => void;
  onGlobalKill?: () => void;
}
