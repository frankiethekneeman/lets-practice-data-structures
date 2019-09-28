class LengthTrackingSinglyLinkedListWithTailPointer {
  constructor() {
    this._head = null;
    this._length = 0;
    this._tail = null;
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  insert(i, item) {
    if (!item) {
      throw `${item} is not storeable.`;
    }
    // This case is equivalent to prepend, so just delegate it.
    if (i === 0) {
      return this.prepend(item);
    }
    // This case is equivalent to append, so just delegate it.
    if (i === this._length) {
      return this.append(item);
    }

    // Get the i-1st node - or the node that should be
    // before the new node. This operation is O(n)
    const previous = this._getNthNode(i-1);

    // If we've walked off the end of the array, that's an error.
    if (previous === null) {
      throw `${i} is outside the range of this list.`;
    }

    // Otherwise, the new item goes in right after this one, so make a new
    // node with this node's next as its next, and then replace this node's
    // next with the new node.
    previous.next = {
      item: item,
      next: previous.next
    }
    this._length++;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  append(item) {
    if (!item) {
      throw `${item} is not storeable.`;
    }
    // If the list is empty, the prepend and append are the same, so delegate to it.
    if (this._length === 0) {
      return this.prepend(item);
    }
    // create a new node with no next node, and set it as the current tail's next.
    this._tail.next = {
      item: item,
      next: null
    }
    // then move the tail.
    this._tail = this._tail.next;
    this._length++;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  prepend(item) {
    if (!item) {
      throw `${item} is not storeable.`;
    }
    // Create a new node, with the current head as the next node.
    // then set the new node as the head.
    this._head = {
      item: item,
      next: this._head
    }
    //Must keep track of the tail pointer.
    if (this._head.next === null) {
      this._tail = this._head
    }
    this._length++;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  remove(i) {
    // i === 0 is almost equivalent to removeFirst().
    if (i === 0) {
      // the only difference is that if the list is empty, we should
      // throw an exception.
      if (this._length === 0) {
        throw `${i} is not an index present in this list.`;
      }
      // then delegate.
      return this.removeFirst()
    }
    // Otherwise, find the i-1st item (like in the insert)
    const previous = this._getNthNode(i - 1);
    // the eliminated item will be the next item, taking
    // care that previous might be null as well.
    const eliminated = previous && previous.next;

    // If there's nothing to eliminate, you've walked off the end of the 
    // list
    if (eliminated === null) {
      throw `${i} is not an index present in this list`;
    }

    // Circumvent the eliminated node.
    previous.next = previous.next.next;
    this._length--;
    if (previous.next === null) {
      this._tail = previous;
    }
    return eliminated.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeFirst() {
    // if the list is empty, then return null, you're done!
    if (this._length === 0) {
      return null;
    }
    // Otherwise, replace the current head with its own next, and return the
    // item off the old head.
    const removed = this._head;
    this._head = this._head.next;
    this._length--;
    if (this._length === 0) {
      this.tail = null;
    }
    return removed.item;
  }

  /**
   *  @timeComplexity O(n) in naive implementations - possibly O(1);
   *  @spaceComplexity O(1)
   */
  removeLast() {
    //Return null if the list is empty...
    if (this._length === 0) {
      return null;
    }
    // Otherwise, delegate to the remove function.
    return this.remove(this._length - 1);
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {
    if (this._length === 0) {
      return -1;
    }
    if (this._head.item.equals(item)) {
      this.removeFirst();
      return 0;
    }
    let current = this._head,
      position = 0;
    while(current.next !== null && !current.next.item.equals(item)) {
      position++;
      current = current.next;
    }
    if (current.next === null) {
      return -1;
    }
    current.next = current.next.next;
    this._length--;
    if (current.next === null) {
      this._tail = current;
    }
    return position + 1;
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
    let current = this._head;
    while (current != null) {
      if (current.item.equals(item)) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  peek(i) {
    const node = this._getNthNode(i);
    if (node === null) {
      throw `${i} is outside the bounds of this list.`;
    }
    return node.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekFirst() {
    if (this._length === 0) {
      return null;
    }
    return this._head.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekLast() {
    if (this._length === 0) {
      return null;
    }
    return this._tail.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  size() {
    return this._length;
  }

  /******************
   * Key Algorithms *
   ******************/

  /**
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(log n)
   */
  sort(comparator) {
    // If this list has zero or one items, then it it already sorted and you can return.
    if (this._length <= 1) {
      return;
    }

    this._head = this._sort(this._head, comparator);
    this._tail = this._head;
    // Since we've scrambled this list, it's important to keep the tail
    // pointer up to date.
    while (this._tail !== null && this._tail.next !== null) {
      this._tail = this._tail.next;
    }
  }

  /**
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(n)
   */
  sorted(comparator) {
    // make a list to return.
    const toReturn = new LengthTrackingSinglyLinkedListWithTailPointer();
    // if this is not an empty list...
    let current = this._head;
    while (current !== null) {
      //Because of the tail pointer, append is now an O(1) operation, and we can leverage it.
      toReturn.append(current.item);
      current = current.next;
    }
    toReturn._length = this._length;
    toReturn.sort(comparator);
    return toReturn;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(n)
   */
  toArray() {
    const toReturn = [];
    let current = this._head;
    while (current !== null) {
      toReturn.push(current.item);
      current = current.next;
    }
    return toReturn;
  }

   /**
    *  Private function to get the nth node, or null if no such node exists.
    *  @timeComplexity O(n)
    *  @spaceComplexity O(1)
    */
  _getNthNode(n) {
    // grab the head and keeping track of our 
    // current position
    let current = this._head,
      position = 0;

    // Walk down the list while keeping track of our position.
    // Keep going until we're either at the right place (position === (i-1))
    // or we've walked off the end of the list (current === null)
    while (position < n && current != null) {
      position++;
      current = current.next;
    }

    return current;
  }
      
  /**
   *  The first operation in merge sort is to split the list in half.
   *  
   *  @param node a non-null node at the head of a linked list.
   *  @return the head of a new linked list comprising the last half
   *    of the passed list.  The passed list will be shortened.
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  _splitList(node) {
    // Assume the node is not null, and
    // Initialize two pointers to the passed node.
    let fast = node,
      slow = node;
    // The fast pointer moves twice every tick, and the slow one
    // only once.  We exit the loop the fast node is on the last 
    // or second to last node.
    while (fast.next !== null && fast.next.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
    }
    // At this point, the fast node is at a predictable index, based on the length
    // of the list.  If the length of the list is even, then the fast node is at l-2.
    // otherwise, the fast node is at l-1.
    // The slow node is at fast/2, or floor((l-1)/2).
    // so we can capture the point _after_ the slow node (which is only null in list
    // of length 1) and return it.
    const midpoint = slow.next;
    // But first, we have to break the list in half after the slow node.
    slow.next = null;
    return midpoint;
  };

  /**
   *  After splitting, and recursively sorting, we need to merge.
   *  
   *  @param left the head of a sorted linked list
   *  @param right the head of a sorted linked list
   *  @param comparator a comparator function
   *  @return the head of a new linked list that represents the combined
   *    left and right lists.
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  _merge(left, right, comparator) {
    // Initialize the new list to be passed back, with the smallest
    // item on either left or right.
    let toReturn = null;
    if (comparator(left.item, right.item) <= 0) {
      toReturn = left;
      // be sure to advance your lists when you take from them.
      left = left.next;
    } else {
      toReturn = right;
      right = right.next;
    }
    // curr always points to the last element in the combined
    // list.
    let curr = toReturn;
    // As long as neither left nor right lists are empty...
    while(left !== null && right !== null) {
      // if the smallest item on the left list is smaller than
      // the smallest item on the right list....
      if (comparator(left.item, right.item) <= 0) {
        // Add the first node in the left list to our new list.
        curr.next = left;
        // Advance to the new tail
        curr = curr.next;
        // Advance the left list to its new head.
        left = left.next;
      } else {
        // otherwise, do exactly as above, but to the right list.
        curr.next = right;
        curr = curr.next;
        right = right.next;
      }
    }
    // Either left, or right is null.  If left is not null,
    // add it to the end of the current list.
    if (left !== null) {
      curr.next = left;
    } else {
      curr.next = right;
    }
    // return the initalized head.
    return toReturn;
  };


  /**
   *  Recursive merge sort.
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(logn)
   */
  _sort(node, comparator) {
    // If the list is zero or one units long, it's already sorted.  Return it.
    if (node === null || node.next === null) {
      return node;
    }
    // split list splits the list in half, and returns a pointer to the back half,
    // in O(n) time.
    // We then sort the last half of the list, in O(this) time. - note that we'll 
    // recurse log n times.
    let midpoint = this._sort(this._splitList(node), comparator);
    // and sort the first half of the list, in O(this) time.
    node = this._sort(node, comparator);
    // Then we merge the two, in O(n) time.
    return this._merge(node, midpoint, comparator);
  }
}

module.exports = LengthTrackingSinglyLinkedListWithTailPointer;

