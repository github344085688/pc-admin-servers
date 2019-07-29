module.exports = app => {
    router.post('/addnewList', async (ctx, next)=> {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).insertDbs(porems, {dataBase: 'persons', tableName: 'pagetest'}).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        message= await api(ctx).post('/newList-select-by-paging', {
            "col01":76,
            "col02":76,
            "col05":76,
            "paging": {
                "pageNo": 2,
                "limit": 10

            }
        });

        // console.log(message);
        ctx.body = {"inser": message};
    });

    router.put('/upnewList', async (ctx, next)=> {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).updateDbs(porems, {dataBase: 'persons', tableName: 'pagetest'}).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        ctx.body = {"inserssss": message};
    });

    router.delete('/deleteList/:id', async (ctx, next)=> {
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

    router.post('/newList-select-by-paging', async (ctx, next)=> {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).selectByPagingDb(porems, {
            dataBase: 'persons',
            tableName: 'pagetest'
        }, 'id').then(res => {
            message = res;
        }).catch(err => {
            message = err;
            app.logger.error(err);
        })
        ctx.body = {"inserssss": message};
    });
    router.post('/selects', async (ctx, next)=>{
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

    router.post('/selects/:id', async (ctx, next)=> {
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
