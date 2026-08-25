// Прототип - это объект, из которого другой объект наследует свойства и методы.
// У каждого объекта есть скрытая ссылка [[Prototype]]. Если свойства нет на самом
// объекте, JS ищет его вверх по цепочке, пока не дойдёт до null.

class Employee {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const frontendDev = new Employee("Нина");

// Цепочка:
// frontendDev  ->  Employee.prototype  ->  Object.prototype  ->  null

console.log(Object.getPrototypeOf(frontendDev) === Employee.prototype); // true, prototyp задаётся при new
console.log(Object.getPrototypeOf(Employee.prototype) === Object.prototype); // true, prototype - тоже объект, его прототип Object.prototype
console.log(Object.getPrototypeOf(Object.prototype) === null); // true, конец цепочки

// Свойство name лежит в frontendDev (this.name = name в конструкторе).Другие методы приходят по цепочке из Object.prototype.
// В массиве, например, приходят к нашему экземпляру методы push, pop, splice и тд как раз из Array.prototyp

const employees = ["Нина", "Ульяна", "Ирина"];

// Цепочка users:
// employees  ->  Array.prototype  ->  Object.prototype  ->  null

// Поэтому у массива есть map, filter, reduce (из Array.prototype),
// а toString - уже из Object.prototype.

console.log(Object.getPrototypeOf(employees) === Array.prototype); // true, наследуем из Array.prototype
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true, prototype - объект, его прототип Object.prototype
console.log(Object.getPrototypeOf(Object.prototype) === null); // true, конец цепочки
