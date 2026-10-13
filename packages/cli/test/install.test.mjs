import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import test from 'node:test';
import { fileURLToPath } from 'url';
import { REF, VERSION } from '../src/config.js';
import { assertIntegrity } from '../src/utils/source.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const cli = path.join(repoRoot, 'packages/cli/bin/depute.js');

function runAdd(cwd, args) {
  return spawnSync(process.execPath, [cli, 'add', ...args], {
    cwd,
    env: { ...process.env, DEPUTE_LOCAL_ROOT: repoRoot },
    encoding: 'utf8',
  });
}

test('CLI ref is the package version, not main', () => {
  assert.equal(VERSION, '0.4.2');
  assert.equal(REF, 'v0.4.2');
  assert.equal(REF.includes('main'), false);
});

test('a tampered file fails the integrity check', () => {
  assert.throws(
    () => assertIntegrity('src/styles/tokens.css', '/* tampered */\n'),
    /Integrity check failed for src\/styles\/tokens\.css/,
  );
});

test('add approval-gate installs tokens and rewrites shared imports', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-add-'));
  fs.mkdirSync(path.join(cwd, 'src'), { recursive: true });
  fs.writeFileSync(path.join(cwd, 'src/index.css'), 'body { margin: 0; }\n');

  const result = runAdd(cwd, ['approval-gate']);
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const component = fs.readFileSync(
    path.join(cwd, 'src/components/ApprovalGate/ApprovalGate.tsx'),
    'utf8',
  );
  assert.match(component, /from ['"]\.\.\/\.\.\/types\/ax-common['"]/);
  assert.match(component, /from ['"]\.\.\/\.\.\/utils\/ax-a11y['"]/);
  assert.equal(fs.existsSync(path.join(cwd, 'src/styles/depute.css')), true);
  assert.equal(fs.existsSync(path.join(cwd, 'src/styles/tokens.css')), true);
  assert.equal(fs.existsSync(path.join(cwd, 'src/types/ax-common.ts')), true);
  assert.match(fs.readFileSync(path.join(cwd, 'src/index.css'), 'utf8'), /@import "\.\/styles\/depute\.css"/);
});

test('--dir installs shared files beside the chosen directory', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-dir-'));
  const result = runAdd(cwd, ['run-controls', '--dir', 'components/ax', '--no-css']);
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const componentPath = path.join(cwd, 'components/ax/RunControls/RunControls.tsx');
  const component = fs.readFileSync(componentPath, 'utf8');
  assert.match(component, /from ['"][^'"]+ax-common['"]/);
  assert.match(component, /from ['"][^'"]+ax-a11y['"]/);

  const typesPath = path.join(cwd, 'components/types/ax-common.ts');
  const a11yPath = path.join(cwd, 'components/utils/ax-a11y.tsx');
  assert.equal(fs.existsSync(typesPath), true);
  assert.equal(fs.existsSync(a11yPath), true);
  assert.equal(fs.existsSync(path.join(cwd, 'src/types/ax-common.ts')), false);

  const spec = component.match(/from ['"]([^'"]*ax-common)['"]/)[1];
  const resolved = path.resolve(path.dirname(componentPath), spec);
  assert.equal(path.normalize(resolved), path.normalize(typesPath.replace(/\.ts$/, '')));
});

test('add mock-data rewrites component import paths', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-mock-'));
  const result = runAdd(cwd, ['mock-data', '--dir', 'components/ax', '--no-css']);
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const mock = fs.readFileSync(path.join(cwd, 'components/utils/mockData.ts'), 'utf8');
  assert.match(mock, /from ['"]\.\.\/types\/ax-common['"]/);
  assert.match(mock, /from ['"]\.\.\/ax\/ApprovalGate['"]/);
  assert.doesNotMatch(mock, /from ['"]\.\.\/types\/common['"]/);
  assert.doesNotMatch(mock, /from ['"]\.\.\/components\//);
});

test('init copies the skill and design tokens', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-init-'));
  fs.mkdirSync(path.join(cwd, 'src'), { recursive: true });
  fs.writeFileSync(path.join(cwd, 'src/index.css'), 'body { margin: 0; }\n');

  const result = spawnSync(process.execPath, [cli, 'init'], {
    cwd,
    env: { ...process.env, DEPUTE_LOCAL_ROOT: repoRoot },
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(fs.existsSync(path.join(cwd, 'skills/depute/SKILL.md')), true);
  assert.equal(fs.existsSync(path.join(cwd, 'skills/depute/references/v0-components.md')), true);
  const config = JSON.parse(fs.readFileSync(path.join(cwd, 'skills/depute/depute.skill.json'), 'utf8'));
  assert.equal(config.version, VERSION);
  assert.equal(fs.existsSync(path.join(cwd, 'src/styles/depute.css')), true);
  assert.match(fs.readFileSync(path.join(cwd, 'src/index.css'), 'utf8'), /@import "\.\/styles\/depute\.css"/);
});
