const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const serve = require('koa-static');
module.exports = app => {
     app.use(bodyParser());
     require('../apiconfig')(app);
     app.use(cors());
     app.use(serve(path.resolve('publick','upload')));
    ( function requestRoutes(dirname) {
        fs.readdirSync(dirname).forEach(file => {//同步 readdir().返回文件数组列表
            let filePath = path.join(dirname, file);
            if (fs.statSync(filePath).isDirectory()) { //同步 stat(). 返回 fs.Stats 的实例。//isDirectory()是否是文件夹
                requestRoutes(filePath)
            } else {
                requestRouteFile(filePath)
            }
        })

        function requestRouteFile(filePath) {
            if (!filePath.endsWith('index.js') && path.extname(filePath) === '.js') {
                require(filePath)(app);
            }
        }
    })(__dirname)
};