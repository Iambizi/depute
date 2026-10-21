'use client';

import { useEffect, useState } from 'react';
import { DecisionRecord } from '@/depute/components/DecisionRecord';

const RECORDED_AT = '2026-03-20T15:04:00.000Z';

export function DecisionRecordDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ padding: '1rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <DecisionRecord
        decision="approved"
        approver={{
          name: 'Alice Engineering',
          role: 'DevOps',
          timestamp: RECORDED_AT,
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
