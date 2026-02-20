import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ConfidenceMeter } from './ConfidenceMeter';

describe('ConfidenceMeter', () => {
  describe('rendering', () => {
    it('renders with required props (none required, defaults apply)', () => {
      render(<ConfidenceMeter />);
      const meter = screen.getByRole('meter');
      expect(meter).toBeInTheDocument();
      expect(meter).toHaveAttribute('aria-valuenow', '0');
    });

    it('renders with all optional props', () => {
      render(
        <ConfidenceMeter
          value={85}
          display="meter"
          size="lg"
          showValue={true}
          showLabel={true}
          reasoning="Based on recent data"
          animate={false}
          className="custom-meter"
        />
      );
      expect(screen.getByText('85%')).toBeInTheDocument();
      expect(screen.getByText('High')).toBeInTheDocument();
      expect(screen.getByText('Based on recent data')).toBeInTheDocument();
      expect(screen.getByRole('meter').parentElement).toHaveClass('custom-meter');
    });

    it('renders in badge display mode', () => {
      render(<ConfidenceMeter value={90} display="badge" />);
      const meter = screen.getByRole('meter');
      expect(meter.className).toMatch(/badge/i); // testing class structure implicitly
      // Alternatively we check role and label
      expect(meter).toHaveAttribute('aria-label', expect.stringContaining('High'));
    });

    it('applies custom className', () => {
      render(<ConfidenceMeter value={50} className="custom-class" />);
      // in meter mode, the container has the class
      const container = screen.getByRole('meter').parentElement;
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('states', () => {
    it('displays high confidence state correctly (80-100)', () => {
      const { rerender } = render(<ConfidenceMeter value={80} showLabel />);
      expect(screen.getByText('High')).toBeInTheDocument();

      rerender(<ConfidenceMeter value={100} showLabel />);
      expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('displays medium confidence state correctly (40-79)', () => {
      const { rerender } = render(<ConfidenceMeter value={40} showLabel />);
      expect(screen.getByText('Medium')).toBeInTheDocument();

      rerender(<ConfidenceMeter value={79} showLabel />);
      expect(screen.getByText('Medium')).toBeInTheDocument();
    });

    it('displays low confidence state correctly (0-39)', () => {
      const { rerender } = render(<ConfidenceMeter value={0} showLabel />);
      expect(screen.getByText('Low')).toBeInTheDocument();

      rerender(<ConfidenceMeter value={39} showLabel />);
      expect(screen.getByText('Low')).toBeInTheDocument();
    });

    it('clamps values below 0 or above 100', () => {
      const { rerender } = render(<ConfidenceMeter value={-50} />);
      expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '0');

      rerender(<ConfidenceMeter value={150} />);
      expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('interactions', () => {
    // ConfidenceMeter has no direct user interactions (clicks), but we can test
    // how it responds to prop updates (which simulate live data streaming).
    
    it('updates visually when value changes (subscription simulation)', () => {
      const { rerender } = render(<ConfidenceMeter value={20} />);
      expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '20');
      expect(screen.getByText('Low')).toBeInTheDocument();

      rerender(<ConfidenceMeter value={85} />);
      expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '85');
      expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('respects showLabel and showValue toggles', () => {
      const { rerender } = render(<ConfidenceMeter value={50} showLabel={false} showValue={false} />);
      expect(screen.queryByText('Medium')).not.toBeInTheDocument();
      expect(screen.queryByText('50%')).not.toBeInTheDocument();

      rerender(<ConfidenceMeter value={50} showLabel={true} showValue={true} />);
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {
      render(<ConfidenceMeter value={70} />);
      expect(screen.getByRole('meter')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(<ConfidenceMeter value={70} />);
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuemin', '0');
      expect(meter).toHaveAttribute('aria-valuemax', '100');
      expect(meter).toHaveAttribute('aria-valuenow', '70');
    });

    it('provides a descriptive aria-label', () => {
      render(<ConfidenceMeter value={75} />);
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-label', 'Confidence: 75%, Medium');
    });
  });
});
