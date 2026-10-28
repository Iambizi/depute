#!/usr/bin/env node
// Hash every file the CLI can install. The manifest ships inside ax-depute
// and is checked before a file is written into a user's project.

import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry/registry.json'), 'utf8'));

const files = new Set([
  'registry/registry.json',
  'src/types/common.ts',
  'packages/core/src/presented.ts',
  'packages/core/src/receipt.ts',
  'packages/core/src/triggers.ts',
  'src/utils/receiptDownload.ts',
  'src/utils/receiptSign.ts',
  'src/utils/a11y.tsx',
  'src/utils/mockData.ts',
  'src/styles/base.css',
  'src/styles/semantic.css',
  'src/styles/component.css',
  'src/styles/legacy.css',
  'src/styles/primitives.css',
  'src/styles/tokens.css',
  'src/styles/animations.css',
  'src/styles/index.css',
  'src/utils/icons.tsx',
  'skills/depute/SKILL.md',
  'skills/depute/references/design-rationale.md',
  'skills/depute/references/lexicon.md',
  'skills/depute/references/v0-components.md',
  'skills/depute/references/v1-components.md',
  'skills/depute/references/v2-components.md',
]);

for (const item of registry.items) {
  for (const file of item.files) files.add(file);
}

const checksums = {};
for (const file of [...files].sort()) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) {
    console.error(`Missing file listed for install: ${file}`);
    process.exit(1);
  }
  const content = fs.readFileSync(abs);
  checksums[file] = createHash('sha256').update(content).digest('hex');
}

const dest = path.join(root, 'packages/cli/src/checksums.json');
fs.writeFileSync(dest, `${JSON.stringify(checksums, null, 2)}\n`);
console.log(`Wrote ${Object.keys(checksums).length} checksums to ${path.relative(root, dest)}`);
