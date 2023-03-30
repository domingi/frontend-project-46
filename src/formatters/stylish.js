/* eslint-disable no-shadow */
import _ from 'lodash';
import {
  getType, getKey, getChildren,
} from './tools.js';

const getSpaces = (depth) => (_.repeat(' ', depth * 4));

const getValue = (value, depth) => {
  const valueToStr = (value, depth) => {
    const entries = Object.entries(value);
    const str = entries.map(([key, val]) => {
      if (_.isPlainObject(val)) {
        return `${getSpaces(depth)}${key}: {\n${valueToStr(val, depth + 1)}\n${getSpaces(depth)}}`;
      }
      return `${getSpaces(depth)}${key}: ${val}`;
    });
    return str.join('\n');
  };

  return _.isPlainObject(value) ? `{\n${valueToStr(value, depth + 1)}\n${getSpaces(depth)}}` : value;
};

const getIndent = (depth, type = 'unchanged') => {
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
        return `${getIndent(depth)}${getKey(node)}: {\n${expression}\n${getIndent(depth)}}`;
      }

      if (getType(node) === 'removed') {
        return `${getIndent(depth, 'removed')}${getKey(node)}: ${getValue(node.value, depth)}`;
      }

      if (getType(node) === 'added') {
        return `${getIndent(depth, 'added')}${getKey(node)}: ${getValue(node.value, depth)}`;
      }

      if (getType(node) === 'modified') {
        return `${getIndent(depth, 'removed')}${getKey(node)}: ${getValue(node.oldValue, depth)}\n${getIndent(depth, 'added')}${getKey(node)}: ${getValue(node.newValue, depth)}`;
      }

      if (getType(node) === 'unchanged') {
        return `${getIndent(depth)}${getKey(node)}: ${getValue(node.value, depth)}`;
      }
      return node;
    });
    return result.join('\n');
  };
  return `{\n${iter(diffTree)}\n}`;
};

export default makeStylish;
