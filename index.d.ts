type RetType = 'hex' | 'array' | 'int' | 'buffer';

type CheckSumOption = {
  retType?: RetType
} & {
  (key?: string): any
};

// export function checkSum(input: string, encoding?: string | CheckSumOption, option?: CheckSumOption): string | number | [] | Buffer;

export function checkSum(input: string, option: {retType: 'hex'}): string;
export function checkSum(input: string, option: {retType: 'array'}): [];
export function checkSum(input: string, option: {retType: 'int'}): number;
export function checkSum(input: string, option: {retType: 'buffer'}): Buffer;
export function checkSum(input: string, option?: {retType: any}): string;

export function checkSum(input: string, encoding: BufferEncoding, option: {retType: 'hex'}): string;
export function checkSum(input: string, encoding: BufferEncoding, option: {retType: 'array'}): [];
export function checkSum(input: string, encoding: BufferEncoding, option: {retType: 'int'}): number;
export function checkSum(input: string, encoding: BufferEncoding, option: {retType: 'buffer'}): Buffer;
export function checkSum(input: string, encoding: BufferEncoding, option?: {retType: any}): string;

export function checkSum(input: Buffer, option: {retType: 'hex'}): string;
export function checkSum(input: Buffer, option: {retType: 'array'}): [];
export function checkSum(input: Buffer, option: {retType: 'int'}): number;
export function checkSum(input: Buffer, option: {retType: 'buffer'}): Buffer;
export function checkSum(input: Buffer, option?: {retType: any}): string;

export function verifySum(input: string, encoding?: string): boolean;
export function verifySum(input: Buffer): boolean;

