import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ApprovalGate } from '../src/components/ApprovalGate';
import { generateMockApproval, MOCK_APPROVAL_SCENARIOS } from '../src/utils/mockData';

const meta: Meta<typeof ApprovalGate> = {
  title: 'AX Components/ApprovalGate',
  component: ApprovalGate,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['simple', 'staged'] },
    status: { control: 'select', options: ['pending', 'approved', 'rejected', 'expired'] },
    confidence: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    timeoutSeconds: { control: { type: 'number', min: 0 } },
  },
};

export default meta;
type Story = StoryObj<typeof ApprovalGate>;

// ============================================================
// SHARED STORIES
// ============================================================

export const Default: Story = {
  args: generateMockApproval({ status: 'pending', mode: 'simple' }),
};

export const AllFeatures: Story = {
  args: generateMockApproval({
    mode: 'staged',
    status: 'pending',
    timeoutSeconds: 120,
    scope: { resourceLimit: '$500', durationSeconds: 600, target: 'Stripe API only' },
    metadata: { 'Initiated by': 'Agent v2.1', 'Risk level': 'Medium' },
  }),
};

// State stories
export const StatePending: Story = {
  name: 'State: Pending',
  args: generateMockApproval({ status: 'pending' }),
};

export const StateApproved: Story = {
  name: 'State: Approved',
  args: generateMockApproval({ status: 'approved' }),
};

export const StateRejected: Story = {
  name: 'State: Rejected',
  args: generateMockApproval({ status: 'rejected' }),
};

export const StateExpired: Story = {
  name: 'State: Expired (Countdown)',
  args: generateMockApproval({ status: 'pending', timeoutSeconds: 30 }),
};

// ============================================================
// PROTOTYPING STORIES
// ============================================================

export const PrototypeQuickStart: Story = {
  name: 'Quick Start: Prototype Approval Flow',
  render: () => {
    const base = generateMockApproval({ status: 'pending', mode: 'simple' });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');

    return (
      <ApprovalGate
        {...base}
        status={status}
        onApprove={() => setStatus('approved')}
        onReject={() => setStatus('rejected')}
      />
    );
  },
};

export const TestVariations: Story = {
  name: 'Test Different Approval Scenarios',
  render: () => {
    const [idx, setIdx] = useState(0);
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    const scenario = MOCK_APPROVAL_SCENARIOS[idx % MOCK_APPROVAL_SCENARIOS.length];

    const switchScenario = (i: number) => {
      setIdx(i);
      setStatus('pending');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontFamily: 'sans-serif', fontSize: '0.75rem' }}>
          {MOCK_APPROVAL_SCENARIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => switchScenario(i)}
              style={{
                padding: '0.25rem 0.625rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: idx === i ? '#1d4ed8' : '#fff',
                color: idx === i ? '#fff' : '#333',
                cursor: 'pointer',
              }}
            >
              {s.title}
            </button>
          ))}
        </div>
        <ApprovalGate
          title={scenario.title}
          description={scenario.description}
          agentReasoning="This action is required to complete the current workflow step."
          status={status}
          mode="simple"
          confidence={75}
          onApprove={() => setStatus('approved')}
          onReject={() => setStatus('rejected')}
        />
      </div>
    );
  },
};

export const SimulateRealTimeUpdates: Story = {
  name: 'Simulate Real-Time Updates — Staged Mode',
  render: () => {
    const base = generateMockApproval({ mode: 'staged', status: 'pending', confidence: 72 });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    const [key, setKey] = useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ApprovalGate
          {...base}
          key={key}
          status={status}
          onApprove={() => setStatus('approved')}
          onReject={() => setStatus('rejected')}
        />
        <button
          onClick={() => { setStatus('pending'); setKey((k) => k + 1); }}
          style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontFamily: 'sans-serif' }}
        >
          ↺ Reset
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
    title: 'Send external email',
    description: 'The agent will send a follow-up email to 3 recipients.',
    agentReasoning: 'The task requires notifying stakeholders of the completed analysis.',
    status: 'pending',
    mode: 'simple',
    confidence: 88,
  },
};

export const WithRealAPIData: Story = {
  name: 'With Real API Data — Scoped Grant',
  args: {
    title: 'Submit refund via Stripe',
    description: 'A refund of $47.99 will be issued to the customer's original payment method.',
    agentReasoning: 'Customer requested refund within the 30-day policy window. Eligibility confirmed.',
    status: 'pending',
    mode: 'simple',
    confidence: 96,
    scope: {
      resourceLimit: '$100',
      durationSeconds: 300,
      target: 'Stripe API — /v1/refunds only',
    },
    metadata: {
      'Order ID': 'ORD-28471',
      'Customer': 'jane.doe@example.com',
      'Refund amount': '$47.99',
    },
  },
};

export const ErrorHandling: Story = {
  name: 'Error Handling — Expired Gate',
  args: {
    title: 'Delete archived records',
    description: 'This action will permanently delete 842 archived records older than 2 years.',
    agentReasoning: 'Records meet the data retention policy threshold for deletion.',
    status: 'expired',
    mode: 'simple',
    confidence: 62,
    timeoutSeconds: 60,
  },
};
