// depute CLI — utils/registry.js
// Fetches registry.json from GitHub.

import { readRepoFile } from './source.js';
import { REGISTRY_PATH } from '../config.js';

/** @returns {Promise<import('./types.js').Registry>} */
export async function fetchRegistry() {
  const raw = await readRepoFile(REGISTRY_PATH);
  return JSON.parse(raw);
}

/**
 * Find a component by slug name (case-insensitive).
 * @param {import('./types.js').Registry} registry
 * @param {string} name
 */
export function findComponent(registry, name) {
  const slug = name.toLowerCase().trim();
  return registry.items.find(
    (item) => item.name === slug || item.label.toLowerCase() === slug
  );
}
