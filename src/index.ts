/* 调用签名 */

// 类型别名
// function add(a: number, b: number) {
//   return a + b;
// }

type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;

type User = {
  userId: number;
  name: string;
  info: (name: string) => string;
}

let obj: User = {
  userId: 1,
  name: 'Tom',
  info(name) {
    return `hello ${name}`;
  }
}

type Log = (userId: number, message?: string) => void;
const log: Log = function (id) {
  console.log(`userId: ${id}`);
}

type SumFn = (...numbers: number[]) => number;
const sum: SumFn = (...numbers) => numbers.reduce((acc, cur) => acc + cur, 0);

function sumResult(...numbers: number[]) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
type SumFn2 = typeof sumResult;


// 接口
interface InterAdd {
  (a: number, b: number): number;
}

interface InterUser {
  userId: number;
  name: string;
  info(name: string): string;
  add: InterAdd;
}

// 接口只是创建的时候和类型别名有差异, 用法上没有区别
let obj2: InterUser = {
  userId: 1,
  name: 'Tom',
  info(name) {
    return `hello ${name}`;
  },
  add(a, b) {
    return a + b;
  }
}


// callback 的调用签名
type ErrorCallBack = (err: Error | null, data: string) => void;

type HandleData = (data: string, callback: ErrorCallBack) => void;

// 带回调函数的复杂函数
function handleData(data: string, callback: ErrorCallBack) {
  // 模拟处理数据
  if (data === 'error') {
    callback(new Error('no data'), '');
  } else {
    callback(null, `handled ${data}`);
  }
}

// const handleData: HandleData = (data, callback) => {
//   if (data === 'error') {
//     callback(new Error('no data'), '');
//   } else {
//     callback(null, `handled ${data}`);
//   }
// }

type HandleData2 = typeof handleData;

interface Person {
  name: string;
  handle: HandleData;
}
const p: Person = {
  name: 'Tom',
  handle(data, callback) {
    if (data === 'error') {
      callback(new Error('no data'), '');
    } else {
      callback(null, `handled ${data}`);
    }
  }
}


// 上下文类型推导
type Fn = (index: number) => void;

function times(fn: Fn, n: number) {
  for (let i = 0; i < n; i++) {
    fn(i);
  }
}

times((n) => console.log(n), 5);  // 在这里我们不需要指定n的类型, 因为ts会根据上下文推导出n的类型

// const f = (n) => console.log(n);  // 这里我们需要指定n的类型, 因为ts无法推导出n的类型, 就将n的类型推导为any
// times(f, 10);