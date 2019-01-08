/**
 * Created by f on 2019/1/4.
 */
const router = require('koa-router')(),
    _ = require('lodash'),
    jwtConfig = require('./jwtConfig'),
    mongoConfig = require('./mongoConfig'),
    mysqlConfig = require('./mysqlConfig');
module.exports = app => {
    global.router = router;
    global._ = _;
    global.mongoConfig = mongoConfig;
    global.jwtConfig = jwtConfig
    global.mysqlConfig = mysqlConfig

}
