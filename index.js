// var debug = require('debug')('node-crc16');
var crc16Native = require('./build/Release/crc16.node');
var util = require('./util/util');

var parseParam = function (input, encoding, option, caller) {
  encoding = encoding || 'hex';
  if(typeof encoding === 'object'){
    option = encoding;
    encoding = 'hex';
  }
  option = option || {};

  var buf = (function () {
    if (typeof input === 'string') {
      try {
        return util.bufferFactory(input, encoding);
      } catch (e) {
        console.trace(e);
        // debug(e);
        return null;
      }
    }
    if (Buffer.isBuffer(input)) {
      return input;
    }
    return null;
  })()

  if (buf === null) {
    throw new TypeError('crc16.' + caller + ' input param invalid!');
  }

  return {buf: buf, option: option};
}
var crc16 = {
  /**
   * checkSum
   * @param input string | buffer
   * @param encoding string 'hex' default
   * @param option object
   * @example checkSum('301a', 'hex')
   * @example checkSum('301a')
   * @example checkSum(Buffer.from('301a', {getArry: true})) default getArry is false
   * @return return array when option.getArry == true or return string
   */
  checkSum: function (input, encoding, option) {
    var param = parseParam(input, encoding, option, 'checkSum');
    return crc16Native.checkSum(param.buf, param.option);
  },

  /**
   * verifySum
   * @param input string | buffer
   * @param encoding string 'hex' default
   * @param option object
   * @example verifySum('301a', 'hex')
   * @example verifySum('301a')
   * @return return bool true | false
   */
  verifySum: function (input, encoding, option) {
    var param = parseParam(input, encoding, option, 'verifySum');
    return crc16Native.verifySum(param.buf, param.option);
  }
};

module.exports = crc16;


