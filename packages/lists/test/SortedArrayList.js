const referenceImplementations = [
  require('../lib/sortedArray/ReferenceSortedArrayList')
];
const userImplementations = [
  require('../src/SortedArrayList')
];
const testSortedListImplementation = require('./testSortedListImplementation');
const {getTestSet} = require('./utils');


describe('Array', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testSortedListImplementation)
});

