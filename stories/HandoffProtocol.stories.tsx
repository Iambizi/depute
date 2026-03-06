import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HandoffProtocol } from '../src/components/HandoffProtocol';
import { generateMockHandoff } from '../src/utils/mockData';

const meta: Meta<typeof HandoffProtocol> = {
  title: 'AX Components v1/HandoffProtocol',
  component: HandoffProtocol,
  tags: ['autodocs'],
  argTypes: {
    canIntercept: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof HandoffProtocol>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: {
    ...generateMockHandoff(),
    onAccept: undefined,
    onIntercept: undefined,
    onCancel: undefined,
  },
};

export const WithActions: Story = {
  name: 'State: With All Actions',
  args: generateMockHandoff({ canIntercept: true }) as object,
};

export const NoIntercept: Story = {
  name: 'State: No Intercept Option',
  args: { ...generateMockHandoff({ canIntercept: false }) as object },
};

export const MinimalPayload: Story = {
  name: 'State: Minimal (No Payload / No NextRequest)',
  args: {
    sourceAgent: 'Researcher-A',
    destinationAgent: 'Code-Writer-1',
    goal: 'Implement the caching layer',
    summary: 'Research complete. Findings documented.',
    canIntercept: true,
  },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const PrototypeInteractive: Story = {
  name: 'Prototype: Interactive Accept / Intercept / Cancel',
  render: () => {
    const [outcome, setOutcome] = useState<string | null>(null);
    const data = generateMockHandoff();

    if (outcome) {
      return (
        <div style={{ fontFamily: 'sans-serif', fontSize: '13px', padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          Outcome: <strong>{outcome}</strong>
          <button onClick={() => setOutcome(null)} style={{ marginLeft: '12px', cursor: 'pointer', padding: '4px 10px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '11px' }}>
            ↺ Reset
          </button>
        </div>
      );
    }

    return (
      <HandoffProtocol
        {...data}
        onAccept={() => setOutcome('Handoff accepted')}
        onIntercept={() => setOutcome('Intercepted — user is overriding')}
        onCancel={() => setOutcome('Handoff cancelled')}
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
    sourceAgent: 'Researcher-A',
    destinationAgent: 'Code-Writer-1',
    goal: 'Implement caching layer for the auth service',
    summary: 'Completed research. Found 3 redundant DB queries in session validation. Drafted caching strategy using Redis TTL. Plan has been approved.',
    payload: [
      { label: 'Approved Plan', value: 'plan-7f3a2b' },
      { label: 'Approach', value: 'Cache at API gateway using Redis with 15m TTL' },
      { label: 'Token Budget Left', value: '12,400 tokens' },
    ],
    nextRequest: 'Implement the Redis integration and write unit tests for the updated middleware.',
    canIntercept: true,
  },
};
