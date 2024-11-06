const { Screen } = require('./screen');
const { HashTable } = require('./hash-table');
const { HumanPlayer } = require('./humanPlayer');
const { ComputerPlayer } = require('./computerPlayer');

class GameBoard {

    constructor() {
        // Screen.fillAlphabetSet();
        // Screen.fillCoordinateArray();
        // Screen.fillGrid();
        // Was removed from constructor because of repeat calls

        this.grid = new HashTable();
        this.fillGrid();
        this.human = new HumanPlayer;
        this.computer = new ComputerPlayer;
        this.players = [ this.human, this.computer ];
        this.recentInputs = new HashTable();
        this.gridLength = this.grid.count;
    }

    fillGrid() {
        const rowMax = 6;
        const colMax = 4;

        for (let i = 0; i < rowMax; i++) {

            for (let j = 0; j < colMax; j++) {
                let coordinate = JSON.stringify({ row: i, column: j });
                this.grid.insert(coordinate, "-");
            }

        }


    }

    generateObject() {
        let rowMax = 6;
        let colMax = 4;
        let obj = {};

        for (let i = 0; i < rowMax; i++) {

            for (let j = 0; j < colMax; j++) {
                let coordinate = JSON.stringify({ row: i, column: j });

                if (this.grid.read(coordinate) === "-" ) obj[coordinate] = "-";
            }

        }

        return obj;
    }

    printGameBoard() {
        let result = [];

        for (let i = 0; i < 6; i++) {
            let subArr = [];

            for (let j = 0; j < 4; j++) {
                let coordinate = JSON.stringify({ row: i, column: j });
                let val = this.grid.read(coordinate);

                subArr.push(val);
            }

            result.push(subArr);
        }

        console.clear(); // Finish specs before changing back!

        return console.log(result.map(row => {
            return row.join(' | ');
        }).join("\n" + "--------------" + "\n"));
    }

    assignCoordinate(arg) {
        let inpt = this.findCoordinate(arg);
        this.recentInputs.insert(arg, inpt);

        if (this.grid.read(arg) === "-") {
            this.grid.insert(arg, inpt);
        } else {
            this.grid.insert(arg, "-");
        }
    }

    findCoordinate(arg) {
        for (let i = 0; i < Screen.gridHashTable.data.length; i++) {
            let node = Screen.gridHashTable.data[i];

            if (node) {

                while (node) {
                    if (node.value.includes(arg)) return node.key; // Letter

                    node = node.next;
                }

            }

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
        if (this.gridLength === 0) return 0;
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

        for (let i = 0; i < keys.length; i++) {
            let coordinate = keys[i];

            this.assignCoordinate(coordinate);
        }

    }

    async playRound(obj) {
        let result = await obj.getInput(this.generateObject());
        this.assignCoordinate(result);
    }

    async run() {
        this.printGameBoard();

        let play = async () => {
            for (let i = 0; i < 2; i++) {
                await this.playRound(this.currentPlayer());
                this.printGameBoard();
                await delay(2000);
            }

            if(this.isMatching()) {
                this.adjustGridLength();
                this.addPoints(this.currentPlayer());
            } else {
                this.revert();
                this.printGameBoard();
                await delay(2000);
            }

            this.resetCache();
            this.rotate();
        }

        const delay = ms => new Promise(resolve => {
           setTimeout(resolve, ms);
        });

        while(this.gridLength) {
            await play();
            console.log('Switching Turns')
            await delay(2500);
            this.printGameBoard();
        }

        return console.log(this.isWinner());
    }

}

class ImportFileError extends Error {
    constructor(filePath, message = 'import file error') {
        super(message);
        this.name = "ImportFileError";
        this.filePath = filePath;
    }
}

try {

    function importFiles(path) {

        let listOfFiles = {
            screen: '../lib/screen',
            hashTable: '../lib/hash-table',
            computerPlayer: '../lib/computerPlayer',
            HumanPlayer: '../lib/humanPlayer',
        }

        let paths = Object.values(listOfFiles);

        let validPath = false;

        if (paths.includes(path)) validPath = path;

        if (!validPath) {
            throw new ImportFileError(path);
        }

    }

    importFiles('../lib/screen');
    importFiles('../lib/computerPlayer');
    importFiles('../lib/humanPlayer');
    importFiles('../lib/hash-table');

    Screen.fillAlphabetSet();
    Screen.fillCoordinateArray();
    Screen.fillGrid();

    const game = new GameBoard();
    game.run();
} catch(e) {
    if (e instanceof ImportFileError) {
        console.error(`File Import Error: ${e.message}`);
        console.error(`File Path: ${e.filePath}`);
    } else {
        console.error(e);
    }
}

module.exports = {
    GameBoard
}
