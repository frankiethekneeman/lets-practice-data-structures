const referenceImplementations = [
  require('../lib/queue/FixedArrayBasedQueue'),
  require('../lib/queue/LinkedListBasedQueue')
];
const userImplementations = [
  require('../src/Queue')
];

const {getTestSet} = require('./utils');

const expect = require('chai').expect;
const {randInt, seq, Item, clone} = require('./utils');
const RandomBehaviourTester = require('./RandomBehaviourTester');

const anItem = new Item();
const anotherItem = new Item();

describe('Queue', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach((QueueImpl) => {
      describe(QueueImpl.name, () => {
        describe('empty queue', () => {
          let queue = null;
          beforeEach(() => queue = new QueueImpl());
          it('should error on empty enqueue', () => {
            expect(() => queue.enqueue()).to.throw();
          });
          it('should error on peek', () => {
            expect(() => queue.peek()).to.throw();
          });
          it('should error on dequeue', () => {
            expect(() => queue.dequeue()).to.throw();
          });
          it('should claim to be empty', () => {
            expect(queue.isEmpty()).to.be.true;
          });
          it('should allow enqueue', () => {
            queue.enqueue(anItem);
            expect(queue.isEmpty()).to.be.false;
            expect(queue.peek()).to.equal(anItem);
            expect(queue.dequeue()).to.equal(anItem);
          });
        });
        describe('singleton queue', () => {
          let queue = null;
          beforeEach(() => {
            queue = new QueueImpl()
            queue.enqueue(anItem);
          });
          it('should error on empty enqueue', () => {
            expect(() => queue.enqueue()).to.throw();
          });
          it('should return item on peek', () => {
            expect(queue.peek()).to.equal(anItem);
            expect(queue.isEmpty()).to.be.false;
          });
          it('should return item on dequeue', () => {
            expect(queue.dequeue()).to.equal(anItem);
            expect(queue.isEmpty()).to.be.true;
          });
          it('should not claim to be empty', () => {
            expect(queue.isEmpty()).to.be.false;
          });
          it('should allow enqueue', () => {
            queue.enqueue(anotherItem);
            expect(queue.isEmpty()).to.be.false;
            expect(queue.peek()).to.equal(anItem);
            expect(queue.dequeue()).to.equal(anItem);
          });
        });
        const queueSize = randInt(10, 20);
        describe(`Queue of arbitrary depth ${queueSize}`, () => {
          let queue = null;
          let values = null;
          beforeEach(() => {
            queue = new QueueImpl()
            values = seq(0, queueSize).map(() => new Item());
            for (let i = 0; i < queueSize; i++) {
              queue.enqueue(values[i]);
            }
          });
          it('should error on empty enqueue', () => {
            expect(() => queue.enqueue()).to.throw();
          });
          it('should not error on peek', () => {
            expect(queue.peek()).to.equal(values[0]);
            expect(queue.isEmpty()).to.be.false;
          });
          it('should not error on dequeue', () => {
            expect(queue.peek()).to.equal(values[0]);
            expect(queue.isEmpty()).to.be.false;
          });
          it('should not claim to be empty', () => {
            expect(queue.isEmpty()).to.be.false;
          });
          it('should allow enqueue', () => {
            queue.enqueue(anotherItem);
            expect(queue.isEmpty()).to.be.false;
            expect(queue.peek()).to.equal(values[0]);
            expect(queue.dequeue()).to.equal(values[0]);
          });
          it('should return items in same order of enqueue', () => {
            values.forEach((item) => {
              expect(queue.dequeue()).to.equal(item);
            });
            expect(queue.isEmpty()).to.be.true;
          });
        });
        describe('randomBehaviour', () => {
          it('works', function () {
            const queue = new QueueImpl();
            const randomizer = new RandomBehaviourTester(queue, [], randomStepGenerators, function (underTest, result) {
              if (result.length === 0) {
                expect(() => underTest.peek()).to.throw();
              } else {
                expect(underTest.peek()).to.equal(result[0]);
              }
            }, this);
            randomizer.test(10 * randomStepGenerators.length);
          });
        });
      });
    });
});

/**
 *  This is a series of functions that generate queue modifications for the random test.
 *  Returns an object shaped like:
 *  {
 *    name        //string name of the function
 *    args        // an array of arguments for the item
 *    returnValue // the expected return value for the item
 *    result      // the expected state of the list after the operation, as an array.
 *    shouldError // true if and only if the call should throw an exception.  All
 *                // exceptions leave the state unchanged.
 *  }
 */
const randomStepGenerators = [

  //enqueue(item)
  function(before) {
    const item = new Item();
    return {
      name: 'enqueue',
      args: [ item ],
      returnValue: undefined,
      result: [ ...before, item ],
    }
  },

  //dequeue()
  function(before) {
    if (before.length < 1) {
      return {
        name: 'dequeue',
        args: [],
        shouldError: true,
        result: [...before],
      }
    }
    return {
      name: 'dequeue',
      args: [],
      returnValue: clone(before[0]),
      result: before.slice(1),
    }
  },

  //peek()
  function(before) {
    if (before.length < 1) {
      return {
        name: 'peek',
        args: [],
        shouldError: true,
        result: [...before],
      }
    }
    return {
      name: 'peek',
      args: [],
      returnValue: clone(before[0]),
      result: [...before],
    }
  },

  //isEmpty()
  function(before) {
    return {
      name: 'isEmpty',
      args: [],
      returnValue: before.length === 0,
      result: [...before],
    }
  },
]

