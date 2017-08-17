var bench = require('nanobench');
var crc16 = require('../index');
var util = require('./../util/util');

var stream = '3a16070a00000000001a0000';
var streamBuf = util.bufferFactory(stream, 'hex');

var sumShouldStr = '98af';
var streamWithSumBuf = util.bufferFactory(stream + sumShouldStr, 'hex');

var times = 2 * 1000 * 1000;
bench('CRC16#checkSum 2,000,000 times', function (b) {
  b.start()
  for (var i = 0; i < times; i++) {
    crc16.checkSum(streamBuf);
  }
  b.end()
})
bench('CRC16#verifySum 2,000,000 times', function (b) {
  b.start()
  for (var i = 0; i < times; i++) {
    crc16.verifySum(streamWithSumBuf);
  }
  b.end()
})
