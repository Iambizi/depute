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
            <img src="/logo.svg" alt="Depute Logo" className="h-8 md:h-10 w-auto object-contain" />
          </div>
        )
      }}
      githubUrl="https://github.com/Iambizi/depute"
    >
      {children}
    </DocsLayout>
  );
}
