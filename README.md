## 函数声明与调用

函数我们之前一直在使用了，基本上和Javascript声明函数是一样的，只是在Typescript中我们需要现实的注解函数的参数

```typescript
function add(a: number, b: number): number{
  return a + b;
}
```

函数的返回类型Typescript可以自己推导出来，不过也可以显示的注解

当然对于函数的声明也和Javascript一样，无论是具名函数，还是函数表达式，还是箭头函数，都没有任何问题

```typescript
function sayHello1(name:string) {
    return "hello " + name;
}

const sayHello2 = function (name: string) { 
    return "hello " + name;
}

const sayHello3 = (name: string): string => { 
  return "hello " + name;
}

const sayHello4 = (name: string) => "hello " + name

const sayHello5 = (name: string) => {
  if (name === "admin") { 
      return "hello admin"
  }
  return;
}
```

在函数调用的时候，我们就无需提供任何额外的类型信息了，直接传入实参即可，Typescript将检查实参是否与函数的形参类型兼容

```typescript
const sum = add(1, 2);
```

返回的结果也不需要你纠结，类型是固定的。

如果忘记传入某个参数，或者传入的参数类型有误，Typescript将指出问题

```typescript
const sum = add(1); //error 应有2个参数，但获得1个
const str = sayHello1(123); // error 类型“123”的参数不能赋给类型“string”的参数

```

### 可选参数与默认参数

同样可以使用可选符号`?`把参数标记为可选。

> 声明函数的参数时，必要的参数放在前面，然后才是可选参数

```typescript
function sendMessage(userId: number, message?: string) { 
  console.log(userId, message || "");
}
sendMessage(1);
```

与在Javascript中一样，可以为可选参数提供默认值，这样做在语义上与把参数标记为可选是一样的。

> 带默认值的参数调用时可以不用传入参数的值，并且带默认值的参数不要求一定要放在参数列表的末尾，可选参数是必须放在末尾。不过默认参数放在前面也没有任何意义，约定俗成我们都还是放在末尾。

```typescript
function sendMessage(userId: number, message="hello") { 
  console.log(userId, message || "");
}
```

### 剩余参数

函数有时候接受参数的数量是不定的，如果不想让参数固定，在以前，我们可以使用arguments这个隐藏参数搞定

```typescript
function sum() { 
  return Array.from(arguments).reduce((result, item) => result + item, 0);
}
sum(1, 2, 3, 4, 5); //error
```

使用arguments的坏处显而易见，就算我们之前写Javascript，你也不会使用arguments去处理这些问题。在Typescript更加如此。

1. arguments是一个伪数组，使用的时候还需要转换才能使用数组相关方法
2. 在调用的时候，会明确的提醒你，这个函数不需要参数，但是你却给了参数
3. 还有一个隐藏的点是，reduce函数调用的回调函数中，所有的参数全是any

要确保安全可靠，我们当然应该使用**剩余参数(rest parameter)**

```typescript
function sum(...numbers:number[]) { 
  return numbers.reduce((result, item) => result + item, 0);
}
sum(1, 2, 3, 4, 5);
```

使用剩余参数，上面所有的问题都解决了：

1. 剩余参数是一个数组，并且我们可以使用Typescript定义具体的类型
2. 调用函数的时候，也会有明确的提示
3. reduce回调函数中的参数全部都有具体的类型

当然，唯一需要注意一点是:

> 一个函数最多只能有一个剩余参数，而且必须位于参数列表的最后

### this的类型注解

在Javascript中，我们可能会写出下面的代码（可以在浏览器上测试）

```typescript
function showDate() { 
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`
}
```

这个函数里面的`this`，其实很明显是为了获取`Date`对象，所以，我们调用的时候，会使用`call`方法绑定具体的Date对象

```typescript
function showDate() { 
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`
}
showDate.call(new Date);
```

> 如果打开了`"strict":true`，默认也会开启`"noImplicitThis": true`，没有显示的指定this的类型也会提示错误，在一般的函数中，如果要使用`this`，就必须显示的标注`this`的类型
>
> **注意**：`noImplicitThis`不强制要求类和对象的函数必须要注解`this`

当然，这种写法本身就是很危险的，谁也不知道这个`showDate`方法应该如何去调用，不过，在`Typescript`中如果出现了这种写法，我们可以使用`this`的类型注解，确保需要传入对应的this对象

```typescript
function showDate(this: Date) { 
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`
}
// showDate(); //error
showDate.call(new Date()); 
// showDate.call(null); // 如果"strictBindCallApply":false不会报错
```

> 如果函数使用`this`，可以在函数的第一个参数中声明`this`类型(放在其他参数之前)，这样在调用函数的时候，Typescript将确保`this`是你预期的类型
>
> `this`不是常规的参数，而是保留字，是函数签名的一部分

> `"strictBindCallApply": true` 开启这个配置选项能比较安全的调用`.call`、`.apply`和`.bind`，会检查传入的参数是否和`this`匹配，当然`strictBindCallApply`配置也是属于`strict`家族的一员
