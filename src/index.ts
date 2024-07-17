/* 多余属性检查 */
// 如果只要将一个直接字面量对象赋值给变量, 方法参数, 或者构造函数参数, 就会触发多余属性检查

type User = {
  id?: number,
  name: string
}

type AdminUser = {
  id?: number,
  name: string,
  role: String
}

function deleteUser(user: User) { console.log(user) }

const u1: AdminUser = {
  id: 1,
  name: 'user1',
  role: 'admin'
}

// 协变: 子类型的对象可以赋值给父类型对象的要求
deleteUser(u1);

let u2: User = u1;

// 报错
// let u3: User = {
//   id: 3,
//   name: 'user3',
//   role: 'admin'
// }

// deleteUser({ id: 4, name: 'user4', role: 'admin' });  // 报错
// 如果必须要这么传也可以通过断言
let u3: User = {
  id: 3,
  name: 'user3',
  role: 'admin'
} as User;
deleteUser({ id: 4, name: 'user4', role: 'admin' } as User);