import { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToolTrace } from '../src/components/ToolTrace';
import type { ToolCall } from '../src/types/common';
import { generateMockToolCalls, simulateToolStream } from '../src/utils/mockData';

const meta: Meta<typeof ToolTrace> = {
  title: 'AX Components/ToolTrace',
  component: ToolTrace,
  tags: ['autodocs'],
  argTypes: {
    autoScroll: { control: 'boolean' },
    expandable: { control: 'boolean' },
    maxHeight: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ToolTrace>;

// ============================================================
// SHARED STORIES
// ============================================================

export const Default: Story = {
  args: {
    calls: generateMockToolCalls(4),
    expandable: true,
  },
};

export const AllFeatures: Story = {
  args: {
    calls: generateMockToolCalls(5),
    expandable: true,
    autoScroll: true,
    maxHeight: '20rem',
    onEntryClick: (call) => console.log('Entry clicked:', call),
  },
};

// State stories
export const EmptyState: Story = {
  name: 'State: Empty',
  args: { calls: [] },
};

export const StreamingState: Story = {
  name: 'State: Streaming (running entry)',
  args: {
    calls: [
      ...generateMockToolCalls(3),
      {
        id: 'running-1',
        name: 'execute_code',
        status: 'running',
        timestamp: new Date().toISOString(),
      },
    ],
    expandable: true,
  },
};

export const FailedEntries: Story = {
  name: 'State: With Failures',
  args: {
    calls: [
      { id: '1', name: 'search_knowledge_base', status: 'completed', duration: 320, timestamp: new Date().toISOString(), input: { query: 'agent trust patterns' }, output: { results: [{ id: 'doc-1', score: 0.91 }] } },
      { id: '2', name: 'call_api', status: 'failed', duration: 5001, timestamp: new Date().toISOString(), error: 'Connection timeout after 5000ms' },
      { id: '3', name: 'generate_report', status: 'completed', duration: 820, timestamp: new Date().toISOString() },
    ],
    expandable: true,
  },
};

export const PolicyFlags: Story = {
  name: 'State: With Policy Flags',
  args: {
    calls: [
      { id: '1', name: 'read_file', status: 'completed', duration: 45, timestamp: new Date().toISOString() },
      { id: '2', name: 'send_email', status: 'completed', duration: 280, timestamp: new Date().toISOString(), policyFlags: { requiresApproval: true, externalAction: true } },
      { id: '3', name: 'update_record', status: 'completed', duration: 190, timestamp: new Date().toISOString(), policyFlags: { writesState: true } },
    ],
    expandable: true,
  },
};

// ============================================================
// PROTOTYPING STORIES
// ============================================================

export const PrototypeQuickStart: Story = {
  name: 'Quick Start: Prototype Live Tool Stream',
  render: () => {
    const [calls, setCalls] = useState<ToolCall[]>([]);

    const mergeCalls = useCallback((incoming: ToolCall) => {
      setCalls((prev) => {
        const idx = prev.findIndex((c) => c.id === incoming.id);
        return idx >= 0
          ? prev.map((c, i) => (i === idx ? incoming : c))
          : [...prev, incoming];
      });
    }, []);

    const [started, setStarted] = useState(false);
    const [cancelFn, setCancelFn] = useState<(() => void) | null>(null);

    const start = () => {
      setCalls([]);
      setStarted(true);
      const { cancel } = simulateToolStream({ onCall: mergeCalls, count: 6, intervalMs: 1000 });
      setCancelFn(() => cancel);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={start}
            style={{ padding: '0.375rem 0.875rem', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.875rem' }}
          >
            ▶ Start stream
          </button>
          {started && (
            <button
              onClick={() => { cancelFn?.(); setStarted(false); }}
              style={{ padding: '0.375rem 0.875rem', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.875rem', background: '#fef2f2' }}
            >
              ⏹ Stop
            </button>
          )}
        </div>
        <ToolTrace calls={calls} expandable autoScroll maxHeight="24rem" />
      </div>
    );
  },
};

export const TestVariations: Story = {
  name: 'Test Different Call Counts',
  render: () => {
    const [count, setCount] = useState(4);
    const calls = generateMockToolCalls(count);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', fontFamily: 'sans-serif', fontSize: '0.75rem' }}>
          {[2, 4, 6, 10].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              style={{
                padding: '0.25rem 0.625rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: count === n ? '#1d4ed8' : '#fff',
                color: count === n ? '#fff' : '#333',
                cursor: 'pointer',
              }}
            >
              {n} calls
            </button>
          ))}
        </div>
        <ToolTrace calls={calls} expandable maxHeight="20rem" />
      </div>
    );
  },
};

export const SimulateRealTimeUpdates: Story = {
  name: 'Simulate Real-Time Updates — Steady Stream',
  render: () => {
    const [calls, setCalls] = useState<ToolCall[]>([]);

    const mergeCalls = useCallback((incoming: ToolCall) => {
      setCalls((prev) => {
        const idx = prev.findIndex((c) => c.id === incoming.id);
        return idx >= 0
          ? prev.map((c, i) => (i === idx ? incoming : c))
          : [...prev, incoming];
      });
    }, []);

    useState(() => {
      simulateToolStream({ onCall: mergeCalls, count: 8, intervalMs: 1500 });
    });

    return <ToolTrace calls={calls} expandable autoScroll maxHeight="22rem" />;
  },
};

// ============================================================
// PRODUCTION STORIES
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    calls: [
      { id: '1', name: 'search_knowledge_base', status: 'completed', duration: 320, timestamp: new Date().toISOString() },
      { id: '2', name: 'generate_report', status: 'completed', duration: 1240, timestamp: new Date().toISOString() },
    ],
  },
};

export const WithRealAPIData: Story = {
  name: 'With Real API Data',
  args: {
    calls: [
      { id: '1', name: 'fetch_document', status: 'completed', duration: 180, timestamp: new Date().toISOString(), input: { url: 'https://api.example.com/docs/q4-report' }, output: { pages: 12, wordCount: 4821 } },
      { id: '2', name: 'run_query', status: 'completed', duration: 420, timestamp: new Date().toISOString(), input: { query: 'SELECT revenue, quarter FROM reports WHERE year = 2025' }, output: { rows: 4 } },
      { id: '3', name: 'generate_report', status: 'running', timestamp: new Date().toISOString() },
    ],
    expandable: true,
    autoScroll: true,
  },
};

export const ErrorHandling: Story = {
  name: 'Error Handling — Tool Failure',
  args: {
    calls: [
      { id: '1', name: 'validate_schema', status: 'completed', duration: 55, timestamp: new Date().toISOString() },
      { id: '2', name: 'call_api', status: 'failed', duration: 5000, timestamp: new Date().toISOString(), error: 'Rate limit exceeded. Retry after 60s.', input: { endpoint: '/v1/customers' } },
    ],
    expandable: true,
  },
};
