import _ from 'lodash';

const objToString = (obj) => {
  const result = Object.entries(obj).reduce((str, [key, value]) => {
    if (_.isObject(value)) return `${str}${key}: ${objToString(value)}\n`;
    return `${str}${key}: ${value}\n`;
  }, '');
  return `{\n${result}}`;
};

const getType = (node) => node.type;
const getChildren = (node) => node.children;
const getKey = (node) => node.key;
const getValue = (node) => (
  _.isObject(node.value) ? objToString(node.value) : node.value
);
const getNewValue = (node) => (
  _.isObject(node.valueNew) ? objToString(node.valueNew) : node.valueNew
);

const makeStylishDiff = (diffTree) => {
  const result = diffTree.reduce((acc, node) => {
    if (getChildren(node) !== null) {
      const expression = makeStylishDiff(getChildren(node));
      acc.push(`${getKey(node)}: {\n${expression}\n}`);
      return acc;
    }

    if (getType(node) === 'removed') {
      const expression = `- ${getKey(node)}: ${getValue(node)}`;
      acc.push(expression);
    }

    if (getType(node) === 'added') {
      const expression = `+ ${getKey(node)}: ${getValue(node)}`;
      acc.push(expression);
    }

    if (getType(node) === 'modified') {
      const expression = `- ${getKey(node)}: ${getValue(node)}\n+ ${getKey(node)}: ${getNewValue(node)}`;
      acc.push(expression);
    }

    if (getType(node) === 'unchanged') {
      const expression = `${getKey(node)}: ${getValue(node)}`;
      acc.push(expression);
    }
    return acc;
  }, []);
  return result.join('\n');
};

const stylish = (diffTree, replacerSymbol = ' ') => {
  const diff = `{\n${makeStylishDiff(diffTree)}\n}`;
  let depth = 0;
  let leftShift;
  const splitStr = diff.split('\n');

  const result = splitStr.reduce((acc, str) => {
    if (str.includes('-') || str.includes('+')) leftShift = 2;
    if (str.includes('}')) depth -= 1;
    const replacer = _.repeat(replacerSymbol, depth * 4 - leftShift);
    acc.push(`${replacer}${str}`);
    if (str.includes('{')) depth += 1;
    leftShift = 0;
    return acc;
  }, []);

  return result.join('\n');
};

export default stylish;
