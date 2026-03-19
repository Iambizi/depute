import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { StateDiff } from './StateDiff';
import type { DiffEntry, DiffGroup } from './StateDiff.types';

const sampleEntries: DiffEntry[] = [
  { path: 'user.email', type: 'modified', before: 'old@test.com', after: 'new@test.com' },
  { path: 'user.name', type: 'unchanged', before: 'Alice' },
  { path: 'user.role', type: 'added', after: 'admin' },
  { path: 'user.legacy_id', type: 'removed', before: '12345' },
];

const sampleGroups: DiffGroup[] = [
  {
    label: 'User Profile',
    entries: [
      { path: 'user.email', type: 'modified', before: 'old@test.com', after: 'new@test.com' },
      { path: 'user.name', type: 'unchanged', before: 'Alice' },
    ],
  },
  {
    label: 'Account',
    entries: [
      { path: 'account.balance', type: 'modified', before: 500, after: 350 },
    ],
  },
];

describe('StateDiff', () => {
  describe('rendering', () => {
    it('renders with flat entries', () => {
      render(<StateDiff title="DB Update" entries={sampleEntries} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByText('DB Update')).toBeInTheDocument();
    });

    it('renders with grouped entries', () => {
      render(<StateDiff title="Ledger Update" groups={sampleGroups} />);
      expect(screen.getByText('User Profile')).toBeInTheDocument();
      expect(screen.getByText('Account')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<StateDiff title="Test" entries={sampleEntries} description="Agent modified user record" />);
      expect(screen.getByText('Agent modified user record')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<StateDiff title="Test" entries={sampleEntries} className="custom-diff" />);
      expect(screen.getByRole('region')).toHaveClass('custom-diff');
    });

    it('displays change count badge', () => {
      render(<StateDiff title="Test" entries={sampleEntries} />);
      expect(screen.getByText('3 changes')).toBeInTheDocument();
    });

    it('uses explicit changeCount when provided', () => {
      render(<StateDiff title="Test" entries={sampleEntries} changeCount={7} />);
      expect(screen.getByText('7 changes')).toBeInTheDocument();
    });
  });

  describe('change types', () => {
    it('renders modified entries with before and after', () => {
      render(<StateDiff title="Test" entries={sampleEntries} />);
      expect(screen.getByText('old@test.com')).toBeInTheDocument();
      expect(screen.getByText('new@test.com')).toBeInTheDocument();
    });

    it('renders added entries with after value', () => {
      render(<StateDiff title="Test" entries={sampleEntries} />);
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    it('renders removed entries with before value', () => {
      render(<StateDiff title="Test" entries={sampleEntries} />);
      expect(screen.getByText('12345')).toBeInTheDocument();
    });

    it('renders unchanged entries', () => {
      render(<StateDiff title="Test" entries={sampleEntries} />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });

  describe('filtering', () => {
    it('hides unchanged entries when hideUnchanged is true', () => {
      render(<StateDiff title="Test" entries={sampleEntries} hideUnchanged />);
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
      expect(screen.getByText('old@test.com')).toBeInTheDocument();
    });
  });

  describe('collapse behavior', () => {
    it('starts expanded by default', () => {
      render(<StateDiff title="Test" entries={sampleEntries} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('starts collapsed when defaultCollapsed is true', () => {
      render(<StateDiff title="Test" entries={sampleEntries} defaultCollapsed />);
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('toggles collapse on click', async () => {
      const user = userEvent.setup();
      render(<StateDiff title="Test" entries={sampleEntries} />);

      // Click to collapse
      await user.click(screen.getByRole('button', { name: /collapse/i }));
      expect(screen.queryByRole('table')).not.toBeInTheDocument();

      // Click to expand
      await user.click(screen.getByRole('button', { name: /expand/i }));
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('metadata', () => {
    it('renders timestamp', () => {
      render(<StateDiff title="Test" entries={sampleEntries} timestamp="2026-03-19T12:00:00Z" />);
      expect(screen.getByText('2026-03-19T12:00:00Z')).toBeInTheDocument();
    });

    it('renders sourceId', () => {
      render(<StateDiff title="Test" entries={sampleEntries} sourceId="tool-42" />);
      expect(screen.getByText('#tool-42')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {
      render(<StateDiff title="Test" entries={sampleEntries} />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      render(<StateDiff title="DB Update" entries={sampleEntries} />);
      expect(screen.getByRole('region')).toHaveAttribute(
        'aria-label',
        'DB Update: 3 fields changed'
      );
    });

    it('has toggle button with aria-expanded', () => {
      render(<StateDiff title="Test" entries={sampleEntries} />);
      expect(screen.getByRole('button', { name: /collapse/i })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('provides visually hidden change descriptions', () => {
      render(<StateDiff title="Test" entries={[
        { path: 'email', type: 'modified', before: 'a', after: 'b' },
      ]} />);
      expect(screen.getByText(/email: Modified from a to b/)).toBeInTheDocument();
    });
  });
});
