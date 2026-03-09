import { useState, useEffect } from 'react';
import type { AutomationBiasAlertProps } from './AutomationBiasAlert.types';
import styles from './AutomationBiasAlert.module.css';

/**
 * AutomationBiasAlert — A friction-based barrier to counteract over-trust.
 * 
 * It intercepts user actions when behavioral patterns suggest "automation bias" 
 * (too fast, too many consecutive approvals, etc.)
 */
export function AutomationBiasAlert({
  actionName = 'this action',
  onAcknowledge,
  children,
  isActive = false,
  className,
}: AutomationBiasAlertProps) {
  const [countdown, setCountdown] = useState(3);
  const isLocked = countdown > 0;

  useEffect(() => {
    if (isActive && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive, countdown]);

  // Reset countdown if it becomes inactive then active again
  useEffect(() => {
    if (!isActive) {
      setCountdown(3);
    }
  }, [isActive]);

  const handleAcknowledge = () => {
    if (!isLocked) {
      onAcknowledge?.();
    }
  };

  return (
    <div className={`${styles.automationBiasAlert} ${className ?? ''}`}>
      {children}

      {isActive && (
        <div className={styles.overlay} role="alert" aria-live="assertive">
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            
            <h3 className={styles.title}>Deliberate Review Required</h3>
            <p className={styles.description}>
              You've approved several actions in rapid succession. Please take a moment to carefully review {actionName} before proceeding.
            </p>

            <div className={styles.actions}>
              <button
                className={`${styles.btn} ${styles.btnPrimary} ${isLocked ? styles.btnDisabled : ''}`}
                onClick={handleAcknowledge}
                disabled={isLocked}
                type="button"
              >
                {isLocked ? `Review details (${countdown}s)...` : 'I have reviewed the details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
