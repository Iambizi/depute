import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

const urlToBadge = new Map<string, string>();
for (const page of source.getPages()) {
  const badgeStr = (page.data as any)?.badge as string | undefined;
  if (badgeStr) {
    urlToBadge.set(page.url, badgeStr);
  }
}

function mapTree(node: any): any {
  if (Array.isArray(node)) return node.map(mapTree);
  if (!node) return node;

  const result = { ...node };

  if (result.type === 'page' && result.url) {
    const badgeStr = urlToBadge.get(result.url);
    
    if (badgeStr) {
      const typeStr = badgeStr;
      const typeColor = 
        typeStr === 'Primitive' ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20' :
        typeStr === 'View' ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20' :
        typeStr === 'Pattern' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
        'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20'; // Control

      result.name = (
        <div className="flex items-center justify-between w-full pr-1">
          <span>{node.name}</span>
          <span className={`ml-2 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-sm border ${typeColor}`}>
            {typeStr}
          </span>
        </div>
      );
    }
  }

  if (result.children) {
    result.children = mapTree(result.children);
  }
  
  if (result.index) {
    result.index = mapTree(result.index);
  }

  return result;
}

export default function Layout({ children }: { children: ReactNode }) {
  const treeWithBadges = mapTree(source.pageTree);

  return (
    <DocsLayout
      tree={treeWithBadges}
      nav={{ 
        title: (
          <div className="flex items-center">
            <img src="/title-logo.svg" alt="Depute Logo" className="w-28 md:w-36 h-auto object-contain scale-[1.3] md:scale-[1.5] origin-left" />
          </div>
        )
      }}
      githubUrl="https://github.com/Iambizi/depute"
    >
      {children}
    </DocsLayout>
  );
}
