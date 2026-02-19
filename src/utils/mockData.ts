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
