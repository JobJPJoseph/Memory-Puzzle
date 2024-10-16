const { HumanPlayer } = require('../lib/humanPlayer');

const chai = require('chai');
const expect = chai.expect;

describe('Human Player', function () {

    it('The HumanPlayer class should exist', function () {
        expect(HumanPlayer).to.exist;
        expect(HumanPlayer).to.be.a('Object');
    });

    describe('Constructor', function () {


    });

});
