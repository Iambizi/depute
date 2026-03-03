'use client';

import { SwarmInbox } from '@/depute/components/SwarmInbox';
import { generateMockSwarmInbox } from '@/depute/utils/mockData';

const items = generateMockSwarmInbox(5);

export function SwarmInboxDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <SwarmInbox items={items} />
    </div>
  );
}
