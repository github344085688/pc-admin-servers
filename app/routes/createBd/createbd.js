module.exports = app => {
    router.post('/createbd', async function (ctx, next) {
        try {
            let userData = ctx.request.body;
            let reqIndex={};
             _.forEach(userData.createIndex,(Index)=>{
                 reqIndex[Index]=1;
            })
            let porems = {
                tableName:userData.tableName,
                dataBase: userData.dataBase,
                insertData: userData.insertData,
                createIndex: reqIndex
            }
             let create = await mongodbOperation(this).insert(porems);
            ctx.body = create;
        } catch (error) {
            console.log(error)
        }
    });
};
