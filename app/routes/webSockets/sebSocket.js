/**
 * Created by f on 2019/7/3.
 */
module.exports = app => {
    router.all('/selects/:id/:name/:gid', (ctx, next) => {
        let id = ctx.params.id;
        selectData(id);
        let publicKey=encrypto(ctx.params.gid)
        let cryptoiv=encrypto(ctx.params.id)
        async function selectData (id){
            await mysqlOperation(this).selectId({
                dataBase: 'persons',
                tableName: 'pagetest'
            }, id).then(res => {
                encryp(res)
            }).catch(err => {
                errencryp(err)
            })
        }
        function encrypto(id) {
            return encryption(this).generateMD5pod(id);
        }
        function encryp(data) {
            let encryptData = encryption(this).serEncrypt(data, publicKey, cryptoiv)
            ctx.websocket.send(encryptData)
        }
        function errencryp(err) {
            ctx.websocket.send(err)
        }
        ctx.websocket.on('message', async function (message) {
             let decryptData = encryption(this).serDecrypt(message, publicKey, cryptoiv)
            selectData(decryptData.id);
        })
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
}
