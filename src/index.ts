/* 类型理解再升级-型变 */

// 例子一
// 在 TS 中只要结构一样，就认为这两个类型一样的, 名字不一样也没关系
type User = {
  id?: number,
  name: string
}

type Animal = {
  id?: number,
  name: string
}

interface AdminUser {
  id?: number,
  name: string,
  role: string
}

function deleteUser(user: User) {
  console.log(user);
}

const a1: Animal = {
  name: 'dog'
}

const u1: AdminUser = {
  id: 2,
  name: 'user2',
  role: 'admin'
}

deleteUser(a1); // ok
deleteUser(u1); // ok

// 不过这仅仅是协变的基础形态，因为对于结构比较复杂对象来说，每一个具体的属性，都有可能还是比较复杂的形态。
type ExistUser = {
  id: number,
  name: string
}

type LegacyUser = {
  id?: number | string,
  name: string
}

const u2: ExistUser = {
  id: 2,
  name: 'user2'
}

const u3: LegacyUser = {
  id: '3',
  name: 'user3'
}

deleteUser(u2); // ok
// deleteUser(u3); // error

// User   -->   id   -->   number | undefined
// ExistUser   -->   id   -->   number
// LegacyUser   -->   id   -->   number | string | undefined

// 子类型可以放在父类型的位置，但是父类型不能放在子类型的位置
// ExistUser <: User <: LegacyUser  // <: 表示子类型


// 如果A是B的子类型, 那么我们可以说由A组成的复合类型(例如数组和泛型)也就是B组成相应复合类型的子类型
type Pet = {
  name: string
}

type Dog = Pet & {
  breed: string
}

const dogs: Dog[] = [
  { name: 'Lassie', breed: 'Collie' },
  { name: 'Mako', breed: 'Pug' }
]

const pets: Pet[] = dogs; // ok

// 泛型也是如此
type ArrS<T> = {
  arr: T[]
}

const arr1: ArrS<Dog> = {
  arr: dogs
}

const arr2: ArrS<Pet> = arr1; // ok