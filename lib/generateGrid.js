const { HashTable } = require('./hash-table');

class GenerateGrid {

    constructor() {
        this.grid = new HashTable();
        this.coordinates = [];
    }

    getCoordinates() {
        if (this.coordinates.length === 1) {
            let obj = this.coordinates[0];
            this.coordinates = [];
            return obj;
        }

        let rand = Math.floor(Math.random() * this.coordinates.length);

        let obj = this.coordinates[rand];

        this.coordinates = [...this.coordinates.slice(0, rand), ...this.coordinates.slice(rand + 1, this.coordinates.length)];

        return obj;
    }

    addRandLetters() {
        let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i= 0; i < 8; i++) {
            let index = 0;
            let char = alpha[i];

            while(index < 2) {
                let obj = this.getCoordinates();

                this.grid.insert(JSON.stringify(obj), char);
                index++;
            }

        }

    }

    fillGrid() {

        for (let i = 0; i < 4; i++) {

            for (let j = 0; j < 4; j++) {
                let obj = { row: i, column: j };

                this.coordinates.push(obj);
            }

        }

    }

}

module.exports = {
    GenerateGrid
}
