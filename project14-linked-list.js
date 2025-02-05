class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.head = new Node(null);
        this.tail = this.head;
    }
    append(value) { // O(1)
        if (this.head.value === null) {
            this.head.value = value;
        } else {
            this.tail.nextNode = new Node(value);
            this.tail = this.tail.nextNode;
        }
    }
    prepend(value) {
        const newNode = new Node(value);
        newNode.nextNode = this.head;
        this.head = newNode;
    }
    size() {
        let count = 0;
        let node = this.head;
        while (node != null) {
            count++;
            node = node.nextNode;
        }
        return count;
    }
    at(index) {
        let node = this.head;
        for (let i = 0; i < index; i++) {
            if (node === null) {
                return node;
            }
            node = node.nextNode;
        }
        return node;
    }
    pop() {
        let node = this.head;
        if (node.nextNode === null) {
            this.head = new Node(null);
            this.tail = null;
            return;
        }
        while (node.nextNode.nextNode != null) {
            node = node.nextNode;
        }
        const temp = node.nextNode;
        node.nextNode = null;
        return temp;
    }
    contains(value) {
        let node = this.head;
        if (node.value === value) return true;
        while (node != null) {
            if (node.value === value) return true;
            node = node.nextNode;
        }
        return false;
    }
    find(value) {
        let index = 0;
        let node = this.head;
        while (node != null) {
            if (node.value === value) return index;
            node = node.nextNode;
            index++;
        }
        return null;
    }
    toString() {
        let s = "";
        let node = this.head;
        while (node != null) {
            s += `(${node.value}) -> `;
            node = node.nextNode;
        }
        return s + "(null)";
    }
    insertAt(value, index) {
        let node = this.head;
        for (let i = 1; i < index; i++) {
            if (node.nextNode === null) throw new Error("Index out of bounds");
            node = node.nextNode;
        }
        const newNode = new Node(value);
        newNode.nextNode = next;
        node.nextNode = newNode;
        if (newNode.nextNode === null) this.tail = newNode;
    }
    removeAt(index) {
        if (index === 0) {
            this.head = this.head.nextNode;
            if (this.head === null) {
                this.tail = new Node();
                this.head = this.tail;
            }
            return;
        }
        let node = this.head;
        for (let i = 1; i < index; i++) {
            node = node.nextNode;
        }
        if (node.nextNode === null) {
            throw new Error("Index out of bounds");
        }
        node.nextNode = node.nextNode.nextNode;
        if (node.nextNode === null) {
            this.tail = node;
        }
    }
}

// example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString())