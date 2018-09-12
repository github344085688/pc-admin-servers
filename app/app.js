const Koa = require('koa');
const app = new Koa();
require('./routes')(app);
require('./services')(app);
require('../configuration/configuration')(app);
module.exports=app;
