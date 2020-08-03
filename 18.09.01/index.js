
let obj = Object.create(null);
let obj2 = {};
console.log(Object.getPrototypeOf(obj));
// null
console.log(Object.getPrototypeOf(obj2));
// {constructor:f,isPrototypeOf:f}
Object.setPrototypeOf(obj,{})


null instanceof Object;//false

Object.prototype instanceof Object; //false

Object instanceof Object; // true
