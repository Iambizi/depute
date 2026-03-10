import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DelegationGate } from '../src/components/DelegationGate';
import { generateMockDelegationGate } from '../src/utils/mockData';

const meta: Meta<typeof DelegationGate> = {
  title: 'AX Components v1/DelegationGate',
  component: DelegationGate,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DelegationGate>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: {
    ...generateMockDelegationGate(),
    onApprove: undefined,
    onDeny: undefined,
  },
};

export const NoTools: Story = {
  name: 'State: No Tool Constraints',
  args: {
    ...generateMockDelegationGate(),
    proposedSubagent: {
      role: 'Summarizer',
      mandate: 'Summarize the 12 research papers in the /docs folder',
      estimatedTokens: 8000,
      estimatedCost: '$0.12',
    },
    onApprove: undefined,
    onDeny: undefined,
  },
};

export const HighCost: Story = {
  name: 'State: High Cost Request',
  args: {
    ...generateMockDelegationGate(),
    proposedSubagent: {
      role: 'Data Analyst',
      mandate: 'Analyze and visualize all 500,000 rows of the transactions dataset',
      allowedTools: ['query_db', 'execute_code', 'write_file'],
      maxDepth: 3,
      estimatedTokens: 150000,
      estimatedCost: '$2.25',
    },
    onApprove: undefined,
    onDeny: undefined,
  },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const PrototypeInteractive: Story = {
  name: 'Prototype: Approve / Deny Gate',
  render: () => {
    const [outcome, setOutcome] = useState<string | null>(null);
    const data = generateMockDelegationGate();

    if (outcome) {
      return (
        <div style={{ fontFamily: 'sans-serif', fontSize: '13px', padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          Outcome: <strong>{outcome}</strong>
          <button onClick={() => setOutcome(null)} style={{ marginLeft: '12px', cursor: 'pointer', padding: '4px 10px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '11px' }}>
            ↺ Try Again
          </button>
        </div>
      );
    }

    return (
      <DelegationGate
        {...data}
        onApprove={() => setOutcome('Spawn approved — new agent is launching')}
        onDeny={() => setOutcome('Spawn denied — task returned to orchestrator')}
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
    requestingAgent: 'Orchestrator-Prime',
    proposedSubagent: {
      role: 'Code Writer',
      mandate: 'Write and test a data migration script for the users table',
      allowedTools: ['bash', 'read_file', 'write_file', 'run_tests'],
      maxDepth: 1,
      estimatedTokens: 18000,
      estimatedCost: '$0.27',
    },
    onApprove: undefined,
    onDeny: undefined,
  },
};
// ============================================================
// COMPOSITION
// ============================================================

export const WithAutomationBiasAlert: Story = {
  name: 'Composition: With AutomationBiasAlert',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isAlertTriggered, recordAction, dismissAlert } = require('../src/hooks').useAutomationBias({
      consecutiveApprovals: 2, // Trigger fast for demo
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [outcome, setOutcome] = useState<string | null>(null);
    const data = generateMockDelegationGate();

    if (outcome) {
      return (
        <div style={{ fontFamily: 'sans-serif', fontSize: '13px', padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          Outcome: <strong>{outcome}</strong>
          <button onClick={() => { setOutcome(null); recordAction('approved'); }} style={{ marginLeft: '12px', cursor: 'pointer', padding: '4px 10px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '11px' }}>
            ↺ Trigger Another Spawn
          </button>
        </div>
      );
    }

    const AutomationBiasAlert = require('../src/components/AutomationBiasAlert').AutomationBiasAlert;

    return (
      <div style={{ maxWidth: '600px' }}>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px', fontFamily: 'sans-serif' }}>
          <strong>Tip:</strong> Approve twice in a row to trigger the Automation Bias friction layer.
        </p>
        <AutomationBiasAlert
          isActive={isAlertTriggered}
          onAcknowledge={dismissAlert}
          actionName="the spawning of a new autonomous agent"
        >
          <DelegationGate
            {...data}
            onApprove={() => {
              recordAction('approved');
              setOutcome('Spawn approved!');
            }}
            onDeny={() => {
              recordAction('rejected');
              setOutcome('Spawn denied.');
            }}
          />
        </AutomationBiasAlert>
      </div>
    );
  },
};
