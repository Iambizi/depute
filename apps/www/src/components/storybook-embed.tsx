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
    <div
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--fd-border)',
        marginTop: '1rem',
        marginBottom: '1.5rem',
        background: 'var(--fd-secondary)',
      }}
    >
      <iframe
        src={url}
        title={`Storybook: ${story}`}
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
          display: 'block',
        }}
        loading="lazy"
        allow="clipboard-write"
      />
      <div
        style={{
          borderTop: '1px solid var(--fd-border)',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '12px',
            color: 'var(--fd-muted-foreground)',
            textDecoration: 'none',
          }}
        >
          Open in Storybook ↗
        </a>
      </div>
    </div>
  );
}

