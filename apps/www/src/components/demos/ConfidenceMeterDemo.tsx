'use client';

import { ConfidenceMeter } from '@/depute/components/ConfidenceMeter';

export function ConfidenceMeterDemo() {
  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <ConfidenceMeter
        value={74}
        display="meter"
        showLabel
        showValue
        reasoning="Score is slightly lower due to ambiguous phrasing in the third source document."
      />
    </div>
  );
}
