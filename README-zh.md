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

# Node CRC16 - ([README in English](./README.md))

[MODBUS][1]是一种应用层消息通讯协议, 使得用各种不同类型的总线或网络连接的设备支持C/S通信,被广泛应用于嵌入式应用通讯开发。协议中通信数据包的“CRC循环冗余校验和”的生成与校验, 如[MODBUS串行线通信][2](第42页),[Modbus-RTU通信][3](第75页)，都采用了同一种算法。

本模块实现了该算法的 _查表法_ C++代码实现, Node原生模块的封装, 以及NodeJS模块的封装。

*本模块有充分的单元测试和完善的使用文档。*

## 版本选择

如果你的`Node`版本小于`v8.x.x`，请使用本模块的`v1.x.x`版本，否则请使用`v2.x.x`。 在本模块`v2.x.x`中，引入了`NAPI`来实现原生模块，有更好的兼容性。

## 使用

温馨提示: 其实最好的方法使用说明, 在[源码](./index.js)的注释与[单元测试](./test)的代码里面 :)

### 安装
`npm install node-crc16`

### 生成校验和`crc16.checkSum`
`checkSum`接收三个参数，前两个参数 `(input, [encoding])` 其实是为了生成一个`Buffer`
```javascript
crc16.checkSum('一个utf8字符串', 'utf8')
```
`encoding`默认值为`hex`
```javascript
var sum = crc16.checkSum('a031ffb7');
sum.should.equal('726d');
```
第三个参数`option`，是对象类型。
 + `option.retType`，返回校验和的格式，取值：
    * 默认值`hex`，2字节大端字节序hex编码，如`726d`
    * `array`, 校验和单字节数组，如`[114, 109]`
    * `int`，校验和16字节整型，如`29293`
    * `buffer`，校验和以`Buffer`类型返回，如`<Buffer 72 6d>`
```javascript
var sum = crc16.checkSum('a031ffb7', {retType: 'array'});
sum.should.eql([114, 109]);
```


### 验证校验和`crc16.verifySum`
`verifySum`传参与`checkSum`一致，前两个参数都是为了生成一个`Buffer`,且`Buffer`包含校验和
```javascript
var stream = 'a031ffb7',
    sum = '726d';
var isValid = crc16.verifySum(stream + sum);
isValid.should.equal(true);
```



## 贡献代码

### 获取源码
```sh
# fork 源码，然后克隆到本地
git clone git@github.com:imnemo/crc16.git
cd crc16
```

### 目录结构
```
├── lib         //CRC16算法的C++实现
├── util        //工具方法
├── src         //Node原生模块的实现
├── test        //JS单元测试代码
├── test_cpp    //C++单元测试代码
├── index.js    //Node模块入口文件
```

### 安装依赖
`npm install`

### C++单元测试
CRC16生成与校验算法的C++实现是独立的，如有修改该文件，完成后请编写相应的单元测试代码。
C++单元测试请参考的[Catch](https://github.com/philsquared/Catch)，完成后请执行：
```bash
make test
```
保证全部测试用例通过。

### JS单元测试
`npm test` 或者 `./node_modules/.bin/mocha --reporter spec`

### 性能基准测试
#### 使用benchmark.js
```bash
 >>> npm run benchmark

> node-crc16@1.0.0 benchmark /Users/nemo/code/imnemo/crc16
> node benchmark/benchmark.js

CEC16#checkSum x 905,071 ops/sec ±2.00% (83 runs sampled)
CRC16#verifySum x 1,540,940 ops/sec ±19.92% (65 runs sampled)
Fastest is CRC16#verifySum
```

#### 使用nanobench
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

### 提交
所有单元测试通过后，您就可以Pull一个Request了 :)


## TODO
  - [x] 增加JS代码lint
  - [x] 增加变更日志
  - [x] 增加JS代码单元测试
  - [x] 增加JS代码测试覆盖率
  - [x] 增加C++代码单元测试
  - [x] 增加持续集成
  - [x] 增加性能测试
  - [x] 用NAPI重构Node原生模块部分
  - [x] 添加 `index.js.d` 文件
  - [ ] 支持全局模块，提供CLI
  - [ ] 增加打赏入口

  ---
<p align="center">
twitter: <a href="https://twitter.com/imoncoding" alt="@imoncoding">@imoncoding</a>
</p>
<p align="center">
<img width="430" height="430" src="http://cdn-qiniu.algovis.fun/imnemo/qrcode_for_mp_oncoding.jpg" alt="qrcode_mp_oncoding">
</p>
<p align="center">一个追求专业、规范、极简, 关注技术本质，笃信万物相通的公众号!</p>



[1]: http://modbus.org/specs.php
[2]: https://www.honeywellprocess.com/library/support/Public/Documents/51-52-25-66.pdf
[3]: http://modbus.org/docs/Modbus_over_serial_line_V1_02.pdf
