/**
 * Created by f on 2019/1/3.
 */
const jwt = require('jsonwebtoken');
module.exports = app => {
    router.post('/mongoDsignIn', async function (ctx, next) {
        try {
            const userPorems = ctx.request.body;
            let porems = {
                tableName: '/mongouser',
                dataBase: 'user',
                insertData: userPorems,
                createIndex: userPorems.userName
            }
            let userDetail = await mongodbOperation(this).find(porems, {
                userName: userPorems.userName
            });
            if (userDetail && userDetail.length > 0) {
                ctx.body = {
                    msg: 'The mongouser name already exists',
                    code: 100,
                    message: 'success'
                }
            } else {
                let content = {msg: userPorems.userName + userPorems.passWord};
                userPorems.token = await utilServices(this).token(content);
                porems.insertData = userPorems;
                ctx.body = await mongodbOperation(this).insert(porems);
            }
        } catch (error) {
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        }
    });
};