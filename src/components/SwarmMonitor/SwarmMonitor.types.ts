export interface SwarmMonitorProps {
  /** The root layout class name */
  className?: string;
  metrics: {
    activeInstances: number;
    totalCost: string;
    tokensBurned: number;
    errorRate: number; // percentage 0-100
    estimatedTimeRemaining?: string;
  };
  onGlobalPause?: () => void;
  onGlobalKill?: () => void;
}
