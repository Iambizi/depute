'use client';

import { AgentRoster } from '@/depute/components/AgentRoster';
import { generateMockAgentRoster } from '@/depute/utils/mockData';

const agents = generateMockAgentRoster(4);

export function AgentRosterDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <AgentRoster agents={agents} />
    </div>
  );
}
