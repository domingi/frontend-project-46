import _ from 'lodash';
import {
  getType, getKey, getChildren,
} from './tools.js';

const getSpaces = (depth) => (_.repeat(' ', depth * 4));

const prettifyValue = (value, depth) => {
  const entries = Object.entries(value);
  const prettyValue = entries.map(([key, val]) => {
    if (_.isPlainObject(val)) {
      return `${getSpaces(depth)}${key}: {\n${prettifyValue(val, depth + 1)}\n${getSpaces(depth)}}`;
    }
    return `${getSpaces(depth)}${key}: ${val}`;
  });
  return prettyValue.join('\n');
};

const getValue = (node, depth, valueType) => {
  switch (valueType) {
    case 'common':
      return _.isObject(node.value) ? `{\n${prettifyValue(node.value, depth + 1)}\n${getSpaces(depth)}}` : node.value;
    case 'old':
      return _.isObject(node.oldValue)
        ? `{\n${prettifyValue(node.oldValue, depth + 1)}\n${getSpaces(depth)}}` : node.oldValue;
    case 'new':
      return _.isObject(node.newValue)
        ? `{\n${prettifyValue(node.newValue, depth + 1)}\n${getSpaces(depth)}}` : node.newValue;
    default:
      throw new Error(`Undefined type of value ${valueType}`);
  }
};

const getIndent = (node, depth, type = 'unchanged') => {
  const indent = _.repeat(' ', depth * 4 - 2);
  switch (type) {
    case 'added':
      return `${indent}+ `;
    case 'removed':
      return `${indent}- `;
    case 'unchanged':
      return `${indent}  `;
    default:
      throw new Error(`Can't take indent. Type ${type} undefined`);
  }
};

const makeStylish = (diffTree) => {
  const iter = (data, depth = 1) => {
    const result = data.map((node) => {
      if (getChildren(node) !== null) {
        const expression = iter(getChildren(node), depth + 1);
        return `${getIndent(node, depth)}${getKey(node)}: {\n${expression}\n${getIndent(node, depth)}}`;
      }

      if (getType(node) === 'removed') {
        const expression = `${getIndent(node, depth, 'removed')}${getKey(node)}: ${getValue(node, depth, 'common')}`;
        return expression;
      }

      if (getType(node) === 'added') {
        const expression = `${getIndent(node, depth, 'added')}${getKey(node)}: ${getValue(node, depth, 'common')}`;
        return expression;
      }

      if (getType(node) === 'modified') {
        const expression = `${getIndent(node, depth, 'removed')}${getKey(node)}: ${getValue(node, depth, 'old')}\n${getIndent(node, depth, 'added')}${getKey(node)}: ${getValue(node, depth, 'new')}`;
        return expression;
      }

      if (getType(node) === 'unchanged') {
        const expression = `${getIndent(node, depth)}${getKey(node)}: ${getValue(node, depth, 'common')}`;
        return expression;
      }
      return node;
    });
    return result.join('\n');
  };
  return `{\n${iter(diffTree)}\n}`;
};

export default makeStylish;
