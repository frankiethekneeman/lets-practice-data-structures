/**
 *  Heaps are just data structures that always return the minimum or maximum item in the store.
 *  All other elements are inaccessible - like Stacks and Queues.
 */
class Heap {
  
  /**
   *  Some Languages may use interfaces or typeclasses to make objects comparable, but in
   *  JS you get a comparator.
   *
   *  @param comparator a function of the style (a, b) => int which compares two items
   *    and returns an integer such that:
   *    if a < b: return < 0
   *    if a = b: return = 0
   *    if a > b: return > 0
   *  By modifying the comparator - we can implement a min heap and use it as a max heap.
   */
  constructor(comparator) {
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  Add an item to the heap.  This should error if the item is null or undefined.
   *  
   *  @param item the item to add
   *  @return void
   *  @timeComplexity O(log n) for simple implementations.  Complex implementations allow O(1)
   *  @spaceComplexity O(1)
   */
  insert(item) {
  }

  /**
   *  For most data structures, adding in bulk isn't meaningfully more performant than
   *  adding one at a time.  However, in heaps, certain implementations allow this to be
   *  done much more efficiently.
   *  
   *  @param items an array of itemas to add.
   *  @return void
   *  @timeComplexity O(k log(n+k)), naively.  But O(n+k) for certain implementations.
   *    There are even implementations that can do this in O(1) time.
   *  @spaceComplexity O(n + k)
   */
  insertMany(items) {
  }

  /************
   * Querying *
   ************/

  /**
   *  Return the minimum/maximum object in the heap, but leave it in place.  This
   *  is equivalent to "peek" in the world of stacks.
   *  
   *  @return the minimum/maximum item in the heap
   *  @timeComplexity O(1) almost universally
   *  @scopeComplexity O(1)
   */
  find() {
  }

  /**
   *  Remove the minimum/maximum object in the heap, and return it.  Like "pop"
   *  from stacks.
   *  
   *  @return the minimum/maximum item in the heap
   *  @timeComplexity O(logn) typically
   *  @spaceComplexity O(1)
   */
  extract() {
  }

  /**
   *  Returns true if the heap is empty, or false if it has stuff.
   *  
   *  @return wether the heap is empty
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
  }
}

module.exports = Heap
