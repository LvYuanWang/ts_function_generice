/* 逆变 */

type Animal = {
  eat(): void;
}

type Pet = Animal & {
  run(): void;
}

type Dog = Pet & {
  bark(): void;
}

let a: Animal = {
  eat() {
    console.log('eat');
  }
}

let p: Pet = {
  eat() {
    console.log('eat');
  },
  run() {
    console.log('run');
  }
}

let d: Dog = {
  eat() {
    console.log('eat');
  },
  run() {
    console.log('run');
  },
  bark() {
    console.log('bark');
  }
}

function feed(pet: Pet) {
  pet.run();
  return pet;
}

// feed(a);  // Error
feed(p);  // OK
feed(d);  // OK


// TS 中 class类, 也是结构化类型, 当然在类型兼容性上支持的就是协变
class AnimalClass {
  eat() {
    console.log('eat');
  }
}

class PetClass extends AnimalClass {
  run() {
    console.log('run');
  }
}

class DogClass extends PetClass {
  bark() {
    console.log('bark');
  }
}

let animalClass = new AnimalClass();
let petClass = new PetClass();
let dogClass = new DogClass();

// feed(animalClass);  // Error
feed(petClass);  // OK
feed(dogClass);  // OK


// 在 TS 中, 函数的类型兼容性非常特殊
// 在参数参数个数和类型相同的情况下, 函数的返回类型, 支持协变
// 如果一个函数的返回类型是另外一个函数返回类型的子类型, 那么这个函数的返回类型就是协变的
// 在不考虑this的情况下, 满足一下条件, 可以说函数A是函数B的子类型
// 1、函数A的参数数量小于或等于函数B的参数数量
// 2、函数A的返回类型是函数B的返回类型的子类型, 也就是支持协变
// 3、函数A的各个参数的类型是函数B相应参数的父类型, 也就是参数支持逆变
function clone(f: (p: Pet) => Pet): void {
  // todo ...
  let parent = new PetClass();
  let child = f(parent);  // 如果返回值类型是父类型, 下面对象的调用时不安全的
  child.run();
}

// 现在有下面不同的几个函数
function petToAnimal(p: Pet): Animal {
  return new AnimalClass();
}

function petToPet(p: Pet): Pet {
  return new PetClass();
}

function petToDog(p: Pet): Dog {
  return new DogClass();
}

// clone(petToAnimal);  // Error
clone(petToPet);  // OK
clone(petToDog);  // OK


// 在函数返回类型一致的情况下, 参数支持逆变
function animalToPet(a: Animal): Pet {
  return new PetClass();
}

function dogToPet(d: Dog): Pet {
  return new PetClass();
}

clone(animalToPet);  // OK
clone(petToPet);  // OK
// clone(dogToPet);  // Error