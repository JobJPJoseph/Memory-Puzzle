const { GameBoard } = require('../lib/game');
const { Screen } = require('../lib/screen');
// const { MySet } = require('../lib/mySet');
const { HashTable } = require('../lib/hash-table');
// const { GenerateGrid } = require('../lib/generateGrid');
const { HumanPlayer } = require('../lib/humanPlayer');
const { ComputerPlayer } = require('../lib/computerPlayer');

const chai = require('chai');
const expect = chai.expect;

describe('Game Board', function () {

    it('should a create a class called GameBoard', function () {
        expect(GameBoard).to.exist;
    });

    Screen.fillAlphabetSet();
    Screen.fillCoordinateArray();
    Screen.fillGrid();

    let game;
    let human;
    let computer;

    beforeEach(function () {
        game = new GameBoard();
        // human = new HumanPlayer();
        // computer = new ComputerPlayer();
    });

    describe('Constructor', function () {

        it('should initialize a property called grid', function () {
            expect(game.grid).to.be.an.instanceOf(HashTable);
        });

        it('should fill the game.grid with a dash as a default values ', function () {
            const rowMax = 6;
            const colMax = 4;

            for (let i = 0; i < rowMax; i++) {

                for (let j = 0; j < colMax; j++) {
                    let coordinate = JSON.stringify({ row: i, column: j });
                    expect(game.grid.has(coordinate)).to.be.true;
                    let expected = game.grid.read(coordinate);
                    expect(expected).to.equal("-");
                }

            }

        });

        it('should initialize a property called players that nests all the players', function () {
            expect(game.players).to.exist;
            expect(game.players[0]).to.be.instanceOf(HumanPlayer);
            expect(game.players[1]).to.be.instanceOf(ComputerPlayer);
        });

        it('should initialize a property called recentInputs that should represent a set', function () {
            expect(game.recentInputs).to.exist;
            expect(game.recentInputs).to.be.instanceOf(HashTable);
        });

        it('should initialize a property called gridLength that represent the amount of dashes', function () {
            expect(game.gridLength).to.exist;
            expect(game.gridLength).to.equal(game.grid.count);
        });

    });

    describe('generateObject', function () {

        it('should generate an object that includes coordinates whose values are currently a dash', function () {
           let expected = game.generateObject();

            const rowMax = 6;
            const colMax = 4;

            for (let i = 0; i < rowMax; i++) {

                for (let j = 0; j < colMax; j++) {
                    let coordinate = JSON.stringify({ row: i, column: j });
                    expect(expected[coordinate]).to.equal("-");
                }

            }

        });

    });

    // describe('printGameBoard', function () {

    //     it('should print the Game Board in a 4 x 4 format', function () {
    //         game.printGameBoard();
    //     });

    // });

    // describe('assignCoordinate', function () {

    //     it('should use arg in Screen.grid and assign the value in GameBaord.grid', function () {
    //         let input = JSON.stringify({ row: 0, column: 0 });
    //         game.assignCoordinate(input);

    //         let result = Screen.grid.read(input);
    //         expect(game.grid.read(input)).to.equal(result);
    //         game.printGameBoard();
    //     });

    //     it('should use arg to revert the GameBaord.grid coordinate back to a dash', function () {
    //         let input = JSON.stringify({ row: 0, column: 0 });
    //         game.assignCoordinate(input);
    //         game.assignCoordinate(input);

    //         expect(game.grid.read(input)).to.equal("-");
    //         game.printGameBoard();
    //     });

    // });

    // describe('addPoints', function () {

    //     it('should accept an instance of HumanPlayer and add 5 point to the points property', function () {
    //         game.addPoints(human);
    //         expect(human.points).to.equal(5);
    //     });

    //     it('should accept an instance of ComputerPlayer and add 5 point to the points property', function () {
    //         game.addPoints(computer);
    //         expect(computer.points).to.equal(5);
    //     });

    // });

    // describe('adjustGrid.length', function () {

    //     it('should substract 2 from the gridLength property', function () {
    //         game.adjustGridLength();
    //         expect(game.gridLength).to.equal(game.grid.count - 2);
    //     });

    // });

    // describe('playRound', function () {

    //     it('should player half a round of the game', async function () {
    //         await game.playRound(human); // {row: 0, column: 0} and {row: 0, column: 1}
    //         let inpt = JSON.stringify({ row: 0, column: 0 });
    //         expect(game.grid.read(inpt)).to.not.equal('-');
    //         return;
    //     });

    // });

});
