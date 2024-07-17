## class也是结构化类型

先来看一下讲过的协变内容：

```typescript
type Animal = {
  eat(): void;
}
type Pet = Animal & {
  run(): void;
}
type Dog = Pet & {
  bark(): void;
} 
```

Animal、Pet和Dog，很明显具有逐层的父子关系

```typescript
let a: Animal = {
  eat() { console.log('eat') }
}

let p: Pet = {
  eat() { console.log('eat') },
  run() { console.log('run') }
}

let d: Dog = {
  eat() { console.log('eat') },
  run() { console.log('run') },
  bark() { console.log('bark') }
}

function feed(pet: Pet) { 
  pet.run();
  return pet;
}

feed(a); // Error
feed(p); 
feed(d); 
```

顺便提一句，使用class类也是一样的，关于类的基本使用，和Javascript是一样的。而且父子层级关系也是一样。关于类型的一些问题，我们在后面再慢慢解释

```typescript
class Animal{ 
  eat() { console.log('eat') }
}

class Pet extends Animal{ 
  run() { console.log('run') }
}

class Dog extends Pet{ 
  bark() { console.log('bark') }
}

let a = new Animal();
let p = new Pet();
let d = new Dog();

function feed(pet: Pet) { 
  pet.run();
  return pet;
}

feed(a); // Error
feed(p); 
feed(d); 
```

无论怎么样，关于协变的内容和之前是一样的，因为**class类也是结构化类型**，子类型的值是可以传递到需要父类型的地方。

## 逆变

但是，如果是函数呢？

```typescript
function clone(f: (p: Pet) => Pet): void { 
  // ...
}
```

现在有不同的函数

```typescript
function petToPet(p: Pet): Pet { 
  return new Pet();
}

function petToDog(p: Pet): Dog { 
  return new Dog();
}

function petToAnimal(p: Pet): Animal { 
  return new Animal();
}
```

将函数传递到`clone`函数中

```typescript
clone(petToPet);
clone(petToDog);
clone(petToAnimal); // error "类型“(p: Pet) => Animal”的参数不能赋给类型“(p: Pet) => Pet”的参数
```

`petToDog`可以传递过去，但是petToAnimal却报错了。为什么呢？我们用伪代码模拟一下：

```typescript
function clone(f: (p: Pet) => Pet): void { 
  // 伪代码
  let parent = new Pet();
  let child = f(parent);
  child.run(); // 不安全
}
```

如果传给`clone`函数的`f`返回的是`Animal`，那就不能调用`.run`方法。所以在编译时，`Typescript`会确保传入的函数至少返回一个`Pet`

由此可以推断：**函数和函数之间，在其他都一致的情况下，如果一个函数的返回类型是另一个函数返回类型的子类型，那么函数的返回类型是协变的**

那么函数的参数类型呢？

```typescript
function petToPet(p: Pet): Pet { 
  return new Pet();
}
function animalToPet(a: Animal): Pet { 
  return new Pet();
}
function dogToPet(d: Dog): Pet { 
  return new Pet();
}
```

将函数传递到`clone`中

```typescript
clone(petToPet);
clone(animalToPet);
clone(dogToPet); // Error "类型“(d: Dog) => Pet”的参数不能赋给类型“(p: Pet) => Pet”的参数
```

`animalToPet`传递过去可以，但是`dogToPet`却报错了，我们还是可以通过伪代码分析一下：

```typescript
function dogToPet(d: Dog): Pet {
  d.bark(); // 调用子类型的特有函数
  return new Pet();
}
```

现在把`dogToPet`传递给`clone`，如果`clone`函数中是Pet的实例，那么这就是不安全的。因为`.bark()`只在`Dog`中定义了，不是所有的`Pet`都定义

也就是说：**函数和函数之间，函数的参数个数一致的情况下，函数的参数是逆变的，也就是函数参数的父类型可以赋值给子类型**

总结来说，**在不考虑`this`的情况下，满足以下条件，可以说函数A是函数B的子类型**

1、函数A的参数数量小于或等于函数B的参数数量

2、函数A的返回类型是函数B返回类型的子类型，也就是协变的

3、函数A的各个参数的类型是函数B相应参数的父类型，参数是逆变的

> 考虑到历史遗留问题，Typescript中的函数其实默认会对参数和this类型做协变，这样并不安全，因此`strict`家族就有`strictFunctionTypes`，默认打开`strict:true`。当然也会打开`strictFunctionTypes:true`
