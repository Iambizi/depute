import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ToolTrace } from './ToolTrace';
import type { ToolCall } from '../../types/common';

const mockCalls: ToolCall[] = [
  { id: '1', name: 'search_web', status: 'completed', duration: 1500, input: { query: 'test' }, output: { result: 'ok' }, timestamp: Date.now() },
  { id: '2', name: 'read_file', status: 'running', timestamp: Date.now() },
  { id: '3', name: 'write_file', status: 'failed', error: 'File not found', timestamp: Date.now() },
];

describe('ToolTrace', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<ToolTrace calls={mockCalls} />);
      expect(screen.getByRole('log')).toBeInTheDocument();
      expect(screen.getByText('search_web')).toBeInTheDocument();
      expect(screen.getByText('read_file')).toBeInTheDocument();
      expect(screen.getByText('write_file')).toBeInTheDocument();
    });

    it('renders with all optional props', () => {
      render(
        <ToolTrace
          calls={[{ id: '4', name: 'secure_op', status: 'pending', policyFlags: { requiresApproval: true } }]}
          autoScroll={false}
          maxHeight="500px"
          expandable={false}
          className="custom-trace"
        />
      );
      expect(screen.getByRole('log')).toHaveClass('custom-trace');
      expect(screen.getByText('secure_op')).toBeInTheDocument();
      expect(screen.getByText('approval')).toBeInTheDocument();
      // expandable is false, so no Details button
      expect(screen.queryByRole('button', { name: /Details/i })).not.toBeInTheDocument();
    });

    it('renders empty state', () => {
      render(<ToolTrace calls={[]} />);
      expect(screen.getByText('No tool calls yet')).toBeInTheDocument();
    });

    it('applies custom className to empty state too', () => {
      render(<ToolTrace calls={[]} className="custom-empty" />);
      expect(screen.getByRole('log')).toHaveClass('custom-empty');
    });
  });

  describe('states', () => {
    it('displays duration for completed call', () => {
      render(<ToolTrace calls={mockCalls} />);
      expect(screen.getByText('1.5s')).toBeInTheDocument();
    });

    it('displays error for failed call', () => {
      render(<ToolTrace calls={mockCalls} />);
      expect(screen.getByText('File not found')).toBeInTheDocument();
    });

    it('displays policy flags correctly', () => {
      render(
        <ToolTrace
          calls={[
            {
              id: '1',
              name: 'test',
              status: 'pending',
              policyFlags: { requiresApproval: true, writesState: true, externalAction: true },
            },
          ]}
        />
      );
      expect(screen.getByText('approval')).toBeInTheDocument();
      expect(screen.getByText('writes')).toBeInTheDocument();
      expect(screen.getByText('external')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('toggles expansion when Details is clicked', async () => {
      const user = userEvent.setup();
      render(<ToolTrace calls={mockCalls} />);
      
      const toggleBtn = screen.getByRole('button', { name: /Details/i });
      expect(screen.queryByText('Input')).not.toBeInTheDocument();
      
      await user.click(toggleBtn);
      
      expect(screen.getByText('Input')).toBeInTheDocument();
      expect(screen.getByText(/"query": "test"/)).toBeInTheDocument();
      expect(screen.getByText('Output')).toBeInTheDocument();
      expect(screen.getByText(/"result": "ok"/)).toBeInTheDocument();
      
      await user.click(toggleBtn);
      expect(screen.queryByText('Input')).not.toBeInTheDocument();
    });

    it('calls onEntryClick when an entry is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ToolTrace calls={mockCalls} onEntryClick={handleClick} />);
      
      // The li elements are clickable if onEntryClick is provided
      const entries = screen.getAllByRole('listitem');
      await user.click(entries[0]);
      expect(handleClick).toHaveBeenCalledWith(mockCalls[0]);
    });

    it('calls onEntryClick when an entry is activated via keyboard', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ToolTrace calls={mockCalls} onEntryClick={handleClick} />);
      
      const entries = screen.getAllByRole('listitem');
      entries[0].focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledWith(mockCalls[0]);
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
    
    it('stops propagation when clicking Details inside a clickable entry', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ToolTrace calls={mockCalls} onEntryClick={handleClick} />);
      
      const toggleBtn = screen.getByRole('button', { name: /Details/i });
      await user.click(toggleBtn);
      
      // onEntryClick should not fire
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has role log', () => {
      render(<ToolTrace calls={mockCalls} />);
      expect(screen.getByRole('log', { name: 'Tool trace' })).toBeInTheDocument();
    });

    it('announces new entries via aria-live', async () => {
      const { rerender } = render(<ToolTrace calls={[]} />);
      
      // add a running call
      rerender(<ToolTrace calls={[mockCalls[1]]} />);
      await waitFor(() => {
        const regions = screen.queryAllByRole('status');
        expect(regions[regions.length - 1]).toHaveTextContent('read_file started');
      });

      // change to completed
      rerender(<ToolTrace calls={[{ ...mockCalls[1], status: 'completed', duration: 500 }]} />);
      await waitFor(() => {
        const regions = screen.queryAllByRole('status');
        expect(regions[regions.length - 1]).toHaveTextContent('read_file completed in 500ms');
      });
      
      // add a failed call
      rerender(<ToolTrace calls={[{ ...mockCalls[1], status: 'completed', duration: 500 }, mockCalls[2]]} />);
      await waitFor(() => {
        const regions = screen.queryAllByRole('status');
        expect(regions[regions.length - 1]).toHaveTextContent('write_file failed: File not found');
      });
    });
  });
});
