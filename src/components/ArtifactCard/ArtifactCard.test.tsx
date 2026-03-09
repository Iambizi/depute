import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ArtifactCard } from './ArtifactCard';
import type { Artifact } from '../../types/common';

const mockArtifact: Artifact = {
  id: '1',
  title: 'Generated Analysis',
  type: 'markdown',
  content: '# Hello\nThis is a test.',
  timestamp: new Date().toISOString(),
};

describe('ArtifactCard', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<ArtifactCard artifact={mockArtifact} />);
      expect(screen.getByRole('heading', { name: 'Generated Analysis' })).toBeInTheDocument();
      expect(screen.getByText('markdown')).toBeInTheDocument();
      expect(screen.getByText(/# Hello/)).toBeInTheDocument();
    });

    it('renders with all optional props', () => {
      render(
        <ArtifactCard
          artifact={{
            ...mockArtifact,
            metadata: { 'Author': 'AI', 'Size': '12KB' },
            sourceStepId: 'step-3',
            toolCallIds: ['tool-1', 'tool-2'],
          }}
          exportFormats={['markdown', 'json']}
          showPreview={true}
          maxPreviewHeight="20rem"
          className="custom-card"
        />
      );
      
      expect(screen.getByText('Author')).toBeInTheDocument();
      expect(screen.getByText('12KB')).toBeInTheDocument();
      expect(screen.getByText(/Step: step-3/i)).toBeInTheDocument();
      expect(screen.getByText(/Tools:/i)).toBeInTheDocument();
      expect(screen.getByText(/tool-1/i)).toBeInTheDocument();
      expect(screen.getByText(/tool-2/i)).toBeInTheDocument();
      
      expect(screen.getByRole('button', { name: 'Export as MD' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Export as JSON' })).toBeInTheDocument();
      
      expect(screen.getByRole('article')).toHaveClass('custom-card');
    });

    it('hides preview when showPreview is false', () => {
      render(<ArtifactCard artifact={mockArtifact} showPreview={false} />);
      expect(screen.queryByText('# Hello\nThis is a test.')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Show more/i })).not.toBeInTheDocument();
    });

    it('renders fallback icon for unknown type', () => {
      render(<ArtifactCard artifact={{ ...mockArtifact, type: 'unknown_type' as any }} />);
      expect(screen.getByText('unknown_type')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    const types = ['markdown', 'json', 'csv', 'code'];

    it.each(types)('renders type %s badge', (type) => {
      const { unmount } = render(<ArtifactCard artifact={{ ...mockArtifact, type: type as any }} />);
      expect(screen.getByText(type)).toBeInTheDocument();
      unmount();
    });
  });

  describe('interactions', () => {
    it('toggles preview expansion', async () => {
      const user = userEvent.setup();
      render(<ArtifactCard artifact={mockArtifact} />);
      
      const toggleBtn = screen.getByRole('button', { name: /Show more/i });
      expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(toggleBtn);
      
      expect(toggleBtn).toHaveTextContent('Show less');
      expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
      
      await user.click(toggleBtn);
      
      expect(toggleBtn).toHaveTextContent('Show more');
      expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls onExport when an export button is clicked', async () => {
      const user = userEvent.setup();
      const handleExport = vi.fn();
      render(
        <ArtifactCard
          artifact={mockArtifact}
          exportFormats={['markdown', 'csv']}
          onExport={handleExport}
        />
      );
      
      const mdBtn = screen.getByRole('button', { name: 'Export as MD' });
      await user.click(mdBtn);
      
      expect(handleExport).toHaveBeenCalledWith('markdown');
      
      const csvBtn = screen.getByRole('button', { name: 'Export as CSV' });
      await user.click(csvBtn);
      
      expect(handleExport).toHaveBeenCalledWith('csv');
    });
  });

  describe('accessibility', () => {
    it('has an accessible article container', () => {
      render(<ArtifactCard artifact={mockArtifact} />);
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'Artifact: Generated Analysis');
    });
  });
});
