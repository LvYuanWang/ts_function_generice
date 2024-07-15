"use strict";
/* 多泛型 */
// 示例一: 创建一个通用的交换函数, 它接受一个包含两个元素的数组, 并返回元素交换位置后的数组
function sameTypeSwap(arr) {
    return [arr[1], arr[0]];
}
// 这样写虽然可以, 但是必须传入两个相同类型的元素, 但是如果想要传入不同类型的元素呢?, 这时候就需要多泛型
const result1 = sameTypeSwap([1, 2]);
console.log(result1); // [2, 1]
// 使用多泛型完成示例一
function swap(arr) {
    return [arr[1], arr[0]];
}
const result2 = swap([1, '2']);
console.log(result2); // ['2', 1]
const result3 = swap([{ id: 1, name: 'Joker' }, false]);
console.log(result3); // [false, { id: 1, name: 'Joker' }]
// 示例二: 如果我们要封装一个类似于数组的map函数，简单来说，给我一个数组，然后根据回调函数，我们能组装成另外一个新的数组，而这个新的数组，可能类型和原来的数组一样，也有可能不一样
// 原生map演示
const arr = [1, 2, 3, 4, 5];
const newArr1 = arr.map((item) => item * 2);
const newArr2 = arr.map(item => `<div>index${item}</div>`);
console.log(newArr1); // [2, 4, 6, 8, 10]
console.log(newArr2); // [ '<div>index1</div>', '<div>index2</div>', '<div>index3</div>', '<div>index4</div>', '<div>index5</div>' ]
// 使用泛型实现
function map(arr, callback) {
    const result = [];
    arr.forEach((element, index) => {
        result.push(callback(element, index));
    });
    return result;
}
const result4 = map([1, 2, 3], (item) => item * 2);
const result5 = map(result1, item => `<div>index${item}</div>`);
console.log(result4); // [2, 4, 6]
console.log(result5); // ['<div>index2</div>', '<div>index1</div>']
