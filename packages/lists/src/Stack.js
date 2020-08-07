/**
 *  Stacks are Last in, first out data structures with only two modification behaviours:
 *    Push: Add something to the stack
 *    Pop: Remove the last thing that was pushed.
 */
class Stack {
  /**
   *  Stack Constructors take no arguments.
   */
  constructor() {
    this._storage = [];
    this._next = 0;

  }
  
  /****************
   * MODIFICATION *
   ****************/

  /**
   *  Push a new item onto the stack.  This should error if the item is null or undefined.
   *  
   *  @param item the thing to remember
   *  @return void
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1) - though the nature of that constant performance depends on implementation.
   */
  push(item) {
    if (!item) {
      throw `This ${item} is null or undefined.`
    } else {
      this._storage[this._next] = item;
      this._next++;
    }
  }

  /**
   *  Pop the most recent item off of the stack and return it.  This should error if the stack is
   *  empty.
   *  
   *  @return the last pushed item
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  pop() {
    if(this.isEmpty()) {
      throw `This is an empty stack`;
    } else {
      this._next--;
      return this._storage[this._next];
    };
  }

  
  /*****************
   * INTERROGATION *
   *****************/

  /**
   *  Return the most recent item pushed to the stack, but leave it on the top of the stack.
   *  Like Pop, this should error if the stack is empty.
   *  
   *  @return the last pushed item
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek() {
    if(this.isEmpty()){
      throw `This is an empty stack`;
    } else {
      return this._storage[this._next - 1];
    }
  }

  /**
   *  Return true if the stack is empty, or false if it is not.
   *  
   *  @return true or false, as stack emptiness is concerned
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
    if(this._next === 0) {
      return true;
    } else {
      return false;
    };
  }
}

module.exports = Stack;
