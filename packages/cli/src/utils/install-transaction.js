// depute CLI — utils/install-transaction.js
// Journals files created or edited during one install so a failed checksum
// removes that attempt instead of leaving a partial component behind.

import fs from 'fs';
import path from 'path';

/**
 * Remove directories this install created, walking up while they stay empty.
 * Stops at the project root and at any directory that still has files.
 * @param {string} start
 */
function pruneEmptyDirs(start) {
  const cwd = path.resolve(process.cwd());
  let dir = path.resolve(start);
  while (dir !== cwd && dir.startsWith(`${cwd}${path.sep}`)) {
    if (!fs.existsSync(dir)) {
      dir = path.dirname(dir);
      continue;
    }
    if (fs.readdirSync(dir).length > 0) break;
    fs.rmdirSync(dir);
    dir = path.dirname(dir);
  }
}

export function createInstallTransaction() {
  /** @type {string[]} */
  const created = [];
  /** @type {{ abs: string, original: string }[]} */
  const mutations = [];

  return {
    /**
     * @param {string} abs
     */
    trackNew(abs) {
      created.push(abs);
    },
    /**
     * @param {string} abs
     * @param {string} original
     */
    trackMutation(abs, original) {
      mutations.push({ abs, original });
    },
    rollback() {
      for (const abs of created.slice().reverse()) {
        fs.rmSync(abs, { force: true });
      }
      const dirs = new Set(created.map((abs) => path.dirname(abs)));
      for (const dir of dirs) pruneEmptyDirs(dir);
      for (const { abs, original } of mutations.slice().reverse()) {
        fs.writeFileSync(abs, original, 'utf8');
      }
    },
  };
}
