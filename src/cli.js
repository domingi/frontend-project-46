import _ from 'lodash';
import path from 'node:path';

const objToString = (obj) => {
  const result = Object.entries(obj).reduce((str, [key, value]) => {
    if (_.isObject(value)) return `${str}${key}: ${objToString(value)}\n`;
    return `${str}${key}: ${value}\n`;
  }, '');
  return `{\n${result}}`;
};

const getDiff = (obj1, obj2) => {
  const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const keys = _.uniq(commonKeys).sort();

  const diff = keys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const objDiff = getDiff(obj1[key], obj2[key]);
      acc.push(`${key}: {\n${objDiff}\n}`);
      return acc;
    }

    if (_.isObject(obj1[key]) && !_.isObject(obj2[key])) {
      acc.push(`- ${key}: ${objToString(obj1[key])}`);
      if (_.has(obj2, key)) acc.push(`+ ${key}: ${obj2[key]}`);
      return acc;
    }

    if (!_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      acc.push(`+ ${key}: ${objToString(obj2[key])}`);
      return acc;
    }

    const keyValueObj1 = `${key}: ${obj1[key]}`;
    const keyValueObj2 = `${key}: ${obj2[key]}`;
    if (!Object.hasOwn(obj1, key)) {
      acc.push(`+ ${keyValueObj2}`);
      return acc;
    }
    if (!Object.hasOwn(obj2, key)) {
      acc.push(`- ${keyValueObj1}`);
      return acc;
    }
    if (obj1[key] === obj2[key]) {
      acc.push(`${keyValueObj1}`);
      return acc;
    }
    acc.push(`- ${keyValueObj1}`);
    acc.push(`+ ${keyValueObj2}`);
    return acc;
  }, []);
  return diff.join('\n');
};

const diffWithDescription = (diff, filepath1, filepath2, formatName = '') => {
  const fileName1 = path.basename(filepath1);
  const fileName2 = path.basename(filepath2);
  const formatter = formatName === '' ? formatName : `--format ${formatName} `;
  const str = `gendiff ${formatter}${fileName1} ${fileName2}\n\n${diff}`;
  return str;
};

export {
  getDiff,
  diffWithDescription,
};
