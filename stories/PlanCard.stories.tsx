import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlanCard } from '../src/components/PlanCard';
import type { PlanStep } from '../src/types/common';
import { generateMockPlan, simulatePlanExecution } from '../src/utils/mockData';

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

const { title, steps, assumptions } = generateMockPlan({ stepCount: 4 });

export const Default: Story = {
  args: {
    title,
    steps,
  },
};

export const AllFeatures: Story = {
  args: {
    title,
    steps,
    assumptions,
    reasoning: 'A sequential approach ensures each step is validated before proceeding to the next.',
    mode: 'determinate',
    showConfidence: true,
  },
};

// State stories
export const AllPending: Story = {
  name: 'State: All Pending',
  args: {
    title: 'Preparing analysis',
    steps: generateMockPlan({ stepCount: 4 }).steps.map((s) => ({ ...s, status: 'pending' as const })),
  },
};

export const InProgress: Story = {
  name: 'State: In Progress',
  args: {
    title: 'Running analysis',
    steps: generateMockPlan({ stepCount: 4 }).steps.map((s, i) => ({
      ...s,
      status: i === 0 ? 'completed' : i === 1 ? 'active' : 'pending',
    } as PlanStep)),
  },
};

export const Completed: Story = {
  name: 'State: Completed',
  args: {
    title: 'Analysis complete',
    steps: generateMockPlan({ stepCount: 4 }).steps.map((s) => ({ ...s, status: 'completed' as const })),
  },
};

export const Failed: Story = {
  name: 'State: Failed',
  args: {
    title: 'Analysis failed',
    steps: generateMockPlan({ stepCount: 4 }).steps.map((s, i) => ({
      ...s,
      status: i < 2 ? 'completed' : i === 2 ? 'failed' : 'pending',
    } as PlanStep)),
  },
};

export const Indeterminate: Story = {
  name: 'State: Indeterminate',
  args: {
    title: 'Processing (open-ended)',
    steps: [],
    mode: 'indeterminate',
  },
};

// ============================================================
// PROTOTYPING STORIES
// ============================================================

export const PrototypeQuickStart: Story = {
  name: 'Quick Start: Prototype Plan Execution Flow',
  render: () => {
    const plan = generateMockPlan({ stepCount: 5, includeConfidence: true });
    const [liveSteps, setLiveSteps] = useState<PlanStep[]>(plan.steps);

    useEffect(() => {
      const { cancel } = simulatePlanExecution({
        steps: plan.steps,
        onUpdate: setLiveSteps,
        intervalMs: 1200,
      });
      return cancel;
    }, []);

    return (
      <PlanCard
        title={plan.title}
        steps={liveSteps}
        assumptions={plan.assumptions}
        showConfidence
      />
    );
  },
};

export const TestVariations: Story = {
  name: 'Test Different Step Counts',
  render: () => {
    const [count, setCount] = useState(3);
    const plan = generateMockPlan({ stepCount: count, includeConfidence: true });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', fontFamily: 'sans-serif', fontSize: '0.875rem' }}>
          {[2, 3, 5, 8].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              style={{
                padding: '0.25rem 0.75rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: count === n ? '#1d4ed8' : '#fff',
                color: count === n ? '#fff' : '#333',
                cursor: 'pointer',
              }}
            >
              {n} steps
            </button>
          ))}
        </div>
        <PlanCard title={plan.title} steps={plan.steps} showConfidence assumptions={plan.assumptions} />
      </div>
    );
  },
};

export const SimulateRealTimeUpdates: Story = {
  name: 'Simulate Real-Time Updates',
  render: () => {
    const plan = generateMockPlan({ stepCount: 6, includeConfidence: true, includeReasoning: true });
    const [liveSteps, setLiveSteps] = useState<PlanStep[]>(plan.steps);
    const [key, setKey] = useState(0);

    useEffect(() => {
      setLiveSteps(plan.steps);
      const { cancel } = simulatePlanExecution({
        steps: plan.steps,
        onUpdate: setLiveSteps,
        intervalMs: 800,
      });
      return cancel;
    }, [key]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <PlanCard
          title={plan.title}
          steps={liveSteps}
          showConfidence
          assumptions={plan.assumptions}
          reasoning={plan.reasoning}
        />
        <button
          onClick={() => setKey((k) => k + 1)}
          style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontFamily: 'sans-serif' }}
        >
          ↺ Restart simulation
        </button>
      </div>
    );
  },
};

// ============================================================
// PRODUCTION STORIES
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    title: 'Summarize Q4 report',
    steps: [
      { id: '1', label: 'Load document', status: 'completed' },
      { id: '2', label: 'Extract key metrics', status: 'active' },
      { id: '3', label: 'Generate summary', status: 'pending' },
    ],
  },
};

export const WithRealAPIData: Story = {
  name: 'With Real API Data',
  args: {
    title: 'Process customer refund request',
    steps: [
      { id: '1', label: 'Validate request ID', status: 'completed', confidence: 98 },
      { id: '2', label: 'Check eligibility window', status: 'completed', confidence: 91 },
      { id: '3', label: 'Calculate refund amount', status: 'active', confidence: 84 },
      { id: '4', label: 'Submit to payment processor', status: 'pending', confidence: 79 },
      { id: '5', label: 'Send confirmation email', status: 'pending' },
    ],
    assumptions: ['Policy window is 30 days from purchase', 'Original payment method is still valid'],
    showConfidence: true,
  },
};

export const ErrorHandling: Story = {
  name: 'Error Handling',
  args: {
    title: 'Data pipeline failed',
    steps: [
      { id: '1', label: 'Connect to data source', status: 'completed' },
      { id: '2', label: 'Validate schema', status: 'completed' },
      { id: '3', label: 'Transform records', status: 'failed', reasoning: 'Unexpected null value in required field "customer_id" at row 1,204.' },
      { id: '4', label: 'Write to destination', status: 'pending' },
    ],
  },
};
