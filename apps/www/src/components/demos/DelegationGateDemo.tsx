'use client';

import { DelegationGate } from '@/depute/components/DelegationGate';
import { generateMockDelegationGate } from '@/depute/utils/mockData';

const gate = generateMockDelegationGate();

export function DelegationGateDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <DelegationGate {...gate} onApprove={() => {}} onDeny={() => {}} />
    </div>
  );
}
