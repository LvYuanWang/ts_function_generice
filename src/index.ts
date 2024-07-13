/* 重载 */

// 示例一: 比如有这样简单的需求：函数有两个参数，要求两个参数如果都是number类型，那么就做乘法操作，返回计算结果，如果两个参数都是字符串，就做字符串拼接，并返回字符串拼接结果。其他情况直接抛出异常：参数类型必须相同
function combineNumber(a: number, b: number): number {
  return a * b;
}

function combingString(a: string, b: string): string {
  return a + b;
}

// 由此可以看出上面的两个函数虽然达到了要求, 但是代码重复率很高
function combineNS(a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a * b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  } else {
    throw new Error('参数类型必须相同');
  }
}

const resultData = combineNS("a", 2); // 但是当我参数不一致时, ts并不能报错, 虽然我们在函数内部做了报错处理, 但那只是运行时的报错, 并不是编译时的报错
console.log(resultData);  // 报错

// 使用函数重载
// 重载签名
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
// 重载的实现签名
function combine(a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a * b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  } else {
    throw new Error('参数类型必须相同');
  }
}

// const result = combine(1, '2'); // 报错
const result = combine(1, 2);
console.log(result); // 2


// 示例二: 如果传入string类型，就转换为10进制的number类型，如果传入的是number类型或者其他类型，就调用toString()转换为string类型
function changeTypeNS(x: string | number): string | number {
  return typeof x === 'string' ? parseInt(x, 10) : x.toString();
}
const resultChangeNS = changeTypeNS(6); // resultChange的类型任然是string | number

// 使用函数重载
function changeType(x: string): number;
function changeType(x: number): string;
function changeType(x: number | string): number | string {
  return typeof x === 'string' ? parseInt(x, 10) : x.toString();
}
const resultChange = changeType(6); // resultChange的类型是number


// 示例三: 一个创建dom的函数, 根据传入的tagName创建不同的dom元素
function createElementS(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

const a = createElementS('a'); // 虽然逻辑大概是这样, 但是 a 的类型是 HTMLElement, 并不是 HTMLAnchorElement, 并且函数的参数可以任意传一个string不报错, 比如↓
const img = document.createElement('img'); // img 的类型是 HTMLImageElement

// 使用函数重载
function createElement(tagName: 'a'): HTMLAnchorElement;
function createElement(tagName: 'div'): HTMLDivElement;
function createElement(tagName: 'canvas'): HTMLCanvasElement;
function createElement(tagName: string): HTMLElement {
  return document.createElement(tagName);
}

// const sa = createElement('sa'); // 报错
const div = createElement('div'); // div 的类型是 HTMLDivElement