let getArray = require('../array/ReferenceArrayList').getArray;
/**
 *  We use the `getArray` method from ArrayLists simulate an array in a language
 *  with fixed arrays.
 */
class FixedArrayBasedStack {
  constructor(initialCapacity = 10) {
    this._storage = getArray(initialCapacity);
    this._next = 0;
  }
  
  /****************
   * MODIFICATION *
   ****************/

  /**
   *  @timeComplexity O(1) - Amortized
   *  @spaceComplexity O(1)
   */
  push(item) {
    if (!item) {
      throw `${item} is not storeable}`;
    }
    //If there's no space left in the storage array, you'll need to expand.
    if (this._next === this._storage.length) {
      this._expand();
    }
    this._storage[this._next++] = item;
  }

  //This is a private function to double the size of the internal storage.
  _expand() {
    const newStorage = getArray(this._storage.length * 2);
    for (let i = 0; i < this._next; i++) {
      newStorage[i] = this._storage[i];
    }
    this._storage = newStorage;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  pop() {
    if (this.isEmpty()) {
      throw "Pop on an empty stack.";
    }
    return this._storage[--this._next];
  }

  /*****************
   * INTERROGATION *
   *****************/

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek() {
    if (this.isEmpty()) {
      throw "Peek on an empty stack.";
    }
    return this._storage[this._next - 1];
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
    return this._next === 0;
  }
}

module.exports = FixedArrayBasedStack;
