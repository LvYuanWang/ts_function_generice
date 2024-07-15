## 受限的泛型

泛型确实给我们定义类型带来了方便，但是，有时候却显得约束力不太够，太过于宽泛。比如我们有时候会说，这里需要一个泛型`T`，但是这个泛型`T`就只能是一个对象，不应该是基本类型。甚至我们还想表达，这个泛型`T`应该有一个必须要具备的特殊属性，比如`length`或者`value`。也就是说，应该**为泛型设置一个上限**

在ES6中，我们可以使用`extends`来实现class类的继承，从而来表示某个类是另外一个类的子类，**在Typescript中应用了extends的这个含义，表达了一个类型和另一个类型具有兼容性，从而起到约束泛型范围的效果**

```typescript
function getObj<T extends object>(obj: T)  { 
  return obj;
}

getObj({ id: 1, name: "aaa" });

type ObjLength = {
  length: number
}

function getObjLength<T extends ObjLength>(obj: T) { 
  return obj;
}

getObjLength({ id: 1, name: "aaa", length: 2 });
getObjLength("aaa");
getObjLength([1, 2, 3, 4, 5]);
getObjLength({ id: 1, name: "aaa" }); // error
```

如果有多个泛型，同样可以：

```typescript
type ObjLength = {
  length: number
}
// 比较长度
// a > b  大于0
// a < b  小于0
// a = b  等于0
function compareLength<T extends ObjLength, U extends ObjLength>(a: T, b: U) { 
  return a.length - b.length;
}

const result = compareLength([1,2,3,4,5], "abc");
console.log(result)
```

同样，我们可以把extends扩展到对象字面量类型上，其实extends本身就是继承的意思：

```typescript
type TreeNode = {
  value: string
}
type LeafNode = TreeNode & {
  isLeaf: true
}
type InnerNode = TreeNode & {
  children: TreeNode[]
}
const a: TreeNode = { value: "a" };
const b: LeafNode = { value: "b", isLeaf: true };
const c: LeafNode = { value: "c", isLeaf: true };
const d: InnerNode = { value: "e", children: [b, c] };

function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T { 
  return {
    ...node,
    value: f(node.value)
  }
}

const a1 = mapNode(a, (v) => v.toUpperCase());
const b1 = mapNode(b, (v) => v.toUpperCase());
const c1 = mapNode(c, (v) => v.toUpperCase());
const d1 = mapNode(d, (v) => v.toUpperCase());

console.log(a1);
console.log(b1);
console.log(c1);
console.log(d1);
```

如果上面的`mapNode`函数不加以限制，T的类型根本不知道`node:T`中node是否有value属性，加以限制之后，我们就很安全的在函数中使用对象node的属性value了。**这其实是对类型的一种细化，或者说是对类型的守卫**

有时候我们想写一个类型，比如`Message`，`Message` 可以接受一个泛型，其主要作用是从泛型上读取泛型的 “message” 属性的类型。你可能会这么写：

```typescript
type Message<T> = T['message'] // error 类型“"message"”无法用于索引类型“T”
```

因为泛型`T`并不知道`message`属性是什么，**这个时候，你就可以使用泛型约束**

```typescript
type Message<T extends { message: unknown }> = T['message']

const person = {
  id:1,
  message:"hello"
}

type PersonMessage = Message<typeof person> // string
```

## 元祖的类型推导

Typescript在推导元祖的类型时会放宽要求，推导出的结果会尽量的宽泛，不在乎元祖的长度和各位置的类型，其实也就是直接会推导为数组类型

```typescript
const a = [1, true]; // (number | boolean)[]
```

然而有时候我们希望推导的结果更严格一些，把上面例子中的变量a视作固定长度的元祖而不是数组。

当然，我们可以使用类型断言`as const`，把元祖标记为只读的元祖的类型

```typescript
const a = [1, true] as const; // readonly [1, true]
```

除了使用`as const`断言之外，我们还可以利用Typescript推导剩余参数类型的方式

如果仅仅写成下面这个样子：

```typescript
function tuple<T>(...ts: T[]) { 
  return ts;
}

const t = tuple(1, 2, 3, 4); //number[]
```

得到的依然还是number类型的属性，但是如果写成下面这个样子。

```typescript
function tuple<T extends unknown[]>(...ts: T) { 
  return ts;
}
```

这个函数就完全可以替代我们声明元组的写法`const tuple = [1, true];`

**泛型约束(`T extends unknown[]`)**: 这里`T`被约束为一个扩展自`unknown[]`的类型。这意味着`T`可以是`unknown[]`的任何子类型，包括元组类型。

**剩余参数(`...ts: T`)**: 当使用`...`操作符作为函数参数时，它在运行时表现为一个数组，但在类型层面，TypeScript能够保留传递给函数的参数类型的精确性，这包括元素的类型和数量。因此，尽管`ts`在函数体内部被当作一个数组处理，TypeScript编译器仍然能够将其识别为`T`类型，这里的`T`是调用函数时根据传入参数推导出的具体元组类型

这意味着当你使用`tuple`函数时，TypeScript编译器会根据传给函数的具体参数来推导`T`的具体类型，这个类型是一个元组类型，而不仅仅是一个宽泛的数组类型

```typescript
const myTuple1 = tuple(1, 'hello', true); // 推导为元组类型 [number, string, boolean]
const myTuple2 = tuple(...["资料管理员","权限管理员","经理"]); // [string, string, string]
```

