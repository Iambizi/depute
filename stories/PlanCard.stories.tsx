import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlanCard } from '../src/components/PlanCard';
import {
  generateMockPlan,
  simulatePlanExecution,
} from '../src/utils/mockData';
import type { PlanStep } from '../src/types/common';

const meta: Meta<typeof PlanCard> = {
  title: 'AX Components/PlanCard',
  component: PlanCard,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['determinate', 'indeterminate'] },
    showConfidence: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PlanCard>;

// ============================================================
// SHARED STORIES
// ============================================================

const BASE = generateMockPlan({ stepCount: 5, includeConfidence: true });

/** Default: all steps pending, determinate mode */
export const Default: Story = {
  args: {
    title: BASE.title,
    steps: BASE.steps,
    assumptions: BASE.assumptions,
  },
};

/** All features enabled: assumptions, reasoning, confidence badges */
export const AllFeatures: Story = {
  args: {
    ...generateMockPlan({
      stepCount: 5,
      includeConfidence: true,
      includeReasoning: true,
    }),
    showConfidence: true,
  },
};

// --- State variants ---

export const StateActive: Story = {
  name: 'State: Active (step 2 in progress)',
  args: {
    title: 'Refactor authentication layer',
    steps: [
      { id: 's1', label: 'Audit existing auth code', status: 'completed', confidence: 92 },
      { id: 's2', label: 'Extract token refresh logic', status: 'active', confidence: 78, reasoning: 'Isolating to a pure function decouples it from the HTTP client.' },
      { id: 's3', label: 'Write unit tests', status: 'pending', confidence: 85 },
      { id: 's4', label: 'Update integration tests', status: 'pending', confidence: 70 },
      { id: 's5', label: 'PR and review', status: 'pending' },
    ],
    showConfidence: true,
    assumptions: ['Auth module is isolated', 'CI pipeline is green'],
  },
};

export const StateCompleted: Story = {
  name: 'State: All Completed',
  args: {
    title: 'Generate API documentation',
    steps: [
      { id: 's1', label: 'Parse OpenAPI schema', status: 'completed', confidence: 95 },
      { id: 's2', label: 'Generate endpoint descriptions', status: 'completed', confidence: 88 },
      { id: 's3', label: 'Write usage examples', status: 'completed', confidence: 91 },
      { id: 's4', label: 'Export as Markdown', status: 'completed', confidence: 99 },
    ],
    showConfidence: true,
  },
};

export const StateFailed: Story = {
  name: 'State: Step Failed',
  args: {
    title: 'Deploy to staging',
    steps: [
      { id: 's1', label: 'Build production bundle', status: 'completed', confidence: 97 },
      { id: 's2', label: 'Run smoke tests', status: 'completed', confidence: 90 },
      { id: 's3', label: 'Push to staging cluster', status: 'failed', confidence: 40 },
      { id: 's4', label: 'Verify health checks', status: 'pending' },
    ],
    assumptions: ['AWS credentials are valid', 'ECS cluster is running'],
  },
};

export const StateIndeterminate: Story = {
  name: 'State: Indeterminate (open-ended)',
  args: {
    title: 'Exploratory research on caching strategies',
    mode: 'indeterminate',
    steps: [
      { id: 's1', label: 'Survey Redis documentation', status: 'completed' },
      { id: 's2', label: 'Benchmark Memcached vs Redis', status: 'active' },
      { id: 's3', label: 'Prototype with Dragonfly', status: 'pending' },
    ],
    reasoning: 'The number of additional steps depends on what the benchmarks reveal.',
  },
};

export const StateEmpty: Story = {
  name: 'State: No Steps (empty)',
  args: {
    title: 'Pending plan generation',
    steps: [],
  },
};

// ============================================================
// PROTOTYPING STORIES
// ============================================================

/** Interactive prototype: click steps to select them */
export const PrototypeStepSelection: Story = {
  name: 'Prototype: Step Selection',
  render: () => {
    const plan = generateMockPlan({ stepCount: 5, includeConfidence: true, includeReasoning: true });
    const [activeStepId, setActiveStepId] = useState<string>(plan.steps[1]?.id ?? '');
    const [lastClicked, setLastClicked] = useState<string>('(none)');

    const handleStepClick = (step: PlanStep) => {
      setActiveStepId(step.id);
      setLastClicked(step.label);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '560px' }}>
        <div style={{ fontSize: '13px', color: '#888' }}>
          Last clicked: <strong>{lastClicked}</strong>
        </div>
        <PlanCard
          {...plan}
          activeStepId={activeStepId}
          onStepClick={handleStepClick}
          showConfidence
        />
      </div>
    );
  },
};

/** Live execution simulation: steps auto-advance pending → active → completed */
export const PrototypeLiveExecution: Story = {
  name: 'Prototype: Live Execution',
  render: () => {
    const plan = generateMockPlan({ stepCount: 6, includeConfidence: true });
    const [steps, setSteps] = useState<PlanStep[]>(plan.steps);
    const [running, setRunning] = useState(false);
    const [cancelFn, setCancelFn] = useState<(() => void) | null>(null);

    const handleStart = () => {
      // Reset steps
      setSteps(plan.steps.map((s) => ({ ...s, status: 'pending' as const })));
      setRunning(true);
      const { cancel } = simulatePlanExecution({
        steps: plan.steps.map((s) => ({ ...s, status: 'pending' as const })),
        onUpdate: (updated) => setSteps(updated),
        intervalMs: 1200,
      });
      setCancelFn(() => cancel);
    };

    const handleStop = () => {
      cancelFn?.();
      setRunning(false);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '560px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleStart}
            disabled={running}
            style={{ padding: '6px 16px', borderRadius: '6px', cursor: running ? 'default' : 'pointer' }}
          >
            ▶ Start simulation
          </button>
          <button
            onClick={handleStop}
            disabled={!running}
            style={{ padding: '6px 16px', borderRadius: '6px', cursor: !running ? 'default' : 'pointer' }}
          >
            ✕ Stop
          </button>
        </div>
        <PlanCard
          title={plan.title}
          steps={steps}
          assumptions={plan.assumptions}
          showConfidence
        />
      </div>
    );
  },
};

// ============================================================
// PRODUCTION STORIES
// ============================================================

/** Production: realistic software planning task */
export const ProductionSoftwarePlan: Story = {
  name: 'Production: Software Planning Task',
  args: {
    title: 'Implement OAuth 2.0 with PKCE',
    mode: 'determinate',
    showConfidence: true,
    steps: [
      { id: 'p1', label: 'Research PKCE spec (RFC 7636)', status: 'completed', confidence: 98 },
      { id: 'p2', label: 'Design token storage strategy', status: 'completed', confidence: 91 },
      { id: 'p3', label: 'Implement authorization code flow', status: 'active', confidence: 84,
        reasoning: 'PKCE flow prevents auth code interception in public clients without a client secret.' },
      { id: 'p4', label: 'Add token refresh with sliding expiry', status: 'pending', confidence: 79 },
      { id: 'p5', label: 'Write integration tests', status: 'pending', confidence: 87 },
      { id: 'p6', label: 'Security audit & pen test', status: 'pending', confidence: 72 },
    ],
    assumptions: [
      'Identity provider supports PKCE',
      'Frontend is a SPA (no client secret)',
      'Token storage uses httpOnly cookies',
    ],
    reasoning: 'PKCE is the recommended OAuth 2.0 flow for SPAs as of RFC 9700. The sequential steps ensure each security layer is validated before proceeding.',
  },
};

/** Production: data analysis task with indeterminate steps */
export const ProductionDataAnalysis: Story = {
  name: 'Production: Data Analysis (Indeterminate)',
  args: {
    title: 'Diagnose API latency regression',
    mode: 'indeterminate',
    showConfidence: true,
    steps: [
      { id: 'd1', label: 'Pull last 7 days of trace data', status: 'completed', confidence: 99 },
      { id: 'd2', label: 'Identify p99 latency outliers', status: 'completed', confidence: 94 },
      { id: 'd3', label: 'Correlate with recent deploys', status: 'active', confidence: 81 },
      { id: 'd4', label: 'Isolate DB query bottleneck', status: 'pending', confidence: 70 },
    ],
    reasoning: 'Additional steps may be added depending on whether the bottleneck is in the DB layer, network, or application code.',
    assumptions: [
      'Datadog traces are available for the time window',
      'Deploy log access is granted',
    ],
  },
};
