module.exports = app => {
    router.post('/addnewList', async (ctx, next)=> {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).insertDbs(porems, {dataBase: 'persons', tableName: 'pagetest'}).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
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
    router.all('/newList-select-by-paging', async (ctx, next) => {
        ctx.websocket.on('message', async function (message) {
            let messages = await getDatas(JSON.parse(message))
            ctx.websocket.send(JSON.stringify(messages))
        })
        async function getDatas(param) {
            return await mysqlOperation(this).selectByPagingDb(param, {
                dataBase: 'persons',
                tableName: 'pagetest'
            }, 'id')

        }
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
    router.all('/selects/:id/:name/:gid', async (ctx, next)=> {
        console.log(ctx.params.id);
        ctx.websocket.send('JSON.stringify(messages)')
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
