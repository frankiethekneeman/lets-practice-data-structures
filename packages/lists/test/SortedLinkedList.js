const { getTestSet } = require('utilities/env');
const referenceImplementations = [
  require('../lib/sortedLinked/ReferenceSortedLinkedList')
];
const userImplementations = [
  require('../src/SortedLinkedList')
];
const testSortedListImplementation = require('./testSortedListImplementation');

describe('Singly Linked', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testSortedListImplementation)
});

