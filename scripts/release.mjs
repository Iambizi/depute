#!/usr/bin/env node
// Keep the library version, the CLI version, the registry, and the install
// checksums on the same number, then print the tag and npm publish commands.
//
// Usage: node scripts/release.mjs 0.4.1

import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const version = process.argv[2];

if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error('Usage: node scripts/release.mjs <major.minor.patch>');
  process.exit(1);
}

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
}

function writeJson(rel, value) {
  fs.writeFileSync(path.join(root, rel), `${JSON.stringify(value, null, 2)}\n`);
}

const rootPkg = readJson('package.json');
rootPkg.version = version;
writeJson('package.json', rootPkg);

const cliPkg = readJson('packages/cli/package.json');
cliPkg.version = version;
writeJson('packages/cli/package.json', cliPkg);

const registryPath = path.join(root, 'registry/registry.json');
const registryText = fs.readFileSync(registryPath, 'utf8');
const registryNext = registryText
  .replace(/"version": "\d+\.\d+\.\d+"/, `"version": "${version}"`)
  .replace(/"ref": "v\d+\.\d+\.\d+"/, `"ref": "v${version}"`);
if (registryNext === registryText || !registryNext.includes(`"version": "${version}"`) || !registryNext.includes(`"ref": "v${version}"`)) {
  console.error('Could not update version and ref in registry/registry.json without rewriting the file.');
  process.exit(1);
}
fs.writeFileSync(registryPath, registryNext);

const skillPath = path.join(root, 'skills/depute/SKILL.md');
const skill = fs.readFileSync(skillPath, 'utf8').replace(
  /version: \d+\.\d+\.\d+/,
  `version: ${version}`,
);
fs.writeFileSync(skillPath, skill);

const bannerPath = path.join(root, 'apps/www/src/app/page.tsx');
if (fs.existsSync(bannerPath)) {
  const page = fs.readFileSync(bannerPath, 'utf8').replace(
    /v\d+\.\d+\.\d+:/,
    `v${version}:`,
  );
  fs.writeFileSync(bannerPath, page);
}

const generated = spawnSync(process.execPath, [path.join(root, 'scripts/generate-checksums.mjs')], {
  cwd: root,
  stdio: 'inherit',
});
if (generated.status !== 0) process.exit(generated.status ?? 1);

console.log(`
Synced ${version}.

Next, from a clean tree:
  git tag v${version}
  git push origin v${version}
  npm publish --access public    # in packages/cli, after the tag is on GitHub

The CLI installs sources from ref v${version} and rejects files that do not match
packages/cli/src/checksums.json. Publishing requires an npm token; this script
does not publish.
`);
