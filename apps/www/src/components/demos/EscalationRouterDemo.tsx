'use client';

import { EscalationRouter } from '@/depute/components/EscalationRouter';
import { generateMockEscalation } from '@/depute/utils/mockData';

const escalation = generateMockEscalation();

export function EscalationRouterDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <EscalationRouter {...escalation} onRetry={() => {}} onReassign={() => {}} onCancelBranch={() => {}} />
    </div>
  );
}
