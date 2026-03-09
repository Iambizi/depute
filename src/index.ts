/**
 * AX Components — Library Entry Point
 *
 * @packageDocumentation
 */

// Styles (design tokens + animations)
import './styles/index.css';

// Shared types
export type {
  PlanStepStatus,
  RunState,
  ApprovalStatus,
  ConfidenceLevel,
  PlanStep,
  ToolCall,
  Artifact,
} from './types/common';

export { getConfidenceLevel } from './types/common';

// A11y utilities
export { VisuallyHidden, useAnnouncer, useFocusTrap } from './utils/a11y';
export type { VisuallyHiddenProps } from './utils/a11y';

// Components
export { PlanCard } from './components/PlanCard';
export type { PlanCardProps } from './components/PlanCard';

export { ApprovalGate } from './components/ApprovalGate';
export type { ApprovalGateProps, StagedStep } from './components/ApprovalGate';

export { ConfidenceMeter } from './components/ConfidenceMeter';
export type { ConfidenceMeterProps, ConfidenceDisplay, ConfidenceMeterSize } from './components/ConfidenceMeter';

export { RunControls } from './components/RunControls';
export type { RunControlsProps } from './components/RunControls';

export { ToolTrace } from './components/ToolTrace';
export type { ToolTraceProps } from './components/ToolTrace';

export { ArtifactCard } from './components/ArtifactCard';
export type { ArtifactCardProps, ExportFormat } from './components/ArtifactCard';

export { AutomationBiasAlert } from './components/AutomationBiasAlert';
export type { AutomationBiasAlertProps, AutomationBiasThresholds, ApprovalEvent } from './components/AutomationBiasAlert';

// --- v1 Orchestration Primitives ---
export { OrchestratorView } from './components/OrchestratorView';
export type { OrchestratorViewProps, OrchestratorNode, AgentStatus } from './components/OrchestratorView';

export { AgentRoster } from './components/AgentRoster';
export type { AgentRosterProps, AgentRosterItem } from './components/AgentRoster';

export { SubagentCard } from './components/SubagentCard';
export type { SubagentCardProps } from './components/SubagentCard';

export { TaskQueue } from './components/TaskQueue';
export type { TaskQueueProps, TaskQueueItem } from './components/TaskQueue';

export { HandoffProtocol } from './components/HandoffProtocol';
export type { HandoffProtocolProps } from './components/HandoffProtocol';

export { DelegationGate } from './components/DelegationGate';
export type { DelegationGateProps } from './components/DelegationGate';

export { SwarmMonitor } from './components/SwarmMonitor';
export type { SwarmMonitorProps } from './components/SwarmMonitor';

export { EscalationRouter } from './components/EscalationRouter';
export type { EscalationRouterProps } from './components/EscalationRouter';

export { SwarmInbox } from './components/SwarmInbox';
export type { SwarmInboxProps, SwarmInboxItem } from './components/SwarmInbox';

export { BranchControls } from './components/BranchControls';
export type { BranchControlsProps } from './components/BranchControls';

export { SharedContextLedger } from './components/SharedContextLedger';
export type { SharedContextLedgerProps, ContextLedgerEntry } from './components/SharedContextLedger';

// Hooks
export { useAutomationBias } from './hooks';

// Mock data utilities
export {
  generateMockPlan,
  simulatePlanExecution,
  generateMockApproval,
  generateRandomConfidence,
  generateMockToolCalls,
  simulateToolStream,
  generateMockArtifact,
  buildRunMonitoringScenario,
  // v1 Orchestration generators
  generateMockOrchestratorTree,
  generateMockAgentRoster,
  generateMockSubagentCard,
  generateMockTaskQueue,
  generateMockHandoff,
  generateMockDelegationGate,
  generateMockSwarmMetrics,
  generateMockEscalation,
  generateMockSwarmInbox,
  generateMockContextLedger,
  buildMultiAgentScenario,
  MOCK_STEP_LABELS,
  MOCK_TOOL_NAMES,
  MOCK_APPROVAL_SCENARIOS,
} from './utils/mockData';
export type {
  GenerateMockPlanOptions,
  MockPlan,
} from './utils/mockData';

