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
      const step = this.generate(state);
      this.record(step);
      this.execute(step);
      if (!step.shouldError) {
        state = step.result;
      } 
      this.assertSame(this.underTest, state);
    }
  }

  generate(state) {
    const no = Math.floor(Math.random() * this.generators.length);
    // If the generator returns null, it means the behaviour is not doable from
    // the current state, so recurse
    return this.generators[no](state) || this.generate(state);
  }

  record(step) {
    const prettyArgs = step.args.map(JSON.stringify).join(", ");
    const errorMsg = step.shouldError ? "// expected exception": "";
    addContext(this.testInstance, `${step.name}(${prettyArgs})${errorMsg}`);
  }

  execute(step) {
    let result;
    try {
      result = this.underTest[step.name].apply(this.underTest, step.args)
    } catch (e) {
      if (step.shouldError) {
        return
      }
      throw e;
    }
    expect(step.shouldError, `Expected failure, but returned ${result}`).to.be.undefined;
    expect(result).to.deep.equal(step.returnValue);
  }
}

module.exports = RandomBehaviourTester;
