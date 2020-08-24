const getFixedArray = require('../util/getFixedArray');

/**
 *  SortedArrayLists are ArrayLists that maintain a sort order to the their elements.
 */
class SortedArrayList {
  /**
   *  Not all ArrayLists provide an initial capacity constructor, but we've chosen to do so here.
   *  
   *  @param comparator a function of the style (a, b) => int which compares two items
   *    and returns an integer such that:
   *    if a < b: return < 0
   *    if a = b: return = 0
   *    if a > b: return > 0
   *  @param initialCapacity - a decent guess at the eventual size of the list, so an array
   *  of that size can be preallocated.
   */
  constructor(comparator, initialCapacity = 10) {
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  Add the item at the correct sorted point in the list.  This should error if 
   *  the item is null or undefined.
   *
   *  @param item the item to be inserted
   *  @return void
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n).
   */
  insert(item) {
  }


  /*********************
   * REMOVAL BEHAVIOUR *
   *********************/

  /**
   *  Remove and return the item at the specified point in the list.  Should throw
   *  an error if i lies outside the bounds of the list.
   *  
   *  @param i the index to remove
   *  @return the item removed
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  remove(i) {
    return null;
  }

  /**
   *  Remove and return the first item in the list, or null if the list is empty.
   *  
   *  Nearly equivalent to `remove(0)`
   *  
   *  @return the first item, or null for an empty list
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeFirst() {
    return null;
  }

  /**
   *  Remove and return the last item in the list, or null if the list is empty.
   *  
   *  Nearly equivalent to `remove(length - 1)`
   *  
   *  @return the last item, or null for an empty list
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeLast() {
    return null;
  }

  /**
   *  Remove and return the index of the first instance of the specified item
   *  from the list.  You should use the comparator that the list was initialized with.
   *  
   *  @param item the item to find and remove
   *  @return the index the item held in the list, or -1 if not found
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {
    return -1;
  }

  /*****************
   * Interrogation *
   *****************/
  
  /**
   *  Returns true if the passed item is in the list, or false otherwise.
   *  
   *  @param item the item to search for.
   *  @return boolean if the item is in the list
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  contains(item) {
    return false;
  }

  /**
   *  Return the item at the specified point in the list.  Should throw
   *  an error if i lies outside the bounds of the list.
   *  
   *  @param i the index to find
   *  @return the item at that point in the list.
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek(i) {
    return null;
  }

  /**
   *  Return the first item in the list.
   *  
   *  Almost equivalent to `peek(0)`
   *  
   *  @return the item
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekFirst() {
    return null;
  }

  /**
   *  Return the last item in the list.
   *  
   *  Almost equivalent to `peek(length)`
   *  
   *  @return the item 
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekLast() {
    return null;
  }

  /**
   *  Return the number of items in the list.
   *  
   *  @return the size of the list
   *  @timeComplexity O(1)
   */
  size() {
    return 0;
  }

  /******************
   * Key Algorithms *
   ******************/

  /**
   *  Return all the items in this list in an array.
   *  
   *  @return an array with all the items in the list.
   *  @timeComplexity O(n)
   *  @spaceComplexity O(n)
   */
  toArray() {
    return [];
  }
}

module.exports = SortedArrayList;

