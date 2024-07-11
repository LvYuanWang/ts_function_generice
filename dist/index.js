"use strict";
/* 函数的声明与调用 */
Object.defineProperty(exports, "__esModule", { value: true });
function add(a, b) {
    return a + b;
}
const sum = add(1, 2);
function sayHello(name) {
    return `hello ${name}`;
}
const sayHello2 = function (name) {
    return `hello ${name}`;
};
const sayHello3 = (name) => {
    return `hello ${name}`;
};
const sayHello4 = (name) => `hello ${name}`;
const sayHello5 = (name) => {
    if (name === "admin") {
        return "hello admin";
    }
    return;
};
// 可选参数与默认参数
function sendMessage(userId, message) {
    console.log(userId);
    console.log('message: ', message);
}
sendMessage(1);
function sendMessage2(userId, message = "hello") {
    console.log(userId);
    console.log('message: ', message);
}
sendMessage2(1, "world");
function argSum() {
    // reduce(callback, initialValue): initialValue 为初始值，如果没有传入，则默认为数组的第一个元素
    /*
    具体来说，reduce 方法的签名如下：
    array.reduce(callback, initialValue);
    - callback 是一个回调函数，接受四个参数：
      -- accumulator：累加器，保存上一次调用回调函数的结果。
      -- currentValue：数组中正在处理的当前元素。
      -- currentIndex（可选）：数组中正在处理的当前元素的索引。
      -- array（可选）：调用 reduce 的数组。
    - initialValue 是累加器的初始值。
    */
    return Array.from(arguments).reduce((result, item) => result + item, 0);
}
// 在 TS 中这段代码会报错, 但是在 JS 中是可以正常运行的
const sumResult = argSum(1, 2, 3, 4, 5);
console.log(sumResult);
