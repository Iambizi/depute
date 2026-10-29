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

const STORY_NOW = 1_735_689_600_000;

function storyApproval(
  partial?: Parameters<typeof generateMockApproval>[0],
): ReturnType<typeof generateMockApproval> & { now: number } {
  return { ...generateMockApproval(partial), now: STORY_NOW };
}

// ============================================================
// SHARED STORIES
// ============================================================

export const Default: Story = {
  args: storyApproval({ status: 'pending', mode: 'simple' }),
};

export const AllFeatures: Story = {
  args: storyApproval({
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
  args: storyApproval({ status: 'pending' }),
};

export const StateApproved: Story = {
  name: 'State: Approved',
  args: storyApproval({ status: 'approved' }),
};

export const StateRejected: Story = {
  name: 'State: Rejected',
  args: storyApproval({ status: 'rejected' }),
};

export const StateExpired: Story = {
  name: 'State: Expired (Countdown)',
  args: storyApproval({ status: 'pending', timeoutSeconds: 30 }),
};

// ============================================================
// PROTOTYPING STORIES
// ============================================================

export const PrototypeQuickStart: Story = {
  name: 'Quick Start: Prototype Approval Flow',
  render: () => {
    const base = storyApproval({ status: 'pending', mode: 'simple' });
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
    const base = storyApproval({ mode: 'staged', status: 'pending', confidence: 72 });
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

export const AsyncHandoffFlow: Story = {
  name: 'Async Handoff Flow (Anthropic Dispatch Pattern)',
  render: function AsyncHandoffRender() {
    const [status, setStatus] = useState<any>('pending');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ fontSize: '12px', color: '#666', fontFamily: 'sans-serif' }}>
          <strong>Scenario:</strong> The human steps away from the terminal. After 3 seconds, the gate automatically bypasses the blocking UI and hands the approval off to their mobile device via SMS.
        </p>
        <ApprovalGate
          title="Execute Kubernetes Failover"
          description="Traffic will be routed from us-east-1 to us-west-2 immediately."
          agentReasoning="Health checks indicate degrading performance on the primary cluster."
          confidence={85}
          status={status}
          approvalHandoff={{
            timeoutMs: 3000,
            fallbackBehavior: 'block',
          }}
          onApprove={() => setStatus('approved')}
          onReject={() => setStatus('rejected')}
          onHandoff={async (ctx) => {
            console.log('Handed off to mobile:', ctx);
            setStatus('handoff_pending');
          }}
        />
        {status === 'handoff_pending' && (
           <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontFamily: 'sans-serif', fontSize: '12px' }}>
             <button type="button" onClick={() => setStatus('approved')}>Simulate mobile approval</button>
             <button type="button" onClick={() => setStatus('handoff_denied')}>Simulate mobile denial</button>
           </div>
        )}
        {status !== 'pending' && status !== 'handoff_pending' && (
           <button type="button" onClick={() => setStatus('pending')}>Reset gateway</button>
        )}
      </div>
    );
  }
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
    description: "A refund of $47.99 will be issued to the customer's original payment method.",
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
// ============================================================
// COMPOSITION STORIES
// ============================================================

export const WithAutomationBiasAlert: Story = {
  name: 'Composition: With AutomationBiasAlert',
  render: () => {
    const { isAlertTriggered, recordAction, dismissAlert } = require('../src/hooks').useAutomationBias({
       consecutiveApprovals: 2, // Trigger fast for demo
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    const [count, setCount] = useState(0);

    const handleApprove = () => {
      recordAction('approved');
      setStatus('approved');
      setCount(prev => prev + 1);
    };

    const handleReset = () => {
      setStatus('pending');
    };

    const AutomationBiasAlert = require('../src/components/AutomationBiasAlert').AutomationBiasAlert;

    return (
      <div style={{ maxWidth: '600px' }}>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px', fontFamily: 'sans-serif' }}>
          <strong>Approvals:</strong> {count} | <strong>Tip:</strong> Approve twice in a row to trigger the Automation Bias alert.
        </p>
        <AutomationBiasAlert
          isActive={isAlertTriggered}
          onAcknowledge={dismissAlert}
          actionName="the deployment of this script"
        >
          <ApprovalGate
            {...storyApproval({ status, title: 'Production Script Deployment' })}
            onApprove={handleApprove}
            onReject={() => setStatus('rejected')}
          />
        </AutomationBiasAlert>
        {status !== 'pending' && (
          <button 
            onClick={handleReset}
            style={{ marginTop: '1rem', padding: '0.4rem 0.8rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            ↺ Reset for next action
          </button>
        )}
      </div>
    );
  }
};

export const RequiredWhy: Story = {
  name: 'Required why',
  args: {
    ...storyApproval({
      status: 'pending',
      title: 'Pay a new vendor',
      description: 'Approve stays off until the why reaches 100 characters. Reject stays available.',
    }),
    triggers: ['new-payee'],
  },
};

export const SignedReceipt: Story = {
  name: 'Signed receipt',
  args: {
    ...storyApproval({
      status: 'pending',
      title: 'Pay a new vendor',
      description: 'The app key signs the receipt. A passkey is asked only when highStakes is set.',
    }),
    highStakes: true,
    appSigner: {
      sign: async () => ({ publicKey: 'app-public-key', signature: 'app-signature' }),
    },
    passkey: {
      sign: async () => ({
        algorithm: 'ES256',
        publicKey: 'user-public-key',
        signature: 'user-signature',
        authenticatorData: 'authenticator-data',
        clientDataJSON: 'client-data',
      }),
    },
  },
};

export const BlindRecommendation: Story = {
  name: 'Blind recommendation',
  args: {
    ...storyApproval({
      status: 'pending',
      title: 'Pay vendor',
      description: 'Invoice 104 matches the grant.',
      agentReasoning: 'The payee and the purpose are already covered.',
    }),
    agentRecommendation: 'approved',
    blind: true,
  },
};

export const PaymentReview: Story = {
  name: 'Payment review',
  args: {
    ...storyApproval({
      mode: 'staged',
      status: 'pending',
      title: 'Pay a new vendor',
      description: 'Confirm waits until the payee and the amount have been on screen.',
    }),
    presentedPayload: {
      title: 'Pay a new vendor',
      payee: { rail: 'ach', identifier: '021000021:9981', displayName: 'Northwind Supplies' },
      amount: { value: '240.00', currency: 'USD' },
    },
  },
};
