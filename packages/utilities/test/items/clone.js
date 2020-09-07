const Item = require('../../items/Item');
const clone = require('../../items/clone');
const expect = require('chai').expect;

const HERO = new Item();
describe('items/clone', () => {
  it('clones null', () => {
    expect(clone(null)).to.be.null;
  })
  it('clones undefined', () => {
    expect(clone(undefined)).to.be.undefined;
  })
  it('maintains deep equality', () => {
    expect(clone(HERO)).to.deep.equal(HERO);
  });
  it('returns an Item', () => {
    expect(clone(HERO)).to.be.an.instanceOf(Item);
  });
  it('Does not return input', () => {
    expect(clone(HERO)).to.not.equal(HERO);
  });
});
