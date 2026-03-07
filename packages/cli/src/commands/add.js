// depute CLI — commands/add.js
// Copies a component's source files into the user's project.

import path from 'path';
import { fetchRegistry, findComponent } from '../utils/registry.js';
import { fetchRepoFile } from '../utils/github.js';
import { writeFileToDisk, fileExists } from '../utils/fs.js';

const c = {
  bold:  (s) => `\x1b[1m${s}\x1b[0m`,
  cyan:  (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red:   (s) => `\x1b[31m${s}\x1b[0m`,
  dim:   (s) => `\x1b[2m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
};

// Where in the user's project to write component files (relative to CWD)
const COMPONENTS_DIR = 'src/components';
const TYPES_DEST = 'src/types/ax-common.ts';
const TYPES_SRC = 'src/types/common.ts';

/**
 * @param {string[]} args  e.g. ['plan-card'] or ['plan-card', '--dir', 'components']
 */
export async function runAdd(args) {
  const componentName = args[0];

  if (!componentName) {
    console.error(`\n  ${c.red('Error:')} Please specify a component name.\n`);
    console.error(`  Usage: ${c.bold('npx ax-depute@latest add <component-name>')}\n`);
    console.error(`  Run ${c.bold('npx ax-depute list')} to see available components.\n`);
    process.exit(1);
  }

  // Parse optional --dir flag
  const dirFlagIdx = args.indexOf('--dir');
  const outputDir = dirFlagIdx !== -1 && args[dirFlagIdx + 1]
    ? args[dirFlagIdx + 1]
    : COMPONENTS_DIR;

  console.log(`\n  ${c.bold('✦ ax-depute')} ${c.dim('— AX Components for React')}\n`);

  // 1. Fetch registry
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

  // 2. Find component
  const component = findComponent(registry, componentName);
  if (!component) {
    console.error(`  ${c.red('Error:')} Component "${componentName}" not found.\n`);
    console.error(`  Run ${c.bold('npx ax-depute list')} to see available components.\n`);
    process.exit(1);
  }

  console.log(`  Adding: ${c.bold(component.label)} ${c.dim(`(${component.category})`)}\n`);

  // 3. Copy component files
  for (const srcPath of component.files) {
    // srcPath is like "src/components/PlanCard/PlanCard.tsx"
    // We strip the "src/components/<Name>/" prefix and put into outputDir/<Name>/
    const parts = srcPath.split('/');
    const filename = parts[parts.length - 1];
    const componentFolder = parts[parts.length - 2];
    const destPath = path.join(outputDir, componentFolder, filename);

    let content;
    try {
      content = await fetchRepoFile(srcPath);
    } catch (err) {
      console.error(`\n  ${c.red('Error:')} Failed to fetch ${srcPath}\n  ${c.dim(err.message)}\n`);
      process.exit(1);
    }

    // Rewrite the import path for types if needed
    // Components import from '../../types/common' — rewrite to relative ax-common
    content = content.replace(
      /from ['"]\.\.\/\.\.\/types\/common['"]/g,
      `from '../../types/ax-common'`
    );
    content = content.replace(
      /from ['"]\.\.\/\.\.\/utils\/a11y['"]/g,
      `from '../../utils/ax-a11y'`
    );

    writeFileToDisk(destPath, content);
  }

  // 4. Copy shared types (once, if not already present)
  const needsTypes = !fileExists(TYPES_DEST);
  if (needsTypes) {
    let typesContent;
    try {
      typesContent = await fetchRepoFile(TYPES_SRC);
      console.log('');
      writeFileToDisk(TYPES_DEST, typesContent);
      console.log(`  ${c.dim('(shared types — added once)')}`);
    } catch {
      console.log(`\n  ${c.yellow('Warning:')} Could not fetch shared types. Add manually from the repo.`);
    }
  }

  // 5. Copy a11y utilities (once, if not already present)
  const a11yDest = 'src/utils/ax-a11y.tsx';
  const a11ySrc = 'src/utils/a11y.tsx';
  const needsA11y = !fileExists(a11yDest);
  if (needsA11y) {
    let a11yContent;
    try {
      a11yContent = await fetchRepoFile(a11ySrc);
      writeFileToDisk(a11yDest, a11yContent);
      console.log(`  ${c.dim('(a11y utilities — added once)')}`);
    } catch {
      // Non-fatal — not all components use a11y utils
    }
  }

  // 6. Success summary
  console.log(`\n  ${c.green('✓ Done!')} Import with:\n`);
  console.log(`    ${c.dim('import {')} ${c.bold(component.label)} ${c.dim(`} from './${path.join(outputDir, component.label)}'`)}\n`);

  if (component.axPrinciples?.length) {
    console.log(`  ${c.dim('AX Principles:')} ${component.axPrinciples.join(', ')}\n`);
  }
}
