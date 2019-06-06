/**
 * Created by f on 2019/6/5.
 */
const fs = require('fs');
const path = require('path');
module.exports = app => {
    (function requireProcessesAndThreads(dirname) {
        fs.readdirSync(dirname).forEach(file => {
            let filePath = path.join(dirname, file);
            if (fs.statSync(filePath).isDirectory()) {
                requireProcessesAndThreads(filePath)
            } else {
                requireProcessesAndThreadsFile(filePath)
            }
        });
        function requireProcessesAndThreadsFile(filePath) {
            if (!filePath.endsWith('index.js') && path.extname(filePath) === '.js') {
                let ProcesseOrThreadName = path.basename(filePath, '.js');
                console.log(ProcesseOrThreadName);
                global[ProcesseOrThreadName] = require(filePath)(app);
            }
        }
    })(__dirname);
};
