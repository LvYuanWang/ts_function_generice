/* 理解泛型 */

// 当我们需要定义一个函数, 这个函数的作用就是传入什么类型的数据, 就返回什么类型的数据
// 但是需要注意的是, 在 TS 中创建函数必须要指定参数的类型, 不指定类型就会默认为 any 类型这样也会报错, 然而函数重载也是可以解决这个问题, 但是最优解决方案还是使用泛型
function identityOverload(value: string): string;
function identityOverload(value: number): number;
function identityOverload(value: boolean): boolean;
function identityOverload(value: number[]): number[];
function identityOverload(value: string[]): string[];
function identityOverload(value: object): object;
function identityOverload(value: string | number | boolean | number[] | string[] | object) {
  return value
}

// 由此看来这样特别麻烦, 而且还不够灵活, 所以我们可以使用泛型来解决这个问题
const s = identityOverload({ id: 1, name: 'John' });
// console.log(s.name) // error

// 使用泛型解决
function identity<T>(value: T): T {
  return value
}

type User = {
  id: number,
  name: string
}

let user: User = {
  id: 1,
  name: "John"
}

// const s1 = identity<string>("hello")
// const s2 = identity<number>(123)
// const s3 = identity<User>(user)
// console.log(s3.name);

const s1 = identity("hello")
const s2 = identity(123)
const s3 = identity(user)
console.log(s3.name);


// 传入相同的两个参数, 得到这个类型的数组
function getArray<T>(a: T, b: T) {
  return [a, b]
}
const as = getArray<string>("a", "b");

// 简化上节课的例子
function myNumberFilter(arr: number[], callback: (item: number, index?: number) => boolean): number[] {
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
// function filter<T>(arr: T[], callback: (item: T, index?: number) => boolean): T[] {
//   const result = [];
//   for (let i = 0; i < arr.length; i++) {
//     const item = arr[i];
//     if (callback(item)) {
//       result.push(item);
//     }
//   }
//   return result;
// }

const filter = <T>(arr: T[], callback: (item: T, index?: number) => boolean): T[] => {
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
console.log(filterArr2);  // [ 2, 4 ]

const filterArr3 = filter(["xxx.js", "aaa.ts", "bbb.java", "ccc.md"], item => item.endsWith(".ts"));
console.log(filterArr3);  // [ 'aaa.ts' ]