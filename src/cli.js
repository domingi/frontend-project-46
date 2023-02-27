import { readFileSync } from 'node:fs';
import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const keys = _.uniq(commonKeys).sort();

  const result = keys.reduce((acc, key) => {
    const keyValueObj1 = `${key}: ${obj1[key]}`;
    const keyValueObj2 = `${key}: ${obj2[key]}`;
    if (!Object.hasOwn(obj1, key)) {
      acc.push(`  + ${keyValueObj2}`);
      return acc;
    }
    if (!Object.hasOwn(obj2, key)) {
      acc.push(`  - ${keyValueObj1}`);
      return acc;
    }
    if (obj1[key] === obj2[key]) {
      acc.push(`    ${keyValueObj1}`);
      return acc;
    }
    acc.push(`  - ${keyValueObj1}`);
    acc.push(`  + ${keyValueObj2}`);
    return acc;
  }, []);
  return result.join('\n');
};

const convertFileToObj = (filepath, type = 'json') => {
  const normalizedType = type.toLowerCase();
  switch (normalizedType) {
    case 'json':
      return JSON.parse(readFileSync(filepath));
    default:
      return console.log(`Type ${type} not supported`);
  }
};

const generateStr = (diff, filepath1, filepath2) => {
  console.log(`gendiff ${filepath1} ${filepath2}\n`);
  console.log(`{\n${diff}\n}`);
};

export {
  getDiff,
  convertFileToObj,
  generateStr,
};
