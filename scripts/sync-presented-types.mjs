#!/usr/bin/env node
// Copies packages/core/src/presented.ts to src/types/core.ts.
// `--check` exits 1 when the React mirror drifts from the core source.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const pairs = [
  {
    source: path.join(root, 'packages/core/src/presented.ts'),
    dest: path.join(root, 'src/types/core.ts'),
    transform: (text) => text,
  },
  {
    source: path.join(root, 'packages/core/src/receipt.ts'),
    dest: path.join(root, 'src/utils/receipt.ts'),
    transform: (text) => text.replaceAll("from './presented'", "from '../types/core'"),
  },
];

let failed = false;
for (const pair of pairs) {
  const next = pair.transform(fs.readFileSync(pair.source, 'utf8'));
  const current = fs.existsSync(pair.dest) ? fs.readFileSync(pair.dest, 'utf8') : '';
  if (check) {
    if (current !== next) {
      console.error(`${path.relative(root, pair.dest)} is out of date. Run npm run types:core.`);
      failed = true;
    } else {
      console.log(`${path.relative(root, pair.dest)} matches ${path.relative(root, pair.source)}.`);
    }
  } else {
    fs.mkdirSync(path.dirname(pair.dest), { recursive: true });
    fs.writeFileSync(pair.dest, next);
    console.log(`Wrote ${path.relative(root, pair.dest)}`);
  }
}
if (failed) process.exit(1);
