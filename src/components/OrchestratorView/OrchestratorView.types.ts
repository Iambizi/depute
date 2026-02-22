export type AgentStatus = 'idle' | 'working' | 'blocked' | 'failed' | 'completed';

export interface OrchestratorNode {
  /** Unique agent identifier */
  id: string;
  /** Human-readable label for the agent/worker */
  label: string;
  /** Current operational status */
  status: AgentStatus;
  /** Free-form role descriptor, e.g. "Orchestrator", "Code Writer", "Researcher" */
  role?: string;
  /** Current task description */
  currentTask?: string;
  /** Child nodes (sub-agents spawned by this node) */
  children?: OrchestratorNode[];
}

export interface OrchestratorViewProps {
  /** The root layout class name */
  className?: string;
  /** Hierarchical tree data — typically a single root orchestrator node */
  nodes?: OrchestratorNode[];
  /** Called when the user clicks on an individual node */
  onNodeClick?: (node: OrchestratorNode) => void;
  /** The ID of the currently selected node */
  selectedNodeId?: string;
}
