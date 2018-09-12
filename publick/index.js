/**
 * Created by f on 2018/8/16.
 */
// const fs = require('fs');
// const path = require('path');
// (function filterEmptyFiles (dirname) {
//         fs.readdirSync(dirname).forEach(file => {//同步 readdir().返回文件数组列表
//             let filePath = path.join(dirname, file);
//             if (fs.statSync(filePath).isDirectory()) { //同步 stat(). 返回 fs.Stats 的实例。//isDirectory()是否是文件夹
//                 filterEmptyFiles(filePath)
//             }
//         });
//     }
// )(__dirname)