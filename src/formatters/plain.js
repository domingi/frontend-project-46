import _ from 'lodash';
import {
  getType, getChildren, getKey,
} from './tools.js';

const getStylizeValue = (node, valueType) => {
  if (_.isString(node[valueType])) return `'${node[valueType]}'`;
  if (_.isPlainObject(node[valueType])) return '[complex value]';
  return node[valueType];
};

const getProperty = (path, key) => (path.length > 0 ? `'${path.join('.')}.${key}'` : `'${key}'`);

const makePlain = (diffTree, path = []) => {
  const result = diffTree.map((node) => {
    if (getChildren(node) !== null) {
      return makePlain(getChildren(node), [...path, getKey(node)]);
    }
    if (getType(node) === 'removed') {
      return `Property ${getProperty(path, getKey(node))} was removed`;
    }

    if (getType(node) === 'added') {
      return `Property ${getProperty(path, getKey(node))} was added with value: ${getStylizeValue(node, 'value')}`;
    }

    if (getType(node) === 'modified') {
      return `Property ${getProperty(path, getKey(node))} was updated. From ${getStylizeValue(node, 'oldValue')} to ${getStylizeValue(node, 'newValue')}`;
    }
    return [];
  });
  return result
    .flat()
    .join('\n');
};

export default makePlain;
