// depute CLI — commands/add.js
// Copies a component's source files into the user's project.
// Shared types, a11y helpers, and design tokens are installed once, next to
// the chosen component directory, with import paths rewritten to match.

import fs from 'fs';
import path from 'path';
import { fetchRegistry, findComponent } from '../utils/registry.js';
import { readRepoFile } from '../utils/source.js';
import { writeFileToDisk, fileExists, createInstallTransaction } from '../utils/fs.js';

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
  { repoPath: 'src/styles/base.css', name: 'base.css' },
  { repoPath: 'src/styles/semantic.css', name: 'semantic.css' },
  { repoPath: 'src/styles/component.css', name: 'component.css' },
  { repoPath: 'src/styles/legacy.css', name: 'legacy.css' },
  { repoPath: 'src/styles/primitives.css', name: 'primitives.css' },
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
  const coreImport = importSpecifier(componentDir, path.posix.join(sharedRoot, 'types/ax-core'));
  const a11yImport = importSpecifier(componentDir, path.posix.join(sharedRoot, 'utils/ax-a11y'));
  const iconsImport = importSpecifier(componentDir, path.posix.join(sharedRoot, 'utils/ax-icons'));
  const receiptImport = importSpecifier(componentDir, path.posix.join(sharedRoot, 'utils/ax-receipt'));
  const signImport = importSpecifier(componentDir, path.posix.join(sharedRoot, 'utils/ax-receipt-sign'));
  const downloadImport = importSpecifier(componentDir, path.posix.join(sharedRoot, 'utils/ax-receipt-download'));
  return content
    .replace(/from (['"])(?:\.\.\/)+types\/common\1/g, (_, quote) => `from ${quote}${typesImport}${quote}`)
    .replace(/from (['"])(?:\.\.\/)+types\/core\1/g, (_, quote) => `from ${quote}${coreImport}${quote}`)
    .replace(/from (['"])(?:\.\.\/)+utils\/receiptDownload\1/g, (_, quote) => `from ${quote}${downloadImport}${quote}`)
    .replace(/from (['"])(?:\.\.\/)+utils\/receiptSign\1/g, (_, quote) => `from ${quote}${signImport}${quote}`)
    .replace(/from (['"])(?:\.\.\/)+utils\/receipt\1/g, (_, quote) => `from ${quote}${receiptImport}${quote}`)
    .replace(/from (['"])(?:\.\.\/)+utils\/a11y\1/g, (_, quote) => `from ${quote}${a11yImport}${quote}`)
    .replace(/from (['"])(?:\.\.\/)+utils\/icons\1/g, (_, quote) => `from ${quote}${iconsImport}${quote}`);
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
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to read ${repoPath}\n  ${message}`, { cause: err });
  }
}

/**
 * Read shared files that are not already on disk. Nothing is written here, so
 * a checksum failure or an interrupt during the read leaves the project untouched.
 * @param {string} sharedRoot
 */
export async function loadShared(sharedRoot) {
  /** @type {{ dest: string, content: string, note: 'types' | 'receipt' | 'a11y' | 'icons' | 'styles' }[]} */
  const files = [];

  const typesDest = path.posix.join(sharedRoot, 'types/ax-common.ts');
  if (!fileExists(typesDest)) {
    files.push({ dest: typesDest, content: await loadFile('src/types/common.ts'), note: 'types' });
  }

  const coreDest = path.posix.join(sharedRoot, 'types/ax-core.ts');
  if (!fileExists(coreDest)) {
    files.push({
      dest: coreDest,
      content: await loadFile('packages/core/src/presented.ts'),
      note: 'types',
    });
  }

  const receiptDest = path.posix.join(sharedRoot, 'utils/ax-receipt.ts');
  if (!fileExists(receiptDest)) {
    const presentedImport = importSpecifier(
      path.posix.join(sharedRoot, 'utils'),
      path.posix.join(sharedRoot, 'types/ax-core'),
    );
    const raw = await loadFile('packages/core/src/receipt.ts');
    files.push({
      dest: receiptDest,
      content: raw.replace(/from (['"])\.\/presented\1/g, (_, quote) => `from ${quote}${presentedImport}${quote}`),
      note: 'receipt',
    });
  }

  const triggersDest = path.posix.join(sharedRoot, 'utils/ax-triggers.ts');
  if (!fileExists(triggersDest)) {
    const presentedImport = importSpecifier(
      path.posix.join(sharedRoot, 'utils'),
      path.posix.join(sharedRoot, 'types/ax-core'),
    );
    const raw = await loadFile('packages/core/src/triggers.ts');
    files.push({
      dest: triggersDest,
      content: raw.replace(/from (['"])\.\/presented\1/g, (_, quote) => `from ${quote}${presentedImport}${quote}`),
      note: 'receipt',
    });
  }

  const signDest = path.posix.join(sharedRoot, 'utils/ax-receipt-sign.ts');
  if (!fileExists(signDest)) {
    const raw = await loadFile('src/utils/receiptSign.ts');
    files.push({
      dest: signDest,
      content: raw.replace(/from (['"])\.\/receipt\1/g, (_, quote) => `from ${quote}./ax-receipt${quote}`),
      note: 'receipt',
    });
  }

  const downloadDest = path.posix.join(sharedRoot, 'utils/ax-receipt-download.ts');
  if (!fileExists(downloadDest)) {
    const raw = await loadFile('src/utils/receiptDownload.ts');
    files.push({
      dest: downloadDest,
      content: raw.replace(/from (['"])\.\/receipt\1/g, (_, quote) => `from ${quote}./ax-receipt${quote}`),
      note: 'receipt',
    });
  }

  const a11yDest = path.posix.join(sharedRoot, 'utils/ax-a11y.tsx');
  if (!fileExists(a11yDest)) {
    files.push({ dest: a11yDest, content: await loadFile('src/utils/a11y.tsx'), note: 'a11y' });
  }

  const iconsDest = path.posix.join(sharedRoot, 'utils/ax-icons.tsx');
  if (!fileExists(iconsDest)) {
    files.push({ dest: iconsDest, content: await loadFile('src/utils/icons.tsx'), note: 'icons' });
  }

  /** @type {string | null} */
  let stylesDest = null;
  for (const file of STYLE_FILES) {
    const dest = path.posix.join(sharedRoot, 'styles', file.name);
    if (file.name === 'depute.css') stylesDest = dest;
    if (!fileExists(dest)) {
      files.push({ dest, content: await loadFile(file.repoPath), note: 'styles' });
    }
  }

  return { files, stylesDest };
}

/**
 * @param {{ files: { dest: string, content: string, note: 'types' | 'receipt' | 'a11y' | 'icons' | 'styles' }[], stylesDest: string | null }} plan
 * @param {ReturnType<typeof createInstallTransaction> | null} [transaction]
 */
export function writeShared(plan, transaction = null) {
  let wroteTypes = false;
  let wroteReceipt = false;
  let wroteA11y = false;
  let wroteStyles = false;
  for (const file of plan.files) {
    writeFileToDisk(file.dest, file.content, { transaction });
    if (file.note === 'types') wroteTypes = true;
    if (file.note === 'receipt') wroteReceipt = true;
    if (file.note === 'a11y') wroteA11y = true;
    if (file.note === 'styles') wroteStyles = true;
  }
  if (wroteTypes) console.log(`  ${c.dim('(shared types — added once)')}`);
  if (wroteReceipt) console.log(`  ${c.dim('(approval receipt — added once)')}`);
  if (wroteA11y) console.log(`  ${c.dim('(a11y utilities — added once)')}`);
  if (wroteStyles) console.log(`  ${c.dim('(design tokens — added once)')}`);
  return plan.stylesDest;
}

/**
 * @param {string} sharedRoot
 * @param {ReturnType<typeof createInstallTransaction> | null} [transaction]
 */
export async function installShared(sharedRoot, transaction = null) {
  const plan = await loadShared(sharedRoot);
  return writeShared(plan, transaction);
}

/**
 * @param {string | null} stylesDest
 * @param {string | null} cssFile
 * @param {boolean} noCss
 * @param {ReturnType<typeof createInstallTransaction> | null} [transaction]
 */
export function installCssImport(stylesDest, cssFile, noCss, transaction = null) {
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
  transaction?.trackMutation(abs, original);
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

  const transaction = createInstallTransaction();
  try {
    await addFiles({ name, outputDir, cssFile, noCss }, transaction);
    transaction.finish();
  } catch (err) {
    transaction.rollback();
    const message = err instanceof Error ? err.message : String(err);
    console.error(`\n  ${c.red('Error:')} ${message}\n`);
    console.error(`  ${c.dim('Install rolled back. No files from this attempt were left behind.')}\n`);
    process.exit(1);
  }
}

/**
 * @param {{ name: string, outputDir: string, cssFile: string | null, noCss: boolean }} opts
 * @param {ReturnType<typeof createInstallTransaction>} transaction
 */
async function addFiles({ name, outputDir, cssFile, noCss }, transaction) {
  console.log(`\n  ${c.bold('✦ ax-depute')} ${c.dim('— AX Components for React')}\n`);

  const sharedRoot = sharedRootFor(outputDir);

  if (name === 'mock-data') {
    const mockDest = path.posix.join(sharedRoot, 'utils/mockData.ts');
    const raw = await loadFile('src/utils/mockData.ts');
    const shared = await loadShared(sharedRoot);
    writeFileToDisk(mockDest, rewriteMockData(raw, sharedRoot, outputDir), { transaction });
    writeShared(shared, transaction);
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

  /** @type {{ dest: string, content: string }[]} */
  const planned = [];
  for (const srcPath of component.files) {
    const parts = srcPath.split('/');
    const filename = parts[parts.length - 1];
    const componentFolder = parts[parts.length - 2];
    const componentDir = path.posix.join(outputDir, componentFolder);
    const destPath = path.posix.join(componentDir, filename);
    const raw = await loadFile(srcPath);
    planned.push({ dest: destPath, content: rewriteComponentImports(raw, componentDir, sharedRoot) });
  }

  const shared = await loadShared(sharedRoot);
  for (const file of planned) {
    writeFileToDisk(file.dest, file.content, { transaction });
  }
  const stylesDest = writeShared(shared, transaction);
  installCssImport(stylesDest, cssFile, noCss, transaction);

  const importFrom = outputDir.startsWith('src/') ? outputDir.slice('src/'.length) : outputDir;
  const importPath = `./${path.posix.join(importFrom, component.label)}`;
  console.log(`  ${c.green('✓ Done!')} Import with:\n`);
  console.log(`    ${c.dim('import {')} ${c.bold(component.label)} ${c.dim(`} from '${importPath}'`)}\n`);

  if (component.axPrinciples?.length) {
    console.log(`  ${c.dim('AX Principles:')} ${component.axPrinciples.join(', ')}\n`);
  }
}
