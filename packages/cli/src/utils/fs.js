// depute CLI — utils/fs.js
// File system helpers with user-facing logging.

import fs from 'fs';
import path from 'path';

const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  dim:   (s) => `\x1b[2m${s}\x1b[0m`,
  bold:  (s) => `\x1b[1m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
};

/**
 * Ensure a directory exists, creating it recursively if needed.
 * @param {string} dirPath
 */
export function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

/**
 * Write a file to disk. Creates parent directories as needed.
 * Prints a status line to stdout.
 * @param {string} filePath  Absolute or CWD-relative path
 * @param {string} content
 * @param {{ overwrite?: boolean }} [opts]
 */
export function writeFileToDisk(filePath, content, { overwrite = false } = {}) {
  const abs = path.resolve(process.cwd(), filePath);
  ensureDir(path.dirname(abs));

  if (!overwrite && fs.existsSync(abs)) {
    console.log(`  ${c.yellow('~')} ${c.dim(filePath)} ${c.dim('(skipped — already exists)')}`);
    return;
  }

  fs.writeFileSync(abs, content, 'utf8');
  console.log(`  ${c.green('→')} ${filePath}`);
}

/**
 * Check whether a file exists at the given CWD-relative path.
 * @param {string} filePath
 */
export function fileExists(filePath) {
  return fs.existsSync(path.resolve(process.cwd(), filePath));
}
