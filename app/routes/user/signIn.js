/**
 * Created by f on 2019/1/3.
 */
const jwt = require('jsonwebtoken');
module.exports = app => {
    router.post('/signIn', async function (ctx, next) {
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
            if (message.length > 0) {
                ctx.body = {
                    msg: 'The userName in exist. ',
                    code: 100,
                    message: 'err'
                };
                return
            }
            const regex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$');
            if (! regex.test(porems.passWord)) {
                ctx.body = {
                    msg: 'The passWord Must contain Numbers, uppercase letters, lowercase letters, and three out of four special characters ',
                    code: 100,
                    message: 'success'
                };
                return
            }

            let content = {msg: porems.userName + porems.passWord};
            let token = await utilServices(this).token(content);
            porems.token = token;
            await mysqlOperation(this).insertDbs(porems,dataBase).then(res => {
                if(res.protocol41){
                    ctx.body = {
                        userName: porems.userName,
                        passWord: porems.passWord,
                        token: token
                    }
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