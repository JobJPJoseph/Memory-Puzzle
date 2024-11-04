class Value {

    constructor(value) {
      this.value = value;
      this.next = null;
    }

}

class MySet {

    constructor(numBuckets = 8) {
        // Initialize your buckets here
        // Your code here
        this.count = 0;
        this.length = 0;
        this.capacity = numBuckets;
        this.data = new Array(this.capacity).fill(null);
        this.loadFactor = 0.7;
    }

    hash(value) { // Simple hash algorithm
        // assume value is a string
        let hashValue = 0;

        for (let i = 0; i < value.length; i++) {
            hashValue += value.charCodeAt(i);
        }

        return hashValue;
    }

    hashMod(value) {
      // Get index after hashing
      return this.hash(value) % this.capacity;
    }

    insert(value) {
      // Your code here
      if ((this.length / this.data.length) >= this.loadFactor) this.resize();
      let index = this.hashMod(value);
      let node = new Value(value);

      if (this.data[index] === null) {
        this.enqueue(this.data, index, node);
        this.count++;
        this.length++;
        return;
      }

      let result = this.searchNode(this.data, index, node.value);

      if (!result) {
        this.enqueue(this.data, index, node);
        this.count++;
        return;
      } else {
        // We need to reject here
        // throw new Error('Key is already set');
        return false;
      }

    }

    has(value) {
      let index = this.hashMod(value);

      if (this.data[index] === null) {
        return false;
      }

      let result = this.searchNode(this.data, index, value);

      if (!result) {
        return false;
      } else {
        return true;
      }

    }

    searchNode(data, index, value) {
      let currentNode = data[index];

      while(currentNode) {
        if (currentNode.value === value) {
          return currentNode;
        }

        currentNode = currentNode.next;
      }

      return undefined;
    }

    enqueue(data, index, node) { // FiFO
        node.next = data[index];
        data[index] = node;
    }

    read(value) {
      // Your code here
      let index = this.hashMod(value);

      if (this.data[index] === null) return undefined;
      if (this.data[index].value === value) return this.data[index].value;

      let result = this.searchNode(this.data, index, value);

      if (!result) {
        return result; // undefined
      } else {
        return result.value;
      }

    }

    resize() {
      // Your code here
      this.capacity *= 2;
      let newData = new Array(this.capacity).fill(null);

      for (let i = 0; i < this.data.length; i++) {
        let node = this.data[i];

        if (node) {

          while(node) {
            let index = this.hashMod(node.value); // Here was the issue
            let newNode = new Value(node.value);
            this.reinsert(newData, index, newNode);
            node = node.next;
          }

        }

      }

      this.data = newData;
    }

    reinsert(newData, index, node) {
      if (newData[index] === null) {
        this.enqueue(newData, index, node);
        return;
      }

      this.enqueue(newData, index, node);
    }

    delete(value) {
      // Your code here
      let index = this.hashMod(value);
      if (this.data[index] === null) return 'Value not found';

      if (this.data[index].value === value) {
        this.data[index] = this.data[index].next;
        this.count--;
        return;
      }

      // We need to find node then
      let result = this.findNodeMinusOne(this.data, index, value);

      if (typeof result === 'string') {
        return result;
      } else {
        this.dequeue(result);
      }

    }

    findNodeMinusOne(data, index, value) {
      let currentNode = data[index];

      while(currentNode.next !== null) {
        if (currentNode.next.value === value) {
          return currentNode;
        }

        currentNode = currentNode.next;
      }

      return (currentNode.value === value) ? currentNode : 'Key not found';
    }

    dequeue(node) {

      if (node.next.next) {
        let temp = node.next.next;
        node.next = temp;
      } else {
        let temp = node.next;
        node = temp;
      }

      this.count--;
    }

}

module.exports = { MySet };
