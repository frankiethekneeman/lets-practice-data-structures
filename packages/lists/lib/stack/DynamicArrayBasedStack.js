/**
 *  Arrays in JS already have `push` and `pop`, so you can treat them like stacks directly.
 *  However, it's probably worth knowing how to do this kind of manipulation yourself.
 */
class DynamicArrayBasedStack {
  constructor(initialCapacity = 10) {
    this._storage = []
    // This points to the first empty position in the array at all times.
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
    //Make sure you're incrementing the position point 
    this._storage[this._next++] = item;
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

module.exports = DynamicArrayBasedStack;
