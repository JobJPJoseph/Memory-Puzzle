const { HashTable } = require('../lib/hash-table');

class ComputerPlayer {

    constructor() {
        this.points = 0;
        this.memo = {};
    }

    pickRandCoordinate(obj) {
        let index = Math.floor(Math.random() * obj.length);
        return obj.keys()[index];
    }

    cacheCoordinate(input) {
        let key = (Object.keys(input)[0]);
        let value = Object.values(input)[0];
        if (!this.memo[key]) this.memo[key] = value;
    }
}

module.exports = {
    ComputerPlayer
}
