#!/usr/bin/env node
// Scaffold a fresh Vite React + TypeScript app, install every component with
// the local CLI, then typecheck and build that app.

import { spawnSync } from 'node:child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'packages/cli/bin/depute.js');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry/registry.json'), 'utf8'));
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-smoke-'));
const app = path.join(work, 'app');

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? app,
    env: options.env ?? process.env,
    encoding: 'utf8',
    stdio: options.stdio ?? 'inherit',
  });
  if (result.error || result.status !== 0) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    console.error(
      `Command failed (${result.status ?? result.error?.message}): ${command} ${args.join(' ')}`,
    );
    process.exit(result.status ?? 1);
  }
  return result;
}

console.log(`Scaffolding Vite app in ${app}`);
run('npm', ['exec', '--yes', 'create-vite@latest', 'app', '--', '--template', 'react-ts'], {
  cwd: work,
});
run('npm', ['install']);

const env = { ...process.env, DEPUTE_LOCAL_ROOT: root };
for (const item of registry.items) {
  console.log(`\nAdding ${item.name}`);
  run(process.execPath, [cli, 'add', item.name], { env });
}

console.log('\nAdding mock-data');
run(process.execPath, [cli, 'add', 'mock-data'], { env });

const indexCss = fs.readFileSync(path.join(app, 'src/index.css'), 'utf8');
if (!indexCss.includes('depute.css')) {
  console.error('CLI did not add the design-token import to src/index.css');
  process.exit(1);
}

console.log('\nTypechecking installed components');
run('npx', ['tsc', '-b']);

console.log('\nBuilding the app');
run('npx', ['vite', 'build']);

console.log(`\nCLI smoke test passed (${registry.items.length} components + mock-data).`);
