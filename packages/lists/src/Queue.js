/**
 *  Queues are first in, first out data structures with only two modification behaviours:
 *    Enqueue: Add something to the queue
 *    Dequeue: Remove and return the first thing in the queue.
 */
class Queue {
  /**
   *  Queue Constructors take no arguments
   *  Queues have a head and a tail 
   */
  constructor() {
    this._head = null; // this is the object or item
    this._tail = null; // this points to the next object or not
    // think of these as one single "being" with a head and a tail
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
    if (!item) {
      throw `${item} is not valid`;
    }

    const newNode = {
      item: item,
      points: null,
    };

   if (this.isEmpty()) {
      this._head = newNode
      this._tail = this._head;
    } else { //this I don't fully gronk
      this._tail.points = newNode;
      // does this reassign the previous newNode's point to = newNode?
      this._tail = this._tail.points;
      // and then this assigns this._tail to be the newNode?
    };
    
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
    if (this.isEmpty()){
      throw `Nothing to remove! The queue is empty.`;
    }
    const itemToReturn = this._head.item; 
    //this allows us to return the item on top
    this._head = this._head.points;
    //this reassigns this._head to either be a newNode or empty
    if (this._head === null) {
      this._tail = null;
      //this resets the queue to be an empty queue
      //can't have a head be null and a tail point to something - both have to
      //be null or have newNodes
    }
    
    return itemToReturn;
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
    if (this.isEmpty()) {
      throw `Nothing to peek at! The queue is empty.`;
    } else {
      return this._head.item;
      //this just returns the first object's item
    }
  }

  /**
   *  Return true if the queue is empty, or false if it is not.
   *  
   *  @return true or false, as queue emptiness is concerned
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
    return (this._head === null);
  }
}

module.exports = Queue;
