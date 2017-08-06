var should = require('chai').should();
var crc16 = require('../index');
var util = require('./../util/util');

var stream = '3a16070a00000000001a0000';
var sumShouldStr = '98af';
var sumShouldArry = [152, 175];

describe('Syntax to call the apis', function(){
  describe('CheckSum', function(){
    it('Should throw an exception when input stream is null', function(){
      (function(){
        crc16.checkSum(null)
      }).should.throw();
    })
    it('Should throw an exception when input stream is invalid', function(){
      (function(){
        crc16.checkSum('qweewq', 'hex')
      }).should.throw();
    })

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
      var sum = crc16.checkSum(util.bufferFactory(stream, 'hex'));
      sum.should.equal(sumShouldStr);
    })
  })

  describe('verifySum', function(){
    it('Should throw an exception when input stream is null', function(){
      (function(){
        crc16.verifySum(null)
      }).should.throw();
    })
    it('Should throw an exception when input stream is invalid', function(){
      (function(){
        crc16.verifySum('qweewq', 'hex')
      }).should.throw();
    })

    it('Stream input should be a hex string by default', function(){
      var isValid = crc16.verifySum(stream + sumShouldStr);
      isValid.should.equal(true);
    })
    it('Stream input with encoding', function(){
      var isValid = crc16.verifySum(stream + sumShouldStr, 'hex');
      isValid.should.equal(true);
    })
    it('Stream input can be a buffer', function(){
      var isValid = crc16.verifySum(util.bufferFactory(stream + sumShouldStr, 'hex'));
      isValid.should.equal(true);
    })

    it('Should return false when the sum is not matched the stream input', function(){
      var isValid = crc16.verifySum(stream + '7878');
      isValid.should.equal(false);
    })
  })
})


