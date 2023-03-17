import _ from 'lodash';
import { stylishPlainDiff, stylish } from '../src/stylish.js';

const objToString = (obj) => {
  const result = Object.entries(obj).reduce((str, [key, value]) => {
    if (_.isObject(value)) return `${str}${key}: ${objToString(value)}\n`;
    return `${str}${key}: ${value}\n`;
  }, '');
  return `{\n${result}}`;
};

const getType = (node) => node.type;
const getKey = (node) => node.key;
const getValue = (node) => (
  _.isObject(node.value) ? objToString(node.value) : node.value
);
const getNewValue = (node) => (
  _.isObject(node.valueNew) ? objToString(node.valueNew) : node.valueNew
);
const getProperty = (node) => `'${node.property.join('.')}'`;
const getChildren = (node) => node.children;

const formatterTree = (diffTree) => {
  const result = diffTree.reduce((acc, node) => {
    if (getChildren(node) !== null) {
      const expression = formatterTree(getChildren(node));
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

const getStylizeValue = (node) => (_.isString(node.value) ? `'${node.value}'` : node.value);
const getStylizeValueNew = (node) => (_.isString(node.valueNew) ? `'${node.valueNew}'` : node.valueNew);

const formatterPlain = (diffTree) => {
  const result = diffTree.reduce((acc, node) => {
    if (getChildren(node) !== null) {
      const expression = formatterPlain(getChildren(node));
      acc.push(expression);
      return acc.flat();
    }

    if (getType(node) === 'removed') {
      const expression = `Property ${getProperty(node)} was removed`;
      acc.push(expression);
    }

    if (getType(node) === 'added') {
      const expression = `Property ${getProperty(node)} was added with value: ${getStylizeValue(node)}`;
      acc.push(expression);
    }

    if (getType(node) === 'modified') {
      const expression = `Property ${getProperty(node)} was updated. From ${getStylizeValue(node)} to ${getStylizeValueNew(node)}`;
      acc.push(expression);
    }
    return acc;
  }, []);
  return result;
};

const formatterJson = (diffTree) => JSON.stringify(diffTree, null, '');

const formatter = (diffTree, formatName) => {
  switch (formatName) {
    case 'plain':
      return stylishPlainDiff(formatterPlain(diffTree));
    case 'json':
      return formatterJson(diffTree);
    default:
      return stylish(formatterTree(diffTree));
  }
};

export default formatter;
