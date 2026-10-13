// depute CLI — config.js
// Single source of truth for the repo location and the pinned install ref.
// If the GitHub username ever changes, update REPO here — nothing else needs touching.

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

export const REPO = 'Iambizi/depute';
export const VERSION = pkg.version;
/**
 * Git ref this CLI installs. Pinned to the package version so `npx ax-depute`
 * never follows `main`. An older CLI keeps installing the sources for its tag.
 */
export const REF = `v${VERSION}`;
export const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${REF}`;
export const REGISTRY_PATH = 'registry/registry.json';
export const REGISTRY_URL = `${RAW_BASE}/${REGISTRY_PATH}`;
export const DOCS_URL = 'https://depute.dev';
export const REPO_URL = `https://github.com/${REPO}`;
