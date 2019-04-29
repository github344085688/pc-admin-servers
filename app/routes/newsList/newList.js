module.exports = app => {
    router.post('/addnewList', async function (ctx, next) {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).insertDbs(porems, {dataBase:'persons',tableName:'pagetest'}).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        ctx.body = {"inser": message};
    });
    router.put('/upnewList', async function (ctx, next) {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).updateDbs(porems, {dataBase:'persons',tableName:'pagetest'}).then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        ctx.body = {"inserssss": message};
    });
    router.delete('/deleteList/:id', async function (ctx, next) {
        let deletes = ctx.params;
        let id=deletes.id;
        let message;
        if (deletes.id){
            await mysqlOperation(this).deleteDb(deletes.id, {dataBase:'persons',tableName:'pagetest'}).then(res => {
                message = res;
            }).catch(err => {
                message = err;
            })
        }


        // let totalcount = mysqlOperation(this).selectTitleName('newList');

        // let sql = `INSERT INTO newlist ( ${keys}) values (${intoValues})`;
        // await mysqlOperation(this).execSql(sql, 'newList');
        // let countsql = `select count(*) as totalcount  from newList`;
        // let totalcount = await mysqlOperation(this).execSql(countsql, 'newList');
        ctx.body = {"inserssss": message};
    });
    router.post('/newList-select-by-paging', async function (ctx, next) {
        let porems = ctx.request.body;
        let message;
        await mysqlOperation(this).selectByPagingDb(porems,  {dataBase:'persons',tableName:'pagetest'}, 'id').then(res => {
            message = res;
        }).catch(err => {
            message = err;
        })
        // let porems = ctx.request.body;
        // let message;
        // if (deletes.id){
        //     await mysqlOperation(this).selectByPagingDb(porems, 'newList').then(res => {
        //         message = res;
        //     }).catch(err => {
        //         message = err;
        //     })
        // }
        // SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
        // FROM Persons
        // INNER JOIN Orders
        // ON Persons.Id_P=Orders.Id_P
        // ORDER BY Persons.LastName
        ctx.body = {"inserssss": message};
    });
};
