const Item = require('./Item');

function clone(toClone) {
  if (!toClone) {
    return toClone;
  }
  const toReturn = new Item();
  toReturn.value = toClone.value
  return toReturn;
}

module.exports = clone;
