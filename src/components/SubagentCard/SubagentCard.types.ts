import type { AgentStatus } from '../OrchestratorView/OrchestratorView.types';

export interface SubagentCardProps {
  /** The root layout class name */
  className?: string;
  /** Name or ID of the subagent */
  agentName: string;
  /** Display role, e.g. "Code Writer", "Researcher" */
  role?: string;
  /** Current operating status */
  status: AgentStatus;
  /** The specific task the agent is currently executing */
  currentTask?: string;
  /** Number of steps in the subagent's current plan */
  planStepCount?: number;
  /** Number of completed steps in the subagent's current plan */
  planStepsCompleted?: number;
  /** Tokens burned in this agent's session */
  tokensUsed?: number;
  /** Click handler to drill down into the agent's full detail panel */
  onExpand?: () => void;
}
