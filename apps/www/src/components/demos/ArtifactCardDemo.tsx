'use client';

import { ArtifactCard } from '@/depute/components/ArtifactCard';

const artifact = {
  id: 'art-1',
  title: 'Analysis Report',
  type: 'markdown' as const,
  content: '# Analysis Report\n\nKey findings from the customer data analysis:\n\n1. **Revenue Growth**: 23% YoY increase\n2. **Churn Rate**: Decreased to 4.2%\n3. **Top Segment**: Enterprise accounts',
  timestamp: new Date().toISOString(),
  sourceStepId: 'step-3',
};

export function ArtifactCardDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <ArtifactCard
        artifact={artifact}
        onExport={(fmt) => alert("Export as " + fmt)}
      />
    </div>
  );
}
