"use strict";
/* 理解泛型 */
function identityOverload(value) {
    return value;
}
// 由此看来这样特别麻烦, 而且还不够灵活, 所以我们可以使用泛型来解决这个问题
const s = identityOverload({ id: 1, name: 'John' });
// console.log(s.name) // error
// 使用泛型解决
function identity(value) {
    return value;
}
let user = {
    id: 1,
    name: "John"
};
// const s1 = identity<string>("hello")
// const s2 = identity<number>(123)
// const s3 = identity<User>(user)
// console.log(s3.name);
const s1 = identity("hello");
const s2 = identity(123);
const s3 = identity(user);
console.log(s3.name);
// 传入相同的两个参数, 得到这个类型的数组
function getArray(a, b) {
    return [a, b];
}
const as = getArray("a", "b");
// 简化上节课的例子
function myNumberFilter(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (callback(item)) {
            result.push(item);
        }
    }
    return result;
}
// 这个例子只能传入 number 类型的数组, 不实用
const filterArr = myNumberFilter([1, 2, 3, 4, 5], item => item > 2);
// 使用泛型优化
function filter(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (callback(item)) {
            result.push(item);
        }
    }
    return result;
}
// 这个例子可以传入任意类型的数组
const filterArr2 = filter([1, 2, 3, 4, 5], item => item % 2 === 0);
console.log(filterArr2); // [ 2, 4 ]
const filterArr3 = filter(["xxx.js", "aaa.ts", "bbb.java", "ccc.md"], item => item.endsWith(".ts"));
console.log(filterArr3); // [ 'aaa.ts' ]
