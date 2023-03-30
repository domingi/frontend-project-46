/* eslint-disable no-shadow */
import _ from 'lodash';
import {
  getType, getKey, getChildren,
} from './tools.js';

const getSpaces = (depth) => (_.repeat(' ', depth * 4));

const getValue = (node, type, depth) => {
  const takeValue = (node, type) => {
    switch (type) {
      case 'common':
        return node.value;
      case 'new':
        return node.newValue;
      case 'old':
        return node.oldValue;
      default:
        throw new Error(`Undefined type of value ${type}`);
    }
  };

  const value = takeValue(node, type);

  const valueToStr = (value, depth) => {
    const entries = Object.entries(value);
    const prettyValue = entries.map(([key, val]) => {
      if (_.isPlainObject(val)) {
        return `${getSpaces(depth)}${key}: {\n${valueToStr(val, depth + 1)}\n${getSpaces(depth)}}`;
      }
      return `${getSpaces(depth)}${key}: ${val}`;
    });
    return prettyValue.join('\n');
  };

  return _.isPlainObject(value) ? `{\n${valueToStr(value, depth + 1)}\n${getSpaces(depth)}}` : value;
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
        return `${getIndent(node, depth, 'removed')}${getKey(node)}: ${getValue(node, 'common', depth)}`;
      }

      if (getType(node) === 'added') {
        return `${getIndent(node, depth, 'added')}${getKey(node)}: ${getValue(node, 'common', depth)}`;
      }

      if (getType(node) === 'modified') {
        return `${getIndent(node, depth, 'removed')}${getKey(node)}: ${getValue(node, 'old', depth)}\n${getIndent(node, depth, 'added')}${getKey(node)}: ${getValue(node, 'new', depth)}`;
      }

      if (getType(node) === 'unchanged') {
        return `${getIndent(node, depth)}${getKey(node)}: ${getValue(node, 'common', depth)}`;
      }
      return node;
    });
    return result.join('\n');
  };
  return `{\n${iter(diffTree)}\n}`;
};

export default makeStylish;
