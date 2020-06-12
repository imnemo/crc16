var bufferFactory = require('buffer-factory');
// eslint-disable-next-line import/no-unresolved
var crc16Native = require('../../build/Release/crc16.node');

var stream = bufferFactory('abcd');
var sum = crc16Native.checkSum(
  stream, { retType: 'buffer' },
);
console.log(sum);
