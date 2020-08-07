let getArray = require('../array/ReferenceArrayList').getArray;

/**
 *  Dynmaic arrays don't really gain you much with queues, as either the enqueue or dequeue
 *  operation is O(n) as it reorganizes the array.  So we'll just do a fixed size array 
 *  implementation.
 */
class ArrayBasedQueue {
  constructor(initialCapacity = 10) {
    this._storage = getArray(initialCapacity);
    this._head = 0;
    this._next = 0;
  }
  
  /****************
   * MODIFICATION *
   ****************/
  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  enqueue(item) {
    if (!item) {
      throw `Cannot enqueue ${item}`;
    }
    if (this._isFull()) {
      //If the queue is full, we have to increase capacity before we enqueue.
      this._expand();
    }
    this._storage[this._next] = item;
    this._next = this._increment(this._next);
  }

  /**
   *  Private method to expand the storage.
   */
  _expand() {
    const newStorage = getArray(this._storage.length * 2);

    // Copy the old queue into the new queue - in order to preserve the circular nature of the
    // array you absolutely have to line it back up at zero again.
    let newIndex = 0;
    let oldIndex = this._head;
    while(oldIndex !== this._next) {
      newStorage[newIndex] = this._storage[oldIndex]
      newIndex++; // You can safely increment this the naive way because we won't run off the edge
      oldIndex = this._increment(oldIndex);
    }

    //Make the swap
    this._storage = newStorage;
    this._head = 0;
    this._next = newIndex;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  dequeue() {
    if (this.isEmpty()) {
      throw 'Cannot dequeue from an empty queue';
    }
    const toReturn = this._storage[this._head];
    this._head = this._increment(this._head);
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
      throw 'Cannot peek on an empty queue.';
    }
    return this._storage[this._head];
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
    return this._head === this._next;
  }

  /**
   *  Convenience method for checking for fullness.
   */
  _isFull() {
    return this._increment(this._next) === this._head
  }

  /**
   *  Convenience method to encapsulate the modular math for incrementing.
   */
  _increment(index) {
    return (index + 1) % this._storage.length;
  }
}

module.exports = ArrayBasedQueue;
