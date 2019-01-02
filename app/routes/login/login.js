const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const secretOrPrivateKey = "I am a goog man!" // 这是加密的key（密钥）
module.exports = function (app) {
    router.post('/login', async function (ctx, next) {
        ctx.response.type = 'application/json';
        try {
            let content = {msg: ctx.request.body.username + ctx.request.body.password}; // 要生成token的主题信息
            token = await jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 60 * 24
            });
            ctx.body = {
                token: token,
                code: 200,
                message: 'success'
            }
        } catch (error) {
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        }
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};