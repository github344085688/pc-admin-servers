const jwt = require('jsonwebtoken');
module.exports = app => {
    router.post('/login', async (ctx, next) => {
        try {
            const porems = ctx.request.body;
            let message;
            const dataBase = {
                dataBase: 'users',
                tableName: 'user'
            };
            await mysqlOperation(this).selectDetal(dataBase, {userName: porems.userName}).then(res => {
                message = res;
            }).catch(err => {
                message = err;
            });

            if (message.length < 1) {
                ctx.body = {
                    msg: 'The userName does not exist. ',
                    code: 100,
                    message: 'success'
                };
                return
            }
            if (message[0].passWord != porems.passWord) {
                ctx.body = {
                    msg: 'The passWord error ',
                    code: 100,
                    message: 'success'
                };
                return
            }

            let content = {msg: porems.userName + porems.passWord};
            let token = await utilServices(this).token(content);
            message[0].token = token;
            await mysqlOperation(this).updateDbs(message, dataBase).then(res => {
                if (res.protocol41) {
                     console.log(ctx.session.captcha);
                    ctx.body = message;
                }
            }).catch(err => {
                ctx.body = {
                    msg: err,
                    code: 100,
                    message: 'success'
                }
            })

        } catch (error) {
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        }
    });

};