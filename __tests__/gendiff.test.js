import { fileURLToPath } from 'url';
import path from 'node:path';
import { dirname } from 'path';
import genDiff from '../bin/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('compare two file', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectedDiff = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(diff).toContain(expectedDiff);
});
