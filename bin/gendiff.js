import { getDiff, diffWithDescription } from '../src/cli.js';
import parser from '../src/parsers.js';
import stylish from '../src/stylish.js';

export default (filepath1, filepath2) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const diff = getDiff(obj1, obj2);
  const stylishDiff = stylish(diff);
  return diffWithDescription(stylishDiff, filepath1, filepath2);
};
