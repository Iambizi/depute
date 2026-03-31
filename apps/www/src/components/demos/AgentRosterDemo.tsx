'use client';

import { useState, useEffect } from 'react';
import { AgentRoster } from '@/depute/components/AgentRoster';
import { generateMockAgentRoster } from '@/depute/utils/mockData';

export function AgentRosterDemo() {
  const [mounted, setMounted] = useState(false);
  const [agents] = useState(() => generateMockAgentRoster(4));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ padding: '1rem' }}>
      <AgentRoster agents={agents} />
    </div>
  );
}
