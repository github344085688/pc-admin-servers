const fs = require('fs');
const path = require('path');
module.exports = app => {
    app.services = app.services || {};
    (function requestServices(dirname) {
        fs.readdirSync(dirname).forEach(file => {//同步 readdir().返回文件数组列表
            let filePath = path.join(dirname, file);
            if (fs.statSync(filePath).isDirectory()) { //同步 stat(). 返回 fs.Stats 的实例。//isDirectory()是否是文件夹
                requestServices(filePath)
            } else {
                requestServicesFile(filePath)
            }
        });
        function requestServicesFile(filePath) {
            if (!filePath.endsWith('index.js') && path.extname(filePath) === '.js') {
                let serviceName = path.basename(filePath, '.js');
                console.log(serviceName);
                global[serviceName] = require(filePath)(app);
            }
        }
    })(__dirname)

}