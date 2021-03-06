/**
 * Module dependencies.
 */
const should = require('chai').should();
const expect = require('chai').expect;
const sinon = require('sinon');
const readline = require('readline');
const convert = require('../js/foodFactsSindhu2');
let jsonDiff = require('./jsondiff');
let totalObjectKeys = require('./totalObjectKeys');
let expectedJSON = require('./expectedjson/expectedJsonSindhu2.json');
let actualJSON = require('../outputdata/outputJsonSindhu2.json');

describe('Test Application as Blackbox', function() {
    it('JSON has expected Number of Objects', function(done) {
        let objMatrix = totalObjectKeys.traverse(actualJSON);
        expect(objMatrix.totalNoObjects).to.not.equal(0);
        expect(objMatrix.totalNoKeys).to.not.equal(0);
        done();
    });
    it('Test JSON is as expected', function(done) {
        let compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
        expect(compareResult.diffs).equal(0);
        done();
    });
});
describe('Test Application as WhiteBox', function() {
    let countries = ['Netherlands', 'Canada', 'United Kingdom', 'United States',
        'Australia', 'France', 'Germany', 'Spain', 'South Africa'
    ];
    // **Run once before the first test case**
    before(function() {
        console.log('WhiteBox testing Started')
    });
    let i = 1;
    // **Run once before each test case**
    beforeEach(function() {
        console.log('Test' + i + ' :');
        i++;
    });
    it('should fail if input is notprovided', function(done) {
        expect(convert.main).to.throw(Error, 'It is not an array');
        done();
    });
    it('should be an array', function(done) {
        expect(convert.main.bind('undefined', 8575)).to.throw(Error, 'It is not an array');
        done();
    });

    it('should fail for string', function(done) {
        expect(convert.main.bind('undefined', 'Netherlands')).to.throw(Error, 'It is not an array');
        done();
    });
    it('should fail if the length of array is null', function(done) {
        expect(convert.main.bind('undefined', [])).to.throw(Error, 'the array does not have any value');
        done();
    });
    it('should not fail if it is an array object', function(done) {
        expect(convert.main.bind('undefined', countries)).to.not.throw(Error, 'the array is  well defined');
        done();
    });
    // it('should output the input that we send ', function(done) {
    //     let input = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
    //     let result = convert.main(input);
    //     result.should.be.equal(input).and.have.lengthOf(4);
    //   //  console.log(result);
    //     done();
    // });
    // it('should be uuu an array', function(done) {
    //     let input = 'Canada';
    //     let result = convert.greet(input, countries);
    //     result.should.to.be.a.Number;
    //     expect(result).to.be.at.most(countries.length - 1);
    //     done();
    // });
});
describe('Test createInterface method of readline', function(err) {
    it('should be called only once', function() {
        let spyCreateInterface = sinon.spy(readline, 'createInterface');
        convert.main(['Netherlands', 'Canada', 'United Kingdom',
            'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'
        ]);
        readline.createInterface.restore();
        sinon.assert.calledOnce(spyCreateInterface);
    });
});
describe('Test on method of Interface for line event', function(err) {
    it('should be called', function() {
        let stub = sinon.stub(readline.Interface.prototype, 'on');
        convert.main(['Netherlands', 'Canada', 'United Kingdom',
            'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'
        ]);
        sinon.assert.called(stub);
        readline.Interface.prototype.on.restore();
        sinon.assert.calledWith(stub, 'line');
    });
});
describe('Test on method of Interface for close event', function(err) {
    it('should be called', function() {
        let stub = sinon.stub(readline.Interface.prototype, 'on');
        convert.main(['Netherlands', 'Canada', 'United Kingdom',
            'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'
        ]);
        readline.Interface.prototype.on.restore();
        sinon.assert.calledWith(stub, 'close');
    });
});
