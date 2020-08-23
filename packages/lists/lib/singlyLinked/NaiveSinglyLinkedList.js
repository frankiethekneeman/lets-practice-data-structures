class NaiveSinglyLinkedList {
  constructor() {
    this._head = null;
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
      throw new Error(`${item} is not storeable.`);
    }
    // This case is equivalent to prepend, so just delegate it.
    if (i === 0) {
      return this.prepend(item);
    }

    // Get the i-1st node - or the node that should be
    // before the new node. This operation is O(n)
    const previous = this._getNthNode(i-1);

    // If we've walked off the end of the array, that's an error.
    if (previous === null) {
      throw new Error(`${i} is outside the range of this list.`);
    }

    // Otherwise, the new item goes in right after this one, so make a new
    // node with this node's next as its next, and then replace this node's
    // next with the new node.
    previous.next = {
      item: item,
      next: previous.next
    }
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  append(item) {
    if (!item) {
      throw new Error(`${item} is not storeable.`);
    }
    // If the list is empty, the prepend and append are the same, so delegate to it.
    if (this._head === null) {
      return this.prepend(item);
    }
    //Otherwise, just walk down the list until the next node is null
    let current = this._head;
    while(current.next !== null) {
      current = current.next;
    }
    // create a new node with no next node, and set it as the current node's next.
    current.next = {
      item: item,
      next: null
    }
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  prepend(item) {
    if (!item) {
      throw new Error(`${item} is not storeable.`);
    }
    // Create a new node, with the current head as the next node.
    // then set the new node as the head.
    this._head = {
      item: item,
      next: this._head
    }
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
      if (this._head === null) {
        throw new Error(`${i} is not an index present in this list.`);
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
      throw new Error(`${i} is not an index present in this list`);
    }

    // Circumvent the eliminated node.
    previous.next = previous.next.next;
    return eliminated.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeFirst() {
    // if the list is empty, then return null, you're done!
    if (this._head === null) {
      return null;
    }
    // Otherwise, replace the current head with its own next, and return the
    // item off the old head.
    const removed = this._head;
    this._head = this._head.next;
    return removed.item;
  }

  /**
   *  @timeComplexity O(n) in naive implementations - possibly O(1);
   *  @spaceComplexity O(1)
   */
  removeLast() {
    // if the list is empty, then return null
    if (this._head === null) {
      return null;
    }
    // if the list has one item, delegate to removing the first item
    if (this._head.next === null) {
      return this.removeFirst();
    }
    // now, get the penultimate node in the list.
    let current = this._head;
    while(current.next.next !== null) {
      current = current.next;
    }
    // Track the eliminated node
    const eliminated = current.next;
    // eliminate it 
    current.next = null;
    // and return the item.
    return eliminated.item;

  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {
    if (this._head === null) {
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
      throw new Error(`${i} is outside the bounds of this list.`);
    }
    return node.item;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekFirst() {
    if (this._head === null) {
      return null;
    }
    return this._head.item;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  peekLast() {
    if (this._head === null) {
      return null;
    }
    let current = this._head;
    while (current.next !== null) {
      current = current.next;
    }
    return current.item;
  }

  /**
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  size() {
    let size = 0,
      current = this._head;
    while (current !== null) {
      current = current.next;
      size++;
    }
    return size;
  }

  /******************
   * Key Algorithms *
   ******************/

  /**
   *  @timeComplexity varies
   *  @spaceComplexity varies
   */
  sort(comparator) {
    // If this list has zero or one items, then it it already sorted and you can begin.
    if (this._head === null || this._head.next === null) {
      return;
    }
    /**
     *  This version of the sort uses insertion sort.  It does not recurse,
     *  and only requires two additional pointers.
     *  @timeComplexity O(n^2)
     *  @spaceComplexity O(1)
     */
    const spaceOptimized = (function() {
      // Start by creating a new, sorted list with just the first item in the current list.
      let newHead = this._head;
      // This also means we pop our old head off the list.
      this._head = this._head.next;
      // And ensure it has no next.
      newHead.next = null;

      // While the old, unsorted list is not empty,
      while (this._head !== null) {
        // Pop off the first item, for insertion into the new sorted list.
        const toInsert = this._head;
        this._head = this._head.next;
        toInsert.next = null
        // If it goes before the current head, you can just do a simple replacement
        // to put it there.
        if (comparator(toInsert.item, newHead.item) <= 0) {
          toInsert.next = newHead;
          newHead = toInsert;
        } else {
          // Otherwise, we need to find the LAST element smaller than the new element, and
          // insert this node after that node.
          
          // So grab the head of the sorted list, which we know is smaller than the current
          // item.
          let current = newHead;
          // walk the list until either there are no future objects, or the new node would
          // be put before the next node.
          while(newHead.next !== null && comparator(toInsert.item, current.next.item) > 0) {
            current = current.next;
          }
          // Then do a fairly straightforward insert.
          toInsert.next = current.next;
          current.next = toInsert;
        }
      }
      // finally, replace the head with the new, sorted list.
      this._head = newHead;
    }).bind(this);

    /**
     *  This version is time optimized, but not space optimized.  It can use any given
     *  sort.  The key insight is that copying to an array is linear time, so we
     *  can do it freely without compromising the time complexity, since all
     *  sorting algorithms are worse than linear.
     *  
     *  @timeComplexity O(n logn)
     *  @spaceComplexity O(n)
     */
    const timeOptimized = (function() {
      // If space is not a concern, do this the easy way.
      let index = 0,
        tmp = [];
      // Copy the list into an array
      while (this._head !== null) {
        tmp[index++] = this._head.item;
        this._head = this._head.next;
      }
      // Sort the array 
      //   * If you're in an algorithms interview, this likely won't fly.  Get away
      //     with it by writing a callout to a private function like sortArr(arr), then
      //     memorize a good sorting algo and implement it in the private function.
      tmp.sort(comparator);

      // Then eat everything off the array.
      while (index > 0) {
        this._head = {
          item: tmp[--index],
          next: this._head
        }
      }
    }).bind(this);

    /**
     *  This is a midpoint between the two - it's a bit less space efficient than the 
     *  iterative version, because of the recursion, but it's significantly more
     *  time efficient.
     * V
     *  @timeComplexity O(n logn)
     *  @spaceComplexity O(log n)
     */
    const recursive = (function() {
      
      /**
       *  The first operation in merge sort is to split the list in half.
       *  
       *  @param node a non-null node at the head of a linked list.
       *  @return the head of a new linked list comprising the last half
       *    of the passed list.  The passed list will be shortened.
       *  @timeComplexity O(n)
       *  @spaceComplexity O(1)
       */
      const splitList = function(node) {
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
      const merge = function(left, right, comparator) {
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
       *  @timeComplexity O(n logn)
       *  @spaceComplexity O(logn)
       */
      const sort = function(node, comparator) {
        // If the list is zero or one units long, it's already sorted.  Return it.
        if (node === null || node.next === null) {
          return node;
        }
        // split list splits the list in half, and returns a pointer to the back half,
        // in O(n) time.
        // We then sort the last half of the list, in O(this) time. - note that we'll 
        // recurse log n times.
        let midpoint = sort(splitList(node), comparator);
        // and sort the first half of the list, in O(this) time.
        node = sort(node, comparator);
        // Then we merge the two, in O(n) time.
        return merge(node, midpoint, comparator);
      }

      this._head = sort(this._head, comparator);
    }).bind(this);

    recursive();
  }

  /**
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(n)
   */
  sorted(comparator) {
    // make a list to return.
    const toReturn = new NaiveSinglyLinkedList();
    // if this is not an empty list...
    if (this._head !== null) {
      // copy our list into the other
      toReturn._head = {
        item: this._head.item,
        next: null
      }
      let curr = this._head.next,
        last = toReturn._head;
      while (curr !== null) {
        last.next = {
          item: curr.item,
          next: null
        }
        last = last.next;
        curr = curr.next;
      }
    }
    // Count on your sort to be efficient, or implement it yourself.
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
}

module.exports = NaiveSinglyLinkedList;
