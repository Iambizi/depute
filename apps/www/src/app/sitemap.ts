import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://depute.dev';
const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

function getMdxSlugs(dir: string, baseRoute = '/docs'): string[] {
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat && stat.isDirectory()) {
        results = results.concat(getMdxSlugs(fullPath, `${baseRoute}/${file}`));
      } else if (file.endsWith('.mdx')) {
        // Strip .mdx extension
        const slugName = file.replace('.mdx', '');
        
        // Handle index.mdx specially (it represents the directory root)
        if (slugName === 'index') {
          results.push(baseRoute);
        } else {
          results.push(`${baseRoute}/${slugName}`);
        }
      }
    });
  } catch (error) {
    console.warn(`Could not read directory for sitemap: ${dir}`);
  }
  
  return results;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Base static routes
  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Dynamically generate routes for all MDX documentation files
  const docSlugs = getMdxSlugs(DOCS_DIR);
  
  const docRoutes = docSlugs.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...docRoutes];
}
