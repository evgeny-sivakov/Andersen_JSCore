class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(capacity = 10) {
    this.top = null;
    this.length = 0;
    this.capacity = capacity;
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Ошибка!');
    }

    const capacity = iterable.length;
    const stack = new Stack(capacity);

    for (const item of iterable) {
      stack.push(item);
    }

    return stack;
  }

  push(element) {
    if (this.length === this.capacity) {
      throw new Error('Ошибка!');
    }

    const newNode = new Node(element);

    newNode.next = this.top;
    this.top = newNode;
    this.length += 1; 
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Ошибка!');
    }

    const popped = this.top;

    this.top = popped.next;
    this.length -= 1;

    return popped;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.top;
  }

  isEmpty() {
    return this.length === 0;
  }

  toArray() {
    return this.items;
  }
}
