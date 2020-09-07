const Item = require('../../items/Item');
const clone = require('../../items/clone');
const expect = require('chai').expect;

const TIMES = 100;

describe('items/Item', () => {
  const HERO = new Item();
  it('randomly generates the value', () => {
    for (let i = 0; i < TIMES; i++) {
      expect(new Item().value).to.not.equal(HERO.value);
    }
  });

  describe('equality', () => {
    it('equals itself', () => {
      expect(HERO.equals(HERO)).to.be.true;
    });
    it('equals its clone', () => {
      expect(HERO.equals(clone(HERO))).to.be.true;
    });
    it('does not equal new items', () => {
      for (let i = 0; i < TIMES; i++) {
        expect(HERO.equals(new Item())).to.be.false;
      }
    });
  });
});
