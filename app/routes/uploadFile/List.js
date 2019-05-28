module.exports = app => {
    router.post('/mongouser/lser', async (ctx, next)=> {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).selectByPagingDb(porems, {
            dataBase: 'persons',
            tableName: 'pagetest'
        }, 'id').then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        ctx.body = {"inserssss": message};
    });
};
