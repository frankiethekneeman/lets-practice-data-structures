const expect = require('chai').expect;
const int = require('../../random/int');

const TIMES = 20000;


function test({ min, max }) {
  describe('between ' + min + ' and ' + max, () => {
    it('generates integers', () => {
      for (let i = 0; i < TIMES; i++) {
        expect(int(min, max) % 1).to.equal(0);
      }
    });
    it('generates numbers larger than or equal to ' + min, () => {
      for (let i = 0; i < TIMES; i++) {
        expect(int(min, max)).to.be.at.least(min);
      }
    });
    it('generates numbers less than ' + max, () => {
      for (let i = 0; i < TIMES; i++) {
        expect(int(min, max)).to.be.lessThan(max);
      }
    });
    it('generates a variety of numbers', () => {
      const generated  = new Set();
      for (let i = 0; i < TIMES; i++) {
        generated.add(int(min, max));
      }
      expect(generated.size).to.equal(max-min);
    })
  });
}
describe('random/int', () => {
  [
    {min: 0, max: 10},
    {min: -10, max: 10},
    {min: 0, max: 100},
    {min: -100, max: 1000},
  ].map(test)
});

