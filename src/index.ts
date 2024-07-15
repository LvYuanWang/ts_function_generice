/* 受限的泛型 */

function getObj<T extends object>(obj: T) {
  return obj;
}

getObj({ id: 1, name: 'Tom' });


type ObjLength = {
  length: number;
}

function getLength<T extends ObjLength>(obj: T) {
  // todo ...
  return obj.length;
}

// 只要传入的对象有length属性就可以
getLength('123');
getLength([1, 2, 3]);
getLength({ length: 10 });
// getLength({ name: 'Tom' }); // 报错: 对象字面量只能指定已知属性，`length` 属性不存在于类型 `{ name: string; }` 中


// 封装一个函数, 函数的两个参数的长度相减, 获取长度的差值
function compare<T extends { length: number }, U extends { length: number }>(a: T, b: U): number {
  return a.length - b.length;
}

const result = compare([1, 2, 3], '123');
const result2 = compare([1, 2, 3], { length: 2 });
// compare([1, 2, 3], { name: 'Tom' }); // 报错: 对象字面量只能指定已知属性，`length` 属性不存在于类型 `{ name: string; }` 中
console.log(result, result2); // 0 1


// 其实类型别名或者接口也可以实现这个功能
type TreeNode = {
  value: string
}

type LeafNode = TreeNode & {
  isLeaf: true
}

type InnerNode = TreeNode & {
  children: TreeNode[]
}

const a: TreeNode = { value: 'a' };
const b: LeafNode = { value: 'b', isLeaf: true };
const c: InnerNode = { value: 'c', children: [a, b] };


function mapNode<T extends TreeNode>(node: T, fn: (node: string) => string) {
  return {
    ...node,
    value: fn(node.value)    // 有了泛型约束就不用怕传入的node没有value属性了
  }
}

const a1 = mapNode(a, value => value.toUpperCase());
const b1 = mapNode(b, value => value + ' Joker');
const c1 = mapNode(c, value => value.toLowerCase());
console.log(a1, b1, c1); // { value: 'A' } { value: 'b Joker', isLeaf: true } { value: 'c' }


// 方括号运算符, 同样可以作用于泛型当中
type User = {
  id: number,
  name: string,
  sex: '男' | '女'
}

type A = User['name']; // string


// message: unknown 是一个对象, 通过泛型约束获取对象的message属性
type Message<T extends { message: unknown }> = T['message'];
const person = {
  id: 1,
  message: "hello"
}

type Person = typeof person; // { id: number; message: string; }

type PersonMessage = Message<Person>; // string


// 元组类型的推导
const arr = [1, true]
const arr2 = [{ name: 'Joker', age: 19 }, 'hello'] as const;

function myTuple<T>(...ts: T[]) {
  return ts;
}

const tuple = myTuple(1, 2, 3, 4, 5); // number[]


function myTupleType<T extends any[]>(...ts: T) {
  return ts;
}

const tuple2 = myTupleType(1, '2', 3, 4, 5); // [number, string, number, number, number]
const tuple3 = myTupleType(...["admin", "user", "login"]);  // ["admin", "user", "login"]