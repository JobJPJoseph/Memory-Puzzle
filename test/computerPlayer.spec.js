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
    let coordinates = new GenerateGrid();
    coordinates.fillGrid();
    coordinates.addRandLetters();

    beforeEach(function () {
       computerPlayer = new ComputerPlayer();
    });

    describe('contructor', function () {

        it('should set points to 0', function () {
            expect(computerPlayer.points).to.equal(0);
        });

        it('should set the memo to an empty Hash Table', function () {
            expect(computerPlayer.memo).to.be.a('object');
        });

    });

    describe('pickRandCoordinate', function () {

        it('should return a random key:value pair', function () {
            let result = computerPlayer.pickRandCoordinate(coordinates.grid);
            expect(result).to.be.a('string');
        });

    });

    describe('cacheCoordinate', function () {

        it('should insert input into the memo property', function () {
            let input = {};
            let key = JSON.stringify({ row: 0, column: 2 });
            let value = 'W';
            input[key] = value;
            computerPlayer.cacheCoordinate(input);

            expect(computerPlayer.memo[key]).to.equal(value);
        });

    });


    describe('hasValue', function () {

        context('When True', function () {

            it('should return a coordinate different from the input but has the same value', function () {
                let input = {};
                let key = JSON.stringify({ row: 0, column: 2 });
                let value = 'W';
                input[key] = value;
                computerPlayer.cacheCoordinate(input);

                let input2 = {};
                let key2 = JSON.stringify({ row: 1, column: 2 });
                let value2 = "W";
                input2[key2] = value2;

                let result = computerPlayer.hasValue(input2);
                expect(result).to.equal(key);
            });

        });

        context('When False', function () {

            it('should return false', function () {
                let input = {};
                let key = JSON.stringify({ row: 0, column: 2 });
                let value = 'W';
                input[key] = value;
                computerPlayer.cacheCoordinate(input);

                let input2 = {};
                let key2 = JSON.stringify({ row: 1, column: 2 });
                let value2 = "B";
                input2[key2] = value2;

                let result = computerPlayer.hasValue(input2);
                expect(result).to.be.false;
            });

        });

    });

});
