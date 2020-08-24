/**
 */
class ReferenceSortedLinkedList {
  /**
   */
  constructor(comparator) {
    this._comparator = comparator;
    this._head = null;
    this._size = 0;
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  insert(item) {
    if (!item) {
      throw new Error(`Cannot insert ${item}`);
    }
    this._head = {
      item,
      next: this._head
    }
    let curr = this._head;
    //While the current node is bigger than the next node, but is not the last node
    while(curr != null && curr.next != null && this._comparator(curr.item, curr.next.item) > 0) {
      //move tne item down the list
      const tmp = curr.next.item;
      curr.next.item = curr.item;
      curr.item = tmp;
      //follow the new item
      curr = curr.next;
    }
    this._size++;
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
      throw new Error(`${i} is outside the bounds of this list`);
    }

    //Removing the head is special - delegate
    if (i === 0) {
      return this.removeFirst();
    }

    let curr = this._head; 
    for (let count = 0; count < i - 1; count++) {
      curr = curr.next;
    }

    const toReturn = curr.next.item;
    curr.next = curr.next.next;

    this._size--;
    return toReturn;

  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeFirst() {
    if (this._size === 0) {
      return null;
    }
    const toReturn = this._head.item;
    this._head = this._head.next;
    this._size--;
    return toReturn;
  }

  /**
   *  @timeComplexity O(n) - could be O(1) with a doubly linked list and a tail pointer.
   *  @spaceComplexity O(1)
   */
  removeLast() {
    if (this._size === 0) {
      return null;
    }
    return this.remove(this._size - 1);
  }

  //Convenience searching function
  _find(item) {
    if (!item) {
      return -1;
    }
    let curr = this._head;
    let i = 0;
    while (
      curr != null
      && this._comparator(item, curr.item) !== 0
    ) {
      curr = curr.next;
      i++;
    }

    if (curr === null) {
      return -1;
    }
    return i;

  }
  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {
    const i = this._find(item);
    if (i !== -1) {
      this.remove(i);
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
    return this._find(item) !== -1;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  peek(i) {
    if (i < 0 || i >= this._size) {
      throw new Error(`${i} is outside the bounds of this list`);
    }
    let curr = this._head;
    for (let idx = 0; idx < i; idx++) {
      curr = curr.next;
    }
    return curr.item;
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
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekLast() {
    if (this._size === 0) {
      return null;
    }
    return this.peek(this._size-1);
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  size() {
    return this._size;
  }

  /******************
   * Key Algorithms *
   ******************/

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(n)
   */
  toArray() {
    const toReturn = [];
    let curr = this._head;
    while(curr !== null) {
      toReturn.push(curr.item);
      curr = curr.next;
    }
    return toReturn;
  }
}

module.exports = ReferenceSortedLinkedList;
