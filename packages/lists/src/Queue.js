/**
 *  Queues are first in, first out data structures with only two modification behaviours:
 *    Enqueue: Add something to the queue
 *    Dequeue: Remove and return the first thing in the queue.
 */
class Queue {
  /**
   *  Queue Constructors take no arguments
   */
  constructor() {
  }
  
  /****************
   * MODIFICATION *
   ****************/
  /**
   *  Add a new item to the queue.
   *  
   *  @param item the thing to remember
   *  @return void
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  enqueue(item) {
  }

  /**
   *  Push the earliest remaining item off of the queue and return it.  This should error
   *  if the queue is empty.
   *  
   *  @return the first enqueued item still available
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  dequeue() {
  }

  /*****************
   * INTERROGATION *
   *****************/

  /**
   *  Return the earliest remaining item, but leave it at the head of the queue.  Like dequeue, this
   *  should error if the queue is empty.
   *  
   *  @return the first enqueued item still available
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek() {
  }

  /**
   *  Return true if the queue is empty, or false if it is not.
   *  
   *  @return true or false, as queue emptiness is concerned
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
  }
}

module.exports = Queue;
