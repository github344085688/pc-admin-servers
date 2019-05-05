module.exports = app => {
    router.post('/addnewList', async function (ctx, next) {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).insertDbs(porems, {dataBase: 'persons', tableName: 'pagetest'}).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        ctx.body = {"inser": message};
    });

    router.put('/upnewList', async function (ctx, next) {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).updateDbs(porems, {dataBase: 'persons', tableName: 'pagetest'}).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        ctx.body = {"inserssss": message};
    });

    router.delete('/deleteList/:id', async function (ctx, next) {
        let deletes = ctx.params;
        let id = deletes.id;
        let message;
        if (deletes.id) {
            await mysqlOperation(this).deleteDb(deletes.id, {dataBase: 'persons', tableName: 'pagetest'}).then(res => {
                message = res;
            }).catch(err => {
                message = err;
            })
        }
        ctx.body = {"inserssss": message};
    });

    router.post('/newList-select-by-paging', async function (ctx, next) {
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

    router.post('/selects', async function (ctx, next) {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).selectDetail(porems, {
            dataBase: 'persons',
            tableName: 'pagetest'
        }).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        ctx.body = {"data": message};
    });

    router.post('/selects/:id', async function (ctx, next) {
        let deletes = ctx.params;
        let id = deletes.id;
        let message;
        await mysqlOperation(this).selectId({
            dataBase: 'persons',
            tableName: 'pagetest'
        }, id).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        ctx.body = {"data": message};
    });
};
