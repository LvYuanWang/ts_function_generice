### 多余属性检查

正是由于有协变这个特性，有时候又会给我们写代码增加一些困惑。

```typescript
let u4: User = {
  id:1,
  name: 'user3',
  role: 'admin' // role 不在User类型中
}

let u5 = u1;
```

如果是函数中也是一样：

```typescript
deleteUser(u1);  // 正确
deleteUser({ id: 2, name: 'user2', role: 'admin' }); // 错误
```

由于有协变，我们可以把`AdminUser`类型的u1对象看做是`User`类型的子类型，然后我们可以赋值。

但是如果我们直接赋值，如果多写了属性，提示错误，这个我们也应该能理解，标注了是`User`类型，但是你却多写了其他属性，TS当然应该帮我们提示错误才对。而且对于这种和标注类型不匹配的检查，在TS中就叫做**多余属性检查**。

**只要将一个直接字面量赋值给变量、方法参数或者构造函数参数，就会触发多余属性检查**

当然，就算直接赋值一个字面量对象，你能自己确定是什么类型，直接用类型断言处理一下也可以。

```typescript
deleteUser({ id: 2, name: 'user2', role: 'admin' } as User);
```
