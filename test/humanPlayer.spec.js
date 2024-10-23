const { HumanPlayer } = require('../lib/humanPlayer');
const { HashTable } = require('../lib/hash-table');
const { GenerateGrid } = require('../lib/generateGrid');

const chai = require('chai');
const expect = chai.expect;

describe('Human Player', function () {

    it('The HumanPlayer class should exist', function () {
        expect(HumanPlayer).to.exist;
    });

    let humanPlayer;
    let coordinates = new GenerateGrid();
    coordinates.fillGrid();
    coordinates.addRandLetters();

    before(function () {
        humanPlayer = new HumanPlayer();
    });


    describe('Constructor', function () {

        it('should have a property called points and set it zero', function () {
            expect(humanPlayer.points).to.equal(0);
        });

    });

    describe('isValid', function () {

        it("should return Boolean on whether the player's input is valid", function () {

            const actual1 = "hello";
            const expected1 = false;

            const actual2 = "he11o";
            const expected2 = false;

            const actual3 = "0 0";
            const expected3 = true;

            const actual4 = "00";
            const expected4 = false;

            expect(humanPlayer.isValid(actual1), `${actual1}`).to.equal(expected1);
            expect(humanPlayer.isValid(actual2), `${actual2}`).to.equal(expected2);
            expect(humanPlayer.isValid(actual3), `${actual3}`).to.equal(expected3);
            expect(humanPlayer.isValid(actual4), `${actual4}`).to.equal(expected4);
        });

    });

    describe("formatInput", function () {

        context('When the string is false', function () {

            it('should return false, when the string is not valid', function () {
                const input = "0 p";
                const actual = humanPlayer.formatInput(input);
                const expected = false;
                expect(actual).to.equal(expected);
            });

        });

        context('When the string is valid', function () {

            it('should return the input in an object type', function () {
                const input = "0 0";
                const actual = humanPlayer.formatInput(input);
                const expected = JSON.stringify({ row: 0, column: 0 });
                expect(actual).to.equal(expected).and.to.be.a('string');
            });

        });

    });

    describe('checkForInclusion', function () {

        it('should return a Boolean on whether the input is included', function () {
            // Just trying to validate the key not values
            const input = JSON.stringify({ row: 1, column: 2 });

            expect((humanPlayer.checkForInclusion(input, coordinates.grid))).to.be.true;
        });

    });

    describe('getInputs', function () {

        context('When the input is valid', function () {

            it('should return if the player input is valid', async function () {
                let inpt = await humanPlayer.getInput(coordinates.grid);
                let expected = JSON.stringify({ row: 0, column: 0 });
                return expect(inpt).to.equal(expected); // => {row:0,column:0}
            }, 25000);

        });

        // context('When the input is not valid', function () {

        //     it('should return false when the input is not valid', async function () {
        //         let bool = await humanPlayer.getInput(coordinates.grid);
        //         return expect(bool).to.be.false;
        //     }, 25000);

        // });

    });

});
