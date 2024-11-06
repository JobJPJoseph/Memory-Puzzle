class ComputerPlayer {

    constructor() {
        this.points = 0;
        this.memo = {};
    }

    pickRandCoordinate(obj) {
        let index = Math.floor(Math.random() * obj.length);
        return Object.keys(obj)[index];
    }

    async getInput(obj) {
        let result = this.pickRandCoordinate(obj);
        return result;
    }
}

module.exports = {
    ComputerPlayer
}
