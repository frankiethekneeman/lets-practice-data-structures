const expect = require('chai').expect;
const { Item, clone, comparator: itemComparator } = require('utilities/items');
const { int: randInt } = require('utilities/random');
const { seq } = require('utilities/fp');
const RandomBehaviourTester = require('utilities/RandomBehaviourTester');

const anItem = new Item();
const anotherItem = new Item();

module.exports = function(SortedListImpl) {
  describe(SortedListImpl.name, () => {
    describe('empty lists', () => {
      let list = null;
      beforeEach(() => { list = new SortedListImpl(itemComparator); });
      it('should return 0 for size', () => {
        expect(list.size()).to.equal(0);
      });
      it('should fail to insert nothing', () => {
        expect(() => list.insert(null)).to.throw();
        expect(() => list.insert()).to.throw();
      });
      it('should allow insert', () => {
        list.insert(anItem);
        expect(list.size()).to.equal(1);
        expect(list.removeFirst()).to.equal(anItem);
      });
      it('should not allow remove', () => {
        expect(() => list.remove(0)).to.throw();
        expect(list.size()).to.equal(0);
      });
      it('should return null for removeFirst', () => {
        expect(list.removeFirst()).to.be.null;
        expect(list.size()).to.equal(0);
      });
      it('should return null for removeLast', () => {
        expect(list.removeLast()).to.be.null;
        expect(list.size()).to.equal(0);
      });
      it('should return -1 for removeItem', () => {
        expect(list.removeItem(new Item())).to.equal(-1);
        expect(list.size()).to.equal(0);
      });
      it('should return -1 for removeItem(null)', () => {
        expect(list.removeItem(null)).to.equal(-1);
        expect(list.removeItem()).to.equal(-1);
        expect(list.size()).to.equal(0);
        expect(list.size()).to.equal(0);
      });
      it('should return false for contains', () => {
        expect(list.contains(anItem)).to.be.false;
      });
      it('should not allow peek', () => {
        expect(() => list.peek(0)).to.throw();
      });
      it('should return null for peekFirst', () => {
        expect(list.peekFirst()).to.be.null;
      });
      it('should return null for peekLast', () => {
        expect(list.peekLast()).to.be.null;
      });
      it('should convert to an empty Array', () => {
        expect(list.toArray()).to.be.empty;
      });
    });
    describe('singleton lists', () => {
      let list = null;
      beforeEach(() => {
        list = new SortedListImpl(itemComparator);
        list.insert(anItem);
      });
      it('should return 1 for size', () => {
        expect(list.size()).to.equal(1);
      });
      it('should fail to insert nothing', () => {
        expect(() => list.insert(null)).to.throw();
        expect(() => list.insert()).to.throw();
      });
      it('should allow insert', () => {
        list.insert(anotherItem);
        expect(list.size()).to.equal(2);
        const asArr = list.toArray();
        expect(asArr).to.deep.equal([...asArr].sort(itemComparator));
      });
      it('should allow remove at 0', () => {
        expect(list.remove(0)).to.equal(anItem);
        expect(list.size()).to.equal(0);
      });
      it('should not allow remove at 1', () => {
        expect(() => list.remove(1)).to.throw();
        expect(list.size()).to.equal(1);
      });
      it('should return correct item for removeFirst', () => {
        expect(list.removeFirst()).to.equal(anItem);
      });
      it('should return correct item for removeLast', () => {
        expect(list.removeLast()).to.equal(anItem);
      });
      it('should return -1 for unfound removeItem', () => {
        expect(list.removeItem(anotherItem)).to.equal(-1);
      });
      it('should return 0 for correct removeItem', () => {
        expect(list.removeItem(anItem)).to.equal(0);
      });
      it('should return -1 for removeItem(null)', () => {
        expect(list.removeItem(null)).to.equal(-1);
        expect(list.removeItem()).to.equal(-1);
        expect(list.size()).to.equal(1);
        expect(list.size()).to.equal(1);
      });
      it('should return false for contains if the item is not in the list', () => {
        expect(list.contains(anotherItem)).to.be.false;
      });
      it('should return true for contains if the item is in the list', () => {
        expect(list.contains(anItem)).to.be.true;
      });
      it('should allow peek at 0', () => {
        expect(list.peek(0)).to.equal(anItem);
      });
      it('should not allow peek at 1', () => {
        expect(() => list.peek(1)).to.throw();
      });
      it('should return the correct item for peekFirst', () => {
        expect(list.peekFirst()).to.equal(anItem);
      });
      it('should return the correct item for peekLast', () => {
        expect(list.peekLast()).to.equal(anItem);
      });
      it('should convert to an Array', () => {
        expect(list.toArray()).to.deep.equal([anItem]);
      });
    });
    const listSize = randInt(10, 20);
    describe(`Lists of Arbitrary Length (${listSize})`, () => {
      let list = null;
      let values = null
      beforeEach(() => {
        values = seq(0, listSize).map(() => new Item());
        list = new SortedListImpl(itemComparator);
        for (let i = listSize - 1; i >= 0; i--) {
          list.insert(values[i]);
        }
        values.sort(itemComparator);
      });
      it(`should return ${listSize} for size`, () => {
        expect(list.size()).to.equal(listSize);
      });
      it('should fail to insert nothing', () => {
        expect(() => list.insert(null)).to.throw();
        expect(() => list.insert()).to.throw();
      });
      seq(0, listSize + 1).forEach((i) => {
        it(`should allow insert`, () => {
          list.insert(anItem);
          expect(list.size()).to.equal(listSize + 1);
        });
      });
      seq(0, listSize).forEach((i) => {
        it(`should allow remove at index less than length (${i})`, () => {
          expect(list.remove(i)).to.equal(values[i]);
          expect(list.size()).to.equal(listSize - 1);
        });
      });
      seq(listSize, listSize + 4).forEach((i) => {
        it(`should not allow remove at index greater than or equal to length (${i})`, () => {
          expect(() => list.remove(i)).to.throw();
          expect(list.size()).to.equal(listSize);
        });
      });
      it('should return correct item for removeFirst', () => {
        expect(list.removeFirst()).to.equal(values[0]);
        expect(list.size()).to.equal(listSize - 1);
      });
      it('should return correct item for removeLast', () => {
        expect(list.removeLast()).to.equal(values[listSize - 1]);
        expect(list.size()).to.equal(listSize - 1);
      });
      it('should return -1 for unfound removeItem', () => {
        expect(list.removeItem(anItem)).to.equal(-1);
        expect(list.size()).to.equal(listSize);
      });
      it('should return -1 for removeItem(null)', () => {
        expect(list.removeItem(null)).to.equal(-1);
        expect(list.removeItem()).to.equal(-1);
        expect(list.size()).to.equal(listSize);
        expect(list.size()).to.equal(listSize);
      });
      seq(0, listSize).forEach((i) => {
        it(`should return correct index for removeItem (${i})`, () => {
          expect(list.removeItem(values[i])).to.equal(i);
          expect(list.size()).to.equal(listSize - 1);
        });
      });
      it('should return false for contains if the item is not in the list', () => {
        expect(list.contains(anItem)).to.be.false;
      });
      seq(0, listSize).forEach((i) => {
        it(`should return true for contains if the item is in the list (${i})`, () => {
          expect(list.contains(values[i])).to.be.true;
        });
      });
      seq(0, listSize).forEach((i) => {
        it(`should allow peek at index less than length (${i})`, () => {
          expect(list.peek(i)).to.equal(values[i]);
          expect(list.size()).to.equal(listSize);
        });
      });
      seq(listSize, listSize + 4).forEach((i) => {
        it(`should not allow peek at index greater than or equal to length (${i})`, () => {
          expect(() => list.remove(i)).to.throw();
          expect(list.size()).to.equal(listSize);
        });
      });
      it('should return the correct item for peekFirst', () => {
        expect(list.peekFirst()).to.equal(values[0]);
        expect(list.size()).to.equal(listSize);
      });
      it('should return the correct item for peekLast', () => {
        expect(list.peekLast()).to.equal(values[listSize - 1]);
        expect(list.size()).to.equal(listSize);
      });
      it('should convert to an Array', () => {
        expect(list.toArray()).to.deep.equal(values);
      });
    });
    describe('randomBehaviour', () => {
      it('works', function () {
        const list = new SortedListImpl(itemComparator);
        const randomizer = new RandomBehaviourTester(list, [], randomStepGenerators, function (underTest, result) {
          expect(underTest.toArray()).to.deep.equal(result);
        }, this);
        randomizer.test(10 * randomStepGenerators.length);
      });
    });
  });
}

/**
 *  This is a series of functions that generate list modifications for the random test.
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

  //insert(item)
  function(before) {
    const item = new Item();
    return {
      name: 'insert',
      args: [item],
      returnValue: undefined,
      result: [item, ...before].sort(itemComparator),
    };
  },

  //remove(i)
  function(before) {
    if (before.length < 1) {
      return null;
    }
    const index = Math.floor(Math.random() * before.length);
    return {
      name: 'remove',
      args: [index],
      returnValue: clone(before[index]),
      result: [...before.slice(0, index), ...before.slice(index + 1)],
    };
  },

  //removeFirst()
  function(before) {
    return {
      name: 'removeFirst',
      args: [],
      returnValue: clone(before[0] || null),
      result: before.slice(1),
    };
  },

  //removeLast()
  function(before) {
    return {
      name: 'removeLast',
      args: [],
      returnValue: clone(before[before.length - 1] || null),
      result: before.slice(0, before.length - 1),
    };
  },

  //removeItem(item)
  function(before) {
    const index = Math.floor(Math.random() * (before.length + 1))
    return {
      name: 'removeItem',
      args: [clone(before[index] || new Item())],
      returnValue: index === before.length ? -1 :  index,
      result: [...before.slice(0, index), ...before.slice(index + 1)]
    };
  },

  //contains(item)
  function(before) {
    const index = Math.floor(Math.random() * (before.length + 1))
    return {
      name: 'contains',
      args: [clone(before[index] || new Item())],
      returnValue: index !== before.length,
      result: [...before],
    };
  },

  //peek(i)
  function(before) {
    if (before.length < 1) {
      return {
        name: 'peek',
        args: [0],
        shouldError: true,
      }
    }
    const index = Math.floor(Math.random() * before.length);
    return {
      name: 'peek',
      args: [index],
      returnValue: clone(before[index]),
      result: [...before]
    };
  },

  function(before) {
    return {
      name: 'peek',
      args: [before.length + 1],
      shouldError: true,
    }
  },

  //peekFirst()
  function(before) {
    return {
      name: 'peekFirst',
      args: [],
      returnValue: clone(before[0] || null),
      result: [...before],
    };
  },

  //peekLast()
  function(before) {
    return {
      name: 'peekLast',
      args: [],
      returnValue: clone(before[before.length - 1] || null),
      result: [...before],
    };
  },

  //size()
  function(before) {
    return {
      name: 'size',
      args: [],
      returnValue: before.length,
      result: [...before],
    };
  },

  //toArray()
  function(before) {
    return {
      name: 'toArray',
      args: [],
      returnValue: before,
      result: [...before],
    };
  },
]

