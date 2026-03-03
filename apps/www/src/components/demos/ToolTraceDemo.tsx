'use client';

import { ToolTrace } from '@/depute/components/ToolTrace';
import type { ToolCall } from '@/depute/types/common';

const calls: ToolCall[] = [
  {
    id: '1',
    name: 'validate_schema',
    input: { schema: 'user_profile', version: 2 },
    output: { valid: true },
    status: 'completed',
    duration: 1300,
    timestamp: new Date(Date.now() - 5200).toISOString(),
  },
  {
    id: '2',
    name: 'create_record',
    input: { table: 'users', data: { name: 'Alice' } },
    output: { id: 'usr_123' },
    status: 'completed',
    duration: 924,
    timestamp: new Date(Date.now() - 3800).toISOString(),
    policyFlags: { writesState: true },
  },
  {
    id: '3',
    name: 'read_file',
    input: { path: '/config/settings.json' },
    output: { theme: 'dark', locale: 'en' },
    status: 'completed',
    duration: 1600,
    timestamp: new Date(Date.now() - 2800).toISOString(),
  },
  {
    id: '4',
    name: 'write_file',
    input: { path: '/output/report.md' },
    output: { bytes: 4096 },
    status: 'completed',
    duration: 733,
    timestamp: new Date(Date.now() - 1100).toISOString(),
    policyFlags: { writesState: true },
  },
];

export function ToolTraceDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <ToolTrace calls={calls} expandable />
    </div>
  );
}
