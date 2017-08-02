var should = require('chai').should();
var crc16 = require('../index');

var stream = '3a16070a00000000001a0000';
var sumShouldStr = '98af';
var sumShouldArry = [152, 175];

describe('Syntax to call the apis', function(){
  describe('CheckSum', function(){
    it('Stream input should be a hex string and return a string sum by default', function(){
      var sum = crc16.checkSum(stream);
      sum.should.equal(sumShouldStr);
    })
    it('Stream input with encoding', function(){
      var sum = crc16.checkSum(stream, 'hex');
      sum.should.equal(sumShouldStr);
    })
    it('Returned sum can be an decimal numbers array', function(){
      var sum = crc16.checkSum(stream, {getArry: true});
      sum.should.eql(sumShouldArry);
    })
    it('Stream input can be a buffer', function(){
      var sum = crc16.checkSum(Buffer.from(stream, 'hex'));
      sum.should.equal(sumShouldStr);
    })
  })

  describe('verifySum', function(){
    it('Stream input should be a hex string by default', function(){
      var isValid = crc16.verifySum(stream + sumShouldStr);
      isValid.should.equal(true);
    })
    it('Stream input with encoding', function(){
      var isValid = crc16.verifySum(stream + sumShouldStr, 'hex');
      isValid.should.equal(true);
    })
    it('Stream input can be a buffer', function(){
      var isValid = crc16.verifySum(Buffer.from(stream + sumShouldStr, 'hex'));
      isValid.should.equal(true);
    })
  })
})


