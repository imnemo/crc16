// var debug = require('debug')('node-crc16');
var deprecate = require('deprecate');
var crc16Native = require('./build/Release/crc16.node');
var util = require('./util/util');

var parseParam = function (input, encoding, option) {
  encoding = encoding || 'hex';
  if(typeof encoding === 'object'){
    option = encoding;
    encoding = 'hex';
  }
  option = option || {};
  if(option.getArry !== undefined && option.retType === undefined){
    deprecate('crc16.checkSum: option.getArry is deprecated! use option.retType instead.');
    if(option.getArry == true){
      option.retType = 'array';
    }else if(option.getArry == false){
      option.retType = 'hex';
    }
  }

  var buf = (function () {
    if (typeof input === 'string') {
      try {
        return util.bufferFactory(input, encoding);
      } catch (e) {
        console.trace(e);
        return null;
      }
    }
    if (Buffer.isBuffer(input)) {
      return input;
    }
    return null;
  })()

  if (buf === null) {
    throw new TypeError('crc16.' + arguments.callee.caller.name + ' input param invalid!');
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
    var param = parseParam(input, encoding, option);
    var sum = crc16Native.checkSum(param.buf, param.option);
    /**
     * @TODO
     * option.retType == 'buffer'时，crc16_node.cc会忽略，按retType == 'hex'执行
     * 后续可以直接在node native里直接返回buffer
     */
    if(param.option.retType === 'buffer'){
      return util.bufferFactory(sum, 'hex');
    }
    return sum;
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
    var param = parseParam(input, encoding, option);
    return crc16Native.verifySum(param.buf, param.option);
  }
};

module.exports = crc16;


