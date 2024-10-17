class HumanPlayer {

    constructor () {
        // Instead of keeping track of the amount of coordinates just use points to save time and space
        this.points = 0;
    }

    isValid(input) {
        if (typeof input !== 'string') return false;
        if (input.length !== 3) return false;
        if ( !(Number.isInteger(parseInt(input[0])) && input[1] === " " && Number.isInteger(parseInt(input[2]))) ) return false;
        return true;
    }

}

module.exports = {
    HumanPlayer
}
