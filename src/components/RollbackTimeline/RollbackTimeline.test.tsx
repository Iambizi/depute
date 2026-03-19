import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RollbackTimeline } from './RollbackTimeline';
import type { RollbackPoint } from './RollbackTimeline.types';

const samplePoints: RollbackPoint[] = [
  { id: '1', label: 'Fetched user data', status: 'rolled-back', timestamp: '12:00:01', reversible: true },
  { id: '2', label: 'Updated email address', status: 'available', timestamp: '12:00:05', reversible: true, dependentCount: 2 },
  { id: '3', label: 'Sent notification', status: 'current', timestamp: '12:00:10', reversible: true },
  { id: '4', label: 'Deployed to production', status: 'available', timestamp: '12:00:15', reversible: false },
];

describe('RollbackTimeline', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<RollbackTimeline title="Action History" points={samplePoints} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByText('Action History')).toBeInTheDocument();
    });

    it('renders all points', () => {
      render(<RollbackTimeline title="History" points={samplePoints} />);
      expect(screen.getByText('Fetched user data')).toBeInTheDocument();
      expect(screen.getByText('Updated email address')).toBeInTheDocument();
      expect(screen.getByText('Sent notification')).toBeInTheDocument();
      expect(screen.getByText('Deployed to production')).toBeInTheDocument();
    });

    it('displays action count', () => {
      render(<RollbackTimeline title="History" points={samplePoints} />);
      expect(screen.getByText('4 actions')).toBeInTheDocument();
    });

    it('shows irreversible tag on non-reversible points', () => {
      render(<RollbackTimeline title="History" points={samplePoints} />);
      expect(screen.getByText('Irreversible')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<RollbackTimeline title="History" points={samplePoints} className="custom-timeline" />);
      expect(screen.getByRole('region')).toHaveClass('custom-timeline');
    });
  });

  describe('rollback interactions', () => {
    it('shows rollback button for reversible available points', () => {
      render(<RollbackTimeline title="History" points={samplePoints} onRollback={() => {}} />);
      expect(screen.getByRole('button', { name: /rollback to: Updated email/i })).toBeInTheDocument();
    });

    it('shows confirmation on first click', async () => {
      const user = userEvent.setup();
      render(<RollbackTimeline title="History" points={samplePoints} onRollback={() => {}} />);

      await user.click(screen.getByRole('button', { name: /rollback to: Updated email/i }));
      expect(screen.getByText('Undo all actions after this point?')).toBeInTheDocument();
    });

    it('calls onRollback on confirm', async () => {
      const user = userEvent.setup();
      const onRollback = vi.fn();
      render(<RollbackTimeline title="History" points={samplePoints} onRollback={onRollback} />);

      await user.click(screen.getByRole('button', { name: /rollback to: Updated email/i }));
      await user.click(screen.getByRole('button', { name: 'Confirm rollback' }));
      expect(onRollback).toHaveBeenCalledWith('2');
    });

    it('cancels confirmation', async () => {
      const user = userEvent.setup();
      render(<RollbackTimeline title="History" points={samplePoints} onRollback={() => {}} />);

      await user.click(screen.getByRole('button', { name: /rollback to: Updated email/i }));
      await user.click(screen.getByRole('button', { name: 'Cancel rollback' }));
      expect(screen.queryByText('Undo all actions after this point?')).not.toBeInTheDocument();
    });

    it('skips confirmation when requireConfirmation is false', async () => {
      const user = userEvent.setup();
      const onRollback = vi.fn();
      render(
        <RollbackTimeline title="History" points={samplePoints} onRollback={onRollback} requireConfirmation={false} />
      );

      await user.click(screen.getByRole('button', { name: /rollback to: Updated email/i }));
      expect(onRollback).toHaveBeenCalledWith('2');
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {
      render(<RollbackTimeline title="History" points={samplePoints} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      render(<RollbackTimeline title="Action History" points={samplePoints} />);
      expect(screen.getByRole('region')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('Action History')
      );
    });

    it('uses list role for timeline', () => {
      render(<RollbackTimeline title="History" points={samplePoints} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });
});
