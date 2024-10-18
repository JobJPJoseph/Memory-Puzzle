const { Screen } = require('../lib/screen');

const chai = require('chai');
const expect = chai.expect;

describe('Screen', function () {

    it('should create a class called Screen', function () {
        expect(Screen).to.exist;
    });

});
