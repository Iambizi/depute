'use client';

import { PlanCard } from '@/depute/components/PlanCard';

const steps = [
  { id: '1', label: 'Fetch customer data from CRM', status: 'completed' as const },
  { id: '2', label: 'Cross-reference billing records', status: 'completed' as const },
  { id: '3', label: 'Generate summary report', status: 'active' as const, confidence: 0.85 },
  { id: '4', label: 'Send notification to stakeholders', status: 'pending' as const },
];

export function PlanCardDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <PlanCard
        title="Customer Analysis Pipeline"
        steps={steps}
        assumptions={['CRM access is authenticated', 'Billing data is up to date']}
      />
    </div>
  );
}
