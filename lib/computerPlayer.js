const { HashTable } = require('../lib/hash-table');

class ComputerPlayer {

    constructor() {
        this.points = 0;
        this.memo = new HashTable();
    }


}

module.exports = {
    ComputerPlayer
}
