// depute CLI — utils/fs.js
// File system helpers with user-facing logging.

import fs from 'fs';
import path from 'path';
import { createInstallTransaction } from './install-transaction.js';

export { createInstallTransaction };

const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  dim:   (s) => `\x1b[2m${s}\x1b[0m`,
  bold:  (s) => `\x1b[1m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
};

/**
 * Ensure a directory exists, creating it recursively if needed.
 * Directories that did not exist yet are recorded on the transaction so a
 * rollback can remove them without touching empty directories that were
 * already in the project.
 * @param {string} dirPath
 * @param {ReturnType<typeof createInstallTransaction> | null} [transaction]
 */
export function ensureDir(dirPath, transaction = null) {
  const cwd = path.resolve(process.cwd());
  const abs = path.resolve(dirPath);
  /** @type {string[]} */
  const missing = [];
  let current = abs;
  while (current !== cwd && current.startsWith(`${cwd}${path.sep}`)) {
    if (fs.existsSync(current)) break;
    missing.push(current);
    current = path.dirname(current);
  }
  fs.mkdirSync(abs, { recursive: true });
  for (const dir of missing) transaction?.trackNewDir(dir);
}

/**
 * Write a file to disk. Creates parent directories as needed.
 * Prints a status line to stdout.
 * When a transaction is passed, a later rollback deletes files this call
 * created and restores files it overwrote.
 * @param {string} filePath  Absolute or CWD-relative path
 * @param {string} content
 * @param {{ overwrite?: boolean, transaction?: ReturnType<typeof createInstallTransaction> | null }} [opts]
 * @returns {boolean} true when the file was written
 */
export function writeFileToDisk(filePath, content, { overwrite = false, transaction = null } = {}) {
  const abs = path.resolve(process.cwd(), filePath);
  ensureDir(path.dirname(abs), transaction);

  if (!overwrite && fs.existsSync(abs)) {
    console.log(`  ${c.yellow('~')} ${c.dim(filePath)} ${c.dim('(skipped — already exists)')}`);
    return false;
  }

  if (fs.existsSync(abs)) {
    transaction?.trackMutation(abs, fs.readFileSync(abs, 'utf8'));
  } else {
    transaction?.trackNew(abs);
  }

  fs.writeFileSync(abs, content, 'utf8');
  console.log(`  ${c.green('→')} ${filePath}`);
  return true;
}

/**
 * Check whether a file exists at the given CWD-relative path.
 * @param {string} filePath
 */
export function fileExists(filePath) {
  return fs.existsSync(path.resolve(process.cwd(), filePath));
}
