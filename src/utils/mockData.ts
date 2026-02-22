/**
 * AX Components — Mock Data Utilities
 *
 * Realistic generators and simulators for all 6 v0 primitives.
 * Use these for stories, tests, and manual development.
 *
 * @see docs/orchestration/06-technical-specifications.md (Mock Data Utilities)
 */

import type { PlanStep, ToolCall, Artifact } from '../types/common';
import type { ApprovalGateProps } from '../components/ApprovalGate';
import type { ExportFormat } from '../components/ArtifactCard';

// ---------------------------------------------------------------------------
// Label Banks
// ---------------------------------------------------------------------------

export const MOCK_STEP_LABELS: string[] = [
  'Analyzing document structure',
  'Extracting key information',
  'Cross-referencing data sources',
  'Generating summary report',
  'Validating output accuracy',
  'Formatting response',
  'Searching knowledge base',
  'Applying business rules',
  'Running compliance checks',
  'Preparing final output',
  'Fetching external data',
  'Verifying permissions',
  'Drafting response',
  'Reviewing edge cases',
  'Committing changes',
];

export const MOCK_TOOL_NAMES: string[] = [
  'search_knowledge_base',
  'fetch_document',
  'run_query',
  'validate_schema',
  'send_email',
  'create_record',
  'update_record',
  'delete_record',
  'call_api',
  'read_file',
  'write_file',
  'generate_report',
  'check_permissions',
  'notify_user',
  'execute_code',
];

export const MOCK_APPROVAL_SCENARIOS: Array<{ title: string; description: string }> = [
  {
    title: 'Send external email',
    description: 'The agent wants to send an email to 3 external recipients on your behalf.',
  },
  {
    title: 'Delete 42 records',
    description: 'This action will permanently delete 42 customer records. This cannot be undone.',
  },
  {
    title: 'Submit payment of $250',
    description: 'The agent will charge your default payment method for $250.',
  },
  {
    title: 'Publish to production',
    description: 'The agent wants to deploy the current build to the production environment.',
  },
  {
    title: 'Share document externally',
    description: 'A document marked "internal" will be shared with an external partner.',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function isoNow(): string {
  return new Date().toISOString();
}

// ---------------------------------------------------------------------------
// PlanCard generators
// ---------------------------------------------------------------------------

export interface GenerateMockPlanOptions {
  title?: string;
  stepCount?: number;
  includeConfidence?: boolean;
  includeReasoning?: boolean;
}

export interface MockPlan {
  title: string;
  steps: PlanStep[];
  assumptions: string[];
  reasoning?: string;
}

/**
 * Generate a mock plan with randomized steps.
 *
 * @example
 * const { title, steps, assumptions } = generateMockPlan({ stepCount: 4 });
 */
export function generateMockPlan({
  title = 'Analyze and summarize documents',
  stepCount = 5,
  includeConfidence = true,
  includeReasoning = false,
}: GenerateMockPlanOptions = {}): MockPlan {
  const labels = [...MOCK_STEP_LABELS]
    .sort(() => Math.random() - 0.5)
    .slice(0, stepCount);

  const steps: PlanStep[] = labels.map((label, i) => ({
    id: `step-${uid()}`,
    label,
    description:
      i === 0
        ? 'Starting with a broad pass to identify structure and key themes.'
        : undefined,
    status: 'pending',
    confidence: includeConfidence
      ? Math.floor(Math.random() * 40) + 60
      : undefined,
    reasoning: includeReasoning
      ? `Step ${i + 1} is required because the output of the previous step must be validated before proceeding.`
      : undefined,
  }));

  return {
    title,
    steps,
    assumptions: [
      'The provided documents are in English',
      'You have read access to all referenced files',
      'The output format is Markdown',
    ],
    reasoning: includeReasoning
      ? 'A sequential approach ensures each output is validated before it feeds into the next step.'
      : undefined,
  };
}

/**
 * Simulate plan execution — auto-advances steps from pending → active → completed.
 * Returns a cancel function to stop the simulation early.
 *
 * @example
 * const plan = generateMockPlan();
 * const [steps, setSteps] = useState(plan.steps);
 * const { cancel } = simulatePlanExecution({ steps, onUpdate: setSteps });
 * // cleanup:
 * useEffect(() => cancel, []);
 */
export function simulatePlanExecution({
  steps,
  onUpdate,
  intervalMs = 1500,
}: {
  steps: PlanStep[];
  onUpdate: (steps: PlanStep[]) => void;
  intervalMs?: number;
}): { cancel: () => void } {
  let cancelled = false;
  let currentIndex = 0;
  const mutableSteps: PlanStep[] = steps.map((s) => ({ ...s, status: 'pending' as PlanStep['status'] }));

  function advance() {
    if (cancelled || currentIndex >= mutableSteps.length) return;

    // Mark active
    mutableSteps[currentIndex] = { ...mutableSteps[currentIndex], status: 'active' };
    onUpdate([...mutableSteps]);

    const timer = setTimeout(() => {
      if (cancelled) return;
      // Mark completed
      mutableSteps[currentIndex] = { ...mutableSteps[currentIndex], status: 'completed' };
      currentIndex++;
      onUpdate([...mutableSteps]);

      if (currentIndex < mutableSteps.length) {
        setTimeout(advance, intervalMs);
      }
    }, intervalMs);

    if (cancelled) clearTimeout(timer);
  }

  const startTimer = setTimeout(advance, intervalMs);

  return {
    cancel: () => {
      cancelled = true;
      clearTimeout(startTimer);
    },
  };
}

// ---------------------------------------------------------------------------
// ApprovalGate generators
// ---------------------------------------------------------------------------

/**
 * Generate a mock approval scenario with realistic defaults.
 *
 * @example
 * const props = generateMockApproval({ mode: 'staged' });
 */
export function generateMockApproval(
  overrides?: Partial<ApprovalGateProps>
): ApprovalGateProps {
  const scenario = pick(MOCK_APPROVAL_SCENARIOS);
  return {
    title: scenario.title,
    description: scenario.description,
    agentReasoning:
      'Based on the task requirements, this action is necessary to complete the workflow successfully.',
    status: 'pending',
    mode: 'simple',
    confidence: Math.floor(Math.random() * 30) + 60,
    timeoutSeconds: 120,
    scope: {
      resourceLimit: '$500',
      durationSeconds: 600,
      target: 'Stripe API only',
    },
    metadata: {
      'Initiated by': 'Agent v2.1',
      'Risk level': 'Medium',
    },
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// ConfidenceMeter generator
// ---------------------------------------------------------------------------

/** Generate a random confidence score in range [0, 100]. */
export function generateRandomConfidence(): number {
  return Math.floor(Math.random() * 100);
}

// ---------------------------------------------------------------------------
// ToolTrace generators
// ---------------------------------------------------------------------------

/**
 * Generate an array of mock tool calls (all in a completed/failed state).
 *
 * @example
 * const calls = generateMockToolCalls(5);
 */
export function generateMockToolCalls(count = 4): ToolCall[] {
  return Array.from({ length: count }, (_, i) => {
    const name = pick(MOCK_TOOL_NAMES);
    const failed = Math.random() < 0.15; // ~15% failure rate
    const status = failed ? 'failed' : 'completed';

    return {
      id: `call-${uid()}`,
      name,
      status,
      timestamp: isoNow(),
      duration: Math.floor(Math.random() * 2000) + 50,
      input: { query: `param_${i}`, limit: 10 },
      output: status === 'completed' ? { results: [{ id: uid(), score: 0.92 }] } : undefined,
      error: status === 'failed' ? 'Connection timeout after 5000ms' : undefined,
      policyFlags:
        name.includes('delete') || name.includes('send')
          ? { requiresApproval: true, externalAction: true }
          : name.includes('write') || name.includes('create') || name.includes('update')
            ? { writesState: true }
            : undefined,
    };
  });
}

/**
 * Simulate streaming tool calls — adds entries one at a time (running → completed).
 * Returns a cancel function. Use with useState + ToolTrace for live demos.
 *
 * @example
 * const [calls, setCalls] = useState<ToolCall[]>([]);
 * const { cancel } = simulateToolStream({
 *   onCall: (c) => setCalls(prev => {
 *     // Replace in-flight entry or append
 *     const idx = prev.findIndex(p => p.id === c.id);
 *     return idx >= 0
 *       ? prev.map((p, i) => i === idx ? c : p)
 *       : [...prev, c];
 *   }),
 * });
 * useEffect(() => cancel, []);
 */
export function simulateToolStream({
  onCall,
  count = 5,
  intervalMs = 1200,
}: {
  onCall: (call: ToolCall) => void;
  count?: number;
  intervalMs?: number;
}): { cancel: () => void } {
  let cancelled = false;
  let emitted = 0;

  function emitNext() {
    if (cancelled || emitted >= count) return;

    const id = `stream-${uid()}`;
    const name = pick(MOCK_TOOL_NAMES);

    // Emit as running
    onCall({ id, name, status: 'running', timestamp: isoNow() });

    const completionDelay = Math.floor(Math.random() * 600) + 300;
    setTimeout(() => {
      if (cancelled) return;

      const failed = Math.random() < 0.1;
      onCall({
        id,
        name,
        status: failed ? 'failed' : 'completed',
        timestamp: isoNow(),
        duration: completionDelay,
        output: failed ? undefined : { result: 'ok' },
        error: failed ? 'Unexpected error occurred' : undefined,
      });

      emitted++;
      if (emitted < count) {
        setTimeout(emitNext, intervalMs);
      }
    }, completionDelay);
  }

  const startTimer = setTimeout(emitNext, intervalMs);

  return {
    cancel: () => {
      cancelled = true;
      clearTimeout(startTimer);
    },
  };
}

// ---------------------------------------------------------------------------
// ArtifactCard generator
// ---------------------------------------------------------------------------

const MOCK_ARTIFACT_CONTENT: Record<string, string> = {
  markdown: `# Analysis Report

## Executive Summary

The analysis identified **3 key themes** across the source documents:

1. **Performance optimization** — 40% of issues are latency-related
2. **Error handling** — 25% of bugs stem from unhandled edge cases
3. **Documentation gaps** — Missing API specs for 12 endpoints

## Recommendations

- Prioritize P0 latency issues in the next sprint
- Add error boundaries to all async flows
- Schedule API documentation review for Q2`,

  json: JSON.stringify(
    {
      summary: { themes: 3, issues: 18, recommendations: 4 },
      confidence: 0.87,
      sources: ['doc-001', 'doc-002', 'doc-015'],
    },
    null,
    2
  ),

  csv: `id,name,status,priority
1,Latency issue in /api/search,open,P0
2,Missing error handler in useDataFetch,open,P1
3,No retry logic on network failure,open,P1
4,Undocumented /billing/preview endpoint,open,P2`,

  code: `async function analyzeDocuments(docs: Document[]): Promise<AnalysisResult> {
  const themes = await extractThemes(docs);
  const issues = await identifyIssues(themes);
  return { themes, issues, confidence: calculateConfidence(issues) };
}`,
};

/**
 * Generate a mock artifact with realistic content.
 *
 * @example
 * const artifact = generateMockArtifact({ type: 'markdown', title: 'Run Summary' });
 */
export function generateMockArtifact(overrides?: Partial<Artifact>): Artifact {
  const type = pick(['markdown', 'json', 'csv', 'code'] as const);
  return {
    id: `artifact-${uid()}`,
    title: 'Analysis Report',
    type,
    content: MOCK_ARTIFACT_CONTENT[type] ?? 'No content available.',
    timestamp: isoNow(),
    metadata: {
      'Word count': '248',
      'Generated': new Date().toLocaleString(),
      'Model': 'gemini-2.0-flash',
    },
    sourceStepId: `step-${uid()}`,
    toolCallIds: [`call-${uid()}`, `call-${uid()}`],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Composite scenario builder
// ---------------------------------------------------------------------------

/**
 * Build a complete run-monitoring scenario — initial state ready to wire into
 * PlanCard + ToolTrace + ApprovalGate + ArtifactCard simultaneously.
 *
 * Use simulatePlanExecution + simulateToolStream to drive state changes.
 *
 * @example
 * const { plan, toolCalls, approval, artifact, exportFormats } =
 *   buildRunMonitoringScenario();
 */
export function buildRunMonitoringScenario(): {
  plan: MockPlan;
  toolCalls: ToolCall[];
  approval: ApprovalGateProps;
  artifact: Artifact;
  exportFormats: ExportFormat[];
} {
  return {
    plan: generateMockPlan({
      stepCount: 5,
      includeConfidence: true,
      includeReasoning: true,
    }),
    toolCalls: generateMockToolCalls(3),
    approval: generateMockApproval({ mode: 'staged', confidence: 72 }),
    artifact: generateMockArtifact({ type: 'markdown', title: 'Run Summary' }),
    exportFormats: ['markdown', 'json', 'pr'],
  };
}

// =============================================================================
// v1 Orchestration Primitives — Mock Data Generators
// =============================================================================

import type { OrchestratorNode, AgentStatus } from '../components/OrchestratorView/OrchestratorView.types';
import type { AgentRosterItem } from '../components/AgentRoster/AgentRoster.types';
import type { SubagentCardProps } from '../components/SubagentCard/SubagentCard.types';
import type { TaskQueueItem, TaskStatus as TQStatus, TaskPriority } from '../components/TaskQueue/TaskQueue.types';
import type { HandoffProtocolProps, HandoffPayloadItem } from '../components/HandoffProtocol/HandoffProtocol.types';
import type { DelegationGateProps } from '../components/DelegationGate/DelegationGate.types';
import type { SwarmMonitorProps } from '../components/SwarmMonitor/SwarmMonitor.types';
import type { EscalationRouterProps } from '../components/EscalationRouter/EscalationRouter.types';
import type { SwarmInboxItem, SwarmInboxSeverity } from '../components/SwarmInbox/SwarmInbox.types';
import type { SharedContextLedgerProps, ContextLedgerEntry } from '../components/SharedContextLedger/SharedContextLedger.types';

// ---------------------------------------------------------------------------
// v1 Label Banks
// ---------------------------------------------------------------------------

const AGENT_NAMES = [
  'Orchestrator-Prime', 'Researcher-A', 'Code-Writer-1', 'Code-Writer-2',
  'QA-Inspector', 'Data-Analyst', 'Planner-Beta', 'Summarizer-X',
  'Validator-3', 'Retrieval-Bot', 'Synthesizer-Z',
];

const AGENT_ROLES = [
  'Orchestrator', 'Researcher', 'Code Writer', 'QA Inspector',
  'Data Analyst', 'Planner', 'Summarizer', 'Validator', 'Retrieval', 'Synthesizer',
];

const TASK_DESCRIPTIONS = [
  'Analyzing repository structure for refactor opportunities',
  'Writing unit tests for the payment module',
  'Fetching latest API documentation from external source',
  'Cross-referencing data against internal knowledge base',
  'Generating TypeScript interfaces from JSON schema',
  'Validating output against business rules',
  'Summarizing findings from 12 research papers',
  'Drafting PR description with context for reviewers',
  'Running lint and formatting checks on new files',
  'Reviewing edge cases in the authentication flow',
  'Compiling final report from sub-agent outputs',
];

const MOCK_MANDATES = [
  'Research and summarize the top 5 competitors\' pricing models',
  'Write and test a data migration script for the users table',
  'Audit all API endpoints for missing authentication headers',
  'Generate mock data for the new billing dashboard',
  'Translate the onboarding flow documentation to Spanish',
  'Identify performance bottlenecks in the search pipeline',
];

const MOCK_TOOLS = [
  'bash', 'read_file', 'write_file', 'web_search', 'call_api',
  'run_tests', 'execute_code', 'send_email', 'query_db',
];

const LEDGER_KEYS = [
  'primary_goal', 'current_phase', 'user_constraints', 'last_decision',
  'active_hypothesis', 'known_limitations', 'previously_tried',
  'approved_plan_id', 'error_context', 'output_format_preference',
];

const LEDGER_VALUES = [
  'Refactor authentication layer to use JWTs',
  'Code generation — awaiting QA pass',
  'Must stay under 8k tokens per sub-agent',
  'Chose strategy B over A due to lower risk',
  'Errors are concentrated in the cache invalidation layer',
  'Cannot access external services without approval',
  'Approach via regex failed — switching to AST parsing',
  'plan-7f3a2b',
  'Module not found: \'crypto-utils\'',
  'Markdown with code fences',
];

const AGENT_STATUSES: AgentStatus[] = ['idle', 'working', 'blocked', 'failed', 'completed'];

function timeAgo(): string {
  const mins = Math.floor(Math.random() * 30) + 1;
  return mins < 2 ? 'just now' : `${mins}m ago`;
}

// ---------------------------------------------------------------------------
// OrchestratorView generator
// ---------------------------------------------------------------------------

/**
 * Generate a mock OrchestratorNode tree (root + branches of sub-agents).
 *
 * @example
 * const nodes = generateMockOrchestratorTree();
 * <OrchestratorView nodes={nodes} />
 */
export function generateMockOrchestratorTree(): OrchestratorNode[] {
  const statuses: AgentStatus[] = ['working', 'working', 'idle', 'blocked'];

  function makeNode(name: string, role: string, status: AgentStatus, children?: OrchestratorNode[]): OrchestratorNode {
    return {
      id: `node-${uid()}`,
      label: name,
      role,
      status,
      currentTask: status !== 'idle' ? pick(TASK_DESCRIPTIONS) : undefined,
      children,
    };
  }

  return [
    makeNode('Orchestrator-Prime', 'Orchestrator', 'working', [
      makeNode('Researcher-A', 'Researcher', pick(statuses), [
        makeNode('Retrieval-Bot', 'Retrieval', pick(statuses)),
        makeNode('Summarizer-X', 'Summarizer', pick(statuses)),
      ]),
      makeNode('Code-Writer-1', 'Code Writer', pick(statuses), [
        makeNode('Validator-3', 'Validator', pick(statuses)),
        makeNode('QA-Inspector', 'QA Inspector', pick(statuses)),
      ]),
      makeNode('Data-Analyst', 'Data Analyst', pick(statuses)),
    ]),
  ];
}

// ---------------------------------------------------------------------------
// AgentRoster generator
// ---------------------------------------------------------------------------

/**
 * Generate a flat list of mock agents for AgentRoster.
 *
 * @example
 * const agents = generateMockAgentRoster(8);
 * <AgentRoster agents={agents} />
 */
export function generateMockAgentRoster(count = 6): AgentRosterItem[] {
  return Array.from({ length: count }, (_, i) => {
    const status = pick(AGENT_STATUSES);
    return {
      id: `agent-${uid()}`,
      name: AGENT_NAMES[i % AGENT_NAMES.length],
      role: AGENT_ROLES[i % AGENT_ROLES.length],
      status,
      currentTask: status !== 'idle' && status !== 'completed' ? pick(TASK_DESCRIPTIONS) : undefined,
      tokensUsed: Math.floor(Math.random() * 40000) + 2000,
      lastActive: timeAgo(),
    };
  });
}

// ---------------------------------------------------------------------------
// SubagentCard generator
// ---------------------------------------------------------------------------

/**
 * Generate props for a single SubagentCard.
 *
 * @example
 * const props = generateMockSubagentCard({ status: 'working' });
 * <SubagentCard {...props} />
 */
export function generateMockSubagentCard(overrides?: Partial<SubagentCardProps>): SubagentCardProps {
  const status = pick(AGENT_STATUSES);
  const totalSteps = Math.floor(Math.random() * 8) + 3;
  const completedSteps = Math.floor(Math.random() * totalSteps);
  return {
    agentName: pick(AGENT_NAMES),
    role: pick(AGENT_ROLES),
    status,
    currentTask: status !== 'idle' ? pick(TASK_DESCRIPTIONS) : undefined,
    planStepCount: totalSteps,
    planStepsCompleted: completedSteps,
    tokensUsed: Math.floor(Math.random() * 20000) + 1000,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// TaskQueue generator
// ---------------------------------------------------------------------------

const TASK_PRIORITIES: TaskPriority[] = ['critical', 'high', 'medium', 'low'];
const TASK_STATUSES: TQStatus[] = ['pending', 'pending', 'pending', 'assigned', 'in_progress'];

/**
 * Generate a list of mock TaskQueueItems.
 *
 * @example
 * const tasks = generateMockTaskQueue(10);
 * <TaskQueue tasks={tasks} />
 */
export function generateMockTaskQueue(count = 8): TaskQueueItem[] {
  return Array.from({ length: count }, () => {
    const status = pick(TASK_STATUSES);
    return {
      id: `task-${uid()}`,
      title: pick(TASK_DESCRIPTIONS),
      priority: pick(TASK_PRIORITIES),
      status,
      assignedTo: status !== 'pending' ? pick(AGENT_NAMES) : undefined,
      estimatedTokens: Math.floor(Math.random() * 8000) + 500,
    };
  });
}

// ---------------------------------------------------------------------------
// HandoffProtocol generator
// ---------------------------------------------------------------------------

/**
 * Generate a mock handoff context packet between two agents.
 *
 * @example
 * const props = generateMockHandoff();
 * <HandoffProtocol {...props} onAccept={() => {}} />
 */
export function generateMockHandoff(overrides?: Partial<HandoffProtocolProps>): Omit<HandoffProtocolProps, 'onAccept' | 'onIntercept' | 'onCancel'> {
  const payload: HandoffPayloadItem[] = [
    { label: 'Goal', value: 'Reduce auth latency by 30%' },
    { label: 'Findings', value: '3 redundant DB queries found in middleware' },
    { label: 'Approach', value: 'Cache session tokens at the API gateway layer' },
    { label: 'Approved Plan', value: `plan-${uid()}` },
    { label: 'Token Budget', value: '12,000 tokens remaining' },
  ];
  return {
    sourceAgent: pick(AGENT_NAMES),
    destinationAgent: pick(AGENT_NAMES),
    goal: 'Refactor the authentication middleware to reduce per-request latency',
    summary:
      'Completed initial research phase. Identified 3 redundant DB queries in the session validation middleware. A caching strategy has been drafted and an approved plan is attached.',
    payload,
    nextRequest:
      'Implement the caching layer as described in the plan and write integration tests for the updated middleware.',
    canIntercept: true,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// DelegationGate generator
// ---------------------------------------------------------------------------

/**
 * Generate a mock agent spawn approval request.
 *
 * @example
 * const props = generateMockDelegationGate();
 * <DelegationGate {...props} onApprove={() => {}} onDeny={() => {}} />
 */
export function generateMockDelegationGate(
  overrides?: Partial<DelegationGateProps>
): Omit<DelegationGateProps, 'onApprove' | 'onDeny'> {
  const tokenBudget = Math.floor(Math.random() * 20000) + 5000;
  const estimatedCost = `$${(tokenBudget * 0.000015).toFixed(2)}`;
  return {
    requestingAgent: pick(AGENT_NAMES),
    proposedSubagent: {
      role: pick(AGENT_ROLES),
      mandate: pick(MOCK_MANDATES),
      allowedTools: [...new Set(Array.from({ length: Math.floor(Math.random() * 4) + 2 }, () => pick(MOCK_TOOLS)))],
      maxDepth: Math.floor(Math.random() * 2) + 1,
      estimatedTokens: tokenBudget,
      estimatedCost,
    },
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// SwarmMonitor generator
// ---------------------------------------------------------------------------

/**
 * Generate mock swarm-level KPI metrics.
 *
 * @example
 * const props = generateMockSwarmMetrics();
 * <SwarmMonitor {...props} />
 */
export function generateMockSwarmMetrics(overrides?: Partial<SwarmMonitorProps>): SwarmMonitorProps {
  const tokensBurned = Math.floor(Math.random() * 200000) + 10000;
  return {
    metrics: {
      activeInstances: Math.floor(Math.random() * 8) + 2,
      idleInstances: Math.floor(Math.random() * 4),
      totalCost: `$${(tokensBurned * 0.000015).toFixed(2)}`,
      tokensBurned,
      errorRate: Math.floor(Math.random() * 20),
      taskCompletionRate: Math.floor(Math.random() * 60) + 20,
      estimatedTimeRemaining: `${Math.floor(Math.random() * 15) + 2}m`,
    },
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// EscalationRouter generator
// ---------------------------------------------------------------------------

const MOCK_ERROR_SUMMARIES = [
  'The agent exceeded its token budget mid-task and could not continue.',
  'Tool call `call_api` returned a 503 Service Unavailable after 3 retries.',
  'Agent entered an infinite loop: detected the same tool call 5 times with no state change.',
  'Validation failed: output schema does not match expected format.',
  'Permission denied: agent attempted to write to a read-only data store.',
];

const MOCK_TRACES = [
  `Error: ECONNREFUSED at TCP 10.0.0.4:5432\n  at TCPConnectWrap.afterConnect (net.js:1148:16)`,
  `TypeError: Cannot read properties of undefined (reading 'id')\n  at processOutput (/agent/runner.js:248:18)`,
  `MaxRetriesExceeded: call_api failed after 3 attempts\n  Last response: 503 {"message":"Service temporarily unavailable"}`,
];

/**
 * Generate mock EscalationRouter props.
 *
 * @example
 * const props = generateMockEscalation();
 * <EscalationRouter {...props} onRetry={() => {}} onReassign={() => {}} onCancelBranch={() => {}} />
 */
export function generateMockEscalation(
  overrides?: Partial<EscalationRouterProps>
): Omit<EscalationRouterProps, 'onRetry' | 'onReassign' | 'onCancelBranch'> {
  return {
    failedAgent: pick(AGENT_NAMES),
    branchId: `branch-${uid()}`,
    errorSummary: pick(MOCK_ERROR_SUMMARIES),
    errorTrace: Math.random() > 0.3 ? pick(MOCK_TRACES) : undefined,
    recommendation: pick(['retry', 'reassign', 'cancel'] as const),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// SwarmInbox generator
// ---------------------------------------------------------------------------

const INBOX_TITLES: Record<string, string> = {
  approval: 'Action requires your sign-off',
  escalation: 'Agent failure escalated for review',
  policy_violation: 'Policy constraint triggered',
  stalled: 'Agent stalled — no progress in 5 minutes',
  budget_overrun: 'Token budget exceeded',
  conflict: 'Output conflict detected between two agents',
};

/**
 * Generate a list of mock SwarmInbox notification items.
 *
 * @example
 * const items = generateMockSwarmInbox(5);
 * <SwarmInbox items={items} />
 */
export function generateMockSwarmInbox(count = 5): SwarmInboxItem[] {
  const types = Object.keys(INBOX_TITLES) as SwarmInboxItem['type'][];
  const severities: SwarmInboxSeverity[] = ['critical', 'warning', 'warning', 'info', 'info'];
  return Array.from({ length: count }, () => {
    const type = pick(types);
    return {
      id: `inbox-${uid()}`,
      type,
      severity: pick(severities),
      title: INBOX_TITLES[type],
      agentId: pick(AGENT_NAMES),
      branchPath: `root → ${pick(AGENT_ROLES)} → ${pick(AGENT_ROLES)}`,
      timestamp: timeAgo(),
      detail:
        type === 'budget_overrun'
          ? 'Agent consumed 142% of its allocation (28,400 / 20,000 tokens).'
          : type === 'conflict'
            ? 'Code-Writer-1 and Code-Writer-2 produced conflicting implementations for auth.ts.'
            : undefined,
    };
  });
}

// ---------------------------------------------------------------------------
// SharedContextLedger generator
// ---------------------------------------------------------------------------

/**
 * Generate mock SharedContextLedger props.
 *
 * @example
 * const props = generateMockContextLedger({ scope: 'branch-3' });
 * <SharedContextLedger {...props} />
 */
export function generateMockContextLedger(overrides?: Partial<SharedContextLedgerProps>): SharedContextLedgerProps {
  const count = Math.floor(Math.random() * 5) + 4;
  const entryTypes = ['fact', 'decision', 'constraint', 'artifact'] as const;
  const scopes = ['global', 'branch', 'agent-local'] as const;
  const entries: ContextLedgerEntry[] = Array.from({ length: count }, () => ({
    id: `entry-${uid()}`,
    scope: pick([...scopes]),
    key: pick(LEDGER_KEYS),
    value: pick(LEDGER_VALUES),
    type: pick([...entryTypes]),
    provenance: {
      authorAgent: pick(AGENT_NAMES),
      timestamp: timeAgo(),
    },
    conflict: Math.random() < 0.15,
  }));
  return {
    currentScope: 'branch',
    entries,
    ...overrides,
  };
}


// ---------------------------------------------------------------------------
// Composite: Full multi-agent swarm scenario
// ---------------------------------------------------------------------------

/**
 * Build a complete multi-agent scenario with all 11 v1 orchestration primitives
 * populated with consistent, realistic data. Suitable for Storybook canvas demos.
 *
 * @example
 * const scenario = buildMultiAgentScenario();
 */
export function buildMultiAgentScenario() {
  return {
    orchestratorNodes: generateMockOrchestratorTree(),
    rosterAgents: generateMockAgentRoster(8),
    subagentCard: generateMockSubagentCard({ status: 'working' }),
    taskQueue: generateMockTaskQueue(10),
    handoff: generateMockHandoff(),
    delegation: generateMockDelegationGate(),
    swarmMetrics: generateMockSwarmMetrics(),
    escalation: generateMockEscalation(),
    inboxItems: generateMockSwarmInbox(4),
    contextLedger: generateMockContextLedger(),
  };
}
