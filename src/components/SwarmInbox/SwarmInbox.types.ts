export type SwarmInboxSeverity = 'critical' | 'warning' | 'info';

export interface SwarmInboxItem {
  id: string;
  type: 'approval' | 'escalation' | 'policy_violation' | 'stalled' | 'budget_overrun' | 'conflict';
  severity: SwarmInboxSeverity;
  title: string;
  agentId: string;
  branchPath?: string;
  timestamp: string;
  /** Optional one-liner description */
  detail?: string;
  /** Optional custom icon. If omitted, it will just show a standard bullet. */
  icon?: React.ReactNode;
}

export interface SwarmInboxProps {
  /** The root layout class name */
  className?: string;
  items?: SwarmInboxItem[];
  onOpenItem?: (item: SwarmInboxItem) => void;
  onDismissItem?: (id: string) => void;
}
