import { getDiff, diffWithDescription } from '../src/cli.js';
import parser from '../src/parsers.js';
import stylish from '../src/stylish.js';
import plain from '../formatters/index.js';

export default (filepath1, filepath2, formatName = null) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const diff = getDiff(obj1, obj2);
  switch (formatName) {
    case 'plain':
      return diffWithDescription(plain(diff), filepath1, filepath2, formatName);

    default:
      return diffWithDescription(stylish(diff), filepath1, filepath2);
  }
};
