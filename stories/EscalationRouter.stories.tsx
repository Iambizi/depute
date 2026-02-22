import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EscalationRouter } from '../src/components/EscalationRouter';
import { generateMockEscalation } from '../src/utils/mockData';

const meta: Meta<typeof EscalationRouter> = {
  title: 'AX Components v1/EscalationRouter',
  component: EscalationRouter,
  tags: ['autodocs'],
  argTypes: {
    recommendation: { control: 'select', options: ['retry', 'reassign', 'cancel', undefined] },
  },
};

export default meta;
type Story = StoryObj<typeof EscalationRouter>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: {
    ...generateMockEscalation(),
    onRetry: undefined,
    onReassign: undefined,
    onCancelBranch: undefined,
  },
};

export const WithTrace: Story = {
  name: 'State: With Error Trace',
  args: {
    ...generateMockEscalation({
      errorTrace: `TypeError: Cannot read properties of undefined (reading 'id')\n  at processOutput (/agent/runner.js:248:18)\n  at async AgentLoop.step (/agent/runner.js:112:5)`,
    }),
    onRetry: undefined, onReassign: undefined, onCancelBranch: undefined,
  },
};

export const NoTrace: Story = {
  name: 'State: No Error Trace',
  args: {
    ...generateMockEscalation({ errorTrace: undefined }),
    onRetry: undefined, onReassign: undefined, onCancelBranch: undefined,
  },
};

export const RecommendRetry: Story = {
  name: 'State: Recommend Retry',
  args: { ...generateMockEscalation({ recommendation: 'retry' }), onRetry: undefined, onReassign: undefined, onCancelBranch: undefined },
};

export const RecommendReassign: Story = {
  name: 'State: Recommend Reassign',
  args: { ...generateMockEscalation({ recommendation: 'reassign' }), onRetry: undefined, onReassign: undefined, onCancelBranch: undefined },
};

export const RecommendCancel: Story = {
  name: 'State: Recommend Cancel Branch',
  args: { ...generateMockEscalation({ recommendation: 'cancel' }), onRetry: undefined, onReassign: undefined, onCancelBranch: undefined },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const PrototypeInteractive: Story = {
  name: 'Prototype: Interactive Resolution',
  render: () => {
    const [outcome, setOutcome] = useState<string | null>(null);
    const data = generateMockEscalation();

    if (outcome) {
      return (
        <div style={{ fontFamily: 'sans-serif', fontSize: '13px', padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          Resolution chosen: <strong>{outcome}</strong>
          <button onClick={() => setOutcome(null)} style={{ marginLeft: '12px', cursor: 'pointer', padding: '4px 10px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '11px' }}>
            ↺ Reset
          </button>
        </div>
      );
    }

    return (
      <EscalationRouter
        {...data}
        onRetry={() => setOutcome('↺ Retrying same agent')}
        onReassign={() => setOutcome('⇄ Reassigning to a different agent')}
        onCancelBranch={() => setOutcome('⊘ Branch cancelled')}
      />
    );
  },
};

// ============================================================
// PRODUCTION
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    failedAgent: 'Code-Writer-1',
    branchId: 'branch-3a',
    errorSummary: 'Tool call `call_api` returned a 503 Service Unavailable after 3 retries. Agent cannot continue without external API access.',
    errorTrace: `MaxRetriesExceeded: call_api failed after 3 attempts\n  Last response: 503 {"message":"Service temporarily unavailable"}`,
    recommendation: 'retry',
    onRetry: undefined, onReassign: undefined, onCancelBranch: undefined,
  },
};
