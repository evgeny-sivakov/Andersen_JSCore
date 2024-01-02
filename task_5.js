class Stack {
    constructor(capacity = 10) {
        this.items = [];
        this.top = 0;
        this.capacity = capacity;
    }

    static fromIterable(iterable) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error('Ошибка!')
        }

        const capacity = iterable.length;
        const stack = new Stack(capacity);

        for (const item of iterable) {
            stack.push(item);
        }

        return stack;
    }

    push(element) {
        if (this.top === this.capacity) {
            throw new Error('Ошибка!')
        }

        this.items[this.top] = element;
        this.top = this.top + 1;

        return element;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Ошибка!')
        }
        
        const poped = this.items[this.top];

        delete this.items[this.top - 1];
        this.top = this.top - 1;

        return poped;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items[this.top - 1];
    }

    isEmpty() {
        return this.top === 0;
    }

    toArray() {
        return this.items;
    }
}