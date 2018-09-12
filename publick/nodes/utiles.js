var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function() {
    console.log('aaa')
    console.log(this.base)
    return this.base
    console.log('aaa')
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
/*objBase.showName();
objBase.sayHello();
console.log(objBase);*/
var objSub = new Sub();
console.log(objSub.showName());
/*
//objSub.sayHello();
console.log(objSub);*/



function Person() {
    this.name = 'byvoid';
    this.toString = function() {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));



var fs = require("fs");
/*

// 异步读取
fs.readFile('input.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('input.txt');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");

*/


// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功！");
});