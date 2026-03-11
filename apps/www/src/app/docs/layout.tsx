import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ 
        title: (
          <div className="flex items-center">
            <img src="/title-logo.svg" alt="Depute Logo" className="h-10 md:h-12 w-auto object-contain origin-left" />
          </div>
        )
      }}
      githubUrl="https://github.com/Iambizi/depute"
    >
      {children}
    </DocsLayout>
  );
}
