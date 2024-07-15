### 多泛型

考虑一个简单问题：创建一个通用的交换函数，它接受一个包含两个元素的数组，并返回元素交换位置后的数组

```typescript
function swap<T, U>(pair: [T, U]): [U, T] {
  return [pair[1], pair[0]];
}
const result1 = swap([2, "a"]);
const result2 = swap(['hello', { text: 'world' }]);
console.log(result1, result2)
```

继续考虑这个一个要求，如果我们要封装一个类似于数组的map函数，简单来说，给我一个数组，然后根据回调函数，我们能组装成另外一个新的数组，而这个新的数组，可能类型和原来的数组一样，也有可能不一样

```typescript
// 原生map演示
const arr = [1, 2, 3, 4, 5];
const newArr1 = arr.map((e) => e * 2);
const newArr2 = arr.map((e) => `<div>index${e}</div>`);

console.log(newArr2);
```

无论怎么样，我们自己写的话，先把这个map函数实现，我们就直接函数实现就好

```typescript
const arr = [1, 2, 3, 4, 5];
function map(arr, callback) { 
  const result = [];
  for (let i = 0; i < arr.length; i++) { 
    const item = arr[i];
    result.push(callback(item,i));
  }
  return result;
}
const t1 = map(arr, (e) => e * 2);
const t2 = map(arr, (e) => `<div>index${e}</div>`);
console.log(t1);
console.log(t2);
```

可以使用多个泛型参数：

**表示输入数组中元素类型的`T`，以及表述输出数组中的元素类型U。**

**这个map函数接受的参数一个为`T`类型的数组，一个为`T`映射为`U`的函数，最后返回一个`U`类型的数组**

```typescript
const arr = [1, 2, 3, 4, 5];
function map<T, U>(arr: T[], callback: (e: T, i?: number) => U): U[] { 
  const result = [];
  for (let i = 0; i < arr.length; i++) { 
    const item = arr[i];
    result.push(callback(item,i));
  }
  return result;
}
const t1 = map<number, number>(arr, (e) => e * 2);
const t2 = map<number, string>(arr, (e) => `<div>index${e}</div>`);
```

当然，和只有一个泛型的时候一样，在调用的时候，同样可以让Typescript自己进行类型推导

```typescript
const t1 = map(arr, (e) => e * 2);
const t2 = map(arr, (e) => `<div>index${e}</div>`);
```

**但是注意**：要么就让Typescript自己进行推导，要么就写全，不能想当然的写成一半，比如都同样是number类型，你不能想当然的认为，我在调用的时候，写一个就可以了。也就是说下面的写法是错误的：

```typescript
const t1 = map<number>(arr, (e) => e * 2); // error 应该有2个类型参数，但只获得了1个
```
