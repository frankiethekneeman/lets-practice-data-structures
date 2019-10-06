const expect = require('chai').expect;
const addContext = require('mochawesome/addContext');

class RandomBehaviourTester {
  constructor(underTest, baseCase, generators, assertSame, testInstance) {
    this.underTest = underTest;
    this.baseCase = baseCase;
    this.generators = generators;
    this.assertSame = assertSame;
    this.testInstance = testInstance;
  }

  test(numSteps) {
    this.assertSame(this.underTest, this.baseCase);
    let state = this.baseCase;
    for (let i = 0; i < numSteps; i++) {
      const step = this.generate(state)
      const prettyArgs = step.args.map(JSON.stringify).join(", ");
      addContext(this.testInstance, `${step.name}(${prettyArgs})`);
      expect(this.underTest[step.name].apply(this.underTest, step.args)).to.deep.equal(step.returnValue);
      this.assertSame(this.underTest, step.result);
      state = step.result;
    }
  }
  generate(state) {
    const no = Math.floor(Math.random() * this.generators.length);
    // If the generator returns null, it means the behaviour is not doable from
    // the current state, so recurse
    return this.generators[no](state) || this.generate(state);
  }
}

module.exports = RandomBehaviourTester;
