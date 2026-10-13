// depute CLI — commands/add.js
// Copies a component's source files into the user's project.
// Shared types, a11y helpers, and design tokens are installed once, next to
// the chosen component directory, with import paths rewritten to match.

import fs from 'fs';
import path from 'path';
import { fetchRegistry, findComponent } from '../utils/registry.js';
import { readRepoFile } from '../utils/source.js';
import { writeFileToDisk, fileExists } from '../utils/fs.js';

const c = {
  bold:  (s) => `\x1b[1m${s}\x1b[0m`,
  cyan:  (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red:   (s) => `\x1b[31m${s}\x1b[0m`,
  dim:   (s) => `\x1b[2m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
};

const COMPONENTS_DIR = 'src/components';

const STYLE_FILES = [
  { repoPath: 'src/styles/tokens.css', name: 'tokens.css' },
  { repoPath: 'src/styles/animations.css', name: 'animations.css' },
  { repoPath: 'src/styles/index.css', name: 'depute.css' },
];

const CSS_CANDIDATES = [
  'src/index.css',
  'src/app/globals.css',
  'app/globals.css',
  'src/globals.css',
  'src/App.css',
  'src/styles/globals.css',
];

/**
 * @param {string} dir
 */
function normalizeDir(dir) {
  const normalized = String(dir).replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/$/, '');
  return normalized === '' ? '.' : normalized;
}

/**
 * Parent of the component output directory. Shared files live here so
 * `src/components` keeps `src/types` and `--dir components/ax` keeps
 * `components/types`.
 * @param {string} outputDir
 */
function sharedRootFor(outputDir) {
  const parent = path.posix.dirname(normalizeDir(outputDir));
  return parent === '' ? '.' : parent;
}

/**
 * Posix relative import from a directory to a path without an extension.
 * @param {string} fromDir
 * @param {string} toPath
 */
function importSpecifier(fromDir, toPath) {
  let rel = path.posix.relative(normalizeDir(fromDir), normalizeDir(toPath));
  if (rel === '') return '.';
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel;
}

/**
 * @param {string} content
 * @param {string} componentDir
 * @param {string} sharedRoot
 */
function rewriteComponentImports(content, componentDir, sharedRoot) {
  const typesImport = importSpecifier(componentDir, path.posix.join(sharedRoot, 'types/ax-common'));
  const a11yImport = importSpecifier(componentDir, path.posix.join(sharedRoot, 'utils/ax-a11y'));
  return content
    .replace(/from (['"])(?:\.\.\/)+types\/common\1/g, (_, quote) => `from ${quote}${typesImport}${quote}`)
    .replace(/from (['"])(?:\.\.\/)+utils\/a11y\1/g, (_, quote) => `from ${quote}${a11yImport}${quote}`);
}

/**
 * @param {string} content
 * @param {string} sharedRoot
 * @param {string} outputDir
 */
function rewriteMockData(content, sharedRoot, outputDir) {
  const fromDir = path.posix.join(sharedRoot, 'utils');
  const typesImport = importSpecifier(fromDir, path.posix.join(sharedRoot, 'types/ax-common'));
  let next = content.replace(
    /from (['"])\.\.\/types\/common\1/g,
    (_, quote) => `from ${quote}${typesImport}${quote}`,
  );
  next = next.replace(
    /from (['"])\.\.\/components\/([^'"]+)\1/g,
    (_, quote, rest) => {
      const spec = importSpecifier(fromDir, path.posix.join(normalizeDir(outputDir), rest));
      return `from ${quote}${spec}${quote}`;
    },
  );
  return next;
}

/**
 * @param {string[]} args
 */
function parseArgs(args) {
  const positional = [];
  let outputDir = COMPONENTS_DIR;
  let cssFile = null;
  let noCss = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--dir') {
      const value = args[i + 1];
      if (!value) {
        console.error(`\n  ${c.red('Error:')} --dir needs a path.\n`);
        process.exit(1);
      }
      outputDir = value;
      i++;
    } else if (arg === '--css') {
      const value = args[i + 1];
      if (!value) {
        console.error(`\n  ${c.red('Error:')} --css needs a stylesheet path.\n`);
        process.exit(1);
      }
      cssFile = value;
      i++;
    } else if (arg === '--no-css') {
      noCss = true;
    } else if (arg.startsWith('--')) {
      console.error(`\n  ${c.red('Error:')} Unknown option "${arg}".\n`);
      process.exit(1);
    } else {
      positional.push(arg);
    }
  }

  return { name: positional[0], outputDir: normalizeDir(outputDir), cssFile, noCss };
}

/**
 * @param {string} repoPath
 */
async function loadFile(repoPath) {
  try {
    return await readRepoFile(repoPath);
  } catch (err) {
    console.error(`\n  ${c.red('Error:')} Failed to read ${repoPath}\n  ${c.dim(err.message)}\n`);
    process.exit(1);
  }
}

/**
 * @param {string} sharedRoot
 */
export async function installShared(sharedRoot) {
  const typesDest = path.posix.join(sharedRoot, 'types/ax-common.ts');
  if (!fileExists(typesDest)) {
    const typesContent = await loadFile('src/types/common.ts');
    writeFileToDisk(typesDest, typesContent);
    console.log(`  ${c.dim('(shared types — added once)')}`);
  }

  const a11yDest = path.posix.join(sharedRoot, 'utils/ax-a11y.tsx');
  if (!fileExists(a11yDest)) {
    const a11yContent = await loadFile('src/utils/a11y.tsx');
    writeFileToDisk(a11yDest, a11yContent);
    console.log(`  ${c.dim('(a11y utilities — added once)')}`);
  }

  let stylesDest = null;
  let wroteStyles = false;
  for (const file of STYLE_FILES) {
    const dest = path.posix.join(sharedRoot, 'styles', file.name);
    if (file.name === 'depute.css') stylesDest = dest;
    if (!fileExists(dest)) {
      const content = await loadFile(file.repoPath);
      writeFileToDisk(dest, content);
      wroteStyles = true;
    }
  }
  if (wroteStyles) {
    console.log(`  ${c.dim('(design tokens — added once)')}`);
  }
  return stylesDest;
}

/**
 * @param {string | null} stylesDest
 * @param {string | null} cssFile
 * @param {boolean} noCss
 */
export function installCssImport(stylesDest, cssFile, noCss) {
  if (!stylesDest || noCss) return;

  const targets = cssFile ? [cssFile] : CSS_CANDIDATES.filter((candidate) => fileExists(candidate));
  if (targets.length === 0) {
    console.log(`\n  ${c.yellow('Styles:')} import the tokens once in your global CSS:\n`);
    console.log(`    ${c.bold(`@import "${path.posix.join(path.posix.dirname(stylesDest), 'depute.css')}";`)}\n`);
    console.log(`  ${c.dim('Or re-run with --css <file> to insert the import.')}\n`);
    return;
  }

  const target = targets[0];
  const abs = path.resolve(process.cwd(), target);
  const original = fs.readFileSync(abs, 'utf8');
  if (original.includes('depute.css')) {
    console.log(`\n  ${c.dim(`Styles already imported in ${target}`)}\n`);
    return;
  }

  const spec = `${importSpecifier(path.posix.dirname(normalizeDir(target)), stylesDest.replace(/\.css$/, ''))}.css`;
  const line = `@import "${spec}";\n`;
  fs.writeFileSync(abs, line + original, 'utf8');
  console.log(`\n  ${c.green('✓')} Added ${c.bold(`@import "${spec}"`)} to ${target}`);
  if (targets.length > 1) {
    console.log(`  ${c.dim(`Other stylesheets were left unchanged: ${targets.slice(1).join(', ')}`)}`);
  }
  console.log('');
}

/**
 * @param {string[]} args  e.g. ['plan-card'] or ['plan-card', '--dir', 'components/ax']
 */
export async function runAdd(args) {
  const { name, outputDir, cssFile, noCss } = parseArgs(args);

  if (!name) {
    console.error(`\n  ${c.red('Error:')} Please specify a component name.\n`);
    console.error(`  Usage: ${c.bold('npx ax-depute@latest add <component-name>')}\n`);
    console.error(`  Run ${c.bold('npx ax-depute list')} to see available components.\n`);
    process.exit(1);
  }

  console.log(`\n  ${c.bold('✦ ax-depute')} ${c.dim('— AX Components for React')}\n`);

  const sharedRoot = sharedRootFor(outputDir);

  if (name === 'mock-data') {
    const mockDest = path.posix.join(sharedRoot, 'utils/mockData.ts');
    const raw = await loadFile('src/utils/mockData.ts');
    writeFileToDisk(mockDest, rewriteMockData(raw, sharedRoot, outputDir));
    await installShared(sharedRoot);
    console.log(`\n  ${c.green('✓ Done!')} Import generators from ${c.bold(mockDest)}`);
    console.log(`  ${c.dim('mock-data type-imports every component. Add the components you use so the file typechecks.')}\n`);
    return;
  }

  let registry;
  try {
    process.stdout.write(`  ${c.dim('Fetching registry...')}\r`);
    registry = await fetchRegistry();
    process.stdout.write(`                          \r`);
  } catch (err) {
    console.error(`  ${c.red('Error:')} Could not fetch registry. Check your internet connection.\n`);
    console.error(`  ${c.dim(err.message)}\n`);
    process.exit(1);
  }

  const component = findComponent(registry, name);
  if (!component) {
    console.error(`  ${c.red('Error:')} Component "${name}" not found.\n`);
    console.error(`  Run ${c.bold('npx ax-depute list')} to see available components.\n`);
    process.exit(1);
  }

  console.log(`  Adding: ${c.bold(component.label)} ${c.dim(`(${component.category})`)}\n`);

  for (const srcPath of component.files) {
    const parts = srcPath.split('/');
    const filename = parts[parts.length - 1];
    const componentFolder = parts[parts.length - 2];
    const componentDir = path.posix.join(outputDir, componentFolder);
    const destPath = path.posix.join(componentDir, filename);
    const raw = await loadFile(srcPath);
    const content = rewriteComponentImports(raw, componentDir, sharedRoot);
    writeFileToDisk(destPath, content);
  }

  const stylesDest = await installShared(sharedRoot);
  installCssImport(stylesDest, cssFile, noCss);

  const importFrom = outputDir.startsWith('src/') ? outputDir.slice('src/'.length) : outputDir;
  const importPath = `./${path.posix.join(importFrom, component.label)}`;
  console.log(`  ${c.green('✓ Done!')} Import with:\n`);
  console.log(`    ${c.dim('import {')} ${c.bold(component.label)} ${c.dim(`} from '${importPath}'`)}\n`);

  if (component.axPrinciples?.length) {
    console.log(`  ${c.dim('AX Principles:')} ${component.axPrinciples.join(', ')}\n`);
  }
}
