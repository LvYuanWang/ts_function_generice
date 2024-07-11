/* 函数的声明与调用 */

function add(a: number, b: number) {
  return a + b;
}
const sum = add(1, 2);

function sayHello(name: string) {
  return `hello ${name}`;
}

const sayHello2 = function (name: string) {
  return `hello ${name}`;
}

const sayHello3 = (name: string) => {
  return `hello ${name}`;
}

const sayHello4 = (name: string) => `hello ${name}`;

const sayHello5 = (name: string) => {
  if (name === "admin") {
    return "hello admin"
  }
  return;
}


// 可选参数与默认参数
function sendMessage(userId: number, message?: string) {
  console.log(userId);
  console.log('message: ', message);
}
sendMessage(1);

function sendMessage2(userId: number, message = "hello") {
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
// 如果想屏蔽这个错误则
// @ts-ignore // 忽略错误
const sumResult = argSum(1, 2, 3, 4, 5);
console.log(sumResult); // 15


// 剩余参数
// 使用剩余参数解决上面的错误(这样不仅不会报错, 反而函数的返回类型也有了)
function argSum2(...args: number[]) {
  return args.reduce((result, item) => result + item, 0);
}

const sumResult2 = argSum2(1, 2, 3, 4, 5);
console.log(sumResult2); // 15


// 这样写会报错: 显示 "this" 隐式具有类型 "any"，因为它没有类型注释
// 想要解决这个报错就需要更改 tsconfig.json 中的 noImplicitThis 为 false
// 如果不想更改 tsconfig.json 中的配置, 可以在函数参数中加入 this 的类型
function showDate(this: Date) {
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
}

const time = showDate.call(new Date());
console.log(time);

// 如果你发现下面这条代码没有报错, 那么说明你的 tsconfig.json 中的 strictBindCallApply 配置为 false 这样是不安全的
// const time2 = showDate.apply(null);