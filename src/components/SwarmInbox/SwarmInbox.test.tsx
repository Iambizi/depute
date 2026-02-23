import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SwarmInbox } from './SwarmInbox';
import type { SwarmInboxItem } from './SwarmInbox.types';

const MOCK_ITEMS: SwarmInboxItem[] = [
  { id: 'i1', type: 'escalation', severity: 'critical', title: 'Agent failure escalated', agentId: 'Code-Writer-1', branchPath: 'root → Code Writer', timestamp: 'just now' },
  { id: 'i2', type: 'budget_overrun', severity: 'warning', title: 'Token budget exceeded', agentId: 'Data-Analyst', timestamp: '3m ago', detail: 'Consumed 142% of allocation.' },
  { id: 'i3', type: 'approval', severity: 'info', title: 'Action requires your sign-off', agentId: 'Orchestrator-Prime', timestamp: '5m ago' },
];

describe('SwarmInbox', () => {
  describe('rendering', () => {
    it('renders all inbox item titles', () => {
      render(<SwarmInbox items={MOCK_ITEMS} />);
      expect(screen.getByText('Agent failure escalated')).toBeInTheDocument();
      expect(screen.getByText('Token budget exceeded')).toBeInTheDocument();
      expect(screen.getByText('Action requires your sign-off')).toBeInTheDocument();
    });

    it('shows agent IDs for each item', () => {
      render(<SwarmInbox items={MOCK_ITEMS} />);
      expect(screen.getByText(/Code-Writer-1/)).toBeInTheDocument();
      expect(screen.getByText(/Data-Analyst/)).toBeInTheDocument();
    });

    it('shows detail text when provided', () => {
      render(<SwarmInbox items={MOCK_ITEMS} />);
      expect(screen.getByText('Consumed 142% of allocation.')).toBeInTheDocument();
    });

    it('shows empty state when no items', () => {
      render(<SwarmInbox items={[]} />);
      // Empty state text from component: "No items requiring attention."
      expect(screen.getByText(/No items requiring attention/)).toBeInTheDocument();
    });

    it('shows critical count badge with "X critical" format in header', () => {
      render(<SwarmInbox items={MOCK_ITEMS} />);
      // 1 critical item → badge shows "1 critical"
      expect(screen.getByText('1 critical')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SwarmInbox items={MOCK_ITEMS} className="custom-inbox" />);
      expect(container.firstChild).toHaveClass('custom-inbox');
    });
  });

  describe('states', () => {
    it('does not show critical badge when no critical items', () => {
      const items: SwarmInboxItem[] = MOCK_ITEMS.map((i) => ({ ...i, severity: 'info' as const }));
      render(<SwarmInbox items={items} />);
      expect(screen.queryByText(/critical/)).not.toBeInTheDocument();
    });

    it('shows item count in header badge', () => {
      render(<SwarmInbox items={MOCK_ITEMS} />);
      // aria-label includes "3 items"
      expect(screen.getByRole('region', { name: /3 items/i })).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onDismissItem when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<SwarmInbox items={MOCK_ITEMS} onDismissItem={handleDismiss} />);

      // Dismiss button aria-label is "Dismiss: {title}"
      const dismissBtn = screen.getByRole('button', { name: /Dismiss: Agent failure escalated/i });
      await user.click(dismissBtn);
      expect(handleDismiss).toHaveBeenCalledWith('i1');
    });

    it('calls onOpenItem when an item row is clicked', async () => {
      const user = userEvent.setup();
      const handleOpen = vi.fn();
      render(<SwarmInbox items={MOCK_ITEMS} onOpenItem={handleOpen} />);

      // Row is a button when onOpenItem provided; aria-label includes title
      const rowBtn = screen.getByRole('button', { name: /Agent failure escalated from Code-Writer-1/i });
      await user.click(rowBtn);
      expect(handleOpen).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'i1' })
      );
    });
  });

  describe('accessibility', () => {
    it('has a region landmark with item count in label', () => {
      render(<SwarmInbox items={MOCK_ITEMS} />);
      expect(screen.getByRole('region', { name: /Swarm Inbox/i })).toBeInTheDocument();
    });

    it('items without onOpenItem are not buttons', () => {
      render(<SwarmInbox items={MOCK_ITEMS} />);
      // Without onOpenItem, InboxRow renders as a plain div (no button role)
      expect(screen.queryByRole('button', { name: /Agent failure escalated from/i })).not.toBeInTheDocument();
    });
  });
});
