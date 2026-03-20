'use client';

import { SessionOverview } from '@/depute/components/SessionOverview';

export function SessionOverviewDemo() {
  return (
    <div style={{ padding: '1rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <SessionOverview
        sessionSummary="Refactored the authentication strategy and updated corresponding unit tests."
        duration="14m 23s"
        surfacesTouched={[
          { type: 'file', label: 'src/auth/index.ts', action: 'write' },
          { type: 'system', label: 'jest-test-runner', action: 'execute' },
        ]}
        keyDecisions={[
          { description: 'Bypassed standard hashing due to legacy auth constraints.' },
        ]}
      />
    </div>
  );
}
