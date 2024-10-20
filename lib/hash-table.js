class KeyValuePair {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.next = null;
    }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

    constructor(numBuckets = 8) {
      // Initialize your buckets here
      // Your code here
      this.count = 0;
      this.length = 0;
      this.capacity = numBuckets;
      this.data = new Array(this.capacity).fill(null);
      this.loadFactor = 0.7;
    }

    hash(key) { // Simple hash algorithm
      let hashValue = 0;

      for (let i = 0; i < key.length; i++) {
        hashValue += key.charCodeAt(i);
      }

      return hashValue;
    }

    hashMod(key) {
      // Get index after hashing
      return this.hash(key) % this.capacity;
    }

    insert(key, value) {
      // Your code here
      if ((this.length / this.data.length) >= this.loadFactor) this.resize();
      let index = this.hashMod(key);
      let node = new KeyValuePair(key, value);

      if (this.data[index] === null) {
        this.enqueue(this.data, index, node);
        this.count++;
        this.length++;
        return;
      }

      let result = this.searchNode(this.data, index, node.key);

      if (!result) {
        this.enqueue(this.data, index, node);
        this.count++;
      } else {
        result.value = node.value
      }

    }

    has(key) {
      let index = this.hashMod(key);

      if (this.data[index] === null) {
        return false;
      }

      let result = this.searchNode(this.data, index, key);

      if (!result) {
        return false;
      } else {
        return true;
      }

    }

    searchNode(data, index, key) {
      let currentNode = data[index];

      while(currentNode) {
        if (currentNode.key === key) {
          return currentNode;
        }

        currentNode = currentNode.next;
      }

      return undefined;
    }

    enqueue(data, index, node) {
      node.next = data[index];
      data[index] = node;
    }

    read(key) {
      // Your code here
      let index = this.hashMod(key);

      if (this.data[index] === null) return undefined;
      if (this.data[index].key === key) return this.data[index].value;

      let result = this.searchNode(this.data, index, key);

      if (!result) {
        return result;
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
            let index = this.hashMod(node.key);
            let newNode = new KeyValuePair(node.key, node.value);
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

    delete(key) {
      // Your code here
      let index = this.hashMod(key);
      if (this.data[index] === null) return 'Key not found';

      if (this.data[index].key === key) {
        this.data[index] = this.data[index].next;
        this.count--;
        return;
      }

      // We need to find node then
      let result = this.findNodeMinusOne(this.data, index, key);

      if (typeof result === 'string') {
        return result;
      } else {
        this.dequeue(result);
      }

    }

    findNodeMinusOne(data, index, key) {
      let currentNode = data[index];

      while(currentNode.next !== null) {
        if (currentNode.next.key === key) {
          return currentNode;
        }

        currentNode = currentNode.next;
      }

      return (currentNode.key === key) ? currentNode : 'Key not found';
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

    keys() {
      let result = [];

      for (let i = 0; i < this.data.length; i++) {
        let node = this.data[i];

        if (node) {

          while(node) {
            result.push(node.key);
            node = node.next;
          }

        }

      }

      return result;
    }

    values() {
      let result = [];

      for (let i = 0; i < this.data.length; i++) {
        let node = this.data[i];

        if (node) {

          while(node) {
            result.push(node.value);
            node = node.next;
          }

        }

      }

      return result;
    }

    pairs() {
      let result = [];

      for (let i = 0; i < this.data.length; i++) {
        let node = this.data[i];

        if (node) {

          while(node) {
            result.push([node.key, node.value]);
            node = node.next;
          }

        }

      }

      return result;
    }

}

module.exports = {
    HashTable
}
