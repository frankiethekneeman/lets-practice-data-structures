class NaiveDoublyLinkedList {

  constructor() {
    this._head = null;
    this._tail = null;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  insert(i, item) {
    if (!item) {
      throw new Error(`${item} is not storable`);
    }
    if (i === 0) {
      return this.prepend(item);
    }
    let position = 0,
      current = this._head;
    while (position < i && current != null) {
      position++;
      current = current.next;
    }
    if (position != i) {
      throw new Error(`${i} is outside the bounds of this list`);
    }
    if (current === null) {
      return this.append(item);
    }
    const newNode = {
      item: item,
      prev: current.prev,
      next: current
    };
    newNode.next.prev = newNode;
    newNode.prev.next = newNode;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  append(item) {
    if (!item) {
      throw new Error(`${item} is not storable`);
    }
    if (this._head === null) {
      return this.prepend(item);
    }
    this._tail = {
      item: item,
      next: null,
      prev: this._tail
    }
    this._tail.prev.next = this._tail;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  prepend(item) {
    if (!item) {
      throw new Error(`${item} is not storable`);
    }
    this._head = {
      item: item,
      next: this._head,
      prev: null
    }
    if (this._head.next === null) {
      this._tail = this._head;
    } else {
      this._head.next.prev = this._head;
    }
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  remove(i) {
    if (this._head === null) {
      throw new Error("Cannot Remove from an empty list.");
    }
    if (i === 0) {
      return this.removeFirst();
    }
    let position = 0,
      current = this._head;
    while (position < i && current != null) {
      position++;
      current = current.next;
    }
    if (position != i) {
      throw new Error(`${i} is outside the bounds of this list`);
    }
    if (current.next === null) {
      return this.removeLast();
    }
    current.prev.next = current.next;
    current.next.prev = current.prev;
    return current.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeFirst() {
    if (this._head === null) {
      return null;
    }
    const toReturn = this._head.item;
    this._head = this._head.next;
    if (this._head === null) {
      this._tail = null;
    } else {
      this._head.prev = null;
    }
    return toReturn;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeLast() {
    if (this._tail === null) {
      return null;
    }
    if (this._tail.prev === null) {
      return this.removeFirst();
    }
    const toReturn = this._tail.item;
    this._tail = this._tail.prev;
    this._tail.next = null;
    return toReturn;
    return null;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {
    if (this._head === null) {
      return -1;
    }
    let current = this._head,
      position = 0;
    while (current !== null && !current.item.equals(item)) {
      current = current.next;
      position++;
    }
    if (current === null) {
      return -1;
    }
    if (position === 0) {
      this.removeFirst();
    } else if (current.next === null) {
      this.removeLast();
    } else {
      current.next.prev = current.prev;
      current.prev.next = current.next;
    }

    return position;
  }

  /*****************
   * Interrogation *
   *****************/
  
  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  contains(item) {
    let current = this._head;
    while (current !== null) {
      if (current.item.equals(item)) return true;
      current = current.next;
    }
    return false;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  peek(i) {
    let current = this._head,
      position = 0;
    while (current !== null && position < i) {
      current = current.next;
      position++;
    }
    if (current === null) {
      throw new Error(`${i} is outside the bounds of this list`);
    }
    return current.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekFirst() {
    return this._head && this._head.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekLast() {
    return this._tail && this._tail.item;
  }

  /**
   *  Return the number of items in the list.
   *  
   *  @return the size of the list
   *  @timeComplexity O(n)
   */
  size() {
    let length = 0,
      current = this._head; 
    while(current !== null) {
      current = current.next;
      length++;
    }
    return length;
  }

  /******************
   * Key Algorithms *
   ******************/

  /**
   *  Sort the list, in place.
   *
   *  @param comparator a function of the style (a, b) => int which compares two items
   *    and returns an integer such that:
   *    if a < b: return < 0
   *    if a = b: return = 0
   *    if a > b: return > 0
   *  @return void
   *  @timeComplexity O(n^2) in the space optimized version,
   *    O(n logn) in the time optimized version
   *  @spaceComplexity O(1) in the space optimized version,
   *    O(n) in the time optimized version
   */
  sort(comparator) {
    this._head = this._mergeSort(this._head, comparator);
    this._tail = this._head;
    while(this._tail !== null && this._tail.next !== null) {
      this._tail = this._tail.next
    }
  }

  _mergeSort(node, comparator) {
    if (node === null || node.next === null) {
      return node;
    }
    const sortedSecondHalf = this._mergeSort(this._split(node), comparator),
      sortedFirstHalf = this._mergeSort(node, comparator);
    return this._merge(sortedFirstHalf, sortedSecondHalf, comparator);
  }

  _split(node) {
    let fast = node,
      slow = node;
    while (fast != null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
    }
    slow.prev.next = null;
    slow.prev = null;
    return slow;
  }
  _merge(left, right, comparator) {
    let head = null;
    if (comparator(left.item, right.item) <=0) {
      head = left;
      left = left.next;
    } else {
      head = right;
      right = right.next;
    }
    let current = head;
    while (left != null && right != null) {
      if (comparator(left.item, right.item) <=0) {
        current.next = left;
        left.prev = current;
        left = left.next;
      } else {
        current.next = right;
        right.prev = current;
        right = right.next;
      }
      current = current.next;
    }
    const rest = (left === null) ? right : left;
    current.next = rest;
    rest.prev = current;
    return head;
    
  }

  /**
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(n)
   */
  sorted(comparator) {
    const toReturn = new NaiveDoublyLinkedList();
    let current = this._head;
    while(current != null) {
      toReturn.append(current.item);
      current = current.next;
    }
    toReturn.sort(comparator);
    return toReturn;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(n)
   */
  toArray() {
    let toReturn = [],
      current = this._head;
    while (current !== null) {
      toReturn.push(current.item);
      current = current.next;
    }
    return toReturn;
  }
}

module.exports = NaiveDoublyLinkedList;

