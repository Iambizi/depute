import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BudgetMeter } from './BudgetMeter';

describe('BudgetMeter', () => {
  const defaultProps = {
    label: 'Session Budget',
    spent: 250,
    limit: 1000,
    unit: 'currency' as const,
  };

  describe('rendering', () => {
    it('renders with required props', () => {
      render(<BudgetMeter {...defaultProps} />);
      expect(screen.getByRole('meter')).toBeInTheDocument();
      expect(screen.getByText('Session Budget')).toBeInTheDocument();
    });

    it('displays formatted spent and limit values', () => {
      render(<BudgetMeter {...defaultProps} />);
      expect(screen.getByText('250')).toBeInTheDocument();
      expect(screen.getByText('1.0k')).toBeInTheDocument();
    });

    it('uses custom format function', () => {
      render(
        <BudgetMeter
          {...defaultProps}
          formatValue={(v) => `$${v.toFixed(2)}`}
        />
      );
      expect(screen.getByText('$250.00')).toBeInTheDocument();
      expect(screen.getByText('$1000.00')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<BudgetMeter {...defaultProps} className="test-budget" />);
      expect(screen.getByRole('meter')).toHaveClass('test-budget');
    });

    it('renders percentage', () => {
      render(<BudgetMeter {...defaultProps} />);
      expect(screen.getByText('(25%)')).toBeInTheDocument();
    });
  });

  describe('severity', () => {
    it('shows normal severity when under elevated threshold', () => {
      render(<BudgetMeter {...defaultProps} spent={500} />);
      expect(screen.getByText('Within budget')).toBeInTheDocument();
    });

    it('shows elevated severity at elevated threshold', () => {
      render(<BudgetMeter {...defaultProps} spent={650} />);
      expect(screen.getByText('Approaching limit')).toBeInTheDocument();
    });

    it('shows critical severity at critical threshold', () => {
      render(<BudgetMeter {...defaultProps} spent={900} />);
      expect(screen.getByText('Near limit')).toBeInTheDocument();
    });

    it('shows exceeded severity when over limit', () => {
      render(<BudgetMeter {...defaultProps} spent={1100} />);
      expect(screen.getByText('Budget exceeded')).toBeInTheDocument();
    });

    it('respects custom thresholds', () => {
      render(
        <BudgetMeter {...defaultProps} spent={450} elevatedThreshold={40} />
      );
      expect(screen.getByText('Approaching limit')).toBeInTheDocument();
    });

    it('respects severity override', () => {
      render(
        <BudgetMeter {...defaultProps} spent={100} severity="critical" />
      );
      expect(screen.getByText('Near limit')).toBeInTheDocument();
    });
  });

  describe('burn rate and ETA', () => {
    it('displays burn rate', () => {
      render(<BudgetMeter {...defaultProps} burnRate={5} />);
      expect(screen.getByText('Burn rate')).toBeInTheDocument();
      expect(screen.getByText('5/min')).toBeInTheDocument();
    });

    it('uses custom burn rate formatter', () => {
      render(
        <BudgetMeter
          {...defaultProps}
          burnRate={2.5}
          formatBurnRate={(r) => `${r} tokens/sec`}
        />
      );
      expect(screen.getByText('2.5 tokens/sec')).toBeInTheDocument();
    });

    it('displays estimated time remaining', () => {
      render(
        <BudgetMeter {...defaultProps} estimatedTimeRemaining="~12 min" />
      );
      expect(screen.getByText('Est. remaining')).toBeInTheDocument();
      expect(screen.getByText('~12 min')).toBeInTheDocument();
    });

    it('does not render metadata row when no burn rate or ETA', () => {
      render(<BudgetMeter {...defaultProps} />);
      expect(screen.queryByText('Burn rate')).not.toBeInTheDocument();
      expect(screen.queryByText('Est. remaining')).not.toBeInTheDocument();
    });
  });

  describe('compact variant', () => {
    it('renders compact layout', () => {
      render(<BudgetMeter {...defaultProps} compact />);
      expect(screen.getByRole('meter')).toBeInTheDocument();
      expect(screen.getByText('Session Budget')).toBeInTheDocument();
    });

    it('does not show severity badge in compact mode', () => {
      render(<BudgetMeter {...defaultProps} compact />);
      expect(screen.queryByText('Within budget')).not.toBeInTheDocument();
    });
  });

  describe('callbacks', () => {
    it('calls onBudgetExceeded when budget is exceeded', () => {
      const onExceeded = vi.fn();
      const { rerender } = render(
        <BudgetMeter {...defaultProps} spent={500} onBudgetExceeded={onExceeded} />
      );
      expect(onExceeded).not.toHaveBeenCalled();

      rerender(
        <BudgetMeter {...defaultProps} spent={1100} onBudgetExceeded={onExceeded} />
      );
      expect(onExceeded).toHaveBeenCalledTimes(1);
    });

    it('calls onCriticalThreshold when crossing critical', () => {
      const onCritical = vi.fn();
      const { rerender } = render(
        <BudgetMeter {...defaultProps} spent={500} onCriticalThreshold={onCritical} />
      );
      expect(onCritical).not.toHaveBeenCalled();

      rerender(
        <BudgetMeter {...defaultProps} spent={900} onCriticalThreshold={onCritical} />
      );
      expect(onCritical).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {
      render(<BudgetMeter {...defaultProps} />);
      expect(screen.getByRole('meter')).toBeInTheDocument();
    });

    it('has correct aria-valuenow and aria-valuemax', () => {
      render(<BudgetMeter {...defaultProps} />);
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuenow', '250');
      expect(meter).toHaveAttribute('aria-valuemax', '1000');
      expect(meter).toHaveAttribute('aria-valuemin', '0');
    });

    it('has descriptive aria-label', () => {
      render(<BudgetMeter {...defaultProps} />);
      expect(screen.getByRole('meter')).toHaveAttribute(
        'aria-label',
        expect.stringContaining('Session Budget')
      );
    });

    it('provides visually hidden detailed description', () => {
      render(<BudgetMeter {...defaultProps} />);
      expect(
        screen.getByText(/Session Budget.*250.*1\.0k.*25%/i)
      ).toBeInTheDocument();
    });
  });
});
