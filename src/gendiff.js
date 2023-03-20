import _ from 'lodash';

let property = [];
const genDiffTree = (obj1, obj2) => {
  const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const keys = _.uniq(commonKeys).sort();

  const diff = keys.reduce((acc, key) => {
    property = [...property, key];

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const node = {
        type: 'unchanged', key, value: obj1[key], property, children: genDiffTree(obj1[key], obj2[key]),
      };
 //     acc.push(node);
      property = _.slice(property, 0, -1);
 //     return acc;
      return [...acc, node];
    }

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      const leaf = {
        type: 'added', key, value: obj2[key], property, children: null,
      };
//      acc.push(leaf);
      property = _.slice(property, 0, -1);
      return [...acc, leaf];
//      return acc;
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      const leaf = {
        type: 'removed', key, value: obj1[key], property, children: null,
      };
//      acc.push(leaf);
      property = _.slice(property, 0, -1);
      return [...acc, leaf];

//      return acc;
    }

    if (obj1[key] === obj2[key]) {
      const leaf = {
        type: 'unchanged', key, value: obj1[key], property, children: null,
      };
//      acc.push(leaf);
      property = _.slice(property, 0, -1);
      return [...acc, leaf];

 //     return acc;
    }

    const leaf = {
      type: 'modified', key, value: obj1[key], valueNew: obj2[key], property, children: null,
    };
//    acc.push(leaf);
    property = _.slice(property, 0, -1);
    return [...acc, leaf];

//    return acc;
  }, []);
  return diff;
};
export default genDiffTree;
