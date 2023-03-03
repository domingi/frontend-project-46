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

const generateStr = (diff, filepath1, filepath2) => {
  const str = `gendiff ${filepath1} ${filepath2}\n{\n${diff}\n}`;
  return str;
};

export {
  getDiff,
  generateStr,
};
