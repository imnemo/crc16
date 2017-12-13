var should = require('chai').should();
var deprecate = require('deprecate');
var crc16 = require('../index');

var stream = '3a16070a00000000001a0000';
var sumShouldStr = '98af';
var sumShouldArry = [152, 175];

var output = {
  _text: [],
  _clear: function () {
    this._text = [];
  },
  write: function (message) {
    this._text.push(message);
  }
}
describe('deprecate', function () {
  beforeEach(function () {
    output._clear();
    deprecate.stream = output;
    deprecate.silence = false;
  });

  it('Should warn a deprecation message when you set option.getArry as true, but return correctly', function () {
    var sum;
    sum = crc16.checkSum(stream, {getArry: true});
    sum.should.eql(sumShouldArry);

    var text = output._text.join(' ');
    ( text.length > 0 ).should.equal(true);
    text.should.contain('WARNING!!');
    text.should.contain('option.getArry');
    text.should.contain('option.retType');
  });
  it('Should warn a deprecation message when you set option.getArry as false, but return correctly', function () {
    var sum;
    sum = crc16.checkSum(stream, {getArry: false});
    sum.should.equal(sumShouldStr);
  });
});
