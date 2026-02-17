/**
 * AX Components — Accessibility Utilities
 *
 * Dependency-free a11y helpers used across all AX primitives.
 * These ensure keyboard navigation, screen reader support,
 * and focus management work correctly in agent-supervised UIs.
 *
 * @packageDocumentation
 */

import { useEffect, useRef, useCallback, useState } from 'react';

// ---------------------------------------------------------------------------
// VisuallyHidden
// ---------------------------------------------------------------------------

/**
 * Props for the VisuallyHidden component.
 * Content is hidden visually but remains accessible to screen readers.
 */
export interface VisuallyHiddenProps {
  children: React.ReactNode;
  /** Render as a specific element (default: 'span') */
  as?: React.ElementType;
}

/** CSS to visually hide content while keeping it accessible */
const visuallyHiddenStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

/**
 * Renders content that is visually hidden but accessible to screen readers.
 * Use for labels, status announcements, and contextual information.
 *
 * @example
 * ```tsx
 * <VisuallyHidden>Step 3 of 5 completed</VisuallyHidden>
 * ```
 */
export function VisuallyHidden({
  children,
  as: Component = 'span',
}: VisuallyHiddenProps): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element = Component as any;
  return <Element style={visuallyHiddenStyle}>{children}</Element>;
}

// ---------------------------------------------------------------------------
// useAnnouncer — aria-live region management
// ---------------------------------------------------------------------------

/**
 * Hook that manages an aria-live region for announcing state changes
 * to screen readers. Essential for async agent operations where visual
 * changes need audible equivalents.
 *
 * @param politeness - 'polite' waits for idle, 'assertive' interrupts
 * @returns [announce, AnnouncerRegion]
 *
 * @example
 * ```tsx
 * const [announce, AnnouncerRegion] = useAnnouncer();
 *
 * // On approval gate state change:
 * announce('Approval required: deploy to production');
 *
 * // In JSX:
 * <AnnouncerRegion />
 * ```
 */
export function useAnnouncer(
  politeness: 'polite' | 'assertive' = 'polite'
): [announce: (message: string) => void, AnnouncerRegion: () => React.ReactElement] {
  const [message, setMessage] = useState('');

  const announce = useCallback((text: string) => {
    // Clear first to ensure re-announcement of identical messages
    setMessage('');
    requestAnimationFrame(() => setMessage(text));
  }, []);

  const AnnouncerRegion = useCallback(
    () => (
      <span
        role="status"
        aria-live={politeness}
        aria-atomic="true"
        style={visuallyHiddenStyle}
      >
        {message}
      </span>
    ),
    [message, politeness]
  );

  return [announce, AnnouncerRegion];
}

// ---------------------------------------------------------------------------
// useFocusTrap — focus containment for blocking UI
// ---------------------------------------------------------------------------

/**
 * Hook to trap focus within a container element.
 * Used by ApprovalGate to prevent interaction with background content
 * while waiting for human approval.
 *
 * @param active - Whether the focus trap is currently active
 * @returns ref to attach to the container element
 *
 * @example
 * ```tsx
 * const trapRef = useFocusTrap(isPending);
 *
 * return (
 *   <div ref={trapRef}>
 *     <button>Approve</button>
 *     <button>Reject</button>
 *   </div>
 * );
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  active: boolean
): React.RefObject<T | null> {
  const containerRef = useRef<T | null>(null);
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    // Store currently focused element to restore later
    previousFocusRef.current = document.activeElement;

    const container = containerRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Focus first focusable element
    const firstFocusable = container.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to previous element
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [active]);

  return containerRef;
}
