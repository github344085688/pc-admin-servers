const fs = require('fs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const serve = require('koa-static');
module.exports = app => {
    app.use(bodyParser());
    app.use(cors());
    app.use(serve(path.resolve('publick', 'upload')));
    (function requestRoutes(dirname) {
        fs.readdirSync(dirname).forEach(file => {
            let filePath = path.join(dirname, file);
            if (fs.statSync(filePath).isDirectory()) {
                requestRoutes(filePath)
            } else {
                requestRouteFile(filePath)
            }
        })

        function requestRouteFile(filePath) {
            if (!filePath.endsWith('index.js') && path.extname(filePath) === '.js') {
                try {
                    require(filePath)(app);
                } catch (err) {
                    app.logger.error('Error loading route from isDirectory', err);
                }
            }
        }
    })(__dirname)
};