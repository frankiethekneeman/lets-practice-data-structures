/**
 *  Even though this heap is represented as an array - the tree structure is still there.  We
 *  can see it clearly by labeling the nodes in a tree, starting at 0: 
 *                             0
 *               1                             2
 *       3               4            5                6
 *    7     8         9     10     11     12       13     14
 * 15  16 17 18     19 20 21  22 23  24 25  26   27  28 29  30
 *  
 *  It should be fairly clear to see that each node has a mathematical relationship to its
 *  children - it's left child is at 2p + 1, and it's right child is at 2p + 2.
 *  
 *  Conviently, the relationship is reversible - every node's parent is at floor((c-1)/2).
 */
class ReferenceArrayBinaryHeap {
  
  /**
   */
  constructor(comparator) {
    this._comparator = comparator;
    this._storage = [];
    this._size = 0;

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
      throw new Exception("Cannot store an empty item.");
    }
    this._storage[this._size] = item;
    this._heapUp(this._size);
    this._size++;
  }

  /**
   *  Hmm, you say - looking at this algorithm.  That looks an awful lot like O(n log n)!
   *  since heapdown has worst case log n, and you're calling it n times!
   *  
   *  An astute observation.  Yet I claim this behaviour is actually linear!  And here's how.  First,
   *  we skip about half of the input.  Then, for the remaining inputs, we calculate the
   *  number of maximum swaps:
   *  1/4 of the input has a maximum of 1 swap.
   *  1/8 of the input has a maximum of 2 swaps.
   *  and so on, and so forth, until we get to the root node which actualy has log n maximum swaps,
   *  but is only a single node!  It's not hard to see from this pattern that we get an sum:
   *  1*n/4 + 2 * n/8 + 3 * n/16 + 4 * n/32... and so on and so forth.  We can factor out n and see
   *  the coefficient (1/4 + 1/4 + 3/16 + 1/8 + 5/64 + 3/64 + 7/256...) is hard to calculate, but
   *  almost certainly converging to a scalar value, no matter how many terms you take.
   *  
   *  @timeComplexity O(n+k)
   *  @spaceComplexity O(n + k)
   */
  insertMany(items) {
    if (items.filter((i) => !i).length > 0) {
      throw new Exception("Cannot store an empty item.")
    }
    this._storage = this._storage.slice(0, this._size).concat(items);
    this._size += items.length;
    for (var i = this._calcParent(this._size - 1); i >= 0; i--) {
      this._heapDown(i);
    }
  }

  /************
   * Querying *
   ************/

  /**
   *  @timeComplexity O(1)
   *  @scopeComplexity O(1)
   */
  find() {
    if (this.isEmpty()) {
      throw new Exception("Empty Heap");
    }
    return this._storage[0];
  }

  /**
   *  @timeComplexity O(logn)
   *  @spaceComplexity O(1)
   */
  extract() {
    const toReturn = this.find();
    this._size--;
    this._storage[0] = this._storage[this._size];
    this._heapDown(0);
    return toReturn;
  }

  /**
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  isEmpty() {
    return this._size === 0;
  }
  
  _calcParent(n) {
    return Math.floor((n - 1) / 2);
  }

  _calcLeftChild(n) {
    return 2 * n + 1
  }
  
  _calcRightChild(n) {
    return 2 * n + 2
  }

  _swap(a, b) {
    tmp = this._storage[a];
    this._storage[a] = this._storage[b];
    this._storage[b] = tmp;
  }
  
  /**
   *  Typically started at a leaf node, the heap up process filters a small element up
   *  the heap until it statisfies the heap property.
   *  
   *  @timeComplexity O(log n)
   *  @spaceComplexity O(1)
   */
  _heapUp(n) {
    parent = this._calcParent(n);
    if (this._comparator(this._storage[n], this._storage[parent]) < 0) {
      this._swap(n, parent);
      this._heapUp(parent);
    }
  }

  /**
   *  This is most routinely called on the root during a lead 
   */
  _heapDown(n) {
    leftChild = this._calcLeftChild(n);
    rightChild = this._calcRightChild(n);
    minChild = this._comparator(this._storage[leftChild], this._storage[rightChild]) < 0
      ? leftChild
      : rightChild
    if (this._comparator(this._storage[minChild], this._storage[n]) < 0) {
      this._swap(n, minChild);
      this._heapUp(minChild);
    }

  }
}

module.exports = ReferenceArrayBinaryHeap;
