const { getTestSet } = require('utilities/env');
const referenceImplementations = [
  require('../lib/doublyLinked/NaiveDoublyLinkedList')
  , require('../lib/doublyLinked/LengthTrackingDoublyLinkedList'),
];
const userImplementations = [
  require('../src/DoublyLinkedList')
];
const testListImplementation = require('./testListImplementation');

describe('Doubly Linked', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testListImplementation)
});
