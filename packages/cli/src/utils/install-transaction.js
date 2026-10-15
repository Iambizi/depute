// depute CLI — utils/install-transaction.js
// Journals files and directories created during one install so a failed
// checksum or an interrupt removes that attempt. Directories that already
// existed are not removed, even if they are empty again afterwards.

import fs from 'fs';
import path from 'path';

export function createInstallTransaction() {
  /** @type {string[]} */
  const created = [];
  /** @type {Set<string>} */
  const createdDirs = new Set();
  /** @type {{ abs: string, original: string }[]} */
  const mutations = [];
  let settled = false;

  function detach() {
    process.off('SIGINT', onSignal);
    process.off('SIGTERM', onSignal);
  }

  function rollback() {
    if (settled) return;
    settled = true;
    detach();
    for (const abs of created.slice().reverse()) {
      fs.rmSync(abs, { force: true });
    }
    const dirs = [...createdDirs].sort((a, b) => b.length - a.length);
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
    }
    for (const { abs, original } of mutations.slice().reverse()) {
      fs.writeFileSync(abs, original, 'utf8');
    }
  }

  /**
   * @param {NodeJS.Signals} signal
   */
  function onSignal(signal) {
    rollback();
    console.error('\n  Install interrupted. Rolled back files from this attempt.\n');
    process.exit(signal === 'SIGINT' ? 130 : 143);
  }

  process.on('SIGINT', onSignal);
  process.on('SIGTERM', onSignal);

  return {
    /**
     * @param {string} abs
     */
    trackNew(abs) {
      created.push(abs);
    },
    /**
     * Record a directory this attempt created. Parents that already existed
     * must not be passed here.
     * @param {string} abs
     */
    trackNewDir(abs) {
      createdDirs.add(path.resolve(abs));
    },
    /**
     * @param {string} abs
     * @param {string} original
     */
    trackMutation(abs, original) {
      mutations.push({ abs, original });
    },
    rollback,
    finish() {
      if (settled) return;
      settled = true;
      detach();
    },
  };
}
