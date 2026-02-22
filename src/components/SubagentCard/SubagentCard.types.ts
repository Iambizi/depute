export interface SubagentCardProps {
  /** The root layout class name */
  className?: string;
  /** Name or ID of the subagent */
  agentName: string;
  /** Current operating status */
  status: 'idle' | 'working' | 'blocked' | 'failed';
  /** The specific task the agent is currently executing */
  currentTask?: string;
  /** Optional click handler to expand into full v0 PlanCard */
  onExpand?: () => void;
}
