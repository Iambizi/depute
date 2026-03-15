import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the root docs directory
const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

// Set Vercel execution to force-dynamic to ensure node-fs access, or use ISR.
// We'll use static generation with revalidation for optimal performance on Vercel.
export const revalidate = 3600; 

function getAllMdxFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
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

export async function GET() {
  try {
    const files = getAllMdxFiles(DOCS_DIR);
    let combinedContent = '# Depute (AX) - Complete Documentation\n\n';
    combinedContent += 'This file contains the complete, concatenated documentation for the Depute React component library. It is optimized for LLMs and AI coding agents.\n\n';
    combinedContent += '---\n\n';

    // Sort files to ensure index.mdx and installation.mdx appear first
    files.sort((a, b) => {
      if (a.includes('index.mdx')) return -1;
      if (b.includes('index.mdx')) return 1;
      if (a.includes('installation.mdx')) return -1;
      if (b.includes('installation.mdx')) return 1;
      return a.localeCompare(b);
    });

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Strip MDX import statements which are confusing to LLMs reading raw text
      const cleanContent = content.replace(/^import\s+.*?(from)?\s+['"].*?['"](;|)[\r\n]/gm, '');
      
      combinedContent += cleanContent + '\n\n---\n\n';
    }

    return new NextResponse(combinedContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating llms.txt:', error);
    return new NextResponse('Internal Server Error while generating llms.txt.', { status: 500 });
  }
}
