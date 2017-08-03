module.exports.bufferFactory = function(){
  var args = Array.prototype.slice.call(arguments, 0);
  /*
    * Buffer.from is added in v5.10.0, as the api document shows. But some node version,
    * v4.2.6 for example, Buffer.from is function, however, there is an error when you call
    * `Buffer.from(string, encoding)`(error some like `hex is not function`).
  * */
  if (typeof Buffer.from === 'function' && process.version >= "v5.10.0") {
    return Buffer.from.apply(null, args);
  }

  args.unshift(null);
  return new (Function.prototype.bind.apply(Buffer, args));
}
