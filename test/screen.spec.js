const { Screen } = require('../lib/screen');
const { HashTable } = require('../lib/hash-table');
const { MySet } = require('../lib/mySet');

const chai = require('chai');
const expect = chai.expect;

describe('Screen', function () {

    it('should create a class called Screen', function () {
        expect(Screen).to.exist;
    });

    it('should create a static empty HashTable called grid', function () {
        // Encompise all the data we need for the game.
        expect(Screen.gridHashTable).to.be.instanceOf(HashTable);
        expect(Screen.gridHashTable.count).to.equal(0);
    });

    it('should set a static property called availableCoordinates to an empty array', function () {
        expect(Screen.availableCoordinates).to.be.a('array');
        expect(Screen.availableCoordinates.length).to.equal(0);
    });

    it('should create a static empty set', function () {
        expect(Screen.alphabetSet).to.be.instanceOf(MySet);
        expect(Screen.alphabetSet.count).to.equal(0);
    });

    // describe('fillGrid', function () {

    //     it(`should `, function () {
    //         Screen.fillCoordinates();
    //         Screen.fillGrid();

    //         let pairs = {};



    //         for (let i = 0; i < Screen.grid.data.length; i++) {
    //             let node = Screen.grid.data[i];

    //             if (node) {

    //                 while (node) {

    //                     if (pairs[node.value]) {
    //                         pairs[node.value]++;
    //                     } else {
    //                         pairs[node.value] = 1;
    //                     }
    //                     node = node.next;
    //                 }

    //             }

    //         }

    //         for (let letter in pairs) {
    //             expect(pairs[letter]).to.equal(2);
    //         }

    //     });

    // });

    describe('fillAlphabetSet' , function () {

        it('should fill the set with letters from the alphabet', function () {
            Screen.fillAlphabetSet();

            let alphaStr = 'abcdefghijklmnopqrstuvwxyz';

            for (let i = 0; i < alphaStr.length; i++) {
                let char = alphaStr[i];

                expect(Screen.alphabetSet.has(char)).to.be.true;
            }

        });

    });

    describe('fillCoordinateArray', function () {

        it('should fill the array that represents a 6 x 4 grid equalling 24  total and 12 pairs', function () {
            Screen.fillCoordinateArray();

            let array = [];
            const rowMax = 6;
            const colMax = 4;

            for (let i = 0; i < rowMax; i++) {

                for (let j = 0; j < colMax; j++) {
                    let coordinate = JSON.stringify({ row: i, column: j });

                    array.push(coordinate);
                }

            }

            expect(Screen.availableCoordinates.length).to.equal(24);

            for (let i = 0; i < rowMax; i++) {

                for (let j = 0; j < colMax; j++) {
                    let mine = array[i][j];
                    let theres = Screen.availableCoordinates[i][j];

                    expect(mine === theres).to.be.true;
                }

            }

        });

    });

    describe('fillGrid', function () {

        it('Each letter of the alphabet should have two coordinates', function () {
            Screen.fillGrid();

            expect(Screen.gridHashTable.count > 1).to.be.true;
            console.log(Screen.gridHashTable);

            expect(Screen.gridHashTable.read("a").length > 1).to.be.true;

            for (let i = 0; i < Screen.gridHashTable.data.length; i++) {
                let node = Screen.gridHashTable.data[i];

                if (node) {

                    expect(Screen.alphabetSet.has(node.key), 'if it has the key').to.be.true;
                    expect(node.value, 'is the value an array').to.be.instanceOf('array');
                    expect(node.value.length, 'is the array a length of 2').to.equal(2);
                }

            }

        });

    });

});
