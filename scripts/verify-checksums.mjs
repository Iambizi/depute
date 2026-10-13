#!/usr/bin/env node
// Fail when packages/cli/src/checksums.json drifts from the sources it covers.

import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'packages/cli/src/checksums.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const { spawnSync } = await import('child_process');
const generated = spawnSync(process.execPath, [path.join(root, 'scripts/generate-checksums.mjs')], {
  cwd: root,
  encoding: 'utf8',
});

if (generated.status !== 0) {
  process.stderr.write(generated.stderr || generated.stdout || '');
  process.exit(generated.status ?? 1);
}

const next = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const mismatches = [];
const keys = new Set([...Object.keys(manifest), ...Object.keys(next)]);
for (const key of keys) {
  if (manifest[key] !== next[key]) mismatches.push(key);
}

if (mismatches.length > 0) {
  console.error('Integrity manifest is stale. Run `npm run checksums` and commit packages/cli/src/checksums.json.');
  for (const key of mismatches) console.error(`  ${key}`);
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  process.exit(1);
}

for (const [file, expected] of Object.entries(manifest)) {
  const actual = createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
  if (actual !== expected) {
    console.error(`Checksum mismatch for ${file}`);
    process.exit(1);
  }
}

console.log(`Integrity manifest matches ${Object.keys(manifest).length} files.`);
