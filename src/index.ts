/* 类型别名与接口使用泛型 */

function uniqueArray<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr));
}

const arr1 = [1, 2, 3, 3, 4, 5, 5, 6, 6, 7, 3, 1];
const arr2 = ['a', 'b', 'c', 'c', 'd', 'e', 'e', 'f', 'f', 'g', 'c', 'a'];

const arr3 = uniqueArray(arr1);
const arr4 = uniqueArray(arr2);
console.log(arr3); // [1, 2, 3, 4, 5, 6, 7]
console.log(arr4); // ['a', 'b', 'c', 'd', 'e', 'f', 'g']


// 当然类型别名也可以结合泛型使用, 简称泛型别名
type User = {
  id: number | string,
  name: string,
  tel: string,
  address: string
}
type Computer = {
  id: number | string,
  name: string,
  brand: string,
  price: number
}

// 这里如果不用泛型的话, 就非常不灵活等于这个data字段的内容被定死了, 但是使用泛型的话, 就可以根据传入的类型来确定data字段的类型
type ResultData<T> = {
  message: string;
  code: number;
  data: T;
}

type UserData = ResultData<User>;
type ComputerData = ResultData<Computer>;

const userResultData: UserData = {
  message: 'success',
  code: 200,
  data: {
    id: 1,
    name: 'Joker',
    tel: '13800138000',
    address: 'Beijing'
  }
}
const computerResultData: ComputerData = {
  message: 'success',
  code: 200,
  data: {
    id: '2',
    name: 'MacBook Pro',
    brand: 'Apple',
    price: 10000
  }
}


type MyEvent<T> = {
  target: T,
  type: string
}

// type TimeEvent<T> = {
//   event: MyEvent<T>,
//   from: Date,
//   to: Date
// }

// 使用接口结合泛型和类型别名没多大差别, 只需要将type改为interface、将等号去掉即可
interface TimeEvent<T> {
  event: MyEvent<T>,
  from: Date,
  to: Date
}

const myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('button'), // 报错, 因为document.querySelector('button')返回的是Element | null, 这里也可以使用非空断言来解决这个问题
  type: 'click'
}

const timerEvent: TimeEvent<HTMLDivElement | null> = {
  event: {
    target: document.querySelector('div'),
    type: 'mouseover'
  },
  from: new Date(),
  to: new Date()
}

function triggerEvent<T>(event: MyEvent<T>) {
  // todo Something ...
  console.log(event.target);
}

triggerEvent({
  target: document.querySelector('canvas'),
  type: 'click'
})

type Nullable<T> = T | null | undefined;

let str: Nullable<string> = null;
str = 'Hello World';

let u: Nullable<Computer> = null;
u = {
  id: '1',
  name: 'MacBook Pro',
  brand: 'Apple',
  price: 30000
}


// 当然也可以给函数用泛型定义一个调用签名
// function filter<T>(arr:T[], callback:(item: T,index?:number) => boolean):T[] {
//   const result = [];
//   for (let i = 0; i < arr.length; i++) {
//     const item = arr[i];
//     if (callback(item)) {
//       result.push(item);
//     }
//   }
//   return result;
// }

// const filterArr2 = filter(["xxx.js","aaa.java","bbb.md"], item => item.endsWith(".js"));
// console.log(filterArr2);

type Filter<T> = (arr: T[], callback: (item: T, index?: number) => boolean) => T[];
// 也可以限制只能传入number类型的数组
const filter: Filter<number> = (arr, callback) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (callback(item)) {
      result.push(item);
    }
  }
  return result;
}
const filterArr = filter([1, 2, 3, 4, 5, 6, 7, 8], item => item % 2 === 0);
console.log(filterArr); // [2, 4, 6, 8]


// 有时候不是所有地方都能用到泛型, 必须得自己限制, 比如
// function add<T>(a: T, b: T): T {
//   return a + b; // 报错, 因为不是所有类型都支持+操作
// }

// 正确写法
type Add<T> = (a: T, b: T) => T;
const add: Add<string> = (a, b) => a + b;