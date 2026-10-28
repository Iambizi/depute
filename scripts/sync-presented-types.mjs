#!/usr/bin/env node
// Copies packages/core/src/presented.ts to src/types/core.ts.
// `--check` exits 1 when the React mirror drifts from the core source.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'packages/core/src/presented.ts');
const dest = path.join(root, 'src/types/core.ts');
const check = process.argv.includes('--check');
const text = fs.readFileSync(source, 'utf8');

if (check) {
  const current = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : '';
  if (current !== text) {
    console.error('src/types/core.ts is out of date. Run npm run types:core.');
    process.exit(1);
  }
  console.log('src/types/core.ts matches packages/core/src/presented.ts.');
} else {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, text);
  console.log(`Wrote ${path.relative(root, dest)}`);
}
