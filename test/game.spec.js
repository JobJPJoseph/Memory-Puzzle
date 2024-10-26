const { GameBoard } = require('../lib/computerPlayer');
const { Screen } = require('../lib/screen');
const { HashTable } = require('../lib/hash-table');
const { GenerateGrid } = require('../lib/generateGrid')

const chai = require('chai');
const expect = chai.expect;

describe('Game Board', function () {

    it('should a create a class called GameBoard', function () {
        expect(GameBoard).to.exist;
    });

    let game;

    before(function () {
        game = new GameBoard();
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

            for (let letter in pairs) {
                expect(pairs[letter]).to.equal(2);
            }

        });

    });

});
