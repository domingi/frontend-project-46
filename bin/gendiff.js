import parser from '../src/parsers.js';
import formatter from '../formatters/index.js';
import makeDiffTree from '../src/cli.js';

export default (filepath1, filepath2, formatName = null) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const diffTree = makeDiffTree(obj1, obj2);
  return formatter(diffTree, formatName);
};
