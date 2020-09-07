const getTestSet = require('../../env/getTestSet');
const chai = require('chai');
chai.use(require('chai-arrays'));
const expect = chai.expect;

const REFERENCE = [0,0,0].map(() => Math.random());
const USER = [0,0,0].map(() => Math.random());
const ALL = [...REFERENCE, ...USER];

function getAllCases(str) {
  if (str === '') {
    return [''];
  }
  const lower = str[0].toLowerCase();
  const upper = str[0].toUpperCase();
  const substrings = getAllCases(str.slice(1));

  if (lower === upper) {
    return substrings.map((s) => lower + s);
  } else {
    return [
      ...substrings.map((s) => lower + s),
      ...substrings.map((s) => upper + s)
    ];
  }
}

function test(set, name, expected) {
  it(name, () => {
    process.env.TEST_SET = set;
    const result = getTestSet(USER, REFERENCE);
    expect(result).to.be.containingAllOf(expected);
    expect(expected).to.be.containingAllOf(result);
  });
}

function caseInsensitive(testSet, expected) {
  describe(testSet + ' is case insensitive', () => {
    getAllCases(testSet).forEach((s) => {
      test(s, s + ' returns the ' + testSet + ' set', expected);
    });
  });
};

describe('getTestSet', () => {
  let preservedEnv;
  beforeEach(() => {
    preservedEnv = Object.assign({}, process.env);
  })

  afterEach(() => {
    process.env = preservedEnv;
  });

  caseInsensitive('ALL', ALL);
  caseInsensitive('REFERENCE', REFERENCE);
  caseInsensitive('USER', USER);
  describe('Defaults to user set', () => {
    test(undefined, 'when undefined', USER);
    test(null, 'when null', USER);
    test('', 'when emptyString', USER);
    const randomString = Math.random().toString(36).slice(2);
    test(randomString, 'when meaningless (' + randomString + ')', USER);
  });
})
