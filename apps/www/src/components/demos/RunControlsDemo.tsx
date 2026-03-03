'use client';

import { useState } from 'react';
import { RunControls } from '@/depute/components/RunControls';
import type { RunState } from '@/depute/types/common';

export function RunControlsDemo() {
  const [state, setState] = useState<RunState>('idle');

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <RunControls
        state={state}
        showLabel
        onStart={() => setState('running')}
        onPause={() => setState('paused')}
        onStop={() => setState('idle')}
        onRetry={() => setState('running')}
      />
    </div>
  );
}
