'use client';

import { useState, type ReactNode } from 'react';
import styles from './component-preview.module.css';

interface ComponentPreviewProps {
  children: ReactNode;
  /** Optional code string to display in the "Code" tab */
  code?: string;
  /** Whether to center the component in the preview area */
  center?: boolean;
  /** Additional class name */
  className?: string;
}

export function ComponentPreview({
  children,
  code,
  center = true,
  className,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      {/* Tab bar */}
      {code && (
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'preview' ? styles.active : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>
      )}

      {/* Preview pane */}
      {activeTab === 'preview' && (
        <div className={`${styles.preview} ${center ? styles.center : ''}`}>
          {children}
        </div>
      )}

      {/* Code pane */}
      {activeTab === 'code' && code && (
        <div className={styles.codePane}>
          <pre className={styles.codeBlock}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
