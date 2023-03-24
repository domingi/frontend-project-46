import _ from 'lodash';

const getType = (node) => node.type;
const getChildren = (node) => (_.has(node, 'children') ? node.children : null);
const getKey = (node) => node.key;

export {
  getType,
  getChildren,
  getKey,
};
