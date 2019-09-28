const expect = require('chai').expect;
const {randInt, seq, Item} = require('./utils');

const anItem = new Item();
const anotherItem = new Item();
module.exports = function(ListImpl) {
  describe(ListImpl.name, () => {
    describe('empty lists', () => {
      let list = null;
      beforeEach(() => { list = new ListImpl(); });
      it('should return 0 for size', () => {
        expect(list.size()).to.equal(0);
      });
      it('should fail to insert nothing', () => {
        expect(() => list.insert(0, null)).to.throw();
        expect(() => list.insert(0)).to.throw();
      });
      it('should allow insert at 0', () => {
        list.insert(0, anItem);
        expect(list.size()).to.equal(1);
        expect(list.removeFirst()).to.equal(anItem);
      });
      it('should not allow insert at 1', () => {
        expect(() => list.insert(1, anItem)).to.throw();
        expect(list.size()).to.equal(0);
      });
      it('should prepend', () => {
        list.prepend(anItem);
        expect(list.size()).to.equal(1);
        expect(list.removeFirst()).to.equal(anItem);
      });
      it('should fail to prepend nothing', () => {
        expect(() => list.prepend(null)).to.throw();
        expect(() => list.prepend()).to.throw();
      });
      it('should append', () => {
        list.append(anItem);
        expect(list.size()).to.equal(1);
        expect(list.removeFirst()).to.equal(anItem);
      });
      it('should fail to append nothing', () => {
        expect(() => list.append(null)).to.throw();
        expect(() => list.append()).to.throw();
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
        list = new ListImpl();
        list.prepend(anItem);
      });
      it('should return 1 for size', () => {
        expect(list.size()).to.equal(1);
      });
      it('should fail to insert nothing', () => {
        expect(() => list.insert(0, null)).to.throw();
        expect(() => list.insert(0)).to.throw();
      });
      it('should allow insert at 0', () => {
        list.insert(0, anotherItem);
        expect(list.size()).to.equal(2);
        expect(list.removeFirst()).to.equal(anotherItem);
      });
      it('should allow insert at 1', () => {
        list.insert(1, anotherItem);
        expect(list.size()).to.equal(2);
        expect(list.removeLast()).to.equal(anotherItem);
      });
      it('should not allow insert at 2', () => {
        expect(() => list.insert(2, anotherItem)).to.throw();
        expect(list.size()).to.equal(1);
      });
      it('should prepend', () => {
        list.prepend(anotherItem);
        expect(list.size()).to.equal(2);
        expect(list.removeFirst()).to.equal(anotherItem);
      });
      it('should fail to prepend nothing', () => {
        expect(() => list.prepend(null)).to.throw();
        expect(() => list.prepend()).to.throw();
      });
      it('should append', () => {
        list.append(anotherItem);
        expect(list.size()).to.equal(2);
        expect(list.removeLast()).to.equal(anotherItem);
      });
      it('should fail to append nothing', () => {
        expect(() => list.append(null)).to.throw();
        expect(() => list.append()).to.throw();
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
        list = new ListImpl();
        for (let i = listSize - 1; i >= 0; i--) {
          list.prepend(values[i]);
        }
      });
      it(`should return ${listSize} for size`, () => {
        expect(list.size()).to.equal(listSize);
      });
      it('should fail to insert nothing', () => {
        expect(() => list.insert(0, null)).to.throw();
        expect(() => list.insert(0)).to.throw();
      });
      seq(0, listSize + 1).forEach((i) => {
        it(`should allow insert at index less than or equal to length (${i})`, () => {
          list.insert(i, anItem);
          expect(list.size()).to.equal(listSize + 1);
          expect(list.remove(i)).to.equal(anItem);
        });
      });
      seq(listSize + 1, listSize + 5).forEach((i) => {
        it(`should not allow insert at index greater than length (${i})`, () => {
          expect(() => list.insert(i, anItem)).to.throw();
          expect(list.size()).to.equal(listSize);
        });
      });
      it('should prepend', () => {
        list.prepend(anItem);
        expect(list.size()).to.equal(listSize + 1);
        expect(list.removeFirst()).to.equal(anItem);
      });
      it('should fail to prepend nothing', () => {
        expect(() => list.prepend(null)).to.throw();
        expect(() => list.prepend()).to.throw();
      });
      it('should append', () => {
        list.append(anItem);
        expect(list.size()).to.equal(listSize + 1);
        expect(list.removeLast()).to.equal(anItem);
      });
      it('should fail to append nothing', () => {
        expect(() => list.append(null)).to.throw();
        expect(() => list.append()).to.throw();
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
    describe('sorting', () => {
      let list = null;
      let length = null;
      beforeEach(() => {
        list = new ListImpl();
        length = randInt(50,100);
        for (let i = 0; i< length; i++) {
          list.prepend(new Item());
        }
      });
      it('sorts correctly', () => {
        list.sort((a, b) => {
          return a.value - b.value;
        });
        const arr = list.toArray();
        expect(arr.length).to.equal(length, "Values dropped or added.");
        for (let i = 1; i < arr.length; i++) {
          expect(arr[i-1].value).to.be.at.most(
            arr[i].value,
            `Element ${i} is in the wrong place: ${arr.map(e => e.value)}\n`
          );
        }
      });
      it('creates a new instance when asked', () => {
        const before = list.toArray();
        const sortedList = list.sorted((a, b) => {
          return a.value - b.value;
        });
        const sorted = sortedList.toArray();
        const after = list.toArray();
        expect(list.size()).to.equal(sortedList.size(), "New List Reports the wrong size");
        expect(sorted.length).to.equal(length, "Values dropped or added.");
        expect(after).to.deep.equal(before);
        for (let i = 1; i < sorted.length; i++) {
          expect(sorted[i-1].value).to.be.at.most(
            sorted[i].value,
            `Element ${i} is in the wrong place: ${sorted.map(e => e.value)}\n`
          );
        }
      });
    });
  });
}
