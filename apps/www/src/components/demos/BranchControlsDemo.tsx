'use client';

import { BranchControls } from '@/depute/components/BranchControls';

export function BranchControlsDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <BranchControls
        branchName="branch-auth-3a"
        status="running"
        onPause={() => {}}
        onResume={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}
