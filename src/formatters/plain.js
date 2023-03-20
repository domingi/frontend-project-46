import _ from 'lodash';

const stylizeDiff = (diff) => diff
  .flatMap((str) => _.replace(str, 'object Object', 'complex value'))
  .join('\n');

const getType = (node) => node.type;
const getProperty = (node) => `'${node.property.join('.')}'`;
const getChildren = (node) => node.children;
const getStylizeValue = (node) => (_.isString(node.value) ? `'${node.value}'` : node.value);
const getStylizeValueNew = (node) => (_.isString(node.valueNew) ? `'${node.valueNew}'` : node.valueNew);

const plain = (diffTree) => {
  const result = diffTree.reduce((acc, node) => {
    if (getChildren(node) !== null) {
      const expression = plain(getChildren(node));
      return [...acc, expression];
    }

    if (getType(node) === 'removed') {
      const expression = `Property ${getProperty(node)} was removed`;
      return [...acc, expression];
    }

    if (getType(node) === 'added') {
      const expression = `Property ${getProperty(node)} was added with value: ${getStylizeValue(node)}`;
      return [...acc, expression];
    }

    if (getType(node) === 'modified') {
      const expression = `Property ${getProperty(node)} was updated. From ${getStylizeValue(node)} to ${getStylizeValueNew(node)}`;
      return [...acc, expression];
    }
    return acc;
  }, []);
  return stylizeDiff(result);
};

export default plain;
