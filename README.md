## 重载

在某些逻辑较复杂的情况下，函数可能有多组入参类型和返回值类型.

比如有这样简单的需求：函数有两个参数，要求两个参数如果都是number类型，那么就做乘法操作，返回计算结果，如果两个参数都是字符串，就做字符串拼接，并返回字符串拼接结果。其他情况直接抛出异常：参数类型必须相同

> 首先，**很多初学者的直观想法是，我直接声明两个不同的函数不就完了**。
>
> 首先这种做法不是我们要讲的这个概念。另外，其实我们做的事情是一样的，比如`console.log()`函数，我们可以传递number，string，boolean甚至对象，都能实现打印，但是使用用到的都是一个`console.log()`函数，如果不同的参数，对应不同的函数名，那这样对于使用者来说，是极大的心智负担。

根据这样的做法，我们很容易写出下面的代码：

```typescript
function combine(a: number | string, b: number | string){ 
  if (typeof a === "number" && typeof b === "number") { 
    return a * b;
  } else if (typeof a === "string" && typeof b === "string") { 
    return a + b;
  }
  throw new Error("must be of the same type");
}

const result = combine(2, 3);
```

**这个代码，咋看没有任何问题，但实际上隐含了很多问题在里面。**

**第一个，这样的代码实际并没有起到类型约束的效果**，我们要类型系统，目的就是要在编译期间就帮我们提示错误，避免运行时错误，然后再回来调试。而现在这个代码的问题：

1. 参数可以输`number`也可以输入`string`，并没有在编译时就给我提示不能输入不同类型的参数
2. 返回值类型并不固定，两个参数是`number`，那么返回的类型，就应该一定是`number`，但是现在返回的是`string | number`

**第二个，是类型编程语言的常识问题**：在很多静态语言中，一旦指定了特定的参数和返回类型，就只能使用相应的参数调用函数，而且返回值的类型始终如一。而我们已经习惯了Javascript的写法，了解了一点点Typescript语法，就觉得上面应该是没问题的啊，有类型的限定，有函数的自动推导。

其实，在很多静态语言中，上面的写法根本不成立，要么参数指定是数值类型，要么参数固定是字符串类型，也没有所谓的推导，函数返回值类型也必须指定，比如**下面的伪代码**：

```typescript
function combine(a:number, b:number):number{
	return a * b
}
function combine(a:string, b:string):string{
	return a + b
}
```

声明函数的时候就固定好，这样省去了判断的麻烦。

所以，简单来说，其实Typescript对比其他静态编程语言，还是具有一定的动态性，函数的输出类型取决于输入类型的推导。你可以把这个理解为Typescript是更先进的类型系统...也可以理解为是为了兼容Javascript的动态性不得已而为之。

基于这个问题，我们可以使用**函数重载签名（Overload Signature）**来解决这个问题

```typescript
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: number | string, b: number | string){ 
  if (typeof a === "number" && typeof b === "number") { 
    return a * b;
  } else if (typeof a === "string" && typeof b === "string") { 
    return a + b;
  }
  throw new Error("must be of the same type");
}

const result = combine(2, 3);
```

这里我们的三个 `function combine` 其实具有不同的意义：

- `function combine(a: number, b: number): number;`，**重载签名一**，传入 a和b 的值为 number 时，函数返回值类型为 number 。
- `function combine(a: string, b: string): string;`，**重载签名二**，传入 a和b 的值为 string 时，函数返回值类型为 string 。
- `function combine(a: number | string, b: number | string)`，**函数的实现签名**，会包含重载签名的所有可能情况

> 注意：重载签名和实现签名必须放在一起，中间不能插入其他的内容

继续看下面的例子，根据函数传递的参数，如果传入`string`类型，就转换为10进制的`number`类型，如果传入的是`number`类型或者其他类型，就调用`toString()`转换为`string`类型

```typescript
function changeType(x: string | number): number | string { 
  return typeof x === 'string' ? parseInt(x, 10) : x.toString();
}
changeType("1")
```

这样写代码依然和之前的问题一样，不能在编译时提供帮助，因此加上**重载签名**

```typescript
function changeType(x: string): number;
function changeType(x: number): string;
function changeType(x: string | number): number | string { 
  return typeof x === 'string' ? parseInt(x, 10) : x.toString();
}
changeType("2")
```



不过在声明重载的时候，还是有一些细节需要注意，比如，我们模拟`DOM API`中`createElement`函数的处理，这个函数大家都用过，参数传递具体的标签名字符串，就帮我们创建对应的HTML元素

```typescript
function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: "canvas"): HTMLCanvasElement;
function createElement(tag: "table"): HTMLTableElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const a = createElement("a"); // ok
const b = createElement("b"); // error
```

由于重载签名只有`a | canvas | table`的情况，因此，如果调用函数的时候，传入不是这三个类型的字符串就会报错，其实我们可以**再加入一个兜底的重载签名**，如果用户传入自定义标签名，或者一些前沿性的标签名，我们直接返回一般性的`HTMLElement`

```diff
function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: "canvas"): HTMLCanvasElement;
function createElement(tag: "table"): HTMLTableElement;
+function createElement(tag: string): HTMLElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const a = createElement("a");
```

需要注意的是：**拥有多个重载声明的函数在被调用时，是按照重载的声明顺序往下查找的**，简单来说，特殊的子类型，比如类型字面量等我们放在上面，**兜底的类型，我们应该放在最后**，如果你讲兜底的类型放在的最上面，无论如果，函数签名找到的都是第一个

> 实际上，`TypeScript` 中的重载是**伪重载**，它只有**一个具体实现**，其**重载体现在方法调用的签名上而非具体实现上**。而在如 `Java` 等语言中，**重载体现在多个名称一致但入参不同的函数实现上**，这才是**更广义上的函数重载**。

