import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RunControls } from '../src/components/RunControls';
import type { RunState } from '../src/types/common';

const meta: Meta<typeof RunControls> = {
  title: 'AX Components/RunControls',
  component: RunControls,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'running', 'paused', 'completed', 'failed'],
    },
    showLabel: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RunControls>;

// ============================================================
// SHARED STORIES
// ============================================================

export const Default: Story = {
  args: { state: 'idle', showLabel: true },
};

export const AllFeatures: Story = {
  args: {
    state: 'running',
    showLabel: true,
    actions: <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#6b7280' }}>Custom action slot</span>,
  },
};

// State stories
export const StateIdle: Story = {
  name: 'State: Idle',
  args: { state: 'idle', showLabel: true },
};

export const StateRunning: Story = {
  name: 'State: Running (pulsing dot)',
  args: { state: 'running', showLabel: true },
};

export const StatePaused: Story = {
  name: 'State: Paused',
  args: { state: 'paused', showLabel: true },
};

export const StateCompleted: Story = {
  name: 'State: Completed',
  args: { state: 'completed', showLabel: true },
};

export const StateFailed: Story = {
  name: 'State: Failed (retry available)',
  args: { state: 'failed', showLabel: true },
};

// ============================================================
// PROTOTYPING STORIES
// ============================================================

export const PrototypeQuickStart: Story = {
  name: 'Quick Start: Prototype Run Control Flow',
  render: () => {
    const [state, setState] = useState<RunState>('idle');

    const handlers = {
      onStart: () => setState('running'),
      onPause: () => setState('paused'),
      onStop: () => setState('idle'),
      onRetry: () => setState('running'),
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'sans-serif' }}>
        <RunControls state={state} showLabel {...handlers} />
        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
          Click the buttons to transition through states.
        </span>
      </div>
    );
  },
};

export const TestVariations: Story = {
  name: 'Test Different States',
  render: () => {
    const states: RunState[] = ['idle', 'running', 'paused', 'completed', 'failed'];
    const [current, setCurrent] = useState<RunState>('idle');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontFamily: 'sans-serif', fontSize: '0.75rem' }}>
          {states.map((s) => (
            <button
              key={s}
              onClick={() => setCurrent(s)}
              style={{
                padding: '0.25rem 0.625rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: current === s ? '#1d4ed8' : '#fff',
                color: current === s ? '#fff' : '#333',
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <RunControls state={current} showLabel />
      </div>
    );
  },
};

export const SimulateRealTimeUpdates: Story = {
  name: 'Simulate Real-Time Updates — Auto State Machine',
  render: () => {
    const [state, setState] = useState<RunState>('idle');
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog((prev) => [`${new Date().toLocaleTimeString()}: ${msg}`, ...prev.slice(0, 4)]);

    const handlers = {
      onStart: () => { setState('running'); addLog('Started'); },
      onPause: () => { setState('paused'); addLog('Paused'); },
      onStop: () => { setState('idle'); addLog('Stopped'); },
      onRetry: () => { setState('running'); addLog('Retrying...'); },
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'sans-serif' }}>
        <RunControls state={state} showLabel {...handlers} />
        <div style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {log.map((l, i) => <span key={i}>{l}</span>)}
        </div>
        {state === 'running' && (
          <button
            onClick={() => { setState('failed'); addLog('Simulated failure'); }}
            style={{ width: 'fit-content', padding: '0.25rem 0.75rem', border: '1px solid #fca5a5', borderRadius: '4px', background: '#fef2f2', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            Simulate failure
          </button>
        )}
      </div>
    );
  },
};

// ============================================================
// PRODUCTION STORIES
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: { state: 'idle', showLabel: true },
};

export const WithRealAPIData: Story = {
  name: 'With Real API Data — Running State',
  args: {
    state: 'running',
    showLabel: true,
  },
};

export const ErrorHandling: Story = {
  name: 'Error Handling — Failed with Retry',
  args: {
    state: 'failed',
    showLabel: true,
  },
};
