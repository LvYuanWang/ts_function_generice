## 泛型的默认类型

泛型的默认类型是一种编程语言中的特性，允许开发者在定义泛型时为其指定一个默认的类型。这意味着，如果在使用泛型时没有明确指定类型，将自动使用默认类型。

```typescript
function createArray<T = number>(length: number, value: T): T[] {
    return new Array(length).fill(value);
}

// 使用默认的泛型类型number
let numbers = createArray(3, 1); // 类型推断为number[]
```

不过这里直接给函数指定默认类型意义不大，因为函数本身就会自动的进行类型推导。

```typescript
type A<T = string> = {
    value: T;
};

// 使用默认泛型类型
let str: A = { value: "Hello" }; // T默认为string

// 明确指定泛型类型为number
let num: A<number> = { value: 123 }; // 明确指定T为number
```

我们还可以使用之前的例子

```typescript
type MyEvent<T> = {
  target: T
  type: string
}
const myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector("#btn"),
  type: "click"
}
```

之前我们声明的这个泛型别名，在用到的时候，需要声明泛型的类型。如果大部分的target都是同一个类型，那么完全可以像函数的默认参数一样，给泛型一个默认类型

```typescript
type MyEvent<T = HTMLElement | null> = {
  target: T
  type: string
}
const myEvent: MyEvent = {
  target: document.querySelector("#myButton"),
  type: "click"
}
```
