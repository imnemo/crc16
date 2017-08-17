var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var crc16 = require('../index');
var util = require('./../util/util');

var stream = '3a16070a00000000001a0000';
var streamBuf = util.bufferFactory(stream, 'hex');

var sumShouldStr = '98af';
var streamWithSumBuf = util.bufferFactory(stream + sumShouldStr, 'hex');

suite
.add('CEC16#checkSum', function() {
  crc16.checkSum(streamBuf);
})
.add('CRC16#verifySum', function(){
  crc16.verifySum(streamWithSumBuf);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
