const { HashTable } = require('../lib/hash-table');

class ComputerPlayer {

    constructor() {
        this.points = 0;
        this.memo = new HashTable();
    }

    pickRandCoordinate(obj) {
        console.log(obj.pairs());
    }
}

module.exports = {
    ComputerPlayer
}
