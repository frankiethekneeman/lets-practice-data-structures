class LinkedListBasedQueue {
  /**
   *  Queue Constructors take no arguments
   */
  constructor() {
    this._head = null;
    this._tail = null;
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
    const newNode = {
      item: item,
      next: null,
    }
    if (this.isEmpty()) {
      // If the queue is empty, then the head and the tail are now the same node.
      this._tail = newNode;
      this._head = this._tail;
    } else {
      // If the queue is not empty, tack it on the end
      this._tail.next = newNode;
      // And walk the tail down the line.
      this._tail = this._tail.next;
    }
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  dequeue() {
    if (this.isEmpty()) {
      throw 'Cannot dequeue from an empty queue';
    }
    const toReturn = this._head.item;
    this._head = this._head.next;
    if (this._head === null) {
      // If we've just dequeued the last item, clean up the tail pointer.
      this._tail === null;
      // STRICTLY speaking, this isn't necessary, depending on the way `isEmpty` is checked.
      // but it's good hygiene not to create confusing state.
    }
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

module.exports = LinkedListBasedQueue;
