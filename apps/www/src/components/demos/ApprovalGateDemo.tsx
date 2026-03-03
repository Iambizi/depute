'use client';

import { useState } from 'react';
import { ApprovalGate } from '@/depute/components/ApprovalGate';

export function ApprovalGateDemo() {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  return (
    <div style={{ padding: '1rem' }}>
      <ApprovalGate
        title="Send external email"
        description="The agent will send a follow-up email to 3 recipients."
        agentReasoning="The task requires notifying stakeholders of the completed analysis."
        status={status}
        mode="simple"
        confidence={88}
        onApprove={() => setStatus('approved')}
        onReject={() => setStatus('rejected')}
      />
    </div>
  );
}
