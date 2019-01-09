    /**
     * Created by f on 2018/8/23.
     */
    const monk = require('monk')
    let instance;
    let service = (app, ctx) => {
        async function linkDatabase(porems) {
            try {
                return new Promise((resolve, reject) =>{
                    let path = porems.tableName ? mongoConfig.MONGO_URL + porems.tableName : mongoConfig.MONGO_URL;
                    const db = monk(path);
                    const counters = db.get(porems.dataBase);
                    resolve({counters: counters, db: db});
                });
            }
            catch (error) {
                return error;
            }
        }
    /**
     *
     *
     * @param dbName
     * @param operation
     * @param filter
     * @returns {Promise.<*>}
     */

    async function find(porems, operation = null, filter = null) {
        try {

            const database = await linkDatabase(porems);
            let returnData;
            if (!filter) returnData = await database.counters.find(operation)
            if (filter) returnData = await database.counters.find(operation, filter);
            database.db.close();
            return returnData
        }
        catch (error) {
            return error;
        }
    }

    /**
     *
     * @param porems
     * @returns {Promise.<*>}
     */
    async function insert(porems) {
        try {
            const database = await linkDatabase(porems);
            await database.counters.insert(porems.insertData);
            if (porems.createIndex) await database.counters.createIndex(porems.createIndex);
            await  database.counters.indexes().then((indexes) => {
                // console.log(indexes);
            })
            let returnData = await database.counters.find();
            database.db.close();
            return returnData;
        }
        catch (error) {
            return error;
        }
    }

    /**
     *
     * @param dbName
     * @param operation
     * @returns {Promise.<*>}
     */
    async function remove(porems, operation) {
        try {
            const database = await linkDatabase(porems);
            let returnData;
            returnData = await database.counters.remove(operation);
            database.db.close();
            return returnData;
        }
        catch (error) {

        }
    }

    /**
     *
     * @param dbName
     * @param oldOperation
     * @param newOperation
     * @returns {Promise.<*>}
     */
    async function update(porems, oldOperation = null, newOperation = null) {
        try {
            const database = await linkDatabase(porems);
            let returnData;
            returnData = await database.counters.update(porems.oldOperation, porems.newOperation);
            database.db.close();
            return returnData;
        }
        catch (error) {
            return error
        }
    }

    /*
     async function createDatabase(porems) {
     try {
     let poremsPath = porems.parents ? porems.parents : '';
     const db = monk(mongoConfig.MONGO_URL + '/aatest');
     //let returnData = await db.create('userssd', { capped: true, size: n })
     const counters = await db.get('ppuserssd');
     // let returnData = await counters.insert(porems.insertData)
     db.close();
     return returnData;
     }
     catch (error) {
     return error

     }
     }*/


    return {
        insert,
        remove,
        update,
        find,

    }

}

module.exports = app => {
    return ctx => service(app, ctx);
}
