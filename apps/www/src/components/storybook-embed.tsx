'use client';

interface StorybookEmbedProps {
  /** Storybook story path, e.g. "approvalgate--default" */
  story: string;
  /** iframe height in pixels */
  height?: number;
}

export function StorybookEmbed({ story, height = 420 }: StorybookEmbedProps) {
  const url = `https://iambizi.github.io/depute/iframe.html?id=${story}&viewMode=story`;

  return (
    <div
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--fd-border)',
        marginTop: '1rem',
        marginBottom: '1.5rem',
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
    </div>
  );
}
