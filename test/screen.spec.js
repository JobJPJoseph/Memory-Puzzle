const { Screen } = require('../lib/screen');

const chai = require('chai');
const expect = chai.expect;

describe('Screen', function () {

    it('should create a class called Screen', function () {
        expect(Screen).to.exist;
    });

    let screen;

    beforeEach(function () {
        screen = new Screen();
    });

    it('should create an empty object called coordinates', function () {
        expect(Screen.grid).to.a('object');
    });

    describe('fillGrid', function () {

        it(`should fill Screen.coordinates with 8 pairs letters from the alphabet`, function () {
            Screen.fillCoordinates();
            Screen.fillGrid();

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
