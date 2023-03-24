import _ from 'lodash';
import {
  getType, getChildren,
} from './tools.js';

const getProperty = (node) => `'${node.property.join('.')}'`;

const getStylizeValue = (node, valueType) => {
  if (_.isString(node[valueType])) return `'${node[valueType]}'`;
  if (_.isPlainObject(node[valueType])) return '[complex value]';
  return node[valueType];
};

const plain = (diffTree) => {
  const result = diffTree.map((node) => {
    if (getChildren(node) !== null) {
      return plain(getChildren(node));
    }

    if (getType(node) === 'removed') {
      return `Property ${getProperty(node)} was removed`;
    }

    if (getType(node) === 'added') {
      return `Property ${getProperty(node)} was added with value: ${getStylizeValue(node, 'value')}`;
    }

    if (getType(node) === 'modified') {
      return `Property ${getProperty(node)} was updated. From ${getStylizeValue(node, 'oldValue')} to ${getStylizeValue(node, 'newValue')}`;
    }
    return [];
  });
  return result
    .flat()
    .join('\n');
};

export default plain;
