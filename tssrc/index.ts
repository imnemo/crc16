import * as bufferFactory from 'buffer-factory';
const crc16Native = require('../build/Release/crc16.node');

type RetType = 'hex' | 'array' | 'int' | 'buffer' | null;

type NodeCRC16Option = {
  retType?: RetType
} & {
  (key?: string): any
} | {};

interface CheckSum
{
  (input: string, option: {retType: 'hex'}): string;
  (input: string, option: {retType: 'array'}): [];
  (input: string, option: {retType: 'int'}): number;
  (input: string, option: {retType: 'buffer'}): Buffer;
  (input: string, option?: {retType: any}): string;

  (input: string, encoding: BufferEncoding, option: {retType: 'hex'}): string;
  (input: string, encoding: BufferEncoding, option: {retType: 'array'}): [];
  (input: string, encoding: BufferEncoding, option: {retType: 'int'}): number;
  (input: string, encoding: BufferEncoding, option: {retType: 'buffer'}): Buffer;
  (input: string, encoding: BufferEncoding, option?: {retType: any}): string;

  (input: Buffer, option: {retType: 'hex'}): string;
  (input: Buffer, option: {retType: 'array'}): [];
  (input: Buffer, option: {retType: 'int'}): number;
  (input: Buffer, option: {retType: 'buffer'}): Buffer;
  (input: Buffer, option?: {retType: any}): string;
}

interface VerifySum
{
  (input: string, encoding?: string): boolean;
  (input: Buffer): boolean;
}

const parseParam = function(input: string | Buffer, encoding?: BufferEncoding | NodeCRC16Option, option?: NodeCRC16Option) {
  encoding = encoding || 'hex';
  if (typeof encoding === 'object') {
    option = encoding;
    encoding = 'hex';
  }
  option = option || {};

  const buf: Buffer | null = (function() {
    if (typeof input === 'string') {
      try {
        input = bufferFactory.create(input, encoding);
      } catch (e) {
        console.trace(e);
        return null;
      }
    }
    if (Buffer.isBuffer(input) && input.length > 0 && input.byteLength > 0) {
      return input;
    }
    return null;
  }());

  if (buf === null) {
    throw new TypeError(`crc16.${arguments.callee.caller.name} input param invalid!`);
  }

  return { buf, option };
};

export const checkSum: CheckSum = (input: string | Buffer, encoding?: BufferEncoding | NodeCRC16Option, option?: NodeCRC16Option) => {
  const param = parseParam(input, encoding, option);
  const sum = crc16Native.checkSum(param.buf, param.option);
  return sum;
}

export const verifySum: VerifySum = (input: string | Buffer, encoding?: BufferEncoding | NodeCRC16Option) => {
  const param = parseParam(input, encoding);
  return crc16Native.verifySum(param.buf, param.option);
}

