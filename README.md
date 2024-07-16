## 类型理解再升级-型变

我们先来看这个例子：

```typescript
type User = {
  id?: number,
  name: string,
}
type Animal = {
  id?: number,
  name: string,
}
type AdminUser = {
  id?: number,
  name: string,
  role: string,
}

function deleteUser(user: User) { console.log(user) }

const a1: Animal = {
  id: 1,
  name: 'animal1'
}

const u1: AdminUser = {
  id: 2,
  name: 'user2',
  role: 'admin'
}

deleteUser(a1); // OK? Error?
deleteUser(u1); // OK? Error?
```



> 答案：
>
> deleteUser(a1); 正确
>
> deleteUser(u1); 正确

### 结构化类型系统

TypeScript 的类型系统特性：**结构化类型系统**。TypeScript 比较两个类型并非通过类型的名称，而是比较这两个类型上实际拥有的属性与方法。User 与 Animal 类型上是一致的，所以它们虽然是两个名字不同的类型，但仍然被视为结构一致，这就是结构化类型系统的特性。你可能听过结构类型的别称**鸭子类型（\*Duck Typing\*）**，这个名字来源于**鸭子测试（\*Duck Test\*）**。其核心理念是，**如果你看到一只鸟走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么这只鸟就是鸭子**。

因此：`deleteUser(a1);`正确

`deleteUser(u1);`为什么也是正确的？

在很多类型系统中，都有子类型与超(父)类型的概念。当然了在java，c#这种后端名义型类型系统中子类型和父类型很容易区分，他们必须要`extends`，`implements`关键字。

但是在TS中，是通过结构进行区分的，不一定强制需要`extends`，`implements`关键字标注父子关系。比如上面的`User`和`AdminUser`。

明明`u1`多了一个属性`role`，这是因为，**结构化类型系统**认为 `AdminUser` 类型完全实现了 `User` 类型。至于额外的属性 `role`，可以认为是 `AdminUser` 类型继承 `User` 类型后添加的新属性，即此时 `AdminUser` 类型可以被认为是 `User` 类型的子类型。

### 协变

在很多类型系统中，都有**型变**的概念，也就是类型变化的意思，在型变的系统中，

子类型可以赋值给父类型，叫做**协变**

父类型可以赋值给子类型，叫做**逆变**

之前的基础类型，我们一直在强调类型兼容性的问题，不同的类型当然没有兼容性可言，要谈兼容性，至少需要父子关系。至于所谓父子关系的兼容性，一般都具有下面的含义：

> 给定两个类型A和B，假设B是A的子类型，那么在需要A的地方都可以放心使用B

![image-20240226103220252](./assets/image-20240226103220252.png)

从上图中可以看出：

- Array是Object的子类型，需要Object的地方都可以使用Array
- Tuple是Array的子类型，需要Array的地方都可以使用Tuple
- 所有类型都是any的子类型，需要any的地方，任何类型都能用
- never是所有类型的子类型。
- 字面量类型是对应基础类型的子类型，需要基础类型的地方都能使用字面量类型

对于**结构化类型，主要的型变方式就是协变**。因此，

-  `AdminUser` 是`User`的子类型，那么需要`User`的地方，就都可以使用`AdminUser`

`deleteUser(u1);`是正确的，不会报错。

不过这仅仅是协变的基础形态，因为对于结构比较复杂对象来说，每一个具体的属性，都有可能还是比较复杂的形态。

```typescript
type ExistUser = {
  id: number,
  name: string,
}
type LegacyUser = {
  id?: number | string,
  name: string,
}

const u2: ExistUser = {
  id: 1,
  name: 'user1'
}

const u3: LegacyUser = {
  id: 3,
  name: 'user3'
}

deleteUser(u2); // OK? Error?
deleteUser(u3); // OK? Error?
```

新加了两种类型，注意和之前`User`类型的区别主要在`id`这个属性上

```typescript
User       ---> id ---> number | undefined

ExistUser  ---> id ---> number 

LegacyUser ---> id ---> number | string | undefined
```

也就是说，每个类型的id属性的类型是不一样的，这里是联合类型，联合类型也有子类型和父类型的兼容关系。联合类型的父子关系的区分和基础类型是一样的。简单来说，**越具体的，越形象化的，就是子类型**

> "hello" 字面量类型 比 string类型 更具体，那么"hello"字面量类型就是string类型的子类型
>
> [number, number]元组类型比数组类型更具体，那么元组类型就是数组类型的子类型
>
> `a | b` 联合类型 比 `a | b | c` 联合类型更具体，那么 `a | b` 就是 `a | b | c` 的子类型
>
> 当然，如果你不能理解上面为啥 `a | b` 就是 `a | b | c` 的子类型，你可以这么想， 你妈你去市场买水果，买 `梨子 | 苹果` 肯定比买  `梨子 | 苹果 | 西瓜`  更具体

因此，就`id`这一个属性来说：

```typescript
ExistUser < User < LegacyUser
```

由于另外一个属性是一样的，所以：

```typescript
ExistUser < User < LegacyUser
```

那么我们就可以得出结论

```typescript
deleteUser(u2); 正确

deleteUser(u3); 

错误  `id`类型不兼容，不能将`number | string | undefined`赋值给`number | undefined`
不能把父类型赋值给子类型
```

**typescript对于结构（对象和类）的属性类型进行了协变**，也就是说，**如果想保证A对象可赋值给B对象，那么A对象的每个属性都必须是B对象对应属性的子类型**。

**如果A是B的子类型，那么我们可以说由A组成的复合类型（例如数组和泛型）也是B组成相应复合类型的子类型**

```typescript
type Pet = {
  name: string;
};

type Dog = Pet & {
  breed: string;
}

const dogs: Dog[] = [
  {
    name: 'Max',
    breed: 'Labrador',
  },
  {
    name: 'Rusty',
    breed: 'Dalmatian',
  },
];

const pets: Pet[] = dogs;

type Arrs<T> = {
  arr: T[];
}

const arrs1: Arrs<Dog> = {
  arr: dogs,
}
const arrs2: Arrs<Pet> = arrs1;
```
