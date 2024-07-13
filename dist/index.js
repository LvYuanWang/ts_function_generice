"use strict";
/* 类型别名与接口使用泛型 */
function uniqueArray(arr) {
    return Array.from(new Set(arr));
}
const arr1 = [1, 2, 3, 3, 4, 5, 5, 6, 6, 7, 3, 1];
const arr2 = ['a', 'b', 'c', 'c', 'd', 'e', 'e', 'f', 'f', 'g', 'c', 'a'];
const arr3 = uniqueArray(arr1);
const arr4 = uniqueArray(arr2);
console.log(arr3); // [1, 2, 3, 4, 5, 6, 7]
console.log(arr4); // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
const userResultData = {
    message: 'success',
    code: 200,
    data: {
        id: 1,
        name: 'Joker',
        tel: '13800138000',
        address: 'Beijing'
    }
};
const computerResultData = {
    message: 'success',
    code: 200,
    data: {
        id: '2',
        name: 'MacBook Pro',
        brand: 'Apple',
        price: 10000
    }
};
const myEvent = {
    target: document.querySelector('button'), // 报错, 因为document.querySelector('button')返回的是Element | null, 这里也可以使用非空断言来解决这个问题
    type: 'click'
};
const timerEvent = {
    event: {
        target: document.querySelector('div'),
        type: 'mouseover'
    },
    from: new Date(),
    to: new Date()
};
function triggerEvent(event) {
    // todo Something ...
    console.log(event.target);
}
triggerEvent({
    target: document.querySelector('canvas'),
    type: 'click'
});
let str = null;
str = 'Hello World';
