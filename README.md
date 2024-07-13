## 类型别名与接口使用泛型

数组，类型别名，类和接口中都能使用泛型

数组使用泛型：

```typescript
function unique<T>(array: Array<T>): T[] { 
  return Array.from(new Set(array));
}

const arr1:number[] = [1, 2, 2, 3, 4, 4];
const arr2: Array<string> = ["a", "b", "b", "c", "d", "a"];

const arr3 = unique(arr1);
const arr4 = unique(arr2);
console.log(arr3)
console.log(arr4)
```

在类型别名中当然也能使用泛型，一般简称为泛型别名。

比如我们在获取后端数据返回内容的时候，一般都是有code，message和data，code和message都好说，但是data里面到底有什么是确定不了的，如果我们希望把返回内容封装成一个类型别名，那么就需要使用泛型

```typescript
type ResultData<T> = {
  message: string,
  code: number,
  data: T
}

type User = {
  id: number,
  name: string
  tel: string
  address?: string
}

type UserData = ResultData<User>;
```

当然泛型别名之间也能互相调用，函数中也可以调用泛型别名

```typescript
type MyEvent<T> = {
  target: T
  type: string
}

type TimedEvent<T> = {
  event: MyEvent<T>
  from: Date
  to: Date
}

const myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector("#btn"),
  type: "click"
}

const timedEvent: TimedEvent<HTMLElement | null> = {
  event: {
    target: document.querySelector("#div"),
    type: "click"
  },
  from: new Date(),
  to: new Date()
}

function triggerEvent<T>(event: MyEvent<T>): void { 
  // ...
}
triggerEvent({
  target: document.querySelector("#layer"),
  type: "click"
});
```

当然，接口中使用泛型和类型别名没啥区别。上面的代码直接将类型别名改为接口就直接使用了。

```typescript
interface MyEvent<T> {
  target: T
  type: string
}

interface TimedEvent<T> {
  event: MyEvent<T>
  from: Date
  to: Date
}
```

有时候还可以利用泛型别名给我们写TS代码带来一些方便，比如在Typescript是`strict`声明下，是不能给一个已经固定类型的定义为null值的，如果我们平时写Javascript的时候习惯了定义某些值的时候给一个null，那Typescript的这种限定就稍稍觉得有那么一点不习惯

```typescript
type Nullable<T> = T | null | undefined;

const str: Nullable<string> = null;

type User = {
  id: number,
  name: string
  tel: string
  address?: string
}

let user: Nullable<User> = null;
user = {
  id: 1,
  name: "aaa",
  tel: "123456"
}
```

当然，你也可以在函数的调用签名中使用泛型，其实就是一个特定函数的类型别名嘛，比如之前的filter函数，我们可以直接用调用签名进行约束

```typescript
function filter<T>(arr:T[], callback:(item: T,index?:number) => boolean):T[] { 
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (callback(item)) {
      result.push(item);
    }
  }
  return result;
}
const filterArr2 = filter(["xxx.js","aaa.java","bbb.md"], item => item.endsWith(".js"));
console.log(filterArr2);
```

上面是之前函数声明的写法

```typescript
type Filter<T> = (arr: T[], callback: (item: T, index?: number) => boolean) => T[];
```

现在写成了调用签名，相当于要直接约束某个函数的写法了，所以具体在写函数的时候，就需要传递具体的类型了

```typescript
type Filter<T> = (arr: T[], callback: (item: T, index?: number) => boolean) => T[];

const myFilter: Filter<number> = (arr, callback) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (callback(item)) {
      result.push(item);
    }
  }
  return result;
}
```

不要混淆类型操作

```typescript
// add
// function add<T>(a: T, b: T) { 
//   return a + b; // 加号需要有特定类型才能操作
// }

type Add<T> = (a: T, b: T) => T;

const add: Add<string> = (a, b) => a + b;
```

