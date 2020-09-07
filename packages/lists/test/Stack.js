const expect = require('chai').expect;
const { Item, clone } = require('utilities/items');
const { int: randInt } = require('utilities/random');
const { seq } = require('utilities/fp');
const { getTestSet } = require('utilities/env');
const RandomBehaviourTester = require('utilities/RandomBehaviourTester');

const referenceImplementations = [
  require('../lib/stack/DynamicArrayBasedStack'),
  require('../lib/stack/FixedArrayBasedStack'),
  require('../lib/stack/LinkedListBasedStack')
];

const userImplementations = [
  require('../src/Stack')
];

const anItem = new Item();
const anotherItem = new Item();

describe('Stack', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach((StackImpl) => {
      describe(StackImpl.name, () => {
        describe('empty stack', () => {
          let stack = null;
          beforeEach(() => stack = new StackImpl());
          it('should error on empty push', () => {
            expect(() => stack.push()).to.throw();
          });
          it('should error on peek', () => {
            expect(() => stack.peek()).to.throw();
          });
          it('should error on pop', () => {
            expect(() => stack.pop()).to.throw();
          });
          it('should claim to be empty', () => {
            expect(stack.isEmpty()).to.be.true;
          });
          it('should allow push', () => {
            stack.push(anItem);
            expect(stack.isEmpty()).to.be.false;
            expect(stack.peek()).to.equal(anItem);
            expect(stack.pop()).to.equal(anItem);
          });
        });
        describe('singleton stack', () => {
          let stack = null;
          beforeEach(() => {
            stack = new StackImpl()
            stack.push(anItem);
          });
          it('should error on empty push', () => {
            expect(() => stack.push()).to.throw();
          });
          it('should return item on peek', () => {
            expect(stack.peek()).to.equal(anItem);
            expect(stack.isEmpty()).to.be.false;
          });
          it('should return item on pop', () => {
            expect(stack.pop()).to.equal(anItem);
            expect(stack.isEmpty()).to.be.true;
          });
          it('should not claim to be empty', () => {
            expect(stack.isEmpty()).to.be.false;
          });
          it('should allow push', () => {
            stack.push(anotherItem);
            expect(stack.isEmpty()).to.be.false;
            expect(stack.peek()).to.equal(anotherItem);
            expect(stack.pop()).to.equal(anotherItem);
          });
        });
        const stackSize = randInt(10, 20);
        describe(`Stack of arbitrary depth ${stackSize}`, () => {
          let stack = null;
          let values = null;
          beforeEach(() => {
            stack = new StackImpl()
            values = seq(0, stackSize).map(() => new Item());
            //Push them on in reverse, so I check them forward.
            for (let i = stackSize - 1; i >= 0; i--) {
              stack.push(values[i]);
            }
          });
          it('should error on empty push', () => {
            expect(() => stack.push()).to.throw();
          });
          it('should not error on peek', () => {
            expect(stack.peek()).to.equal(values[0]);
            expect(stack.isEmpty()).to.be.false;
          });
          it('should not error on pop', () => {
            expect(stack.peek()).to.equal(values[0]);
            expect(stack.isEmpty()).to.be.false;
          });
          it('should not claim to be empty', () => {
            expect(stack.isEmpty()).to.be.false;
          });
          it('should allow push', () => {
            stack.push(anotherItem);
            expect(stack.isEmpty()).to.be.false;
            expect(stack.peek()).to.equal(anotherItem);
            expect(stack.pop()).to.equal(anotherItem);
          });
          it('should return items in reverse order of push', () => {
            values.forEach((item) => {
              expect(stack.pop()).to.equal(item);
            });
            expect(stack.isEmpty()).to.be.true;
          });
        });
        describe('randomBehaviour', () => {
          it('works', function () {
            const stack = new StackImpl();
            const randomizer = new RandomBehaviourTester(stack, [], randomStepGenerators, function (underTest, result) {
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
 *  This is a series of functions that generate stack modifications for the random test.
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

  //push(item)
  function(before) {
    const item = new Item();
    return {
      name: 'push',
      args: [ item ],
      returnValue: undefined,
      result: [ item, ...before ],
    }
  },

  //pop()
  function(before) {
    if (before.length < 1) {
      return {
        name: 'pop',
        args: [],
        shouldError: true,
        result: [...before],
      }
    }
    return {
      name: 'pop',
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
