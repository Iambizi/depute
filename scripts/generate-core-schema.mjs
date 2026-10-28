// Regenerates packages/core/schema/approval.schema.json from the TypeScript
// types. `--check` exits 1 when the committed schema drifts.
import { createGenerator } from 'ts-json-schema-generator';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const tsconfig = path.join(root, 'packages/core/tsconfig.json');

const targets = [
  {
    file: path.join(root, 'packages/core/schema/approval.schema.json'),
    source: path.join(root, 'packages/core/src/types.ts'),
    type: 'ApprovalSnapshot',
  },
  {
    file: path.join(root, 'packages/core/schema/receipt.schema.json'),
    source: path.join(root, 'packages/core/src/receipt.ts'),
    type: 'ApprovalReceipt',
  },
];

let failed = false;
for (const target of targets) {
  const schema = createGenerator({
    path: target.source,
    tsconfig,
    type: target.type,
    skipTypeCheck: true,
    additionalProperties: false,
  }).createSchema(target.type);
  const next = `${JSON.stringify(schema, null, 2)}\n`;
  const name = path.relative(root, target.file);
  if (check) {
    const current = fs.existsSync(target.file) ? fs.readFileSync(target.file, 'utf8') : '';
    if (current !== next) {
      console.error(`${name} is out of date. Run npm run schema:core.`);
      failed = true;
    } else {
      console.log(`${name} matches the TypeScript types.`);
    }
  } else {
    fs.mkdirSync(path.dirname(target.file), { recursive: true });
    fs.writeFileSync(target.file, next);
    console.log(`Wrote ${name}`);
  }
}
if (failed) process.exit(1);
