const getFixedArray = require('../../util/getFixedArray');

/**
 */
class ReferenceSortedArrayList {
  /**
   */
  constructor(comparator, initialCapacity = 10) {
    this._comparator = comparator;
    this._storage = getFixedArray(initialCapacity);
    this._size = 0;
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n).
   */
  insert(item) {
    if (!item) {
      throw new Error(`Cannot insert ${item}`);
    }

    if (this._size === this._storage.length) {
      this._expand();
    }

    //Add this item to the end of the list
    this._storage[this._size] = item;
    //Bubble it into the right position
    //Start at the end
    let i = this._size;
    while (
      //Take care not to run off the beginnint
      i > 0
      //If the item in storage[i] is less than the one before it
      && this._comparator(this._storage[i], this._storage[i-1]) < 0
    ) {
      //Swap them
      const tmp = this._storage[i];
      this._storage[i] = this._storage[i-1];
      this._storage[i-1] = tmp;
      //Track your position in the list
      i--;
    }
    this._size++;
  }

  _expand() {
    const newStorage = getFixedArray(this._size * 2);
    
    for (let i = 0; i < this._size; i++) {
      newStorage[i] = this._storage[i];
    }

    this._storage = newStorage;
  }


  /*********************
   * REMOVAL BEHAVIOUR *
   *********************/

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  remove(i) {
    if (i >= this._size) {
      throw new Error(`${i} is outside the bounds of this list`);
    }
    const toReturn = this._storage[i];
    this._size--;
    for (let index = i; index < this._size; index++) {
      this._storage[index] = this._storage[index + 1];
    }
    return toReturn;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeFirst() {
    if (this._size === 0) {
      return null;
    }
    
    return this.remove(0); // Guaranteed not to throw an exception;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeLast() {
    if (this._size === 0) {
      return null;
    }
    
    return this.remove(this._size - 1); // Guaranteed not to throw an exception;
  }

  /*
   * Convenience function for finding an items index
   */
  _search(item) {
    let i = 0;
    while (
      // Carefull not to run off the edge
      i < this._size
      // While the current index is not our search term...
      && this._comparator(this._storage[i], item) !== 0
    ) {
      // Walk down the list
      i++;
    }
    // Didn't find it!
    if (i === this._size) {
      return -1;
    }
    return i;

  }
  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {
    if (!item) {
      return -1;
    }
    const i = this._search(item);
    if (i !== -1) {
      this.remove(i); //Guaranteed not to throw
    }
    return i;
  }

  /*****************
   * Interrogation *
   *****************/
  
  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  contains(item) {
    return this._search(item) !== -1;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek(i) {
    if (i < 0 || i >=this._size) {
      throw new Error(`${i} is outside the bounds of the list`);
    }
    return this._storage[i];
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekFirst() {
    if (this._size === 0) {
      return null;
    }
    return this.peek(0);
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
    if (this._size === 0) {
      return null;
    }
    return this.peek(this._size - 1);
  }

  /**
   *  Return the number of items in the list.
   *  
   *  @return the size of the list
   *  @timeComplexity O(1)
   */
  size() {
    return this._size;
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
    const toReturn = [];
    for (let i = 0; i < this._size; i++) {
      toReturn[i] = this._storage[i];
    }
    return toReturn;
  }
}

module.exports = ReferenceSortedArrayList;

