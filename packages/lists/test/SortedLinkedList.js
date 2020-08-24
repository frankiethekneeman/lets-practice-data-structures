const referenceImplementations = [
  require('../lib/sortedLinked/ReferenceSortedLinkedList')
];
const userImplementations = [
  require('../src/SortedLinkedList')
];
const testSortedListImplementation = require('./testSortedListImplementation');
const {getTestSet} = require('./utils');


describe('Singly Linked', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testSortedListImplementation)
});

