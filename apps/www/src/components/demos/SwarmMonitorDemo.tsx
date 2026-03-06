'use client';

import { SwarmMonitor } from '@/depute/components/SwarmMonitor';
import { generateMockSwarmMetrics } from '@/depute/utils/mockData';

const metrics = generateMockSwarmMetrics();

export function SwarmMonitorDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <SwarmMonitor {...metrics} onGlobalPause={() => {}} onGlobalKill={() => {}} />
    </div>
  );
}
