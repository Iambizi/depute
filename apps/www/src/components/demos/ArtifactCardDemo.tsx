'use client';

import { ArtifactCard } from '@/depute/components/ArtifactCard';

const artifact = {
  id: 'art-1',
  title: 'Analysis Report',
  type: 'markdown' as const,
  content: `# Analysis Report

## Executive Summary

The analysis identified **3 key themes** across the source documents:

1. **Performance optimization** — 40% of issues are latency-related
2. **Error handling** — 25% of bugs stem from unhandled edge cases
3. **Documentation gaps** — Missing API specs for 12 endpoints

## Recommendations

- Prioritize P0 latency issues in the next sprint
- Add error boundaries to all async flows
- Schedule API documentation review for Q2`,
  timestamp: new Date().toISOString(),
  metadata: {
    'Word count': '248',
    'Generated': new Date().toLocaleString(),
    'Model': 'gemini-2.0-flash',
  },
  sourceStepId: 'step-ivyuntz',
  toolCallIds: ['call-6yhwihb', 'call-rq2psq8'],
};

export function ArtifactCardDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <ArtifactCard
        artifact={artifact}
        exportFormats={['markdown', 'json', 'csv', 'pr']}
        onExport={(fmt) => alert("Export as " + fmt)}
      />
    </div>
  );
}
