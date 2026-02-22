import type { AgentStatus } from '../OrchestratorView/OrchestratorView.types';

export interface AgentRosterItem {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  /** Current task description or last completed task */
  currentTask?: string;
  /** Token burn count for this session */
  tokensUsed?: number;
  /** Time since last active (e.g. "2m ago") */
  lastActive?: string;
}

export interface AgentRosterProps {
  /** The root layout class name */
  className?: string;
  /** List of agents in the swarm */
  agents?: AgentRosterItem[];
  /** Callback when an agent row is clicked/selected */
  onAgentSelect?: (agent: AgentRosterItem) => void;
  /** The currently selected agent's ID */
  selectedAgentId?: string;
}
