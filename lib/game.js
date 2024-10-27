const { Screen } = require('../lib/screen');
const { HashTable } = require('./hash-table');

class GameBoard {

    constructor() {
        Screen.fillCoordinates();
        Screen.fillGrid();
        this.grid = new HashTable();
        this.fillGrid();

    }

    fillGrid() {

        for( let i = 0; i < Screen.grid.data.length; i++) {
            let node = Screen.grid.data[i];

            if (node) {

                while (node) {
                    this.grid.insert(node.key, '-');

                    node = node.next;
                }

            }
        }


    }

    generateHashTable() {
        let hashTable = new HashTable();

        for (let i = 0; i < this.grid.data.length; i++) {
            let node = this.grid.data[i];

            if (node) {

                while(node) {
                    if (node.value === '-') hashTable.insert(node.key, node.value);
                    node = node.next;
                }
            }
        }

        return hashTable;
    }

}

module.exports = {
    GameBoard
}
