import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import Ajv from 'ajv';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

describe('approval schema', () => {
  it('accepts the program-approval fixture', () => {
    const schema = JSON.parse(readFileSync(path.join(root, 'schema/approval.schema.json'), 'utf8'));
    const fixture = JSON.parse(readFileSync(path.join(root, 'test/fixtures/program-approval.json'), 'utf8'));
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const ok = validate(fixture);
    expect(validate.errors).toBeNull();
    expect(ok).toBe(true);
  });
});
