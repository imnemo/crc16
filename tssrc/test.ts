import {checkSum, verifySum} from './index';

let sum = checkSum('2b', {retType: 'buffer'});
console.log(sum);

let isValid = verifySum('3a16070a00000000001a000098af');
console.log(isValid);