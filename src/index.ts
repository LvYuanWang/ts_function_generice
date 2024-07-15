/* 泛型的默认类型 */

function createArray<T = number>(length: number, value: T): T[] {
  return new Array(length).fill(value);
}

// 当然你会觉得这很多余, 因为函数本身就可以推断出类型, 当我们传入参数时, 会自动推断出类型, 但是如果在类型别名或者接口中使用泛型时, 就需要指定默认类型了
const arr = createArray(3, 'x');
console.log(arr); // [ 'x', 'x', 'x' ]


type A<T = string> = {
  value: T;
}

// 这种情况下, 如果不指定默认类型, 那么在使用时就必须指定类型, 否则会报错
const a: A<number> = {
  value: 3
}

const b: A = {
  value: '3'
}


interface MyEvent<T = HTMLDivElement | null> {
  target: T,
  type: string
}

const myEvent: MyEvent = {
  target: document.querySelector('div'),
  type: 'click'
}

const myEvent2: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('button'),
  type: 'click'
}