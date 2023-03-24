import path from 'node:path';
import fs from 'node:fs';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import makeDiffTree from './gendiff.js';

const getFileType = (filepath) => path.extname(filepath);
const getFileData = (filepath) => fs.readFileSync(filepath);

export default (filepath1, filepath2, formatName = null) => {
  const obj1 = parser(getFileData(filepath1), getFileType(filepath1));
  const obj2 = parser(getFileData(filepath2), getFileType(filepath2));
  const diffTree = makeDiffTree(obj1, obj2);
  return formatter(diffTree, formatName);
};
