const { Screen } = require('../lib/screen');
const { MySet } = require('./mySet');
const { HashTable } = require('./hash-table');
const { HumanPlayer } = require('./humanPlayer');
const { ComputerPlayer } = require('./computerPlayer');

class GameBoard {

    constructor() {
        Screen.fillCoordinates();
        Screen.fillGrid();
        this.grid = new HashTable();
        this.fillGrid();
        this.human = new HumanPlayer;
        this.computer = new ComputerPlayer;
        this.players = [ this.human, this.computer ];
        this.recentInputs = new HashTable();
        this.gridLength = this.grid.count;
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
        this.recentInputs.insert(arg, inpt);

        if (this.grid.read(arg) === "-") {
            this.grid.insert(arg, inpt);
        } else {
            this.grid.insert(arg, "-");
        }
    }

    addPoints(obj) {
        obj.points += 5;
    }

    currentPlayer() {
        return this.players[0];
    }

    rotate() {
        [ this.players[0], this.players[1] ] = [ this.players[1], this.players[0] ];
    }

    adjustGridLength() {
        if (!this.gridLength) return 0;
        this.gridLength -= 2;
    }

    isWinner() {
        if (this.human.points > this.computer.points) return `You Win!!!`;
        if (this.human.points <= this.computer.points) return `You Lose!!!`;
        return `Its a Tie!!!`;
    }

    resetCache() {
        this.recentInputs = new HashTable();
    }

    isMatching() {
        let val = this.recentInputs.values();
        return (val[0] === val[1]);
    }

    revert() {
        let keys = this.recentInputs.keys();

        for (let i = 0; i < keys; i++) {
            let coordinate = keys[i];

            this.assignCoordinate(coordinate);
        }

    }

    async playRound(obj) {
        console.clear();
        this.printGameBoard();
        let result = await obj.getInput(this.generateHashTable());
        this.assignCoordinate(result);
        console.clear();
        this.printGameBoard();
    }

    async run() {

        while(this.gridLength) {

            for (let i = 0; i < 2; i++) {
                await this.playRound(this.currentPlayer());
            }

            if(!this.isMatching()) {
                this.revert();
            } else {
                this.adjustGridLength;
            }

            this.resetCache();
            this.rotate();
        }

        return this.isWinner();
    }

}

module.exports = {
    GameBoard
}
