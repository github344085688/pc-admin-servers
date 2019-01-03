const router = require('koa-router')();
const jwt = require('jsonwebtoken');
module.exports = function (app) {
    router.post('/login', async function (ctx, next) {
        try {
            const userPorems = ctx.request.body;
            let porems = {
                tableName: '/user',
                dataBase: 'user',
            };

            let userDetail = await mongodbOperation(this).find(porems, {
                userName: userPorems.userName,
                passWord: userPorems.passWord,
            });

            if (userDetail.length > 0) {
                porems.oldOperation = {
                    userName: userPorems.userName,
                    passWord: userPorems.passWord
                };
                let content = {msg: userPorems.userName + userPorems.passWord};
                let token = await jwt.sign(content, app.jwtConfig.secretOrPrivateKey, {
                    expiresIn: app.jwtConfig.expiresIn
                });
                porems.newOperation ={
                    userName: userPorems.userName,
                    passWord: userPorems.passWord,
                    token:token
                }
                let updateToken = await mongodbOperation(this).update(porems);
                if(updateToken.ok==1){
                    ctx.body= porems.newOperation
                }else {
                    ctx.body = {
                        msg: 'The user does not exist. ',
                        code: 100,
                        message: 'success'
                    }
                }
            }else {
                ctx.body = {
                    msg: 'The user name or password wrong',
                    code: 100,
                    message: 'success'
                }
            }
        } catch (error) {
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        }
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};