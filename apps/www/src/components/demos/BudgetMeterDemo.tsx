'use client';

import { BudgetMeter } from '@/depute/components/BudgetMeter';

export function BudgetMeterDemo() {
  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <BudgetMeter
        label="Session Tokens"
        spent={45000}
        limit={50000}
        unit="tokens"
        burnRate={1200}
      />
    </div>
  );
}
