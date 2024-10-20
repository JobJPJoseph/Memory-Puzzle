const { HashTable } = require('./hash-table');

class Screen {

    static grid = new HashTable();
    static coordinates = [];

    static fillGrid() {
        let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // We can't get a list because its a Hash Table. We don't have a default fault value
        // console.log(Screen.coordinates, Screen.coordinates.length);

        for (let i= 0; i < 8; i++) {
            let index = 0;
            let char = alpha[i];

            while(index < 2) {
                let obj = Screen.getCoordinates();

                Screen.grid.insert(JSON.stringify(obj), char);
                index++;
            }

        }

    }

    static getCoordinates() {
        if (Screen.coordinates.length === 1) {
            let obj = Screen.coordinates[0];
            Screen.coordinates = [];
            return obj;
        }

        let rand = Math.floor(Math.random() * Screen.coordinates.length);

        let obj = Screen.coordinates[rand];

        Screen.coordinates = [...Screen.coordinates.slice(0, rand), ...Screen.coordinates.slice(rand + 1, Screen.coordinates.length)];

        return obj;
    }

    static fillCoordinates() {
        for (let i = 0; i < 4; i++) {

            for (let j = 0; j < 4; j++) {
                let obj = { row: i, column: j };

                Screen.coordinates.push(obj);
            }

        }

    }


}

module.exports = { Screen };
