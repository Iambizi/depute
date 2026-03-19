'use client';

import { useState } from 'react';
import { BindingApproval } from '@/depute/components/BindingApproval';

export function BindingApprovalDemo() {
  const [status, setStatus] = useState<'reviewing' | 'signing' | 'signed' | 'rejected'>('reviewing');

  const handleSign = () => {
    setStatus('signing');
    setTimeout(() => setStatus('signed'), 2000); // Simulate cryptographic signature delay
  };

  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <BindingApproval
        title="Wire Transfer Authorization"
        description="Agent requests authorization to execute a $5,000 wire transfer."
        impactStatement="$5,000.00 will be transferred immediately. This action is irreversible."
        signerIdentity="alice@company.com"
        status={status}
        isSigning={status === 'signing'}
        terms={[
          { id: 't1', text: 'I authorize the transfer of $5,000.00', acknowledged: false },
          { id: 't2', text: 'I understand this action is irreversible', acknowledged: false },
        ]}
        onSign={handleSign}
        onReject={() => setStatus('rejected')}
      />
    </div>
  );
}
