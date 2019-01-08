module.exports = app => {
    router.post('/add', async (ctx, next) => {
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

    router.post('/outbound/order/', async  (ctx, next)=> {
        let ssa = await mysqlOperation(this).find();
        ctx.body = ssa;
    });
};