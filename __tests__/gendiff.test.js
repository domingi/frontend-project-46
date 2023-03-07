import { fileURLToPath } from 'url';
import path from 'node:path';
import { dirname } from 'path';
import genDiff from '../bin/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const plainDiff = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
const nestedDiff = '{\n  common: {\n    + follow: false\n      setting1: Value 1\n    - setting2: 200\n    - setting3: true\n    + setting3: null\n    + setting4: blah blah\n    + setting5: {\n          key5: value5\n      }\n      setting6: {\n          doge: {\n            - wow:\n            + wow: so much\n          }\n          key: value\n        + ops: vops\n      }\n  }\n  group1: {\n    - baz: bas\n    + baz: bars\n      foo: bar\n    - nest: {\n          key: value\n      }\n    + nest: str\n  }\n- group2: {\n      abc: 12345\n      deep: {\n          id: 45\n      }\n  }\n+ group3: {\n      deep: {\n          id: {\n              number: 45\n          }\n      }\n      fee: 100500\n  }\n};';

test('compare two file, type: plain, format: JSON', () => {
  const diff = genDiff(getFixturePath('plain/file1.json'), getFixturePath('plain/file2.json'));
  const expectedDiff = plainDiff;
  expect(diff).toContain(expectedDiff);
});

test('compare two file, type: plain, format: YAML', () => {
  const diff = genDiff(getFixturePath('plain/file1.yml'), getFixturePath('plain/file2.yml'));
  const expectedDiff = plainDiff;
  expect(diff).toContain(expectedDiff);
});

test('compare two file, type: nested, format: JSON', () => {
  const diff = genDiff(getFixturePath('nested/file1.json'), getFixturePath('nested/file2.json'));
  const expectedDiff = nestedDiff;
  expect(diff).toContain(expectedDiff);
});
