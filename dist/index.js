"use strict";
/* 受限的泛型 */
function getObj(obj) {
    return obj;
}
getObj({ id: 1, name: 'Tom' });
function getLength(obj) {
    // todo ...
    return obj.length;
}
// 只要传入的对象有length属性就可以
getLength('123');
getLength([1, 2, 3]);
getLength({ length: 10 });
// getLength({ name: 'Tom' }); // 报错: 对象字面量只能指定已知属性，`length` 属性不存在于类型 `{ name: string; }` 中
// 封装一个函数, 函数的两个参数的长度相减, 获取长度的差值
function compare(a, b) {
    return a.length - b.length;
}
const result = compare([1, 2, 3], '123');
const result2 = compare([1, 2, 3], { length: 2 });
// compare([1, 2, 3], { name: 'Tom' }); // 报错: 对象字面量只能指定已知属性，`length` 属性不存在于类型 `{ name: string; }` 中
console.log(result, result2); // 0 1
const a = { value: 'a' };
const b = { value: 'b', isLeaf: true };
const c = { value: 'c', children: [a, b] };
function mapNode(node, fn) {
    return {
        ...node,
        value: fn(node.value)
    };
}
const a1 = mapNode(a, value => value.toUpperCase());
const b1 = mapNode(b, value => value + ' Joker');
const c1 = mapNode(c, value => value.toLowerCase());
console.log(a1, b1, c1); // { value: 'A' } { value: 'b Joker', isLeaf: true } { value: 'c' }
