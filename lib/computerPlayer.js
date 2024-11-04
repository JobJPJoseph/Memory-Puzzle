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
        let key = Object.values(input)[0];
        let value = Object.keys(input)[0];

        if (this.memo[key] === undefined) {
            this.memo[key] = [value];
        } else {
            this.memo[key].push(value);
        }
    }

    async getInput(obj) {
        let result = this.pickRandCoordinate(obj);
        this.cacheCoordinate(result);
        return result;
    }
}

module.exports = {
    ComputerPlayer
}
