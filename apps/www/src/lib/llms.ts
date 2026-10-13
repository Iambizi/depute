import fs from 'fs';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

function getAllMdxFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMdxFiles(fullPath));
    } else if (file.endsWith('.mdx')) {
      results.push(fullPath);
    }
  });

  return results;
}

/** Concatenated docs for agents. Served at /llms.txt and /llms-full.txt. */
export function buildLlmsText(): string {
  const files = getAllMdxFiles(DOCS_DIR);
  let combinedContent = '# Depute (AX) - Complete Documentation\n\n';
  combinedContent += 'This file contains the complete, concatenated documentation for the Depute React component library. It is optimized for LLMs and AI coding agents.\n\n';
  combinedContent += '---\n\n';

  files.sort((a, b) => {
    if (a.includes('index.mdx')) return -1;
    if (b.includes('index.mdx')) return 1;
    if (a.includes('installation.mdx')) return -1;
    if (b.includes('installation.mdx')) return 1;
    return a.localeCompare(b);
  });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const cleanContent = content.replace(/^import\s+.*?(from)?\s+['"].*?['"](;|)[\r\n]/gm, '');
    combinedContent += cleanContent + '\n\n---\n\n';
  }

  return combinedContent;
}
