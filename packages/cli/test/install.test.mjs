import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import test from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'url';
import { REF, VERSION } from '../src/config.js';
import { assertIntegrity } from '../src/utils/source.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const cli = path.join(repoRoot, 'packages/cli/bin/depute.js');

function runCli(cwd, args, localRoot = repoRoot) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd,
    env: { ...process.env, DEPUTE_LOCAL_ROOT: localRoot },
    encoding: 'utf8',
  });
}

function runAdd(cwd, args, localRoot = repoRoot) {
  return runCli(cwd, ['add', ...args], localRoot);
}

const MIRROR_FILES = [
  'registry/registry.json',
  'src/components/ApprovalGate/ApprovalGate.tsx',
  'src/components/ApprovalGate/ApprovalGate.module.css',
  'src/components/ApprovalGate/ApprovalGate.types.ts',
  'src/components/ApprovalGate/index.ts',
  'src/types/common.ts',
  'src/utils/a11y.tsx',
  'src/utils/icons.tsx',
  'src/utils/mockData.ts',
  'src/styles/base.css',
  'src/styles/semantic.css',
  'src/styles/component.css',
  'src/styles/legacy.css',
  'src/styles/primitives.css',
  'src/styles/tokens.css',
  'src/styles/animations.css',
  'src/styles/index.css',
  'skills/depute/SKILL.md',
  'skills/depute/references/design-rationale.md',
  'skills/depute/references/lexicon.md',
  'skills/depute/references/v0-components.md',
  'skills/depute/references/v1-components.md',
  'skills/depute/references/v2-components.md',
];

function mirrorRepo(tamperPath) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-mirror-'));
  for (const rel of MIRROR_FILES) {
    const dest = path.join(root, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(repoRoot, rel), dest);
  }
  if (tamperPath) {
    fs.appendFileSync(path.join(root, tamperPath), '\n/* tampered */\n');
  }
  return root;
}

test('CLI ref is the package version, not main', () => {
  assert.equal(VERSION, '0.5.0');
  assert.equal(REF, 'v0.5.0');
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

test('a checksum failure rolls back files from that install', () => {
  const localRoot = mirrorRepo('src/styles/tokens.css');
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-rollback-'));
  const css = 'body { margin: 0; }\n';
  fs.mkdirSync(path.join(cwd, 'src/components/ApprovalGate'), { recursive: true });
  fs.mkdirSync(path.join(cwd, 'src/types'), { recursive: true });
  fs.writeFileSync(path.join(cwd, 'src/index.css'), css);
  fs.writeFileSync(path.join(cwd, 'src/components/ApprovalGate/notes.txt'), 'keep\n');
  fs.writeFileSync(path.join(cwd, 'src/types/ax-common.ts'), 'export {}\n');

  const result = runAdd(cwd, ['approval-gate'], localRoot);
  assert.equal(result.status, 1, result.stdout);
  assert.match(`${result.stdout}\n${result.stderr}`, /Integrity check failed for src\/styles\/tokens\.css/);
  assert.match(`${result.stdout}\n${result.stderr}`, /rolled back/);
  assert.doesNotMatch(result.stdout, /ApprovalGate\.tsx/);

  assert.equal(fs.existsSync(path.join(cwd, 'src/components/ApprovalGate/ApprovalGate.tsx')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/components/ApprovalGate/ApprovalGate.module.css')), false);
  assert.equal(fs.readFileSync(path.join(cwd, 'src/components/ApprovalGate/notes.txt'), 'utf8'), 'keep\n');
  assert.equal(fs.readFileSync(path.join(cwd, 'src/types/ax-common.ts'), 'utf8'), 'export {}\n');
  assert.equal(fs.existsSync(path.join(cwd, 'src/utils/ax-a11y.tsx')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/styles/tokens.css')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/styles/depute.css')), false);
  assert.equal(fs.readFileSync(path.join(cwd, 'src/index.css'), 'utf8'), css);
});

test('init rolls back when a later file fails the checksum', () => {
  const localRoot = mirrorRepo('src/styles/tokens.css');
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-init-rollback-'));
  const css = 'body { margin: 0; }\n';
  fs.mkdirSync(path.join(cwd, 'src'), { recursive: true });
  fs.writeFileSync(path.join(cwd, 'src/index.css'), css);

  const result = runCli(cwd, ['init'], localRoot);
  assert.equal(result.status, 1, result.stdout);
  assert.match(`${result.stdout}\n${result.stderr}`, /rolled back/);
  assert.equal(fs.existsSync(path.join(cwd, 'skills/depute/SKILL.md')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'skills/depute/depute.skill.json')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/types/ax-common.ts')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/utils/ax-a11y.tsx')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/styles/depute.css')), false);
  assert.equal(fs.readFileSync(path.join(cwd, 'src/index.css'), 'utf8'), css);
});

test('a failed install keeps empty directories that were already there', () => {
  const localRoot = mirrorRepo('src/styles/tokens.css');
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-empty-'));
  fs.mkdirSync(path.join(cwd, 'src/components'), { recursive: true });
  fs.mkdirSync(path.join(cwd, 'src/types'), { recursive: true });

  const result = runAdd(cwd, ['approval-gate'], localRoot);
  assert.equal(result.status, 1, result.stdout);
  assert.equal(fs.existsSync(path.join(cwd, 'src/components')), true);
  assert.equal(fs.readdirSync(path.join(cwd, 'src/components')).length, 0);
  assert.equal(fs.existsSync(path.join(cwd, 'src/types')), true);
  assert.equal(fs.readdirSync(path.join(cwd, 'src/types')).length, 0);
});

test('rollback removes directories it created and keeps empty ones it did not', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-dirs-'));
  fs.mkdirSync(path.join(cwd, 'src/components'), { recursive: true });
  const fsModule = path.join(repoRoot, 'packages/cli/src/utils/fs.js');
  const child = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { writeFileToDisk, createInstallTransaction } from ${JSON.stringify(fsModule)};
    const tx = createInstallTransaction();
    writeFileToDisk('src/components/ApprovalGate/created.txt', 'new\\n', { transaction: tx });
    tx.rollback();
  `], { cwd, encoding: 'utf8' });
  assert.equal(child.status, 0, child.stderr || child.stdout);
  assert.equal(fs.existsSync(path.join(cwd, 'src/components/ApprovalGate')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/components')), true);
  assert.equal(fs.readdirSync(path.join(cwd, 'src/components')).length, 0);
});

test('SIGINT rolls back files from the attempt and keeps pre-existing empty directories', async () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-sigint-'));
  fs.mkdirSync(path.join(cwd, 'src/components'), { recursive: true });
  const fsModule = path.join(repoRoot, 'packages/cli/src/utils/fs.js');
  const child = spawn(process.execPath, ['--input-type=module', '-e', `
    import { writeFileToDisk, createInstallTransaction } from ${JSON.stringify(fsModule)};
    const tx = createInstallTransaction();
    writeFileToDisk('src/components/ApprovalGate/created.txt', 'new\\n', { transaction: tx });
    setTimeout(() => {}, 10000);
  `], { cwd });

  const created = path.join(cwd, 'src/components/ApprovalGate/created.txt');
  const started = Date.now();
  while (!fs.existsSync(created)) {
    if (Date.now() - started > 3000) {
      child.kill('SIGKILL');
      throw new Error(`timed out waiting for the install to write\n${child.stderr?.read?.() ?? ''}`);
    }
    await delay(20);
  }
  child.kill('SIGINT');
  const code = await new Promise((resolve) => child.on('exit', resolve));
  assert.equal(code, 130);
  assert.equal(fs.existsSync(created), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/components/ApprovalGate')), false);
  assert.equal(fs.existsSync(path.join(cwd, 'src/components')), true);
});

test('rollback restores an edited stylesheet and deletes files it created', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-tx-'));
  fs.mkdirSync(path.join(cwd, 'src'), { recursive: true });
  fs.writeFileSync(path.join(cwd, 'src/index.css'), 'body { margin: 0; }\n');
  const fsModule = path.join(repoRoot, 'packages/cli/src/utils/fs.js');
  const child = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import fs from 'fs';
    import path from 'path';
    import { writeFileToDisk, createInstallTransaction } from ${JSON.stringify(fsModule)};
    const tx = createInstallTransaction();
    writeFileToDisk('src/created.txt', 'new\\n', { transaction: tx });
    const css = path.resolve('src/index.css');
    const original = fs.readFileSync(css, 'utf8');
    tx.trackMutation(css, original);
    fs.writeFileSync(css, '@import "./styles/depute.css";\\n' + original);
    tx.rollback();
  `], { cwd, encoding: 'utf8' });
  assert.equal(child.status, 0, child.stderr || child.stdout);
  assert.equal(fs.existsSync(path.join(cwd, 'src/created.txt')), false);
  assert.equal(fs.readFileSync(path.join(cwd, 'src/index.css'), 'utf8'), 'body { margin: 0; }\n');
});

test('init copies the skill and design tokens', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'depute-init-'));
  fs.mkdirSync(path.join(cwd, 'src'), { recursive: true });
  fs.writeFileSync(path.join(cwd, 'src/index.css'), 'body { margin: 0; }\n');

  const result = runCli(cwd, ['init']);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(fs.existsSync(path.join(cwd, 'skills/depute/SKILL.md')), true);
  assert.equal(fs.existsSync(path.join(cwd, 'skills/depute/references/v0-components.md')), true);
  assert.equal(fs.existsSync(path.join(cwd, 'skills/depute/references/lexicon.md')), true);
  const config = JSON.parse(fs.readFileSync(path.join(cwd, 'skills/depute/depute.skill.json'), 'utf8'));
  assert.equal(config.version, VERSION);
  assert.equal(fs.existsSync(path.join(cwd, 'src/styles/depute.css')), true);
  assert.match(fs.readFileSync(path.join(cwd, 'src/index.css'), 'utf8'), /@import "\.\/styles\/depute\.css"/);
});
