import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import genDiff from '../bin/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const expectedDiffJson = readFileSync(getFixturePath('expected/expected-json.txt'), 'utf-8');
const expectedDiffYaml = readFileSync(getFixturePath('expected/expected-yaml.txt'), 'utf-8');
const expectedDiffPlainJson = readFileSync(getFixturePath('expected/expected-plain-json.txt'), 'utf-8');
const expectedDiffPlainYaml = readFileSync(getFixturePath('expected/expected-plain-json.txt'), 'utf-8');

test('compare two file, type: JSON', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(diff).toBe(expectedDiffJson);
});

test('compare two file, type: YAML', () => {
  const diff = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(diff).toBe(expectedDiffYaml);
});

test('compare two file, format: plain, type: JSON', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(diff).toBe(expectedDiffPlainJson);
});

test('compare two file, format: plain, type: YAML', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(diff).toBe(expectedDiffPlainYaml);
});
