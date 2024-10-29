const { GameBoard } = require('../lib/game');
const { Screen } = require('../lib/screen');
const { HashTable } = require('../lib/hash-table');
const { GenerateGrid } = require('../lib/generateGrid');
const { HumanPlayer } = require('../lib/humanPlayer');
const { ComputerPlayer } = require('../lib/computerPlayer');

const chai = require('chai');
const expect = chai.expect;

describe('Game Board', function () {

    it('should a create a class called GameBoard', function () {
        expect(GameBoard).to.exist;
    });

    let game;
    let human;
    let computer;

    beforeEach(function () {
        game = new GameBoard();
        human = new HumanPlayer();
        computer = new ComputerPlayer();
    });

    describe('Constructor', function () {

        it('should fill the Screen.grid with coordinates', function () {
            let pairs = {};

            for (let i = 0; i < Screen.grid.data.length; i++) {
                let node = Screen.grid.data[i];

                if (node) {

                    while (node) {

                        if (pairs[node.value]) {
                            pairs[node.value]++;
                        } else {
                            pairs[node.value] = 1;
                        }
                        node = node.next;
                    }

                }

            }

            expect(Object.keys(pairs).length > 1).to.be.true;

            for (let letter in pairs) {
                expect(pairs[letter] === 2).to.be.true;
            }

        });

        it('should initialize a property called grid', function () {
            expect(game.grid).to.be.an.instanceOf(HashTable);
        });

        it('should fill the game.grid with a dash as a default values ', function () {
            expect(game.grid.count > 1).to.be.true;

            for (let i = 0; i < game.grid.data.length; i++) {
                let node = game.grid.data[i];

                if (node) {

                    while (node) {
                        expect(node.value).to.equal('-');
                        node = node.next;
                    }

                }

            }
        });

    });

    describe('generateHashTable', function () {

        it('should generate a Hash Table that includes coordinates whose values are currently a dash', function () {
            let input = JSON.stringify({ row: 0, column: 0 });
            game.grid.insert(input, 'W');
            let result = game.generateHashTable();

            expect(result.has(input)).to.be.false;
        });

    });

    describe('printGameBoard', function () {

        it('should print the Game Board in a 4 x 4 format', function () {
            game.printGameBoard();
        });

    });

    describe('assignCoordinate', function () {

        it('should use arg in Screen.grid and assign the value in GameBaord.grid', function () {
            let input = JSON.stringify({ row: 0, column: 0 });
            game.assignCoordinate(input);

            let result = Screen.grid.read(input);
            expect(game.grid.read(input)).to.equal(result);
            game.printGameBoard();
        });

        it('should use arg to revert the GameBaord.grid coordinate back to a dash', function () {
            let input = JSON.stringify({ row: 0, column: 0 });
            game.assignCoordinate(input);
            game.assignCoordinate(input);

            expect(game.grid.read(input)).to.equal("-");
            game.printGameBoard();
        });

    });

    describe('addPoints', function () {

        it('should accept an instance of HumanPlayer and add 5 point to the points property', function () {
            game.addPoints(human);
            expect(human.points).to.equal(5);
        });

        it('should accept an instance of ComputerPlayer and add 5 point to the points property', function () {
            game.addPoints(computer);
            expect(computer.points).to.equal(5);
        });

    });

});
