# Lists

Lists are one dimensional, *unbounded* datastructures that maintain the sequence of things
added to them.  Most lists let the user define order - but some maintain a sorted order for the
user.

Lists do not maintain uniqueness - they are the most simplistic of Data Structures.

## Recommended Order:
- [ ] Stack
- [ ] Queue
- [ ] ArrayList
- [ ] SinglyLinkedList
- [ ] DoublyLinkedList
- [ ] SortedArrayList
- [ ] SortedLinkedList

## Linked Lists
Linked Lists are centered on the concept of the `Node`.  The node holds a pointer to the stored 
object.  It may also hold a pointer to another node in the list.  This means that by holding
a single node pointer in memory, the entire list may be accessed (eventually) without holding empty
memory.

### Singly Linked
Singly Linked Linked Lists are the most basic form of linked list - each node points to the next in
the list. The last node, of course, points to no next node.

### Doubly Linked
Doubly Linked Lists, like Singly Linked Lists, have nodes which hold a pointer to the next node of
the list.  The nodes of a doubly linked list _also_ maintain a pointer to the previous node in
the list.  This means more pointer management overhead, but means that traversal can go in either
direction.

## ArrayLists
ArrayLists use arrays as the underlying mechanism of storage.  This is not particularly impressive
in Javascript, but in languages which require that Arrays be of a fixed size, they can give unbounded
storage for amortized constant time insert.  There's some memory overhead, but access becomes
constant time as well.

This data structure is included here for completeness of practice, not for use in Javascript.

## Stacks
Stacks are lists with a limited access pattern:  LIFO (Last in, First out).  As users can only access
one element at a time, you can guarantee constant time access - as well constant time inserts.

Stacks can be implemented with ArrayLists as well as with Linked Lists.

## Queues
Queues are also lists with a limited access pattern: FIFO (First in, First out). Just as with stacks,
knowing the user's access pattern gives the ability to guarantee constant time access.

Queus can be implemented with ArrayLists as well as with Linked Lists.

## Sorted Lists
Maintaining a sorted list is not the best way to maintain a sort order in your data.  However,
understanding the struggle of maintaining sorted lists will give appreciation for other data
structures which do this job better.
