const { getTestSet } = require('utilities/env');
const referenceImplementations = [
  require('../lib/array/ReferenceArrayList')
];
const userImplementations = [
  require('../src/ArrayList')
];

const testListImplementation = require('./testListImplementation');


describe('Array', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testListImplementation)
});
