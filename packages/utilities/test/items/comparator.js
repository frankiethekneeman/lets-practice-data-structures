const Item = require('../../items/Item');
const clone = require('../../items/clone');
const comparator = require('../../items/comparator');
const expect = require('chai').expect;

const TIMES = 100;

describe('items/comparator', () => {
  for(let i = 0; i< TIMES; i++) {
    const A = new Item();
    const B = new Item();
    const lesser = A.value < B.value ? A : B;
    const greater = A.value < B.value ? B : A;

    describe(JSON.stringify(lesser) + ' vs. ' + JSON.stringify(greater), () => {
      it(JSON.stringify(lesser) + ' is less than ' + JSON.stringify(greater), () => {
        expect(comparator(lesser, greater)).to.be.below(0);
      });
      it(JSON.stringify(greater) + ' is greater than ' + JSON.stringify(lesser), () => {
        expect(comparator(greater, lesser)).to.be.above(0);
      });
      it(JSON.stringify(A) + ' is equal to ' + JSON.stringify(A), () => {
        expect(comparator(A, A)).to.equal(0);
      });
      it(JSON.stringify(A) + ' is equal to ' + JSON.stringify(A) + ', cloned', () => {
        expect(comparator(A, clone(A))).to.equal(0);
      });
      it(JSON.stringify(B) + ' is equal to ' + JSON.stringify(B), () => {
        expect(comparator(B, B)).to.equal(0);
      });
      it(JSON.stringify(B) + ' is equal to ' + JSON.stringify(B) + ', cloned', () => {
        expect(comparator(B, clone(B))).to.equal(0);
      });
    })
  }
});
