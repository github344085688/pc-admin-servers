module.exports = app => {
    router.post('/add', async function (ctx, next) {
        try {
            let userData = ctx.request.body;
            let porems = {
                tableName: '/user',
                dataBase: 'user',
                insertData: ctx.request.body,
                createIndex: userData['username']
            }
            console.log(userData.username)
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
};