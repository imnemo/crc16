var crc16 = require('node-crc16');

var stream = '3a16070a00000000001a0000';
var sumShouldStr = '98af';

//check sum
var sum = crc16.checkSum(stream);
console.log('check stream ' + stream + ', result: ' + sum);

//verify sum
var isValid = crc16.verifySum(stream + sumShouldStr);
console.log('verify sum result: ' + isValid);
