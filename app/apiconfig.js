/**
 * Created by f on 2018/8/31.
 */
/**
 * 在app.use(router)之前调用
 */

/*
 */
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify)
// const verify = util.promisify(jwt.verify); // 解密
const secret = 'jwt demo';
module.exports = function (app) {
    const apiconfig = async (ctx, next) => {
        ctx.response.type = 'application/json';


       app.use(jwtKoa({secret}).unless({
            path: [/^\/api\/login/,/^\/api\/signIn/,/^\/api\/createbd/] //数组中的路径不需要通过jwt验证
        }));
/*
        if (ctx.request.url == '/logIn' || ctx.request.url == '/signIn'){

            let content ={msg:ctx.request.body.username + ctx.request.body.password}; // 要生成token的主题信息
            let secretOrPrivateKey="I am a goog man!" // 这是加密的key（密钥）
            let token =  await jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60*60*24  // 24小时过期
            });
            ctx.body = {
                token: token ,
                code: 200,
                message: 'success'
            }
            //await next();
        }*/
        /*else {

        }*/
        const token = ctx.headers['x-access-token'];
        if (token ) await next();
        else  ctx.body = {
            token: 'Token Expired' ,
            code: 200,
            message: 'success'
        }

        //先去执行路由


        //如果有返回数据，将返回数据添加到data中
        if (! ctx.body) {
            ctx.body = {
                code: 0,
                message: 'success'
            }
        }
    }
    app.use(apiconfig)
};

