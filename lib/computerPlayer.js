class ComputerPlayer {

    constructor() {
        this.points = 0;
    }

    pickRandCoordinate(obj) {
        let length = Object.keys(obj).length
        let index = Math.floor(Math.random() * length);
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
