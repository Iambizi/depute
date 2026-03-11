import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { GithubBadge } from '@/components/github-badge';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ 
        title: (
          <div className="flex items-center">
            <img src="/logo.svg" alt="Depute Logo" className="h-8 md:h-10 w-auto object-contain" />
          </div>
        )
      }}
      links={[
        {
          type: 'custom',
          children: <GithubBadge />
        }
      ]}
    >
      {children}
    </DocsLayout>
  );
}
