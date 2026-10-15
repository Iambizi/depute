// depute CLI — commands/init.js
// Copies the agent skill into the user's repository and installs design tokens
// when they are not already there.

import { VERSION, DOCS_URL } from '../config.js';
import { readRepoFile } from '../utils/source.js';
import { writeFileToDisk, createInstallTransaction } from '../utils/fs.js';
import { installCssImport, loadShared, writeShared } from './add.js';

const c = {
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

const SKILL_FILES = [
  'skills/depute/SKILL.md',
  'skills/depute/references/design-rationale.md',
  'skills/depute/references/v0-components.md',
  'skills/depute/references/v1-components.md',
  'skills/depute/references/v2-components.md',
];

/**
 * @param {string[]} args
 */
export async function runInit(args) {
  const noCss = args.includes('--no-css');
  const transaction = createInstallTransaction();

  try {
    console.log(`\n  ${c.bold('✦ ax-depute init')} ${c.dim('— AI skill layer')}\n`);

    /** @type {{ repoPath: string, content: string }[]} */
    const skills = [];
    for (const repoPath of SKILL_FILES) {
      let content;
      try {
        content = await readRepoFile(repoPath);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`Failed to read ${repoPath}\n  ${message}`, { cause: err });
      }
      skills.push({ repoPath, content });
    }

    const shared = await loadShared('src');

    for (const file of skills) {
      writeFileToDisk(file.repoPath, file.content, { transaction });
    }

    writeFileToDisk(
      'skills/depute/depute.skill.json',
      `${JSON.stringify({ name: 'depute', version: VERSION, docs: DOCS_URL }, null, 2)}\n`,
      { transaction },
    );

    const stylesDest = writeShared(shared, transaction);
    installCssImport(stylesDest, null, noCss, transaction);
    transaction.finish();

    console.log(`  ${c.green('✓ Done!')} The skill is at ${c.bold('skills/depute/SKILL.md')}`);
    console.log(`  ${c.dim('Point your agent at that file. It describes composition, not a runtime dependency.')}\n`);
  } catch (err) {
    transaction.rollback();
    const message = err instanceof Error ? err.message : String(err);
    console.error(`\n  ${c.red('Error:')} ${message}\n`);
    console.error(`  ${c.dim('Install rolled back. No files from this attempt were left behind.')}\n`);
    process.exit(1);
  }
}
