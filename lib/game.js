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

    }

}

module.exports = {
    GameBoard
}
