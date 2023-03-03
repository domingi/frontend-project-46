import { getDiff, generateStr } from '../src/cli.js';
import parser from '../src/parsers.js';

export default (filepath1, filepath2) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const diff = getDiff(obj1, obj2);
  return generateStr(diff, filepath1, filepath2);
};
