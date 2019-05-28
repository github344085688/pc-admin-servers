module.exports = app => {
    router.post('/add', async (ctx, next) => {
        try {
            let userData = ctx.request.body;
            let porems = {
                tableName: '/mongouser',
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
        let sql=`insert into usert (name,age) values ('kjds','18')`;
        await mysqlOperation(this).execSql(sql);
        let findSql=`select * from usert`;
        // let ssa = await mysqlOperation(this).execSql(findSql);
        let deletesql=`delete from usert where name='154asdh'`;
        await mysqlOperation(this).execSql(deletesql);
        let updatesql=`update usert set name='ssasd' where name='kjds'`;
        await mysqlOperation(this).execSql(updatesql)
        let countsql=`select count(*) as totalcount  from usert`;
        let ssa = await mysqlOperation(this).execSql(countsql);

        ctx.body = ssa ;
    });
};