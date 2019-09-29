const referenceImplementations = [
  require('../lib/array/ReferenceArrayList')
];
const userImplementations = [
  require('../src/ArrayList')
];
const testListImplementation = require('./testListImplementation');
const {getTestSet} = require('./utils');


describe('Array', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testListImplementation)
});
