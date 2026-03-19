'use client';

import { useState } from 'react';
import { RollbackTimeline, type RollbackPoint } from '@/depute/components/RollbackTimeline';

const initialPoints: RollbackPoint[] = [
  { id: '1', label: 'Provisioned database', status: 'available', timestamp: '12:00:00', reversible: true },
  { id: '2', label: 'Ran schema migrations', status: 'available', timestamp: '12:01:15', reversible: true, dependentCount: 1 },
  { id: '3', label: 'Inserted seed data', status: 'current', timestamp: '12:02:30', reversible: true },
];

export function RollbackTimelineDemo() {
  const [points, setPoints] = useState<RollbackPoint[]>(initialPoints);

  const handleRollback = (targetId: string) => {
    setPoints(pts => pts.map(p => {
      if (p.id === targetId) return { ...p, status: 'current' };
      if (p.id > targetId) return { ...p, status: 'rolled-back' };
      return { ...p, status: 'available' };
    }));
  };

  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <RollbackTimeline
        title="Deployment Steps"
        points={points}
        onRollback={handleRollback}
      />
    </div>
  );
}
