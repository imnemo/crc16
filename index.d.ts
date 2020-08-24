type RetType = 'hex' | 'array' | 'int' | 'buffer';

type CheckSumOption = {
  retType?: RetType
} & {
  (key?: string): any
};

// export function checkSum(input: string, encoding?: string | CheckSumOption, option?: CheckSumOption): string | number | [] | Buffer;

export function checkSum(input: string): string;
export function checkSum(input: string, option: {retType: 'hex'}): string;
export function checkSum(input: string, option: {retType: 'array'}): [];
export function checkSum(input: string, option: {retType: 'int'}): number;
export function checkSum(input: string, option: {retType: 'buffer'}): Buffer;
export function checkSum(input: string, option: {retType: RetType}): string;

export function checkSum(input: string, encoding: BufferEncoding = 'hex'): string;
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: 'hex'}): string;
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: 'array'}): [];
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: 'int'}): number;
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: 'buffer'}): Buffer;
export function checkSum(input: string, encoding: BufferEncoding = 'hex', option?: {retType: RetType}): Buffer;

export function checkSum(input: Buffer): string;
export function checkSum(input: Buffer, option?: {retType: 'hex'}): string;
export function checkSum(input: Buffer, option?: {retType: 'array'}): string;
export function checkSum(input: Buffer, option?: {retType: 'int'}): string;
export function checkSum(input: Buffer, option?: {retType: 'buffer'}): string;
export function checkSum(input: Buffer, option?: {retType: RetType}): string;

export function verifySum(input: string, encoding?: string): boolean;
export function verifySum(input: Buffer): boolean;

