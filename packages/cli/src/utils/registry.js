// AXK CLI — utils/registry.js
// Fetches registry.json from GitHub.

import { fetchURL } from './github.js';

const REGISTRY_URL =
  'https://raw.githubusercontent.com/Iambizi/depute/main/registry/registry.json';

/** @returns {Promise<import('./types.js').Registry>} */
export async function fetchRegistry() {
  const raw = await fetchURL(REGISTRY_URL);
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
