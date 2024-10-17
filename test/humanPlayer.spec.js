const { HumanPlayer } = require('../lib/humanPlayer');

const chai = require('chai');
const expect = chai.expect;

describe('Human Player', function () {

    it('The HumanPlayer class should exist', function () {
        expect(HumanPlayer).to.exist;
    });

    let humanPlayer;

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


});
