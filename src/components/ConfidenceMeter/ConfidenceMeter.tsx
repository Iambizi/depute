/**
 * ConfidenceMeter — Confidence score visualization.
 *
 * Two display modes:
 * - meter: horizontal bar with fill percentage
 * - badge: compact inline pill
 *
 * @see docs/orchestration/06-technical-specifications.md (Component 3)
 */

import { useMemo } from 'react';
import { getConfidenceLevel } from '../../types/common';
import type { ConfidenceMeterProps } from './ConfidenceMeter.types';
import styles from './ConfidenceMeter.module.css';

const LEVEL_LABELS = { high: 'High', medium: 'Medium', low: 'Low' } as const;

export function ConfidenceMeter({
  value = 0,
  display = 'meter',
  size = 'md',
  showValue = true,
  showLabel = true,
  reasoning,
  animate = true,
  className,
}: ConfidenceMeterProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const level = useMemo(() => getConfidenceLevel(clamped), [clamped]);

  const ariaLabel = `Confidence: ${clamped}%, ${LEVEL_LABELS[level]}`;

  if (display === 'badge') {
    const badgeSizeClass = { sm: styles.badgeSm, md: styles.badgeMd, lg: styles.badgeLg }[size];
    const badgeColorClass = { high: styles.badgeHigh, medium: styles.badgeMedium, low: styles.badgeLow }[level];
    const dotClass = { high: styles.dotHigh, medium: styles.dotMedium, low: styles.dotLow }[level];

    return (
      <span
        className={`${styles.confidenceMeter} ${styles.badge} ${badgeSizeClass} ${badgeColorClass} ${className ?? ''}`}
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <span className={`${styles.dot} ${dotClass}`} aria-hidden="true" />
        {showValue && <span>{clamped}%</span>}
        {showLabel && <span className={styles.levelLabel}>{LEVEL_LABELS[level]}</span>}
      </span>
    );
  }

  // Meter display
  const trackSizeClass = { sm: styles.meterTrackSm, md: styles.meterTrackMd, lg: styles.meterTrackLg }[size];
  const fillColorClass = { high: styles.meterFillHigh, medium: styles.meterFillMedium, low: styles.meterFillLow }[level];
  const valueSizeClass = { sm: styles.valueLabelSm, md: styles.valueLabelMd, lg: styles.valueLabelLg }[size];

  return (
    <div className={`${styles.confidenceMeter} ${className ?? ''}`}>
      <div
        className={styles.meterContainer}
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div className={`${styles.meterTrack} ${trackSizeClass}`}>
          <div
            className={`${styles.meterFill} ${fillColorClass} ${!animate ? styles.meterFillNoAnimate : ''}`}
            style={{ width: `${clamped}%` }}
          />
        </div>
        {showValue && (
          <span className={`${styles.valueLabel} ${valueSizeClass}`}>
            {clamped}%
          </span>
        )}
        {showLabel && (
          <span className={`${styles.levelLabel} ${valueSizeClass}`}>
            {LEVEL_LABELS[level]}
          </span>
        )}
      </div>
      {reasoning && <div className={styles.reasoning}>{reasoning}</div>}
    </div>
  );
}
