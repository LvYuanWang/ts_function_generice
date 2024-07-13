"use strict";
/* 重载 */
// 比如有这样简单的需求：函数有两个参数，要求两个参数如果都是number类型，那么就做乘法操作，返回计算结果，如果两个参数都是字符串，就做字符串拼接，并返回字符串拼接结果。其他情况直接抛出异常：参数类型必须相同
// function combineNumber(a: number, b: number): number {
//   return a * b;
// }
// function combingString(a: string, b: string): string {
//   return a + b;
// }
// 由此可以看出上面的两个函数虽然达到了要求, 但是代码重复率很高
function combine(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a * b;
    }
    else if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    else {
        throw new Error('参数类型必须相同');
    }
}
const result = combine("a", 2); // 但是当我参数不一致时, ts并不能报错, 虽然我们在函数内部做了报错处理, 但那只是运行时的报错, 并不是编译时的报错
console.log(result); // 报错
