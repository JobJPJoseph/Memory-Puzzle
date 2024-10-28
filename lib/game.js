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

    printGameBoard() {
        let result = [];
        let gridValues = this.grid.values();
        let count = 0;
        let subArr = [];

        for (let i = 0; i < gridValues.length; i++) {
            let elem = gridValues[i];

            if (count === 4) {
                result.push(subArr);
                subArr = [];
                count = 0;
            }

            subArr.push(elem);
            count++;
        }

        return console.log(result.map(row => {
            return row.join(' | ');
        }).join("\n" + "--------------" + "\n"));
    }

    assignCoordinate(arg) {
        let inpt = Screen.grid.read(arg);

        if (this.grid.read(arg) === "-") {
            this.grid.insert(arg, inpt);
        } else {
            this.grid.insert(arg, "-");
        }
    }

}

module.exports = {
    GameBoard
}
