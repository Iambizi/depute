export interface AgentRosterItem {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'working' | 'blocked' | 'failed';
}

export interface AgentRosterProps {
  /** The root layout class name */
  className?: string;
  /** List of agents in the swarm */
  agents?: AgentRosterItem[];
  /** Callback when an agent row is selected */
  onAgentSelect?: (id: string) => void;
}
