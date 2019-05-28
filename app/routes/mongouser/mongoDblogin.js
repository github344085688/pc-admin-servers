const jwt = require('jsonwebtoken');
module.exports = app =>{
    router.post('/mongoDlogin', async (ctx, next) =>{
        try {
            const userPorems = ctx.request.body;
            let porems = {
                tableName: '/mongouser',
                dataBase: 'user',
            };
            let userDetail = await mongodbOperation(this).find(porems,userPorems);
            if (userDetail.length > 0) {
                porems.oldOperation = userPorems;
                let content = {msg: userPorems.userName + userPorems.passWord};
                let token = await utilServices(this).token(content);
                porems.newOperation = userPorems;
                porems.newOperation.token = token;
                let updateToken = await mongodbOperation(this).update(porems);
                if(updateToken.ok==1){
                    ctx.body= porems.newOperation
                }else {
                    ctx.body = {
                        msg: 'The mongouser does not exist. ',
                        code: 100,
                        message: 'success'
                    }
                }
            }else {
                ctx.body = {
                    msg: 'The mongouser name or password wrong',
                    code: 100,
                    message: 'success'
                }
            }
        } catch (error) {
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        }
    });

};