'use client';

import { DecisionRecord } from '@/depute/components/DecisionRecord';

export function DecisionRecordDemo() {
  return (
    <div style={{ padding: '1rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <DecisionRecord
        decision="approved"
        approver={{
          name: 'Alice Engineering',
          role: 'DevOps',
          timestamp: new Date().toLocaleString(),
        }}
        agentContext={{
          intent: 'Restart production API gateway',
          policyInvoked: 'INFRA-001',
        }}
        humanReasoning="Verified metrics on Datadog. Latency spike requires restart."
      />
    </div>
  );
}
