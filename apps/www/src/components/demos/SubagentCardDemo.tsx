'use client';

import { SubagentCard } from '@/depute/components/SubagentCard';

export function SubagentCardDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <SubagentCard
        agentName="Code-Writer-1"
        role="Code Writer"
        status="working"
        currentTask="Generating TypeScript interfaces from JSON schema"
        planStepCount={5}
        planStepsCompleted={3}
        tokensUsed={8420}
      />
    </div>
  );
}
