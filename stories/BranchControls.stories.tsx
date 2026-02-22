import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BranchControls } from '../src/components/BranchControls';

const meta: Meta<typeof BranchControls> = {
  title: 'AX Components v1/BranchControls',
  component: BranchControls,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['running', 'paused', 'quarantined'] },
    branchName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof BranchControls>;

// ============================================================
// SHARED
// ============================================================

export const Default: Story = {
  args: { branchName: 'branch-auth-3a', status: 'running' },
};

export const StateRunning: Story = {
  name: 'State: Running',
  args: { branchName: 'branch-research-7f', status: 'running' },
};

export const StatePaused: Story = {
  name: 'State: Paused',
  args: { branchName: 'branch-auth-3a', status: 'paused' },
};

export const StateQuarantined: Story = {
  name: 'State: Quarantined',
  args: { branchName: 'branch-payments-2b', status: 'quarantined' },
};

export const WithThrottle: Story = {
  name: 'State: Running with Throttle Option',
  args: { branchName: 'branch-data-9c', status: 'running', onThrottle: undefined },
};

// ============================================================
// PROTOTYPING
// ============================================================

export const PrototypeStatusCycle: Story = {
  name: 'Prototype: Interactive Status Transitions',
  render: () => {
    const [status, setStatus] = useState<'running' | 'paused' | 'quarantined'>('running');
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <BranchControls
          branchName="branch-auth-3a"
          status={status}
          onPause={() => { setStatus('paused'); addLog('⏸ Branch paused'); }}
          onResume={() => { setStatus('running'); addLog('▶ Branch resumed'); }}
          onQuarantine={() => { setStatus('quarantined'); addLog('🔒 Branch quarantined'); }}
          onThrottle={() => addLog('↓ Throttle applied')}
          onCancel={() => addLog('⊘ Branch cancelled')}
        />
        {log.length > 0 && (
          <div style={{ fontFamily: 'sans-serif', fontSize: '11px', padding: '8px 12px', background: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb', color: '#374151' }}>
            <strong>Event Log</strong>
            {log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        )}
      </div>
    );
  },
};

// ============================================================
// PRODUCTION
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    branchName: 'branch-auth-refactor-3a',
    status: 'running',
    onPause: undefined,
    onResume: undefined,
    onQuarantine: undefined,
    onCancel: undefined,
  },
};

export const MultipleBranches: Story = {
  name: 'Production: Multiple Branches Side by Side',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {(['running', 'paused', 'quarantined'] as const).map((s) => (
        <BranchControls key={s} branchName={`branch-${s}-x7`} status={s}
          onPause={() => {}} onResume={() => {}} onQuarantine={() => {}} onCancel={() => {}} />
      ))}
    </div>
  ),
};
