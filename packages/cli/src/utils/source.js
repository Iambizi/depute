// depute CLI — utils/source.js
// Reads component sources from the local repo (development and CI) or from the
// git tag that matches this package version, then checks a sha256 manifest.

import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import { RAW_BASE, REF, REGISTRY_PATH, VERSION } from '../config.js';
import { fetchURL } from './github.js';

const here = path.dirname(fileURLToPath(import.meta.url));

const checksums = JSON.parse(
  fs.readFileSync(new URL('../checksums.json', import.meta.url), 'utf8'),
);

/**
 * Repo root when sources are on disk: DEPUTE_LOCAL_ROOT, a parent checkout
 * that contains the registry, or a bundle shipped inside the npm package.
 * @returns {string | null}
 */
export function resolveLocalRoot() {
  if (process.env.DEPUTE_LOCAL_ROOT) {
    return path.resolve(process.env.DEPUTE_LOCAL_ROOT);
  }

  let dir = here;
  for (let i = 0; i < 8; i++) {
    if (
      fs.existsSync(path.join(dir, 'registry', 'registry.json')) &&
      fs.existsSync(path.join(dir, 'src', 'components'))
    ) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  const bundle = path.resolve(here, '../../bundle');
  if (fs.existsSync(path.join(bundle, REGISTRY_PATH))) {
    return bundle;
  }

  return null;
}

/**
 * Reject content that does not match the manifest shipped with this CLI.
 * @param {string} repoPath
 * @param {string} content
 */
export function assertIntegrity(repoPath, content) {
  const expected = checksums[repoPath];
  if (!expected) {
    throw new Error(
      `No integrity checksum for ${repoPath}. Refusing to install an unlisted file.`,
    );
  }
  const actual = createHash('sha256').update(content).digest('hex');
  if (actual !== expected) {
    throw new Error(
      `Integrity check failed for ${repoPath}.\n` +
        `  expected ${expected}\n` +
        `  actual   ${actual}\n` +
        `  The file does not match the ax-depute@${VERSION} manifest (ref ${REF}).`,
    );
  }
}

/**
 * Read a repo-relative file and verify it against the release manifest.
 * @param {string} repoPath
 * @returns {Promise<string>}
 */
export async function readRepoFile(repoPath) {
  const root = resolveLocalRoot();
  let content;
  if (root) {
    const abs = path.join(root, repoPath);
    if (!fs.existsSync(abs)) {
      throw new Error(`Not found in local source (${root}): ${repoPath}`);
    }
    content = fs.readFileSync(abs, 'utf8');
  } else {
    content = await fetchURL(`${RAW_BASE}/${repoPath}`);
  }
  assertIntegrity(repoPath, content);
  return content;
}
