function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function seq(start, stop, step = 1) {
  const toReturn = []
  for (let i = start; i < stop; i += step) toReturn.push(i);
  return toReturn;
}

function getTestSet(userImplementations, referenceImplementations) {
  const implMap = {
    all: [...userImplementations, ...referenceImplementations],
    reference: referenceImplementations,
    user: userImplementations
  }
  return implMap[(process.env.TEST_SET || '').toLowerCase()] || userImplementations
}

class Item {
  constructor() {
    this.value = Math.random();
  }
  equals(that) {
    return this.value === (that && that.value);
  }
}


module.exports = {
  randInt, seq, getTestSet, Item
}
