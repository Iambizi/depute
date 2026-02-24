export interface BranchControlsProps {
  /** The root layout class name */
  className?: string;
  branchName: string;
  status: 'running' | 'paused' | 'quarantined';
  onPause?: () => void;
  onResume?: () => void;
  onQuarantine?: () => void;
  onCancel?: () => void;
  onThrottle?: () => void;
}
