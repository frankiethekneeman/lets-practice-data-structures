/**
 *  Arraylists use arrays as the underlying storage mechanism.  In Javascript, arrays are already
 *  unbounded - so there's not really a lot of upside to an arraylist implementation.  To practice
 *  arraylists as they must be implemented in languages with fixed size arrays, we recommend
 *  leveraging the provided `getArray` method, which uses Object.seal() to fix the length
 *  of the array.
 */
class ReferenceArrayList {

  static getArray(size) {
    const toReturn = new Array();
    for (let i = 0; i < size; i++) {
      toReturn.push(null);
    }
    Object.seal(toReturn);
    return toReturn;
  }

  /**
   */
  constructor(initialCapacity = 10) {
    this._storage = ReferenceArrayList.getArray(initialCapacity);
    this._size = 0;
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n).
   */
  insert(i, item) {
    if (!item) {
      throw `${item} is not storeable.`;
    }
    if (i > this._size || i < 0) {
      throw `${i} is outside the bounds of this list.`;
    }
    // If the storage array is full, you should expand before you try to insert
    // anything.
    if (this._size === this._storage.length) {
      this._expand();
    }
    // It's an array - so you have to shuffle everything past your position down.
    for (let current = this._size; current > i; current--) {
      this._storage[current] = this._storage[current - 1];
    }
    this._storage[i] = item;
    this._size++;
  }

  /**
   *  A private helper to expand internal storage.  Get a new array of twice the size, then
   *  carefully copy everything into it.
   */
  _expand() {
    const newStorage = ReferenceArrayList.getArray(this._storage.length * 2);
    for (let i = 0; i < this._size; i++) {
      newStorage[i] = this._storage[i];
    }
    this._storage = newStorage;
  }

  /**
   *  @timeComplexity O(1) - most of the time.  Possible worst case of O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n)
   */
  append(item) {
    this.insert(this._size, item);
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n).
   */
  prepend(item) {
    this.insert(0, item);
  }

  /*********************
   * REMOVAL BEHAVIOUR *
   *********************/

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  remove(i) {
    if (i < 0 || i >= this._size) {
      throw `${i} lies outside the bounds of this list.`;
    }

    this._size--;
    const toReturn = this._storage[i];
    for (let current = i; current < this._size; current++) {
      this._storage[current] = this._storage[current + 1];
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
    return this.remove(0);
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeLast() {
    if (this._size === 0) {
      return null;
    }
    return this.remove(this._size - 1);
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {
    for (let i = 0; i < this._size; i++) {
      if (this._storage[i].equals(item)) {
        this.remove(i);
        return i;
      }
    }
    return -1;
  }

  /*****************
   * Interrogation *
   *****************/
  
  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  contains(item) {
    for (let i = 0; i < this._size; i++) {
      if (this._storage[i].equals(item)) {
        return true;
      }
    }
    return false;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek(i) {
    if (i < 0 || i >= this._size) {
      throw `${i} lies outside the bounds of this list.`;
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
    return this._storage[0];
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekLast() {
    if (this._size === 0) {
      return null;
    }
    return this._storage[this._size - 1];
  }

  /**
   *  @timeComplexity O(1)
   */
  size() {
    return this._size;
  }

  /******************
   * Key Algorithms *
   ******************/

  /**
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(log n)
   */
  sort(comparator) {
    this._quicksortStorage(0, this._size - 1, comparator);
  }

  /**
   *  Quicksort is a very fast sorting algorithm.  It works by splitting the list in half,
   *  like merge sort, only it splits in "half" across a pivot.
   */
  _quicksortStorage(leftmostIndex, rightmostIndex, comparator) {
    if (leftmostIndex >= rightmostIndex) {
      return; // Can't sort 1 or fewer items
    }
    // Pivot selection can actually be a big deal in quicksort.  Picking one of the endpoints as
    // pivot is usually not great, but is also not really the point of this exercise.
    const pivot = this._storage[leftmostIndex];
    let i = leftmostIndex + 1;
    let j = rightmostIndex;
    while (i < j) {
      // All elements to the right of i which are greater than the pivot are in the right place
      while (i < j && comparator(this._storage[j], pivot) > 0) {
        j--;
      }
      // All elements to the left of j which are less than or equal to the pivot are in the right
      // place
      while (i < j && comparator(this._storage[i], pivot) <= 0) {
        i++;
      }
      // i and j now point to elements that are on the wrong side of each other, so we swap them
      // and repeat.
      this._swapStorage(i, j);
    }
    // At this point, i === j, and we can guarantee that all elements to the left of i are 
    // less than or equal to the pivot.  All elements to the right of i are greater than or
    // equal to the pivot.  We want i to point to the last item that is less than or equal to
    // the pivot.  If i is pointing to an item, that is greater than the pivot, we know 
    // the last item that goes before the pivot is i-1;
    if (comparator(this._storage[i], pivot) > 0 ) {
      i--;
    }
    // now we swap the pivot into the ith place, and we know for sure it doesn't need to move.
    this._swapStorage(leftmostIndex, i);
    // so we can recurse on the left and right halves of the list.
    this._quicksortStorage(leftmostIndex, i - 1, comparator);
    this._quicksortStorage(i + 1, rightmostIndex, comparator);
  }

  _swapStorage(pos1, pos2) {
    if (pos1 === pos2) {
      return;
    }
    const tmp = this._storage[pos1];
    this._storage[pos1] = this._storage[pos2];
    this._storage[pos2] = tmp;
  }

  /**
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(n)
   */
  sorted(comparator) {
    const toReturn =  new ReferenceArrayList(this._size + 1);
    for (let i = 0; i < this._size; i++) {
      toReturn.append(this._storage[i]);
    }
    toReturn.sort(comparator);
    return toReturn;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(n)
   */
  toArray() {
    return this._storage.map(e => e).slice(0, this._size);
  }
}

module.exports = ReferenceArrayList;
