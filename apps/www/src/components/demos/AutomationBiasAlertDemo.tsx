'use client';

import { useState } from 'react';
import { AutomationBiasAlert } from '@/depute/components/AutomationBiasAlert';
import { ApprovalGate } from '@/depute/components/ApprovalGate';
import { useAutomationBias } from '@/depute/hooks/useAutomationBias';

export function AutomationBiasAlertDemo() {
  const [gateStatus, setGateStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  
  const { 
    isAlertTriggered, 
    recordAction, 
    dismissAlert 
  } = useAutomationBias({
    consecutiveApprovals: 3, // Lower for demo
    minApprovalTimeMs: 2000,
    approvalRateCeiling: 0.9
  });

  const handleApprove = () => {
    recordAction('approved');
    setGateStatus('approved');
    // Reset for demo after a delay
    setTimeout(() => setGateStatus('pending'), 2000);
  };

  const handleReject = () => {
    recordAction('rejected');
    setGateStatus('rejected');
    setTimeout(() => setGateStatus('pending'), 2000);
  };

  return (
    <div style={{ padding: '1rem', position: 'relative' }}>
      <AutomationBiasAlert
        isActive={isAlertTriggered}
        onAcknowledge={dismissAlert}
        actionName="invoice batch processing"
      >
        <ApprovalGate
          title="Batch Process Invoices"
          description="Approve this batch of 50 automated invoice reconciliations."
          agentReasoning="Matches detected between ledger and bank statements exceed 98% confidence."
          status={gateStatus}
          mode="simple"
          confidence={99}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </AutomationBiasAlert>
      
      <div style={{ marginTop: '1rem', fontSize: '12px', color: '#666' }}>
        <p><strong>Demo Guide:</strong> Try approving repeatedly or very quickly to trigger the friction overlay. (Threshold: 3 approvals or &lt;2s duration)</p>
      </div>
    </div>
  );
}
