import { getDiff, convertFileToObj, generateStr } from '../src/cli.js';

export default (filepath1, filepath2) => {
  const obj1 = convertFileToObj(filepath1);
  const obj2 = convertFileToObj(filepath2);
  const diff = getDiff(obj1, obj2);
  return generateStr(diff, filepath1, filepath2);
};
