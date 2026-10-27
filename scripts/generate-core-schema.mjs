// Regenerates packages/core/schema/approval.schema.json from the TypeScript
// types. `--check` exits 1 when the committed schema drifts.
import { createGenerator } from 'ts-json-schema-generator';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'packages/core/schema/approval.schema.json');
const check = process.argv.includes('--check');

const schema = createGenerator({
  path: path.join(root, 'packages/core/src/types.ts'),
  tsconfig: path.join(root, 'packages/core/tsconfig.json'),
  type: 'ApprovalSnapshot',
  skipTypeCheck: true,
  additionalProperties: false,
}).createSchema('ApprovalSnapshot');

const next = `${JSON.stringify(schema, null, 2)}\n`;
if (check) {
  const current = fs.readFileSync(outPath, 'utf8');
  if (current !== next) {
    console.error('approval.schema.json is out of date. Run npm run schema:core.');
    process.exit(1);
  }
  console.log('approval.schema.json matches the TypeScript types.');
} else {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, next);
  console.log(`Wrote ${path.relative(root, outPath)}`);
}
