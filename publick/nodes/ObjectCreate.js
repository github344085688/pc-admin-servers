/**
 * Created by f on 2018/8/9.
 */
function Person() {

}
function Student() {

}
Student.prototype = Person.prototype;//改变父的方法

Student.prototype = new Person();//继承要传参，

Student.prototype = Object.create(Person.prototype);//create空的集合不影响原型链上的

Student.prototype.constructor = Student;


//基于原型链：

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.hi = function () {
    console.log("Hi, my name is" + this.name + "ime" + this.age + "years old now");
}

Person.prototype.LEGE_NUM = 2;
Person.prototype.ARMS_NUM = 2;
Person.prototype.walk = function () {
    console.log(this.name + "is walking....");
};

function Student(name, age, className) {
    Person.call(this, name, age);// 每个函数都包含两个非继承而来的方法：call()方法和apply()方法。
    this.className = className;
}
Student.prototype = Object.create(Person.prototype);//继承
Student.prototype.constructor = Student;



//nodejs

var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function() {
    console.log(this.name);
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);//Sub继承Base注意：Sub 仅仅继承了Base 在原型中定义的函数(prototype.showName)，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。
var objBase = new Base();