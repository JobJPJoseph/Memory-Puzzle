const readline = require('readline')

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

    formatInput(string) {
        return (this.isValid(string)) ? JSON.stringify({ row: Number(string[0]), column: Number(string[2]) }) : false;
    }

    checkForInclusion(input, obj) {
        return (obj.has(input)) ? true : false;
    }

    async getInput(obj) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return await new Promise((resolve) => {
            const askInput = () => {
                rl.question('Enter a valid input: ', (input) => {

                    if (this.isValid(input)) {
                        let newInput = this.formatInput(input)

                        if (this.checkForInclusion(newInput, obj)) {
                            rl.close();
                            resolve(newInput);
                        } else {
                            console.log(`Your input ${input} is not a valid coordinate.`);
                            askInput();
                        }

                    } else {
                        console.log(`Your input ${input} must include only numbers.`);
                        askInput();
                    }
                });
            }

            askInput();
        });
    }

}

module.exports = {
    HumanPlayer
}
