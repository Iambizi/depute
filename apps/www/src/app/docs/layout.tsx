import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { Folder, Item, Node, Root } from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

function readBadge(data: object): string | undefined {
  const record = data as Record<string, unknown>;
  return typeof record.badge === 'string' ? record.badge : undefined;
}

const urlToBadge = new Map<string, string>();
for (const page of source.getPages()) {
  const badgeStr = readBadge(page.data);
  if (badgeStr) {
    urlToBadge.set(page.url, badgeStr);
  }
}

function badgeName(url: string, title: ReactNode, badge: string): ReactNode {
  const typeColor =
    badge === 'Primitive' ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20' :
    badge === 'View' ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20' :
    badge === 'Pattern' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
    'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20';

  return (
    <span key={`badge-wrap-${url}`} className="flex items-center justify-between w-full pr-1">
      <span key={`title-${url}`}>{title}</span>
      <span key={`tag-${url}`} className={`ml-2 shrink-0 whitespace-nowrap text-xs uppercase font-mono px-1.5 py-0.5 rounded-sm border ${typeColor}`}>
        {badge}
      </span>
    </span>
  );
}

function mapItem(node: Item): Item {
  const badge = urlToBadge.get(node.url);
  if (!badge) return node;
  return { ...node, name: badgeName(node.url, node.name, badge) };
}

function mapNode(node: Node): Node {
  if (node.type === 'page') return mapItem(node);
  if (node.type === 'folder') return mapFolder(node);
  return node;
}

function mapFolder(node: Folder): Folder {
  return {
    ...node,
    children: node.children.map(mapNode),
    index: node.index ? mapItem(node.index) : node.index,
  };
}

function mapTree(root: Root): Root {
  return {
    ...root,
    children: root.children.map(mapNode),
    fallback: root.fallback ? mapTree(root.fallback) : root.fallback,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={mapTree(source.pageTree)}
      nav={{ 
        title: (
          <img
            src="/title-logo.webp"
            alt="Depute"
            className="w-28 md:w-36 h-auto object-contain origin-left"
          />
        )
      }}
      githubUrl="https://github.com/Iambizi/depute"
      links={[
        {
          text: 'Storybook',
          url: 'https://iambizi.github.io/depute/',
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
