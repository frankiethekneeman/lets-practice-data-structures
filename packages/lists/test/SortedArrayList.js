const { getTestSet } = require('utilities/env');
const referenceImplementations = [
  require('../lib/sortedArray/ReferenceSortedArrayList')
];
const userImplementations = [
  require('../src/SortedArrayList')
];
const testSortedListImplementation = require('./testSortedListImplementation');

describe('Array', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testSortedListImplementation)
});

