type CheckSumOption = {
  retType?: string = 'hex',
  (key?: string): any
};

type CheckSumOptionWithoutRetType = {
  (key?: string): any
};

// export function checkSum(input: string, encoding?: string = 'hex', option?: CheckSumOption): string | array | number | Buffer;

export function checkSum(input: string): string;
export function checkSum(input: string, option: {retType: 'hex'}): string;
export function checkSum(input: string, option: {retType: 'array'}): [];
export function checkSum(input: string, option: {retType: 'int'}): number;
export function checkSum(input: string, option: {retType: 'buffer'}): Buffer;

export function checkSum(input: string, encoding: BufferEncoding = 'hex'): string;
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: 'hex'}): string;
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: 'array'}): [];
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: 'int'}): number;
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: 'buffer'}): Buffer;

export function checkSum(input: Buffer): string;
export function checkSum(input: Buffer, option?: {retType: 'hex'}): string;
export function checkSum(input: Buffer, option?: {retType: 'array'}): string;
export function checkSum(input: Buffer, option?: {retType: 'int'}): string;
export function checkSum(input: Buffer, option?: {retType: 'buffer'}): string;

