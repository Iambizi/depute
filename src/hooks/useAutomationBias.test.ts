import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAutomationBias } from './useAutomationBias';

describe('useAutomationBias', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should trigger alert after consecutive approvals', () => {
    const { result } = renderHook(() => useAutomationBias({ 
      consecutiveApprovals: 3,
      minApprovalTimeMs: 0 
    }));

    act(() => {
      result.current.recordAction('approved');
      result.current.recordAction('approved');
    });
    expect(result.current.isAlertTriggered).toBe(false);

    act(() => {
      result.current.recordAction('approved');
    });
    expect(result.current.isAlertTriggered).toBe(true);
  });

  it('should trigger alert on fast approvals', () => {
    const { result } = renderHook(() => useAutomationBias({ minApprovalTimeMs: 1000 }));

    act(() => {
      // Simulate 500ms passing
      vi.advanceTimersByTime(500);
      result.current.recordAction('approved');
    });

    expect(result.current.isAlertTriggered).toBe(true);
  });

  it('should not trigger alert if approval is slow enough', () => {
    const { result } = renderHook(() => useAutomationBias({ minApprovalTimeMs: 1000 }));

    act(() => {
      // Simulate 1500ms passing
      vi.advanceTimersByTime(1500);
      result.current.recordAction('approved');
    });

    expect(result.current.isAlertTriggered).toBe(false);
  });

  it('should reset alert state on dismiss', () => {
    const { result } = renderHook(() => useAutomationBias({ consecutiveApprovals: 1 }));

    act(() => {
      result.current.recordAction('approved');
    });
    expect(result.current.isAlertTriggered).toBe(true);

    act(() => {
      result.current.dismissAlert();
    });
    expect(result.current.isAlertTriggered).toBe(false);
  });
});
