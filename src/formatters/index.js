import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatter = (diffTree, formatName) => {
  switch (formatName) {
    case 'plain':
      return makePlain(diffTree);
    case 'json':
      return makeJson(diffTree);
    case 'stylish':
      return makeStylish(diffTree);
    default:
      throw new Error(`Undefined format type ${formatName}`);
  }
};

export default formatter;
