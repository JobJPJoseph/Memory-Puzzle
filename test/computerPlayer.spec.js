const { ComputerPlayer } = require('../lib/computerPlayer');
const { HashTable } = require('../lib/hash-table');
const { GenerateGrid } = require('../lib/generateGrid')

const chai = require('chai');
const expect = chai.expect;

describe('Computer Player', function () {

    it('should create a class called ComputerPlayer', function () {
        expect(ComputerPlayer).to.exist;
    });

    let computerPlayer;

    beforeEach(function () {
       computerPlayer = new ComputerPlayer();
    });

    describe('contructor', function () {

        it('should set points to 0', function () {
            // expect(computerPlayer.points).to.equal(0);
        });

        it('should set the memo to an empty Hash Table', function () {
            // expect(computerPlayer.memo).to.be.a('object');
        });

    });

    describe('pickRandCoordinate', function () {

        it('should return a random key:value pair', function () {
            // let result = computerPlayer.pickRandCoordinate(coordinates);
            // expect(result).to.be.a('object');
        });

    });

});
