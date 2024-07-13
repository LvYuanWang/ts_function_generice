## 调用签名

我们现在在讲函数，那么我们声明的函数到底是什么类型呢？就是一个`Function`类型吗？

其实，和我们之前讲的对象类型一样，object能描述所有对象，function也可以描述所有函数，但是并不能体现函数的具体类型

```typescript
function add(a: number, b: number) { 
  return a + b;
}
```

像上面这样的函数，我们可以用Typescript进行描述

```typescript
(a: number, b: number) => number
```

这是Typescript表示函数类型的句法，也称为**调用签名**。

> 函数的调用签名只包含类型层面的代码，即只有类型，没有值。因此，函数的调用签名可以表示参数的类型、this的类型、返回值的类型。剩余参数的类型和可选参数的类型，但是无法表示默认值（因为默认值是值，不是类型）。调用签名没有函数体，无法推导出返回类型，所以必须显式的注解
>
> 函数签名其实对我们写函数也有指导意义。

```typescript
type Greet = (name: string) => string;
function greet(name: string) { return name }

type Log = (userId: number, message?: string) => void;
function log(userId: number, message="hello") {}

type SumFn = (...numbers: number[]) => number;
function sumFn(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
```

我们可以把调用签名和函数表达式结合起来

```typescript
type Log = (userId: number, message?: string) => void;
const log: Log = (userId, message) => {
  console.log(userId, message);
}
```

将函数表达式注解为Log类型后，你会发现，不必再此注解参数的类型，因为在定义Log类型的时候已经注解了message和userId的类型。Typescript能从Log中推导出来，同理，返回值类型其实也是一样（当然返回值类型本身就能帮我们进行推导）

上面使用的都是类型别名，当然也能使用`interface`

```typescript
interface Log {
  (userId: number, message?: string): void;
}

// type Log = (userId: number, message?: string) => void;
const log: Log = (userId, message) => {
  console.log(userId, message);
}
```

其实，如果我们已经有具体的函数了，完全可以通过`typeof`获取函数的类型声明

```typescript
function greet(name: string) { return name }

function log(message: string, userId="xxx1") {}

function sumFn(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

type Greet = typeof greet;
type Log = typeof log;
type SumFn = typeof sumFn;
```

如果是有回调函数，一样添加回调函数相关声明就行了

```typescript
function handleData(data: string, callback:(err: Error | null, result: string) => void):void {
  // 模拟一些操作
  if (data === "error") {
    callback(new Error("An error occurred"), "");
  } else {
    callback(null, `Processed data: ${data}`);
  }
}
```

当然可以把`callback`的声明再提取成一个类型别名

```typescript
// 注意：没有用模块化，类型别名的命名容易和全局变量冲突, 比如ErrorCallback
type ErrorCB = (err: Error | null, result: string) => void;

function handleData(data: string, callback:ErrorCB):void {
  ......
}
```

当然也能够整个函数提取为类型别名或者接口，交给函数表达式处理：

```typescript
type ErrorCB = (err: Error | null, result: string) => void;

type HandleData = (data: string, callback: ErrorCB) => void;

const handleData: HandleData = (data, callback) => { 
  // 模拟一些操作
  if (data === "error") {
    callback(new Error("An error occurred"), "");
  } else {
    callback(null, `Processed data: ${data}`);
  }
}
```

当然了，也能使用typeof直接获取已有函数的类型声明：

```typescript
type HandleData = typeof handleData;
```

在对象字面量类型中声明函数类型，和普通的函数类型声明没有什么差别：

```typescript
type User = {
  name: string;
  id: number;
  show: (name: string) => void;
  info(id: number): string;
}
```

## 上下文类型推导

直接把函数类型进行声明，Typescript能从上下文中推导出参数的类型。这是Typescript类型推导的一个强大特性，我们一般称为**上下文类型推导**。

**上下文类型推导，在某些时候非常的有用，比如回调函数中**

```typescript
function times(fn: (index: number) => void, n: number) { 
  for (let i = 0; i < n; i++) { 
    fn(i);
  }
}

times((n:number) => console.log(n), 4);
```

上面的函数times的回调函数fn，强调需要一个number类型的参数，并且没有返回类型。

当我在调用times函数的时候，当然需要传入这个一个回调函数`(n:number) => console.log(n)`

按照正常情况，既然是一个函数，那么函数中传递的参数，就应该声明类型。

但是，这里其实我们可以省略，直接简写为:

```typescript
times(n => console.log(n), 4);
```

因为Typescript能从上下文推导出n是一个数字，因为在times的签名中，我们声明回调函数f的参数index是一个数字。那么Typescript就能推导出，下面传入的回调函数中的参数n，就是那个参数，该参数的类型必然应该是number类型

但是，也有需要注意的地方：

> 如果回调函数的声明不是在行内直接声明，那么Typescript无法推导出它的类型

```typescript
const fn = (n) => console.log(n); // error 参数n隐式具有“any”类型
times(fn, 4);
```

这个错误当然也很好理解，外部直接声明的fn相当于是一个全新的函数了，在声明的时候和times函数是没有任何关联的，当然不可能进行上下文类型推导