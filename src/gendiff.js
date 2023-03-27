import _ from 'lodash';

let property = [];
const genDiffTree = (obj1, obj2) => {
  const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const keys = _.sortBy(_.uniq(commonKeys));
  const diff = keys.map((key) => {
    property = [...property, key];

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const node = {
        type: 'unchanged', key, property, children: genDiffTree(obj1[key], obj2[key]),
      };
      property = _.slice(property, 0, -1);
      return node;
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      const leaf = {
        type: 'added', key, value: obj2[key], property,
      };
      property = _.slice(property, 0, -1);
      return leaf;
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      const leaf = {
        type: 'removed', key, value: obj1[key], property,
      };
      property = _.slice(property, 0, -1);
      return leaf;
    }

    if (obj1[key] === obj2[key]) {
      const leaf = {
        type: 'unchanged', key, value: obj1[key], property,
      };
      property = _.slice(property, 0, -1);
      return leaf;
    }

    const leaf = {
      type: 'modified', key, oldValue: obj1[key], newValue: obj2[key], property,
    };
    property = _.slice(property, 0, -1);
    return leaf;
  });
  return diff;
};
export default genDiffTree;
