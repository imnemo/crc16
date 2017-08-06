[![Build Status](https://travis-ci.org/imnemo/crc16.svg?branch=master)](https://travis-ci.org/imnemo/crc16)
[![Coverage Status](https://coveralls.io/repos/github/imnemo/crc16/badge.svg?branch=master)](https://coveralls.io/github/imnemo/crc16?branch=master)
<a href="https://www.npmjs.com/package/node-crc16" alt="NPM latest version"><img src="https://img.shields.io/npm/v/node-crc16.svg"></a>
<a href="https://www.npmjs.com/package/node-crc16" alt="NPM total downloads"><img src="https://img.shields.io/npm/dt/node-crc16.svg"></a>
<a href="https://github.com/imnemo/crc16" alt="Github stars"><img src="https://img.shields.io/github/stars/imnemo/crc16.svg?style=social&label=Star"></a>
<a href="https://github.com/imnemo/crc16" alt="Github forks"><img src="https://img.shields.io/github/forks/imnemo/crc16.svg?style=social&label=Fork"></a>
<a href="https://github.com/imnemo/crc16" alt="Github contributors"><img src="https://img.shields.io/github/contributors/imnemo/crc16.svg"></a>

# Node CRC16 - ([中文版README](./README-zh.md))
[MODBUS][1] is an application-layer messaging protocol, positioned at level 7 of the OSI model. It provides client/server communication between devices connected on different types of buses or networks.The `CRC`(Cyclic Redundancy Check) part in protocol, such as [MODBUS over serial line][2](Page 42), and [Modbus-RTU][3](Page 75), adopt the same one algorithm.

`node-crc16` implement the c++ version of this algorithm by table look-up, and also provide a node native addon and a nodejs version wrapper.

This module has been well unit tested and documented.

## Usage

Tips: the intuitive decription about this module is the comment in [src](./index.js) and the code in [unit test](./test) :).

### Install
`npm install node-crc16`

### generate a sum `crc16.checkSum`
`checkSum`accept three params, the first two params `(input, [encoding])` construct a buffer
```javascript
crc16.checkSum('一个utf8字符串', 'utf8')
```
default `encoding` is `hex`
```javascript
var sum = crc16.checkSum('a031ffb7');
sum.should.equal('726d');
```
the third param is `option`，an object
 + `option.retType` set the format of the returned sum
    * default is `hex`，two bytes BigEndian hex string, `726d`
    * `array`, two unsigned char number of the returned sum，`[114, 109]`
    * `int`，one unsigned short number of the returned sum，`29293`
    * `buffer`，Buffer type of the returned sum，`<Buffer 72 6d>`
```javascript
var sum = crc16.checkSum('a031ffb7', {retType: 'array'});
sum.should.eql([114, 109]);
```


### verify a sum `crc16.verifySum`
Params of `verifySum` is same as `checkSum`, the first two params is to constructed a buffer, which contains the sum to be verified.
```javascript
var stream = 'a031ffb7',
    sum = '726d';
var isValid = crc16.verifySum(stream + sum);
isValid.should.equal(true);
```



## Contribution

### get source code
```sh
# fork and clone the code to your local env
git clone git@github.com:imnemo/crc16.git
cd crc16
```

### code structure
```
├── lib         //CRC16 algorithm implemention in c++
├── util        //Util functions
├── src         //Node Native Addon
├── test        //JS unit testing
├── test_cpp    //C++ unit testing
├── index.js    //Main entry of NodeJS module
```

### install dependencies
`npm install`

### C++ unit testing
`CRC16`check and verify algorithm's implemention in c++ is standalone and in `./lib/crc16.cc`.If you will modify that, please write suitable unit testing case. You can reference [Catch](https://github.com/philsquared/Catch), and then run:
```bash
make test
```
> Make sure all the unit testing case is passed after you modify.

### JS unit testing
`npm test` or `./node_modules/.bin/mocha --reporter spec`

### pull request
You can pull a request when you complete all steps above.


## TODO
  - [ ] Add JS code lint
  - [x] Add changelog
  - [x] Add JS unit test
  - [x] Add JS unit test code covarage
  - [x] Add C++ unit test
  - [x] Add CI
  - [ ] Add performance test
  - [ ] Add global module supported to provide a cli tool
  - [ ] Add donate entry



[1]: http://modbus.org/specs.php
[2]: https://www.honeywellprocess.com/library/support/Public/Documents/51-52-25-66.pdf
[3]: http://modbus.org/docs/Modbus_over_serial_line_V1_02.pdf
