import path from 'node:path';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import makeDiffTree from './gendiff.js';

const getFileType = (filepath) => path.extname(filepath);

export default (filepath1, filepath2, formatName = null) => {
  const obj1 = parser(filepath1, getFileType(filepath1));
  const obj2 = parser(filepath2, getFileType(filepath2));
  const diffTree = makeDiffTree(obj1, obj2);
  return formatter(diffTree, formatName);
};
