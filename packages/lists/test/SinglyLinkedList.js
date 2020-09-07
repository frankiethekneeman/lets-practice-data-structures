const { getTestSet } = require('utilities/env');
const referenceImplementations = [
  require('../lib/singlyLinked/NaiveSinglyLinkedList')
  , require('../lib/singlyLinked/LengthTrackingSinglyLinkedList')
  , require('../lib/singlyLinked/LengthTrackingSinglyLinkedListWithTailPointer')
];
const userImplementations = [
  require('../src/SinglyLinkedList')
];
const testListImplementation = require('./testListImplementation');

describe('Singly Linked', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testListImplementation)
});
