'use client';

interface StorybookEmbedProps {
  /** Storybook story path, e.g. "approvalgate--default" */
  story: string;
  /** iframe height in pixels */
  height?: number;
}

export function StorybookEmbed({ story, height = 420 }: StorybookEmbedProps) {
  const url = `https://iambizi.github.io/depute/iframe.html?id=${story}&viewMode=story`;
  const fullUrl = `https://iambizi.github.io/depute/?path=/story/${story}`;

  return (
    <a
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '8px',
        border: '1px solid var(--fd-border)',
        padding: '16px 20px',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        background: 'var(--fd-card)',
        textDecoration: 'none',
        color: 'var(--fd-foreground)',
        transition: 'background 0.2s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = 'var(--fd-accent)')}
      onMouseOut={(e) => (e.currentTarget.style.background = 'var(--fd-card)')}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600 }}>Interactive Storybook</span>
        <span style={{ fontSize: '13px', color: 'var(--fd-muted-foreground)' }}>
          View all states, toggle props, and test edge cases.
        </span>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: 'var(--fd-muted-foreground)' }}
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </a>
  );
}

