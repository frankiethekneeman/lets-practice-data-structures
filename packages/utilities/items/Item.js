class Item {
  constructor() {
    this.value = Math.random();
  }
  equals(that) {
    return this.value === (that && that.value);
  }
}

module.exports = Item;
