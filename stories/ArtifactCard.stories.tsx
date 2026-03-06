import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArtifactCard } from '../src/components/ArtifactCard';
import { generateMockArtifact } from '../src/utils/mockData';
import type { ExportFormat } from '../src/components/ArtifactCard';

const meta: Meta<typeof ArtifactCard> = {
  title: 'AX Components/ArtifactCard',
  component: ArtifactCard,
  tags: ['autodocs'],
  argTypes: {
    showPreview: { control: 'boolean' },
    maxPreviewHeight: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ArtifactCard>;

const EXPORT_FORMATS: ExportFormat[] = ['markdown', 'json', 'csv', 'pr'];

// ============================================================
// SHARED STORIES
// ============================================================

export const Default: Story = {
  args: {
    artifact: generateMockArtifact({ type: 'markdown' }),
    exportFormats: EXPORT_FORMATS,
    showPreview: true,
  },
};

export const AllFeatures: Story = {
  args: {
    artifact: generateMockArtifact({ type: 'markdown', title: 'Q4 Analysis Report' }),
    exportFormats: EXPORT_FORMATS,
    showPreview: true,
    maxPreviewHeight: '10rem',
    onExport: (fmt) => alert(`Exporting as ${fmt}`),
  },
};

// Type stories
export const TypeMarkdown: Story = {
  name: 'Type: Markdown',
  args: {
    artifact: generateMockArtifact({ type: 'markdown' }),
    exportFormats: ['markdown', 'pr'],
    showPreview: true,
  },
};

export const TypeJSON: Story = {
  name: 'Type: JSON',
  args: {
    artifact: generateMockArtifact({ type: 'json' }),
    exportFormats: ['json'],
    showPreview: true,
  },
};

export const TypeCSV: Story = {
  name: 'Type: CSV',
  args: {
    artifact: generateMockArtifact({ type: 'csv' }),
    exportFormats: ['csv'],
    showPreview: true,
  },
};

export const TypeCode: Story = {
  name: 'Type: Code',
  args: {
    artifact: generateMockArtifact({ type: 'code' }),
    exportFormats: ['markdown', 'json'],
    showPreview: true,
  },
};

// ============================================================
// PROTOTYPING STORIES
// ============================================================

export const PrototypeQuickStart: Story = {
  name: 'Quick Start: Prototype Artifact Display',
  render: () => {
    const artifact = generateMockArtifact({ type: 'markdown', title: 'Analysis Report' });
    const [exported, setExported] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
        <ArtifactCard
          artifact={artifact}
          exportFormats={EXPORT_FORMATS}
          showPreview
          onExport={(fmt) => setExported(fmt)}
        />
        {exported && (
          <span style={{ color: '#059669', fontSize: '0.875rem' }}>Exported as {exported}</span>
        )}
      </div>
    );
  },
};

export const TestVariations: Story = {
  name: 'Test Different Artifact Types',
  render: () => {
    const types = ['markdown', 'json', 'csv', 'code'] as const;
    const [current, setCurrent] = useState<typeof types[number]>('markdown');
    const artifact = generateMockArtifact({ type: current });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
        <div style={{ display: 'flex', gap: '0.5rem', fontFamily: 'sans-serif', fontSize: '0.75rem' }}>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setCurrent(t)}
              style={{
                padding: '0.25rem 0.625rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: current === t ? '#1d4ed8' : '#fff',
                color: current === t ? '#fff' : '#333',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <ArtifactCard artifact={artifact} exportFormats={EXPORT_FORMATS} showPreview />
      </div>
    );
  },
};

export const SimulateRealTimeUpdates: Story = {
  name: 'Simulate Real-Time Updates — Export States',
  render: () => {
    const artifact = generateMockArtifact({ type: 'markdown', title: 'Run Summary' });
    const [exportingFmt, setExportingFmt] = useState<ExportFormat | null>(null);
    const [done, setDone] = useState<ExportFormat[]>([]);

    const handleExport = (fmt: ExportFormat) => {
      setExportingFmt(fmt);
      setTimeout(() => {
        setExportingFmt(null);
        setDone((prev) => [...prev, fmt]);
      }, 1500);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
        <ArtifactCard
          artifact={artifact}
          exportFormats={EXPORT_FORMATS}
          showPreview
          onExport={handleExport}
        />
        <div style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {exportingFmt && <span>Exporting as {exportingFmt}...</span>}
          {done.map((f, i) => <span key={i}>Exported as {f}</span>)}
        </div>
      </div>
    );
  },
};

// ============================================================
// PRODUCTION STORIES
// ============================================================

export const BasicUsage: Story = {
  name: 'Basic Usage',
  args: {
    artifact: {
      id: 'art-001',
      title: 'Customer Churn Analysis',
      type: 'markdown',
      content: '# Customer Churn Analysis\n\nThe model identified 3 primary churn indicators across Q4 data.',
      timestamp: new Date().toISOString(),
    },
    showPreview: true,
    exportFormats: ['markdown', 'json'],
  },
};

export const WithRealAPIData: Story = {
  name: 'With Real API Data — Full Provenance',
  args: {
    artifact: {
      id: 'art-002',
      title: 'Refund Processing Summary',
      type: 'json',
      content: JSON.stringify({ processed: 142, successful: 139, failed: 3, total_amount: '$12,847.50' }, null, 2),
      timestamp: new Date().toISOString(),
      metadata: { 'Run ID': 'run-88a1b', 'Duration': '4.2s', 'Model': 'gemini-2.0-flash' },
      sourceStepId: 'step-4',
      toolCallIds: ['call-api-001', 'call-api-002'],
    },
    exportFormats: ['json', 'csv'],
    showPreview: true,
  },
};

export const ErrorHandling: Story = {
  name: 'Error Handling — No Content / No Exports',
  args: {
    artifact: {
      id: 'art-err',
      title: 'Failed Report',
      type: 'other',
      content: '',
      timestamp: new Date().toISOString(),
    },
    showPreview: true,
    exportFormats: [],
  },
};
