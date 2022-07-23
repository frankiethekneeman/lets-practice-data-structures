/**
 *  This is... not the simplest way to build a binary heap.  But it is possible, and if your brain
 *  is shaped this way, then it may be a good starting point for understanding the concept.
 *  
 *  Keep in mind that a binary heap has two properties:
 *    (1) It is always a maximally full binary tree - filling from one direction to the other,
 *        one layer at a time.  In this implementation, we fill left to right.
 *    (2) Each node in the tree carries a value that is less than or equal to all of its
 *        descendents.
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class ReferenceOOBinaryHeap {
  
  /**
   */
  constructor(comparator) {
    this._comparator = comparator
    this._root = null
    this._size = 0
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  @timeComplexity O(log n) for simple implementations.  Complex implementations allow O(1)
   *  @spaceComplexity O(1)
   */
  insert(item) {
    if (!item) {
      throw new Exception("This item cannot be stored");
    }
    const node = new Node(item);
    if (this._size === 0) {
      this._root = node;
    } else {
      //Calculate directions!
      this._add(this._root, node, this._calcDirectionsToNode(this._size + 1))
    }
    this._size++;
  } 

  /**
   *  The size that the heap will be _after_ an insertion (or the size that it is
   *  before a removal), conveniently
   *  tells us where to put the incoming node.  If we translate the number
   *  into binary, then digits after the most significant 1 tells wether to
   *  go Left (0), or right (1).  For instance.  If the current size of the
   *  heap is 11, then the heap should look like:
   *                  1
   *           2                3
   *      4         5        6      7
   *    7   9    10   11   x
   *  with the insertion point at `x`.  The Path to get to x, we can see, is
   *  (starting from the root at 1)  RIGHT to get to 3, then LEFT to get to 
   *  6, then LEFT to get to x. The binary representations of 12 is
   *
   *  0000 1100
   *  
   *  counting after the most significant `1`, we get a matching 1 (RIGHT),
   *  0 (LEFT), 0 (LEFT).  In order to calculate this path efficiently, we do
   *  so by right shifting the number and checking the least significant bit,
   *  pushing onto a stack as we go:
   *
   *  our first iteration, the least signficant bit is zero, so we push LEFT
   *  onto the stack.  Then we right shift to get 00000110 - 6.  Again, the LSB
   *  is 0, so we push LEFT onto the stack.  Right shift to 00000011 (3).  This
   *  time, the LSB is 1, so we push RIGHT onto the stack.  We now have a stack
   *  which will pop RIGHT, LEFT, LEFT, and are ready to insert.
   *  
   *  @timeComplexity O(log n)
   *  @spaceComplexity O(1)
   */
  _calcDirectionsToNode(n) {
      var directions = null;
      while (n > 1) {
        directions = {
          dir: (n & 1) ? "right" : "left",
          next: directions,
        }
        n = n >> 1;
      }
      return directions;
  }

  _add(root, toAdd, directions) {
    if (root[directions.dir] !== null) {
      this._add(root[directions.dir], toAdd, directions.next);
    } else {
      root[directions.dir] = toAdd;
    }
    // Now that the node has been added, we need to maintain the heap property
    if (this._comparator(root.value, root[directions.dir].value) > 0) {
      //the root node is too large compared to the added node, so just swap them:
      const tmp = root.value;
      root.value = root[directions.dir].value;
      root[directions.dir].value = tmp;
    }
  }

  /**
   *  @timeComplexity O(k log(n+k))
   *  @spaceComplexity O(k)
   */
  insertMany(items) {
    items.forEach((i) => {
      this.insert(i);
    })
  }

  /************
   * Querying *
   ************/

  /**
   *  @timeComplexity O(1)
   *  @scopeComplexity O(1)
   */
  find() {
    if (this._size === 0) {
      throw new Exception("Empty Heap");
    }
    return this._root.value;
  }

  /**
   *  @timeComplexity O(logn)
   *  @spaceComplexity O(1)
   */
  extract() {
    if (this._size == 0) {
      throw new Exception("Empty Heap");
    }
    const toReturn = this._root.value;
    if (this._size == 1) {
      this._root = null;
    } else {
      const removed = this._remove(this._root, this._calcDirectionsToNode(this._size));
      this._root.value = removed.value;
      this._filterDown(this._root);
    }
    this._size--;
    return toReturn;
  }

  _remove(node, directions) {
    if (directions.next !== null) {
      return this._remove(node[directions.dir], directions.next);
    }
    const toReturn = node[directions.dir];
    node[Directions.dir] = null;
    return toReturn;
  }

  _filterDown(node) {
    if(node.left == null) {
      return  //No children!
    }
    const minChild = (node.right == null || this._comparator(node.left.value, node.right.value) <= 0)
      ? "left"
      : "right";
    if (this._comparator(node[minChild].value, node.value) < 0) {
      const tmp = node[minChild].value
      node[minChild].value = node.value
      node.value = tmp;
    }
    this._filterDown(node[minChild])
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
    return this._size == 0;
  }
}

module.exports = ReferenceOOBinaryHeap
