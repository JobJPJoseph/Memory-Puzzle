const { HashTable } = require('./hash-table');
const { MySet } = require('./mySet');

class Screen {

    static gridHashTable = new HashTable();
    static alphabetSet = new MySet();
    static availableCoordinates = [];

    // static fillGrid() {
    //     let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    //     for (let i= 0; i < 8; i++) {
    //         let index = 0;
    //         let char = alpha[i];

    //         while(index < 2) {
    //             let obj = Screen.getCoordinates();

    //             Screen.grid.insert(JSON.stringify(obj), char);
    //             index++;
    //         }

    //     }

    // }

    static getRandCoordinates() {
        if (Screen.availableCoordinates.length === 1) {
            let coordinateStr = Screen.availableCoordinates[0];
            Screen.availableCoordinates = [];
            return coordinateStr;
        }

        let rand = Math.floor(Math.random() * Screen.availableCoordinates.length);

        let coordinateStr = Screen.availableCoordinates[rand];

        Screen.availableCoordinates = [...Screen.availableCoordinates.slice(0, rand), ...Screen.availableCoordinates.slice(rand + 1, Screen.availableCoordinates.length)];

        return coordinateStr;
    }

    // static fillCoordinates() {
    //     for (let i = 0; i < 4; i++) {

    //         for (let j = 0; j < 4; j++) {
    //             let obj = { row: i, column: j };

    //             Screen.coordinates.push(obj);
    //         }

    //     }

    // }


    static fillAlphabetSet() {
        const alphaStr = 'abcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < alphaStr.length; i++) {
            let char = alphaStr[i];

            Screen.alphabetSet.insert(char);
        }

    }

    static fillCoordinateArray() {
        const rowMax = 6;
        const colMax = 4;

        for (let i = 0; i < rowMax; i++) {

            for (let j = 0; j < colMax; j++) {
                let coordinate = JSON.stringify({ row: i, column: j });

                Screen.availableCoordinates.push(coordinate);
            }

        }

    }

    static fillGrid() {

        for (let i = 0; i < Screen.alphabetSet.data.length; i++) {
            let node = Screen.alphabetSet.data[i];

            // Note: We can't do every letter in alpha. We can only take
            // 12 pairs

            if (node) { // valid node
                let idx = 0;

                while (idx < 2) {
                    if (!Screen.availableCoordinates.length) return;

                    let coordinateStr = Screen.getRandCoordinates();

                    if (!Screen.gridHashTable.has(node.value)) {
                        Screen.gridHashTable.insert(node.value, []);
                        let arr = Screen.gridHashTable.read(node.value);
                        arr.push(coordinateStr);
                    } else {
                        let arr = Screen.gridHashTable.read(node.value);
                        arr.push(coordinateStr);
                    }
                    Screen.gridHashTable.insert(node.value,  []);// default array
                    // Remember pointers
                        // referencing the value return an array. So making changes to that array
                        // changes the original value in the node in the HashTable

                    idx++;
                }

            }

        }

    }

}

module.exports = { Screen };
