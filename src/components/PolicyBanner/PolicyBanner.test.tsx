import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PolicyBanner } from './PolicyBanner';

describe('PolicyBanner', () => {
  describe('rendering', () => {
    it('renders with required props', () => {
      render(<PolicyBanner mode="sandbox" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Sandbox')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      render(<PolicyBanner mode="production" label="MainNet" />);
      expect(screen.getByText('MainNet')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<PolicyBanner mode="sandbox" description="No real transactions will be executed" />);
      expect(screen.getByText('No real transactions will be executed')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<PolicyBanner mode="sandbox" className="custom-banner" />);
      expect(screen.getByRole('status')).toHaveClass('custom-banner');
    });
  });

  describe('modes', () => {
    it('displays sandbox mode', () => {
      render(<PolicyBanner mode="sandbox" />);
      expect(screen.getByText('Sandbox')).toBeInTheDocument();
    });

    it('displays staging mode', () => {
      render(<PolicyBanner mode="staging" />);
      expect(screen.getByText('Staging')).toBeInTheDocument();
    });

    it('displays production mode', () => {
      render(<PolicyBanner mode="production" />);
      expect(screen.getByText('Production')).toBeInTheDocument();
    });

    it('displays simulation mode', () => {
      render(<PolicyBanner mode="simulation" />);
      expect(screen.getByText('Simulation')).toBeInTheDocument();
    });

    it('displays test mode', () => {
      render(<PolicyBanner mode="test" />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('displays drafting mode', () => {
      render(<PolicyBanner mode="drafting" />);
      expect(screen.getByText('Drafting')).toBeInTheDocument();
    });

    it('displays executing mode', () => {
      render(<PolicyBanner mode="executing" />);
      expect(screen.getByText('Executing')).toBeInTheDocument();
    });
  });

  describe('constraints', () => {
    it('renders constraints', () => {
      const constraints = [
        { label: 'Max Spend', value: '$500' },
        { label: 'Allowed Tools', value: 'read-only' },
      ];
      render(<PolicyBanner mode="sandbox" constraints={constraints} />);
      expect(screen.getByText('Max Spend')).toBeInTheDocument();
      expect(screen.getByText('$500')).toBeInTheDocument();
      expect(screen.getByText('Allowed Tools')).toBeInTheDocument();
      expect(screen.getByText('read-only')).toBeInTheDocument();
    });

    it('wraps constraints in a list role', () => {
      const constraints = [{ label: 'Limit', value: '10' }];
      render(<PolicyBanner mode="sandbox" constraints={constraints} />);
      expect(screen.getByRole('list', { name: 'Active policy constraints' })).toBeInTheDocument();
    });

    it('does not render constraints section when empty', () => {
      render(<PolicyBanner mode="sandbox" constraints={[]} />);
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('collapse behavior', () => {
    it('does not show collapse button by default', () => {
      render(<PolicyBanner mode="sandbox" />);
      expect(screen.queryByRole('button', { name: /collapse/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /expand/i })).not.toBeInTheDocument();
    });

    it('shows collapse button when collapsible', () => {
      render(
        <PolicyBanner
          mode="sandbox"
          collapsible
          constraints={[{ label: 'Limit', value: '10' }]}
        />
      );
      expect(screen.getByRole('button', { name: /collapse/i })).toBeInTheDocument();
    });

    it('hides constraints when collapsed (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(
        <PolicyBanner
          mode="sandbox"
          collapsible
          constraints={[{ label: 'Limit', value: '10' }]}
        />
      );

      // Initially expanded
      expect(screen.getByText('10')).toBeInTheDocument();

      // Click collapse
      await user.click(screen.getByRole('button', { name: /collapse/i }));

      // Constraints should be hidden
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('calls onToggleCollapse when in controlled mode', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();
      render(
        <PolicyBanner
          mode="sandbox"
          collapsible
          collapsed={false}
          onToggleCollapse={onToggle}
          constraints={[{ label: 'Limit', value: '10' }]}
        />
      );

      await user.click(screen.getByRole('button', { name: /collapse/i }));
      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('view policy', () => {
    it('shows View Policy button when handler provided', () => {
      render(<PolicyBanner mode="sandbox" onViewPolicy={() => {}} />);
      expect(screen.getByRole('button', { name: /view full policy/i })).toBeInTheDocument();
    });

    it('does not show View Policy button when no handler', () => {
      render(<PolicyBanner mode="sandbox" />);
      expect(screen.queryByRole('button', { name: /view full policy/i })).not.toBeInTheDocument();
    });

    it('calls onViewPolicy when clicked', async () => {
      const user = userEvent.setup();
      const onViewPolicy = vi.fn();
      render(<PolicyBanner mode="sandbox" onViewPolicy={onViewPolicy} />);

      await user.click(screen.getByRole('button', { name: /view full policy/i }));
      expect(onViewPolicy).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {
      render(<PolicyBanner mode="sandbox" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      render(<PolicyBanner mode="production" description="Live environment" />);
      expect(screen.getByRole('status')).toHaveAttribute(
        'aria-label',
        'Policy: Production — Live environment'
      );
    });

    it('has aria-label without description', () => {
      render(<PolicyBanner mode="sandbox" />);
      expect(screen.getByRole('status')).toHaveAttribute(
        'aria-label',
        'Policy: Sandbox'
      );
    });

    it('provides a visually hidden full policy description', () => {
      const constraints = [{ label: 'Max Spend', value: '$500' }];
      render(<PolicyBanner mode="production" constraints={constraints} />);
      expect(
        screen.getByText(/Current operating policy: Production/, { exact: false })
      ).toBeInTheDocument();
    });

    it('collapse button has correct aria-expanded', () => {
      render(
        <PolicyBanner
          mode="sandbox"
          collapsible
          collapsed={false}
          constraints={[{ label: 'L', value: 'V' }]}
        />
      );
      expect(screen.getByRole('button', { name: /collapse/i })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });
});
