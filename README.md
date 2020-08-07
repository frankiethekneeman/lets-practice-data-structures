# Datastructures Matter
Maybe.  I mean, I dunno - at this point we're all pulling standard library implementations
of all of these things like 90% of the time.  But they do matter in interviews. And if you're
prepping for an interview, you should practice them.  Your interviewer wants you to be able
to rattle off a simple linked list in 10 minutes so you can get on to actually solving the problem!
But how?  Do you read a bunch of articles about them?  Maybe code one up in your free time?
How will you know if you've done enough?  How will you know if you're doing it right?  Fast enough?

This.  This is how you will know.  Use TDD to implement your things.

## How to use
Each of the directories in `packages` contains a series of skeleton implementations under `src`.
Fill out the implementations, then run `npm test` to test them.  You should get a nice output that
opens in your browser to tell you which tests you've passed and failed.  Keep going until you see
all greens! If you get stuck, check out the reference implementations in `lib`.

## Order
If you're new, start with Lists.  Not only because it's a good place to start, but also because
it's the only available datastructure currently.

## Datastructures Available and Planned

### Lists
- [x] Stack
- [x] Queue
- [x] ArrayList
- [x] SinglyLinkedList
- [x] DoublyLinkedList
- [ ] SortedLinkedList
- [ ] SortedArrayList

### Trees
- [ ] MinHeap
- [ ] MaxHeap
- [ ] BinarySearchTree
- [ ] RedBlackTree
- [ ] AVLTree

### Sets
- [ ] HashSet
- [ ] TreeSet

### Maps
- [ ] HashMap
- [ ] TreeMap

### Graphs
- [ ] WeightedGraph
- [ ] DirectedAcyclicGraph

## Contributing
Please do!  Add your reference implementations to the `lib` folders, but keep in mind that this is
an educational repository.  Please be verbose with your implementations and your comments - long
and clear variable and function names are preferred.  Add your reference implementations to the
appropriate tests and use `npm run test-reference-impls`.
