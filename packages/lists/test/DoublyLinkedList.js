const referenceImplementations = [
  require('../lib/doublyLinked/NaiveDoublyLinkedList')
  //, require('../lib/doublyLinked/LengthTrackingDoublyLinkedList'),
];
const userImplementations = [
  require('../src/DoublyLinkedList')
];
const testListImplementation = require('./testListImplementation');
const {getTestSet} = require('./utils');


describe('Doubly Linked', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testListImplementation)
});
