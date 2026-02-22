export interface SwarmInboxItem {
  id: string;
  type: 'approval' | 'escalation' | 'policy_violation' | 'stalled';
  title: string;
  agentId: string;
  branchPath: string;
  timestamp: string;
}

export interface SwarmInboxProps {
  /** The root layout class name */
  className?: string;
  items?: SwarmInboxItem[];
  onOpenItem?: (id: string) => void;
  onDismissItem?: (id: string) => void;
}
