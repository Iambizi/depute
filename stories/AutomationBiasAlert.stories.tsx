import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AutomationBiasAlert } from '../src/components/AutomationBiasAlert';
import { ApprovalGate } from '../src/components/ApprovalGate';
import { useAutomationBias } from '../src/hooks/useAutomationBias';
import { generateMockApproval } from '../src/utils/mockData';

const meta: Meta<typeof AutomationBiasAlert> = {
  title: 'AX Components/AutomationBiasAlert',
  component: AutomationBiasAlert,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AutomationBiasAlert>;

export const Default: Story = {
  render: () => {
    const { isAlertTriggered, recordAction, dismissAlert } = useAutomationBias({
       consecutiveApprovals: 3,
       minApprovalTimeMs: 2000
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    const [approvalCount, setApprovalCount] = useState(0);

    const handleApprove = () => {
      recordAction('approved');
      setStatus('approved');
      setApprovalCount(prev => prev + 1);
    };

    const handleReset = () => {
      setStatus('pending');
    };

    return (
      <div style={{ padding: '2rem', maxWidth: '600px' }}>
        <div style={{ marginBottom: '1rem', fontFamily: 'sans-serif' }}>
          <strong>Approvals this session:</strong> {approvalCount} <br/>
          <small>Trigger: 3 consecutive approvals OR approval under 2s</small>
        </div>

        <AutomationBiasAlert
          isActive={isAlertTriggered}
          onAcknowledge={dismissAlert}
          actionName="the deployment of the production database migration"
        >
          <ApprovalGate
            {...generateMockApproval({ status, title: 'Database Migration' })}
            onApprove={handleApprove}
            onReject={() => setStatus('rejected')}
          />
        </AutomationBiasAlert>

        {status !== 'pending' && (
          <button 
            onClick={handleReset}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Next Action
          </button>
        )}
      </div>
    );
  }
};

export const ForcedTrigger: Story = {
  args: {
    isActive: true,
    actionName: 'the dangerous action',
    children: (
      <ApprovalGate
        {...generateMockApproval({ status: 'pending', title: 'Dangerous Action' })}
      />
    )
  }
};
