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
            <img src="/title-logo.svg" alt="Depute Logo" className="w-28 md:w-36 h-auto object-contain scale-[1.3] md:scale-[1.5] origin-left" />
          </div>
        ),
        children: (
          <GithubBadge />
        )
      }}
    >
      {children}
    </DocsLayout>
  );
}
