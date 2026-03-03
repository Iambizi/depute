'use client';

import { OrchestratorView } from '@/depute/components/OrchestratorView';
import { generateMockOrchestratorTree } from '@/depute/utils/mockData';

const nodes = generateMockOrchestratorTree();

export function OrchestratorViewDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <OrchestratorView nodes={nodes} />
    </div>
  );
}
