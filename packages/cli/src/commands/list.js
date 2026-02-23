// depute CLI — commands/list.js
// Lists all available AX Components from the registry.

import { fetchRegistry } from '../utils/registry.js';

const c = {
  bold:  (s) => `\x1b[1m${s}\x1b[0m`,
  cyan:  (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  dim:   (s) => `\x1b[2m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
};

export async function runList() {
  console.log(`\n  ${c.bold('✦ depute')} ${c.dim('— AX Components for React')}\n`);

  let registry;
  try {
    process.stdout.write(`  ${c.dim('Fetching registry...')}\r`);
    registry = await fetchRegistry();
    process.stdout.write(`                          \r`);
  } catch (err) {
    console.error(`  ${c.red('Error:')} Could not fetch registry.\n  ${c.dim(err.message)}\n`);
    process.exit(1);
  }

  // Group by category
  const grouped = {};
  for (const item of registry.items) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  const total = registry.items.length;
  console.log(`  ${c.bold(String(total))} component${total !== 1 ? 's' : ''} available\n`);

  for (const [category, items] of Object.entries(grouped)) {
    console.log(`  ${c.cyan(c.bold(category))}`);
    for (const item of items) {
      const namePad = item.name.padEnd(26);
      console.log(`    ${c.green(namePad)}  ${c.dim(item.description)}`);
    }
    console.log('');
  }

  console.log(`  ${c.dim('Usage:')} npx depute ${c.bold('<component-name>')}`);
  console.log(`  ${c.dim('Example:')} npx depute add approval-gate\n`);
}
