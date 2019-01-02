const router = require('koa-router')();
const _ = require('lodash');

module.exports = function (app) {
    router.post('/add', async function (ctx, next) {
        ctx.response.type = 'application/json';
        try {
            let userData = ctx.request.body;
            // let sda = await mongodbOperation(this).find('correctly');
            let porems={
                tableName:'/login',
                dataBase:'user',
                insertData:ctx.request.body,
                createIndex:userData['username']
            }
            let ssa = await mongodbOperation(this).insert(porems);

            ctx.body = ssa;
        } catch (error) {

        }
    });

    router.get('/outbound/order/:orderId', async function (ctx, next) {
        let ds = {request: ctx.params}
        await itemSpecService(this).fillItemName(ds);
        ctx.body = sda;
    });
    app.use(router.routes());
    app.use(router.allowedMethods());
};