import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ 
        title: (
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Depute Logo" className="w-6 h-6 object-contain scale-[2.5] ml-2" />
            <span className="font-semibold tracking-tight">Depute</span>
          </div>
        )
      }}
    >
      {children}
    </DocsLayout>
  );
}
