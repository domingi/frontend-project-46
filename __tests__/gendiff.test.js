import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const expectedDiffStylish = readFileSync(getFixturePath('expected/expected.txt'), 'utf-8');
const expectedDiffPlain = readFileSync(getFixturePath('expected/expected-plain.txt'), 'utf-8');
const expectedDiffJson = readFileSync(getFixturePath('expected/expected.json'), 'utf-8');

test('compare two file, format: none, type: JSON,', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(diff).toBe(expectedDiffStylish);
});

test('compare two file, format: stylish, type: JSON,', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(diff).toBe(expectedDiffStylish);
});

test('compare two file, format: stylish, type: YAML', () => {
  const diff = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish');
  expect(diff).toBe(expectedDiffStylish);
});

test('compare two file, format: plain, type: JSON', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(diff).toBe(expectedDiffPlain);
});

test('compare two file, format: plain, type: YAML', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(diff).toBe(expectedDiffPlain);
});

test('compare two file, format: json, type: JSON', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(diff).toBe(expectedDiffJson);
});
