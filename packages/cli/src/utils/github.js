// AXK CLI — utils/github.js
// Fetches raw file content from GitHub using only Node built-ins.

import https from 'https';

const BASE_URL =
  'https://raw.githubusercontent.com/Iambizi/depute/main';

/**
 * Fetch a URL and return the response body as a string.
 * @param {string} url
 * @returns {Promise<string>}
 */
export function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 404) {
        reject(new Error(`Not found: ${url}`));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Fetch a file from the depute repo by its relative path.
 * @param {string} repoPath  e.g. "src/components/PlanCard/PlanCard.tsx"
 * @returns {Promise<string>}
 */
export function fetchRepoFile(repoPath) {
  return fetchURL(`${BASE_URL}/${repoPath}`);
}
