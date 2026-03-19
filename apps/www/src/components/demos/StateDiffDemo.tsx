'use client';

import { StateDiff } from '@/depute/components/StateDiff';

export function StateDiffDemo() {
  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <StateDiff
        title="Configuration Changes"
        entries={[
          {
            path: 'max_instances',
            type: 'modified',
            before: '2',
            after: '5',
          },
          {
            path: 'auto_scaling',
            type: 'modified',
            before: 'false',
            after: 'true',
          },
          {
            path: 'region',
            type: 'added',
            after: 'us-east-1',
          },
          {
            path: 'legacy_mode',
            type: 'removed',
            before: 'true',
          },
        ]}
      />
    </div>
  );
}
