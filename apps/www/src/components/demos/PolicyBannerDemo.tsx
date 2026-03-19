'use client';

import { PolicyBanner } from '@/depute/components/PolicyBanner';

export function PolicyBannerDemo() {
  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <PolicyBanner
        mode="simulation"
        label="Dry Run Mode"
        description="Agent actions will be simulated and logged, but no external APIs will be mutated."
        constraints={[
          { label: 'Network', value: 'Mocked Responses' },
          { label: 'Database', value: 'Read-only connection' },
        ]}
      />
    </div>
  );
}
