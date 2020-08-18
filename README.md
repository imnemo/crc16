[![Build Status](https://travis-ci.org/imnemo/crc16.svg?branch=master)](https://travis-ci.org/imnemo/crc16)
[![Coverage Status](https://coveralls.io/repos/github/imnemo/crc16/badge.svg?branch=master)](https://coveralls.io/github/imnemo/crc16?branch=master)
<a href="https://www.npmjs.com/package/node-crc16" alt="NPM latest version"><img src="https://img.shields.io/npm/v/node-crc16.svg"></a>
<a href="https://www.npmjs.com/package/node-crc16" alt="NPM total downloads"><img src="https://img.shields.io/npm/dt/node-crc16.svg"></a>
<a href="https://github.com/imnemo/crc16" alt="Github stars"><img src="https://img.shields.io/github/stars/imnemo/crc16.svg?style=social&label=Star"></a>
<a href="https://github.com/imnemo/crc16" alt="Github forks"><img src="https://img.shields.io/github/forks/imnemo/crc16.svg?style=social&label=Fork"></a>
<a href="https://npms.io/search?q=node-crc16" alt="NPM latest version"><img src="https://badges.npms.io/node-crc16.svg"></a>
<a href="https://npm.runkit.com/node-crc16"><img src="https://badge.runkitcdn.com/node-crc16.svg" alt="Try node-crc16 on RunKit"/></a>
<a href="https://deepscan.io/dashboard/#view=project&pid=1291&bid=3472"><img src="https://deepscan.io/api/projects/1291/branches/3472/badge/grade.svg" alt="DeepScan Grade"></a>
<a href="https://github.com/imnemo/crc16" alt="Github contributors"><img src="https://img.shields.io/github/contributors/imnemo/crc16.svg"></a>
<a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fimnemo%2Fcrc16?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fimnemo%2Fcrc16.svg?type=shield"/></a>

# Node CRC16 - ([中文版README](./README-zh.md))
[MODBUS][1] is an application-layer messaging protocol, positioned at level 7 of the OSI model. It provides client/server communication between devices connected on different types of buses or networks.The `CRC`(Cyclic Redundancy Check) part in protocol, such as [MODBUS over serial line][2](Page 42), and [Modbus-RTU][3](Page 75), adopt the same one algorithm.

`node-crc16` implement the c++ version of this algorithm by table look-up, and also provide a node native addon and a nodejs version wrapper.

*This module has been well unit tested and documented.*

## Versions

If your version of node.js is lower than `v8.x.x`, please use the latest `v1.x.x` of this module, or you should select `v2.x.x`, which uses `NAPI` to implement native addon gracefully and compatibly.

## Usage

Tips: the most intuitive decription about this module is the comment in [src](./index.js) and the code in [unit test](./test) :).

### Install
`npm install node-crc16`

### generate a sum by `crc16.checkSum`
`checkSum`accept three params, the first two params `(input, [encoding])` construct a `Buffer`
```javascript
crc16.checkSum('utf8 string', 'utf8')
```
default `encoding` is `hex`
```javascript
var sum = crc16.checkSum('a031ffb7');
sum.should.equal('726d');
```
the third param is `option`，which type is `Object`
 + `option.retType` set the format of the returned sum
    * default is `hex`，two bytes BigEndian hex string, `726d`
    * `array`, two unsigned char number of the returned sum，`[114, 109]`
    * `int`，one unsigned short number of the returned sum，`29293`
    * `buffer`，Buffer type of the returned sum，`<Buffer 72 6d>`
```javascript
var sum = crc16.checkSum('a031ffb7', {retType: 'array'});
sum.should.eql([114, 109]);
```


### verify a sum by `crc16.verifySum`
Params of `verifySum` is same as `checkSum`, the first two params are used to constructe a `Buffer` which contains the `sum` to be verified.
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
The implemention of `CRC16` checking and verifing algorithm in c++  is standalone in `./lib/crc16.cc`. If you want to modify it, please write suitable unittest cases. You can reference [Catch](https://github.com/philsquared/Catch), and then run:
```bash
make test
```
> Make sure all the unit testing case is passed after you modify.

### JS unit testing
`npm test` or `./node_modules/.bin/mocha --reporter spec`

### Benchmark
#### use benchmark.js
```bash
 >>> npm run benchmark

> node-crc16@1.0.0 benchmark /Users/nemo/code/imnemo/crc16
> node benchmark/benchmark.js

CEC16#checkSum x 905,071 ops/sec ±2.00% (83 runs sampled)
CRC16#verifySum x 1,540,940 ops/sec ±19.92% (65 runs sampled)
Fastest is CRC16#verifySum
```

#### use nanobench
```bash
 >>> npm run nanobench

> node-crc16@1.0.0 nanobench /Users/nemo/code/imnemo/crc16
> node benchmark/nanobench.js

NANOBENCH version 2
> /Users/nemo/.nvm/versions/node/v8.1.2/bin/node benchmark/nanobench.js

# CRC16#checkSum 2,000,000 times
ok ~3.17 s (3 s + 166422442 ns)

# CRC16#verifySum 2,000,000 times
ok ~2.85 s (2 s + 848059820 ns)

all benchmarks completed
ok ~6.01 s (6 s + 14482262 ns)
```

### pull request
You can pull a request when you complete all steps above.


## TODO
  - [x] Add JS code lint
  - [x] Add changelog
  - [x] Add JS unit test
  - [x] Add JS unit test code covarage
  - [x] Add C++ unit test
  - [x] Add CI
  - [x] Add performance test
  - [x] Refactor node native addon part with NAPI
  - [x] Add `index.js.d`
  - [ ] Add global module supported to provide a cli tool
  - [ ] Add donate entry

---
<p align="center">
twitter: <a href="https://twitter.com/imoncoding" alt="@imoncoding">@imoncoding</a>
</p>
<p align="center">
<img width="430" height="430" src="http://cdn-qiniu.algovis.fun/imnemo/qrcode_for_mp_oncoding.jpg" alt="qrcode_mp_oncoding">
</p>
<p align="center">Welcome to subscribe my wechat!</p>



[1]: http://modbus.org/specs.php
[2]: https://www.honeywellprocess.com/library/support/Public/Documents/51-52-25-66.pdf
[3]: http://modbus.org/docs/Modbus_over_serial_line_V1_02.pdf


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fimnemo%2Fcrc16.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fimnemo%2Fcrc16?ref=badge_large)
