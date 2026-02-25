// depute CLI — config.js
// Single source of truth for the repo location.
// If the GitHub username ever changes, update REPO here — nothing else needs touching.

export const REPO = 'Iambizi/depute';
export const BRANCH = 'main';
export const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
export const REGISTRY_URL = `${RAW_BASE}/registry/registry.json`;
export const DOCS_URL = `https://github.com/${REPO}`;
