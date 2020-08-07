class LinkedListBasedStack {

  constructor() {
    this._head = null;
  }
  
  /****************
   * MODIFICATION *
   ****************/

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1) - though the nature of that constant performance depends on implementation.
   */
  push(item) {
    if (!item) {
      throw `${item} is not storeable}`;
    }
    this._head = {
      item: item,
      next: this._head,
    };
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  pop() {
    if (this.isEmpty()) {
      throw "Pop on an empty stack.";
    }
    let toReturn = this._head.item;
    this._head = this._head.next;
    return toReturn;
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
    return this._head.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
    return this._head === null;
  }
}

module.exports = LinkedListBasedStack;
